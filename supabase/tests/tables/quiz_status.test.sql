begin;

select plan(9);


select has_table('public', 'quiz_status', 'quiz_status table exists');

select has_column('public', 'quiz_status', 'id', 'id column exist');
select col_type_is('public', 'quiz_status', 'id', 'bigint', 'id column is of type bigint');
select col_not_null('public', 'quiz_status', 'id', 'id column is not null');
select col_is_pk('public', 'quiz_status', 'id', 'id columns is pk');

select has_column('public', 'quiz_status', 'name', 'name column exist');
select col_type_is('public', 'quiz_status', 'name', 'text', 'name column is of type text');
select col_not_null('public', 'quiz_status', 'name', 'name column is not null');
select col_is_unique('public', 'quiz_status', 'name', 'name column is unique');


select * from finish();

rollback;
