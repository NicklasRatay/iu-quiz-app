begin;

select plan(32);


select has_table('public', 'quiz_question', 'quiz_question table exists');

select has_column('public', 'quiz_question', 'id', 'id column exist');
select col_type_is('public', 'quiz_question', 'id', 'bigint', 'id column is of type bigint');
select col_not_null('public', 'quiz_question', 'id', 'id column is not null');
select col_is_pk('public', 'quiz_question', 'id', 'id column is pk');

select has_column('public', 'quiz_question', 'quiz_id', 'quiz_id column exist');
select col_type_is('public', 'quiz_question', 'quiz_id', 'bigint', 'quiz_id column is of type bigint');
select col_not_null('public', 'quiz_question', 'quiz_id', 'quiz_id column is not null');
select col_is_fk('public', 'quiz_question', 'quiz_id', 'quiz_id column is fk');
select fk_ok('public', 'quiz_question', 'quiz_id', 'public', 'quiz', 'id', 'quiz_id column is fk to public.quiz.id');

select has_column('public', 'quiz_question', 'question_id', 'question_id column exist');
select col_type_is('public', 'quiz_question', 'question_id', 'bigint', 'question_id column is of type bigint');
select col_not_null('public', 'quiz_question', 'question_id', 'question_id column is not null');
select col_is_fk('public', 'quiz_question', 'question_id', 'question_id column is fk');
select fk_ok('public', 'quiz_question', 'question_id', 'public', 'question', 'id', 'question_id column is fk to public.question.id');

select has_column('public', 'quiz_question', 'order_number', 'order_number column exist');
select col_type_is('public', 'quiz_question', 'order_number', 'integer', 'order_number column is of type integer');
select col_not_null('public', 'quiz_question', 'order_number', 'order_number column is not null');

select test_audit_columns('public', 'quiz_question');


select * from finish();

rollback;
