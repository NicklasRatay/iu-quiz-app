CREATE OR REPLACE VIEW public.vw_quiz WITH (SECURITY_INVOKER=TRUE) AS
SELECT 
    qui.id,
    qui_typ.id AS quiz_type_id,
    qui_typ.name AS quiz_type_name,
    qui_sta.id AS quiz_status_id,
    qui_sta.name AS quiz_status_name,
    qui.seconds_per_question,
    qui.created_at,
    qui.created_by,
    qui.updated_at,
    qui.updated_by,
    CASE
        WHEN qui_typ.id = 1 THEN 'pi pi-user'
        WHEN qui_typ.id = 2 THEN 'pi pi-users'
        WHEN qui_typ.id = 3 THEN 'pi pi-flag'
    END AS type_icon,
    CASE
        WHEN qui_typ.id = 1 THEN 'secondary'
        WHEN qui_typ.id = 2 THEN 'primary'
        WHEN qui_typ.id = 3 THEN 'warn'
    END AS type_severity,
    CASE
        WHEN qui_sta.id = 1 THEN 'pi pi-hourglass'
        WHEN qui_sta.id = 2 THEN 'pi pi-play-circle'
        WHEN qui_sta.id = 3 THEN 'pi pi-check-circle'
    END AS status_icon,
    CASE
        WHEN qui_sta.id = 1 THEN 'success'
        WHEN qui_sta.id = 2 THEN 'warn'
        WHEN qui_sta.id = 3 THEN 'danger'
    END AS status_severity,
    COUNT(qui_que.id) AS question_count
FROM 
    public.quiz qui
INNER JOIN
    public.quiz_type qui_typ ON qui_typ.id = qui.quiz_type_id
INNER JOIN
    public.quiz_status qui_sta ON qui_sta.id = qui.quiz_status_id
INNER JOIN
    public.quiz_question qui_que ON qui_que.quiz_id = qui.id
GROUP BY
    qui.id,
    qui_sta.id,
    qui_typ.id
ORDER BY
    qui.created_at DESC;
