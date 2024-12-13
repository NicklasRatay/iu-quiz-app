CREATE OR REPLACE FUNCTION public.get_interactable_quizzes_for_user(
    p_user_id UUID
)
RETURNS SETOF public.vw_quiz AS $$
BEGIN
    RETURN QUERY
    SELECT q.*
    FROM public.vw_quiz q
    WHERE (
			q.quiz_status_id = 1
			AND q.quiz_type_id IN (2, 3)
		)
		OR (
			q.quiz_status_id = 3
			AND q.quiz_type_id IN (2, 3)
			AND EXISTS (
				SELECT 1
				FROM public.quiz_participant qp
				WHERE qp.quiz_id = q.id AND qp.user_id = p_user_id
			)
        )
		OR (
			q.quiz_type_id = 1
			AND q.quiz_status_id IN (1, 3)
			AND q.created_by = p_user_id
		);
END;
$$ LANGUAGE plpgsql;