begin;

select plan(33);


select has_table('public', 'answer_option', 'answer_option table exists');

select has_column('public', 'answer_option', 'id', 'id column exist');
select col_type_is('public', 'answer_option', 'id', 'bigint', 'id column is of type bigint');
select col_not_null('public', 'answer_option', 'id', 'id column is not null');
select col_is_pk('public', 'answer_option', 'id', 'id column is pk');

select has_column('public', 'answer_option', 'question_id', 'question_id column exist');
select col_type_is('public', 'answer_option', 'question_id', 'bigint', 'question_id column is of type bigint');
select col_not_null('public', 'answer_option', 'question_id', 'question_id column is not null');
select col_is_fk('public', 'answer_option', 'question_id', 'question_id column is fk');
select fk_ok('public', 'answer_option', 'question_id', 'public', 'question', 'id', 'question_id column is fk to public.question.id');

select has_column('public', 'answer_option', 'answer', 'answer column exist');
select col_type_is('public', 'answer_option', 'answer', 'text', 'answer column is of type text');
select col_not_null('public', 'answer_option', 'answer', 'answer column is not null');

select has_column('public', 'answer_option', 'is_correct', 'is_correct column exist');
select col_type_is('public', 'answer_option', 'is_correct', 'boolean', 'is_correct column is of type boolean');
select col_not_null('public', 'answer_option', 'is_correct', 'is_correct column is not null');

select has_column('public', 'answer_option', 'justification', 'justification column exist');
select col_type_is('public', 'answer_option', 'justification', 'text', 'justification column is of type text');
select col_is_null('public', 'answer_option', 'justification', 'justification column is null');

select test_audit_columns('public', 'answer_option');


select * from finish();

rollback;
