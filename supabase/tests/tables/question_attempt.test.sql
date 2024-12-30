begin;

select plan(29);


select has_table('public', 'question_attempt', 'question_attempt table exists');

select has_column('public', 'question_attempt', 'id', 'id column exist');
select col_type_is('public', 'question_attempt', 'id', 'bigint', 'id column is of type bigint');
select col_not_null('public', 'question_attempt', 'id', 'id column is not null');
select col_is_pk('public', 'question_attempt', 'id', 'id column is pk');

select has_column('public', 'question_attempt', 'quiz_participant_id', 'quiz_participant_id column exist');
select col_type_is('public', 'question_attempt', 'quiz_participant_id', 'bigint', 'quiz_participant_id column is of type bigint');
select col_not_null('public', 'question_attempt', 'quiz_participant_id', 'quiz_participant_id column is not null');
select col_is_fk('public', 'question_attempt', 'quiz_participant_id', 'quiz_participant_id column is fk');
select fk_ok('public', 'question_attempt', 'quiz_participant_id', 'public', 'quiz_participant', 'id', 'quiz_participant_id column is fk to public.quiz_participant.id');

select has_column('public', 'question_attempt', 'quiz_question_id', 'quiz_question_id column exist');
select col_type_is('public', 'question_attempt', 'quiz_question_id', 'bigint', 'quiz_question_id column is of type bigint');
select col_not_null('public', 'question_attempt', 'quiz_question_id', 'quiz_question_id column is not null');
select col_is_fk('public', 'question_attempt', 'quiz_question_id', 'quiz_question_id column is fk');
select fk_ok('public', 'question_attempt', 'quiz_question_id', 'public', 'quiz_question', 'id', 'quiz_question_id column is fk to public.quiz_question.id');

select test_audit_columns('public', 'question_attempt');


select * from finish();

rollback;
