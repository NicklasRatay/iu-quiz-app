CREATE OR REPLACE FUNCTION public.create_question_attempt_with_answers(
    p_quiz_participant_id BIGINT,
    p_quiz_question_id BIGINT,
    p_has_used_hint BOOLEAN,
    p_answers JSONB
)
RETURNS JSONB AS $$
DECLARE
    v_question_attempt_id BIGINT;
    v_inserted_answers JSONB;
BEGIN
    -- Insert into question_attempt
    INSERT INTO public.question_attempt (quiz_participant_id, quiz_question_id, has_used_hint)
    VALUES (p_quiz_participant_id, p_quiz_question_id, p_has_used_hint)
    RETURNING id INTO v_question_attempt_id;

    -- Insert into answer_attempt and capture inserted rows
    WITH inserted_answers AS (
        INSERT INTO public.answer_attempt (question_attempt_id, answer_option_id, is_selected_as_correct)
        SELECT 
            v_question_attempt_id,
            (answer->>'answer_option_id')::BIGINT,
            (answer->>'is_selected_as_correct')::BOOLEAN
        FROM jsonb_array_elements(p_answers) AS answer
        RETURNING id, question_attempt_id, answer_option_id, is_selected_as_correct
    )
    SELECT jsonb_agg(to_jsonb(inserted_answers))
    INTO v_inserted_answers
    FROM inserted_answers;

    -- Return JSON containing the question_attempt and its associated answer_attempts
    RETURN jsonb_build_object(
        'question_attempt', jsonb_build_object(
            'id', v_question_attempt_id,
            'quiz_participant_id', p_quiz_participant_id,
            'quiz_question_id', p_quiz_question_id
        ),
        'answer_attempts', v_inserted_answers
    );
END;
$$ LANGUAGE plpgsql;
