begin;

select plan(1);


select has_function('public', 'test_audit_columns', ARRAY['text', 'text'], 'test_audit_columns(text, text) function exists');


select * from finish();

rollback;
