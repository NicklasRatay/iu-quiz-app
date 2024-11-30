begin;

select plan(35);


select has_table('public', 'profile', 'profile table exists');

select has_column('public', 'profile', 'user_id', 'user_id column exist');
select col_type_is('public', 'profile', 'user_id', 'uuid', 'user_id column is of type uuid');
select col_not_null('public', 'profile', 'user_id', 'user_id column is not null');
select col_is_pk('public', 'profile', 'user_id', 'user_id column is pk');
select col_is_fk('public', 'profile', 'user_id', 'user_id column is fk');
select fk_ok('public', 'profile', 'user_id', 'auth', 'users', 'id', 'user_id column is fk to auth.users.id');

select has_column('public', 'profile', 'email', 'email column exist');
select col_type_is('public', 'profile', 'email', 'text', 'email column is of type text');
select col_not_null('public', 'profile', 'email', 'email column is not null');
select col_is_unique('public', 'profile', 'email', 'email column is unique');

select has_column('public', 'profile', 'first_name', 'first_name column exist');
select col_type_is('public', 'profile', 'first_name', 'text', 'first_name column is of type text');
select col_not_null('public', 'profile', 'first_name', 'first_name column is not null');

select has_column('public', 'profile', 'last_name', 'last_name column exist');
select col_type_is('public', 'profile', 'last_name', 'text', 'last_name column is of type text');
select col_not_null('public', 'profile', 'last_name', 'last_name column is not null');

select has_column('public', 'profile', 'is_active', 'is_active column exist');
select col_type_is('public', 'profile', 'is_active', 'boolean', 'is_active column is of type boolean');
select col_not_null('public', 'profile', 'is_active', 'is_active column is not null');
select col_default_is('public', 'profile', 'is_active', 'true', 'is_active column defaults to true');

select test_audit_columns('public', 'profile');


select * from finish();

rollback;
