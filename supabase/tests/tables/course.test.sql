begin;

select plan(23);


select has_table('public', 'course', 'course table exists');

select has_column('public', 'course', 'id', 'id column exist');
select col_type_is('public', 'course', 'id', 'bigint', 'id column is of type bigint');
select col_not_null('public', 'course', 'id', 'id column is not null');
select col_is_pk('public', 'course', 'id', 'id columns is pk');

select has_column('public', 'course', 'name', 'name column exist');
select col_type_is('public', 'course', 'name', 'text', 'name column is of type text');
select col_not_null('public', 'course', 'name', 'name column is not null');
select col_is_unique('public', 'course', 'name', 'name column is unique');


select test_audit_columns('public', 'course');


select * from finish();

rollback;
