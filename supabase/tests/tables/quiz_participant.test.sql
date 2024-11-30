begin;

select plan(29);


select has_table('public', 'quiz_participant', 'quiz_participant table exists');

select has_column('public', 'quiz_participant', 'id', 'id column exist');
select col_type_is('public', 'quiz_participant', 'id', 'bigint', 'id column is of type bigint');
select col_not_null('public', 'quiz_participant', 'id', 'id column is not null');
select col_is_pk('public', 'quiz_participant', 'id', 'id column is pk');

select has_column('public', 'quiz_participant', 'quiz_id', 'quiz_id column exist');
select col_type_is('public', 'quiz_participant', 'quiz_id', 'bigint', 'quiz_id column is of type bigint');
select col_not_null('public', 'quiz_participant', 'quiz_id', 'quiz_id column is not null');
select col_is_fk('public', 'quiz_participant', 'quiz_id', 'quiz_id column is fk');
select fk_ok('public', 'quiz_participant', 'quiz_id', 'public', 'quiz', 'id', 'quiz_id column is fk to public.quiz.id');

select has_column('public', 'quiz_participant', 'user_id', 'user_id column exist');
select col_type_is('public', 'quiz_participant', 'user_id', 'uuid', 'user_id column is of type uuid');
select col_not_null('public', 'quiz_participant', 'user_id', 'user_id column is not null');
select col_is_fk('public', 'quiz_participant', 'user_id', 'user_id column is fk');
select fk_ok('public', 'quiz_participant', 'user_id', 'public', 'profile', 'user_id', 'user_id column is fk to public.profile.user_id');

select test_audit_columns('public', 'quiz_participant');


select * from finish();

rollback;
