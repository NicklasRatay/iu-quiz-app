begin;

select plan(32);


select has_table('public', 'answer_attempt', 'answer_attempt table exists');

select has_column('public', 'answer_attempt', 'id', 'id column exist');
select col_type_is('public', 'answer_attempt', 'id', 'bigint', 'id column is of type bigint');
select col_not_null('public', 'answer_attempt', 'id', 'id column is not null');
select col_is_pk('public', 'answer_attempt', 'id', 'id column is pk');

select has_column('public', 'answer_attempt', 'question_attempt_id', 'question_attempt_id column exist');
select col_type_is('public', 'answer_attempt', 'question_attempt_id', 'bigint', 'question_attempt_id column is of type bigint');
select col_not_null('public', 'answer_attempt', 'question_attempt_id', 'question_attempt_id column is not null');
select col_is_fk('public', 'answer_attempt', 'question_attempt_id', 'question_attempt_id column is fk');
select fk_ok('public', 'answer_attempt', 'question_attempt_id', 'public', 'question_attempt', 'id', 'question_attempt_id column is fk to public.question_attempt.id');

select has_column('public', 'answer_attempt', 'answer_option_id', 'answer_option_id column exist');
select col_type_is('public', 'answer_attempt', 'answer_option_id', 'bigint', 'answer_option_id column is of type bigint');
select col_not_null('public', 'answer_attempt', 'answer_option_id', 'answer_option_id column is not null');
select col_is_fk('public', 'answer_attempt', 'answer_option_id', 'answer_option_id column is fk');
select fk_ok('public', 'answer_attempt', 'answer_option_id', 'public', 'answer_option', 'id', 'answer_option_id column is fk to public.answer_option.id');

select has_column('public', 'answer_attempt', 'is_selected_as_correct', 'is_selected_as_correct column exist');
select col_type_is('public', 'answer_attempt', 'is_selected_as_correct', 'boolean', 'is_selected_as_correct column is of type boolean');
select col_not_null('public', 'answer_attempt', 'is_selected_as_correct', 'is_selected_as_correct column is not null');

select test_audit_columns('public', 'answer_attempt');


select * from finish();

rollback;
