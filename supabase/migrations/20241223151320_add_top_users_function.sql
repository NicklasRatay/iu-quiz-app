CREATE OR REPLACE FUNCTION public.get_top_users_by_course(p_course_id BIGINT DEFAULT NULL)
RETURNS TABLE (
    user_id UUID,
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    correct_answers BIGINT,
    total_answers BIGINT,
    accuracy_percentage NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    WITH course_questions AS (
        SELECT qc.question_id
        FROM public.question_course qc
        WHERE p_course_id IS NULL OR qc.course_id = p_course_id
    ),
    user_performance AS (
        SELECT
            qp.user_id,
            COUNT(CASE
                WHEN ao.is_correct AND aa.is_selected_as_correct THEN 1
                WHEN NOT ao.is_correct AND NOT aa.is_selected_as_correct THEN 1
                ELSE NULL
            END) AS correct_answers,
            COUNT(*) AS total_answers
        FROM
            public.answer_attempt aa
        INNER JOIN
            public.answer_option ao ON aa.answer_option_id = ao.id
        INNER JOIN
            public.question_attempt qa ON aa.question_attempt_id = qa.id
        INNER JOIN
            public.quiz_participant qp ON qa.quiz_participant_id = qp.id
        INNER JOIN
            public.quiz_question qq ON qa.quiz_question_id = qq.id
        WHERE
            p_course_id IS NULL OR qq.question_id IN (SELECT question_id FROM course_questions)
        GROUP BY
            qp.user_id
    ),
    user_accuracy AS (
        SELECT
            up.user_id,
            up.correct_answers,
            up.total_answers,
            CASE WHEN up.total_answers > 0 THEN (up.correct_answers::DECIMAL / up.total_answers) * 100 ELSE 0 END AS accuracy_percentage
        FROM
            user_performance up
    )
    SELECT
        ua.user_id,
        p.email,
        p.first_name,
        p.last_name,
        ua.correct_answers,
        ua.total_answers,
        ua.accuracy_percentage
    FROM
        user_accuracy ua
    INNER JOIN
        public.profile p ON ua.user_id = p.user_id
    ORDER BY
        ua.accuracy_percentage DESC
    LIMIT 10;
END;
$$ LANGUAGE plpgsql;
