begin;

select plan(9);


select has_table('public', 'quiz_type', 'quiz_type table exists');

select has_column('public', 'quiz_type', 'id', 'id column exist');
select col_type_is('public', 'quiz_type', 'id', 'bigint', 'id column is of type bigint');
select col_not_null('public', 'quiz_type', 'id', 'id column is not null');
select col_is_pk('public', 'quiz_type', 'id', 'id columns is pk');

select has_column('public', 'quiz_type', 'name', 'name column exist');
select col_type_is('public', 'quiz_type', 'name', 'text', 'name column is of type text');
select col_not_null('public', 'quiz_type', 'name', 'name column is not null');
select col_is_unique('public', 'quiz_type', 'name', 'name column is unique');


select * from finish();

rollback;
