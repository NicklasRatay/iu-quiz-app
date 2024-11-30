begin;

select plan(30);


select has_table('public', 'question', 'question table exists');

select has_column('public', 'question', 'id', 'id column exist');
select col_type_is('public', 'question', 'id', 'bigint', 'id column is of type bigint');
select col_not_null('public', 'question', 'id', 'id column is not null');
select col_is_pk('public', 'question', 'id', 'id column is pk');

select has_column('public', 'question', 'question_status_id', 'question_status_id column exist');
select col_type_is('public', 'question', 'question_status_id', 'bigint', 'question_status_id column is of type bigint');
select col_not_null('public', 'question', 'question_status_id', 'question_status_id column is not null');
select col_is_fk('public', 'question', 'question_status_id', 'question_status_id column is fk');
select fk_ok('public', 'question', 'question_status_id', 'public', 'question_status', 'id', 'question_status_id column is fk to public.question_status.id');

select has_column('public', 'question', 'question', 'question column exist');
select col_type_is('public', 'question', 'question', 'text', 'question column is of type text');
select col_not_null('public', 'question', 'question', 'question column is not null');

select has_column('public', 'question', 'hint', 'hint column exist');
select col_type_is('public', 'question', 'hint', 'text', 'hint column is of type text');
select col_is_null('public', 'question', 'hint', 'hint column is null');

select test_audit_columns('public', 'question');


select * from finish();

rollback;
