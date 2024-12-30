CREATE OR REPLACE VIEW public.vw_quiz_results WITH (SECURITY_INVOKER=TRUE) AS
SELECT
    quiz.id as quiz_id,
    quest.question,
    qq.order_number,
    qa.has_used_hint,
    pr.user_id,
    pr.email,
    pr.first_name,
    pr.last_name,
    SUM(CASE WHEN aa.is_selected_as_correct = ao.is_correct THEN 1 ELSE 0 END) + CASE WHEN qa.has_used_hint THEN 0 ELSE 1 END as points
FROM
    public.question_attempt qa
    INNER JOIN public.answer_attempt aa ON aa.question_attempt_id = qa.id
    INNER JOIN public.answer_option ao ON ao.id = aa.answer_option_id
    INNER JOIN public.quiz_question qq ON qq.id = qa.quiz_question_id
    INNER JOIN public.question quest ON quest.id = qq.question_id
    INNER JOIN public.quiz quiz ON quiz.id = qq.quiz_id
    INNER JOIN public.quiz_participant qp ON qp.id = qa.quiz_participant_id
    INNER JOIN public.profile pr ON pr.user_id = qp.user_id
GROUP BY
    quiz.id,
    quest.question,
    qq.order_number,
    qa.has_used_hint,
    pr.user_id,
    pr.email,
    pr.first_name,
    pr.last_name
ORDER BY
    qq.order_number ASC
