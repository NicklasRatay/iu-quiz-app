begin;

select plan(32);


select has_table('public', 'quiz', 'quiz table exists');

select has_column('public', 'quiz', 'id', 'id column exist');
select col_type_is('public', 'quiz', 'id', 'bigint', 'id column is of type bigint');
select col_not_null('public', 'quiz', 'id', 'id column is not null');
select col_is_pk('public', 'quiz', 'id', 'id column is pk');

select has_column('public', 'quiz', 'quiz_type_id', 'quiz_type_id column exist');
select col_type_is('public', 'quiz', 'quiz_type_id', 'bigint', 'quiz_type_id column is of type bigint');
select col_not_null('public', 'quiz', 'quiz_type_id', 'quiz_type_id column is not null');
select col_is_fk('public', 'quiz', 'quiz_type_id', 'quiz_type_id column is fk');
select fk_ok('public', 'quiz', 'quiz_type_id', 'public', 'quiz_type', 'id', 'quiz_type_id column is fk to public.quiz_type.id');

select has_column('public', 'quiz', 'quiz_status_id', 'quiz_status_id column exist');
select col_type_is('public', 'quiz', 'quiz_status_id', 'bigint', 'quiz_status_id column is of type bigint');
select col_not_null('public', 'quiz', 'quiz_status_id', 'quiz_status_id column is not null');
select col_is_fk('public', 'quiz', 'quiz_status_id', 'quiz_status_id column is fk');
select fk_ok('public', 'quiz', 'quiz_status_id', 'public', 'quiz_status', 'id', 'quiz_status_id column is fk to public.quiz_status.id');

select has_column('public', 'quiz', 'seconds_per_question', 'seconds_per_question column exist');
select col_type_is('public', 'quiz', 'seconds_per_question', 'integer', 'seconds_per_question column is of type integer');
select col_not_null('public', 'quiz', 'seconds_per_question', 'seconds_per_question column is not null');

select test_audit_columns('public', 'quiz');


select * from finish();

rollback;
