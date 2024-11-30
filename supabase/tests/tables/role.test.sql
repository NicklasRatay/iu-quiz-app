begin;

select plan(13);


select has_table('public', 'role', 'role table exists');

select has_column('public', 'role', 'id', 'id column exist');
select col_type_is('public', 'role', 'id', 'bigint', 'id column is of type bigint');
select col_not_null('public', 'role', 'id', 'id column is not null');
select col_is_pk('public', 'role', 'id', 'id column is pk');

select has_column('public', 'role', 'name', 'name column exist');
select col_type_is('public', 'role', 'name', 'text', 'name column is of type text');
select col_not_null('public', 'role', 'name', 'name column is not null');
select col_is_unique('public', 'role', 'name', 'name column is unique');

select has_column('public', 'role', 'description', 'description column exist');
select col_type_is('public', 'role', 'description', 'text', 'description column is of type text');
select col_not_null('public', 'role', 'description', 'description column is not null');
select col_is_unique('public', 'role', 'description', 'description column is unique');


select * from finish();

rollback;
