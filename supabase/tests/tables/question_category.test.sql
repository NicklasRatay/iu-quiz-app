begin;

select plan(26);


select has_table('public', 'question_category', 'question_category table exists');

select has_column('public', 'question_category', 'question_id', 'question_id column exist');
select col_type_is('public', 'question_category', 'question_id', 'bigint', 'question_id column is of type bigint');
select col_not_null('public', 'question_category', 'question_id', 'question_id column is not null');
select col_is_fk('public', 'question_category', 'question_id', 'question_id column is fk');
select fk_ok('public', 'question_category', 'question_id', 'public', 'question', 'id', 'question_id column is fk to public.question.id');

select has_column('public', 'question_category', 'category_id', 'category_id column exist');
select col_type_is('public', 'question_category', 'category_id', 'bigint', 'category_id column is of type bigint');
select col_not_null('public', 'question_category', 'category_id', 'category_id column is not null');
select col_is_fk('public', 'question_category', 'category_id', 'category_id column is fk');
select fk_ok('public', 'question_category', 'category_id', 'public', 'category', 'id', 'category_id column is fk to public.category.id');

select col_is_pk('public', 'question_category', array['question_id', 'category_id'], 'question_id and category_id columns are pk');

select test_audit_columns('public', 'question_category');


select * from finish();

rollback;
