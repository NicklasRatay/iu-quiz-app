begin;

select plan(26);


select has_table('public', 'marked_question', 'marked_question table exists');

select has_column('public', 'marked_question', 'user_id', 'user_id column exist');
select col_type_is('public', 'marked_question', 'user_id', 'uuid', 'user_id column is of type uuid');
select col_not_null('public', 'marked_question', 'user_id', 'user_id column is not null');
select col_is_fk('public', 'marked_question', 'user_id', 'user_id column is fk');
select fk_ok('public', 'marked_question', 'user_id', 'public', 'profile', 'user_id', 'user_id column is fk to public.profile.user_id');

select has_column('public', 'marked_question', 'question_id', 'question_id column exist');
select col_type_is('public', 'marked_question', 'question_id', 'bigint', 'question_id column is of type bigint');
select col_not_null('public', 'marked_question', 'question_id', 'question_id column is not null');
select col_is_fk('public', 'marked_question', 'question_id', 'question_id column is fk');
select fk_ok('public', 'marked_question', 'question_id', 'public', 'question', 'id', 'question_id column is fk to public.question.id');

select col_is_pk('public', 'marked_question', array['user_id', 'question_id'], 'user_id and question_id columns are pk');

select test_audit_columns('public', 'marked_question');


select * from finish();

rollback;
