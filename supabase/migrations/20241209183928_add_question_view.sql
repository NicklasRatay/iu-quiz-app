CREATE OR REPLACE VIEW public.vw_question WITH (SECURITY_INVOKER=TRUE) AS
SELECT 
    que.id,
    que_sta.id AS question_status_id,
    que_sta.name AS question_status_name,
    que.question,
    que.hint,
    que.created_at,
    que.created_by,
    que.updated_at,
    que.updated_by,
    CASE 
        WHEN COUNT(cou.id) = 0 THEN NULL 
        ELSE array_agg(DISTINCT cou.name) 
    END AS courses,
    CASE 
        WHEN COUNT(cat.id) = 0 THEN NULL 
        ELSE array_agg(DISTINCT cat.name) 
    END AS categories,
    CASE
        WHEN que_sta.id = 1 THEN 'pi pi-send'
        WHEN que_sta.id = 2 THEN 'pi pi-verified'
        WHEN que_sta.id = 3 THEN 'pi pi-ban'
    END AS status_icon,
    CASE
        WHEN que_sta.id = 1 THEN 'secondary'
        WHEN que_sta.id = 2 THEN 'success'
        WHEN que_sta.id = 3 THEN 'danger'
    END AS status_severity
FROM 
    public.question que
LEFT JOIN
    public.question_status que_sta ON que_sta.id = que.question_status_id
LEFT JOIN
    public.question_course que_cou ON que_cou.question_id = que.id
LEFT JOIN
    public.course cou ON cou.id = que_cou.course_id
LEFT JOIN
    public.question_category que_cat ON que_cat.question_id = que.id
LEFT JOIN
    public.category cat ON cat.id = que_cat.category_id
GROUP BY
    que.id,
    que_sta.id
ORDER BY
    que.created_at DESC;
