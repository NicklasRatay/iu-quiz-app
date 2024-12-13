CREATE OR REPLACE FUNCTION public.create_quiz(
    p_quiz_type_id BIGINT,
    p_seconds_per_question INT,
    p_number_of_questions INT,
    p_course_ids BIGINT[] DEFAULT ARRAY[]::BIGINT[],
    p_category_ids BIGINT[] DEFAULT ARRAY[]::BIGINT[]
)
RETURNS BIGINT AS $$
DECLARE
    v_quiz_id BIGINT;
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
        WHERE
            q.question_status_id = 2 -- Validated questions only
        AND (
            ARRAY_LENGTH(p_course_ids, 1) IS NULL -- If no course IDs provided, ignore filter
            OR qc.course_id = ANY(p_course_ids)
        )
        AND (
            ARRAY_LENGTH(p_category_ids, 1) IS NULL -- If no category IDs provided, ignore filter
            OR qcat.category_id = ANY(p_category_ids)
        )
        GROUP BY q.id -- Ensure uniqueness without SELECT DISTINCT
        ORDER BY RANDOM() -- Introduce randomness in the selection process
        LIMIT p_number_of_questions
    ) random_questions;


    -- Return the ID of the newly created quiz
    RETURN v_quiz_id;
END;
$$ LANGUAGE plpgsql;
