begin;

select plan(23);


select has_table('public', 'category', 'category table exists');

select has_column('public', 'category', 'id', 'id column exist');
select col_type_is('public', 'category', 'id', 'bigint', 'id column is of type bigint');
select col_not_null('public', 'category', 'id', 'id column is not null');
select col_is_pk('public', 'category', 'id', 'id columns is pk');

select has_column('public', 'category', 'name', 'name column exist');
select col_type_is('public', 'category', 'name', 'text', 'name column is of type text');
select col_not_null('public', 'category', 'name', 'name column is not null');
select col_is_unique('public', 'category', 'name', 'name column is unique');


select test_audit_columns('public', 'category');


select * from finish();

rollback;
