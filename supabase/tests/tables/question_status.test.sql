begin;

select plan(9);


select has_table('public', 'question_status', 'question_status table exists');

select has_column('public', 'question_status', 'id', 'id column exist');
select col_type_is('public', 'question_status', 'id', 'bigint', 'id column is of type bigint');
select col_not_null('public', 'question_status', 'id', 'id column is not null');
select col_is_pk('public', 'question_status', 'id', 'id columns is pk');

select has_column('public', 'question_status', 'name', 'name column exist');
select col_type_is('public', 'question_status', 'name', 'text', 'name column is of type text');
select col_not_null('public', 'question_status', 'name', 'name column is not null');
select col_is_unique('public', 'question_status', 'name', 'name column is unique');


select * from finish();

rollback;
