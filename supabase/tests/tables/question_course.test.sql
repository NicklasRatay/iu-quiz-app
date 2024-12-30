begin;

select plan(26);


select has_table('public', 'question_course', 'question_course table exists');

select has_column('public', 'question_course', 'question_id', 'question_id column exist');
select col_type_is('public', 'question_course', 'question_id', 'bigint', 'question_id column is of type bigint');
select col_not_null('public', 'question_course', 'question_id', 'question_id column is not null');
select col_is_fk('public', 'question_course', 'question_id', 'question_id column is fk');
select fk_ok('public', 'question_course', 'question_id', 'public', 'question', 'id', 'question_id column is fk to public.question.id');

select has_column('public', 'question_course', 'course_id', 'course_id column exist');
select col_type_is('public', 'question_course', 'course_id', 'bigint', 'course_id column is of type bigint');
select col_not_null('public', 'question_course', 'course_id', 'course_id column is not null');
select col_is_fk('public', 'question_course', 'course_id', 'course_id column is fk');
select fk_ok('public', 'question_course', 'course_id', 'public', 'course', 'id', 'course_id column is fk to public.course.id');

select col_is_pk('public', 'question_course', array['question_id', 'course_id'], 'question_id and course_id columns are pk');

select test_audit_columns('public', 'question_course');


select * from finish();

rollback;
