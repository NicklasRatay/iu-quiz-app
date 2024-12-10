CREATE OR REPLACE FUNCTION public.insert_question_with_details(json_input JSONB)
RETURNS VOID AS $$
DECLARE
    v_question_id BIGINT;
    v_course_id BIGINT;
    v_category_id BIGINT;
    v_question TEXT;
    v_hint TEXT;
    v_question_status_id BIGINT;
    i INT;
    v_answer TEXT;
    v_is_correct BOOLEAN;
    v_justification TEXT;
BEGIN
    -- Extract the question, hint, and question_status_id
    v_question := json_input->>'question';
    v_hint := json_input->>'hint';
    v_question_status_id := (json_input->>'question_status_id')::BIGINT;

    -- Insert the question into the questions table
    INSERT INTO question (question, hint, question_status_id)
    VALUES (v_question, v_hint, v_question_status_id)
    RETURNING id INTO v_question_id;

    -- Insert associated courses
    FOR v_course_id IN SELECT jsonb_array_elements(json_input->'courses')::BIGINT LOOP
        INSERT INTO question_course (question_id, course_id)
        VALUES (v_question_id, v_course_id);
    END LOOP;

    -- Insert associated categories
    FOR v_category_id IN SELECT jsonb_array_elements(json_input->'categories')::BIGINT LOOP
        INSERT INTO question_category (question_id, category_id)
        VALUES (v_question_id, v_category_id);
    END LOOP;

    -- Insert answers
    FOR i IN 1..4 LOOP
        -- Construct dynamic key names
        v_answer := json_input->>(format('answer_%s', i));
        v_is_correct := (json_input->>(format('is_correct_%s', i)))::BOOLEAN;
        v_justification := json_input->>(format('justification_%s', i));
        
        -- Insert the answer
        INSERT INTO answer_option (question_id, answer, is_correct, justification)
        VALUES (v_question_id, v_answer, v_is_correct, v_justification);
    END LOOP;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION public.update_question_with_details(json_input JSONB)
RETURNS VOID AS $$
DECLARE
    v_question_id BIGINT;
    v_course_id BIGINT;
    v_category_id BIGINT;
    v_question TEXT;
    v_hint TEXT;
    v_question_status_id BIGINT;
    i INT;
    v_answer_id BIGINT;
    v_answer TEXT;
    v_is_correct BOOLEAN;
    v_justification TEXT;
BEGIN
    -- Extract the question ID, question, and hint
    v_question_id := (json_input->>'question_id')::BIGINT;
    v_question := json_input->>'question';
    v_hint := json_input->>'hint';
    v_question_status_id := (json_input->>'question_status_id')::BIGINT;

    -- Update the question in the questions table
    UPDATE question
    SET question = v_question,
        hint = v_hint,
        question_status_id = v_question_status_id
    WHERE id = v_question_id;

    -- Clear and re-insert associated courses
    DELETE FROM question_course WHERE question_id = v_question_id;
    FOR v_course_id IN SELECT jsonb_array_elements(json_input->'courses')::BIGINT LOOP
        INSERT INTO question_course (question_id, course_id)
        VALUES (v_question_id, v_course_id);
    END LOOP;

    -- Clear and re-insert associated categories
    DELETE FROM question_category WHERE question_id = v_question_id;
    FOR v_category_id IN SELECT jsonb_array_elements(json_input->'categories')::BIGINT LOOP
        INSERT INTO question_category (question_id, category_id)
        VALUES (v_question_id, v_category_id);
    END LOOP;

    -- Update answers using the provided IDs
    FOR i IN 1..4 LOOP
        -- Construct dynamic key names
        v_answer_id := (json_input->>(format('answer_id_%s', i)))::BIGINT;
        v_answer := json_input->>(format('answer_%s', i));
        v_is_correct := (json_input->>(format('is_correct_%s', i)))::BOOLEAN;
        v_justification := json_input->>(format('justification_%s', i));

        -- Update the existing answer
        UPDATE answer_option
        SET answer = v_answer,
            is_correct = v_is_correct,
            justification = v_justification
        WHERE id = v_answer_id AND question_id = v_question_id;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
