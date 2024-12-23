CREATE OR REPLACE FUNCTION get_current_streak(p_user_id UUID)
RETURNS INT AS $$
DECLARE
    streak INT;
BEGIN
    WITH unique_dates AS (
        SELECT DISTINCT
            qp.created_at::date AS created_date
        FROM
            public.quiz_participant qp
            INNER JOIN public.quiz quiz ON quiz.id = qp.quiz_id
        WHERE
            user_id = p_user_id
            AND quiz.quiz_status_id = 3
    ),
    ranked_dates AS (
        SELECT
            CURRENT_DATE - created_date as days_since_today,
            ROW_NUMBER() OVER (ORDER BY created_date DESC) - 1 as row_num
        FROM
            unique_dates
    )
    SELECT
        COALESCE(MAX(days_since_today), -1) + 1
    INTO
        streak
    FROM
        ranked_dates
    WHERE
        days_since_today - row_num = 0;

    RETURN streak;
END;
$$ LANGUAGE plpgsql;
