begin;

select plan(3);


select has_function('public', 'test_audit_columns', ARRAY['text', 'text'], 'test_audit_columns(text, text) function exists');
select has_function('public', 'insert_question_with_details', ARRAY['JSONB'], 'insert_question_with_details(JSONB) function exists');
select has_function('public', 'update_question_with_details', ARRAY['JSONB'], 'update_question_with_details(JSONB) function exists');


select * from finish();

rollback;
