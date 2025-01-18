CREATE OR REPLACE VIEW vw_question_difficulty WITH (SECURITY_INVOKER=TRUE) AS
SELECT 
    q.id,
    q.question,
    COALESCE(SUM(CASE WHEN (ao.is_correct AND aa.is_selected_as_correct) OR (NOT ao.is_correct AND NOT aa.is_selected_as_correct) THEN 1 ELSE 0 END)::float / 
             NULLIF(COUNT(aa.id), 0), 0) * 100 AS correct_percentage,
    CASE
        WHEN COALESCE(SUM(CASE WHEN (ao.is_correct AND aa.is_selected_as_correct) OR (NOT ao.is_correct AND NOT aa.is_selected_as_correct) THEN 1 ELSE 0 END)::float / 
                      NULLIF(COUNT(aa.id), 0), 0) >= 0.66 THEN 1
        WHEN COALESCE(SUM(CASE WHEN (ao.is_correct AND aa.is_selected_as_correct) OR (NOT ao.is_correct AND NOT aa.is_selected_as_correct) THEN 1 ELSE 0 END)::float / 
                      NULLIF(COUNT(aa.id), 0), 0) BETWEEN 0.33 AND 0.66 THEN 2
        ELSE 3
    END AS difficulty
FROM 
    public.question q
LEFT JOIN 
    public.answer_option ao ON q.id = ao.question_id
LEFT JOIN 
    public.answer_attempt aa ON ao.id = aa.answer_option_id
GROUP BY 
    q.id, q.question;


DROP FUNCTION public.create_quiz; -- Necessary because of parameter changes

CREATE OR REPLACE FUNCTION public.create_quiz(
    p_quiz_type_id BIGINT,
    p_seconds_per_question INT,
    p_number_of_questions INT,
    p_course_ids BIGINT[] DEFAULT ARRAY[]::BIGINT[],
    p_category_ids BIGINT[] DEFAULT ARRAY[]::BIGINT[],
    p_difficulty INT DEFAULT NULL,
    p_user_id UUID DEFAULT NULL
)
RETURNS BIGINT AS $$
DECLARE
    v_quiz_id BIGINT;
    v_question_count INT;
BEGIN
    -- Insert the new quiz record
    INSERT INTO public.quiz (quiz_type_id, quiz_status_id, seconds_per_question)
    VALUES (p_quiz_type_id, 1, p_seconds_per_question)
    RETURNING id INTO v_quiz_id;

    -- Insert quiz questions with filtering
    INSERT INTO public.quiz_question (quiz_id, question_id, order_number)
    SELECT
        v_quiz_id AS quiz_id,
        question_id,
        ROW_NUMBER() OVER (ORDER BY RANDOM()) AS order_number
    FROM (
        SELECT q.id AS question_id
        FROM public.question q
        LEFT JOIN public.question_course qc ON q.id = qc.question_id
        LEFT JOIN public.question_category qcat ON q.id = qcat.question_id
        LEFT JOIN vw_question_difficulty qd ON q.id = qd.id -- Join with difficulty view
        WHERE (
            -- If p_user_id is provided, bypass question_status_id for questions created by p_user_id
            (p_user_id IS NOT NULL AND q.created_by = p_user_id)
            OR q.question_status_id = 2 -- Validated questions only
        )
        AND (
            ARRAY_LENGTH(p_course_ids, 1) IS NULL -- If no course IDs provided, ignore filter
            OR qc.course_id = ANY(p_course_ids)
        )
        AND (
            ARRAY_LENGTH(p_category_ids, 1) IS NULL -- If no category IDs provided, ignore filter
            OR qcat.category_id = ANY(p_category_ids)
        )
        AND (
            p_difficulty IS NULL -- If no difficulty provided, include all questions
            OR qd.difficulty = p_difficulty
        )
        GROUP BY q.id -- Ensure uniqueness without SELECT DISTINCT
        ORDER BY RANDOM() -- Introduce randomness in the selection process
        LIMIT p_number_of_questions
    ) random_questions;

    SELECT COUNT(*) INTO v_question_count FROM public.quiz_question WHERE quiz_id = v_quiz_id;

    IF v_question_count = 0 THEN
        DELETE FROM public.quiz WHERE id = v_quiz_id;
        RAISE EXCEPTION 'Es gibt keine Fragen, die den Filterkriterien entsprechen.';
    END IF;

    -- Return the ID of the newly created quiz
    RETURN v_quiz_id;
END;
$$ LANGUAGE plpgsql;

