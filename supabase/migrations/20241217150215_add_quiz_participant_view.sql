CREATE OR REPLACE VIEW public.vw_quiz_participant WITH (SECURITY_INVOKER=TRUE) AS
SELECT 
    qp.id AS participant_id,
    qp.quiz_id,
    qp.user_id,
    p.email,
    p.first_name,
    p.last_name
FROM 
    public.quiz_participant qp
INNER JOIN 
    public.profile p ON qp.user_id = p.user_id
ORDER BY
    qp.created_at ASC;
