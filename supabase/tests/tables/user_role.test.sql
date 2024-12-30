begin;

select plan(26);


select has_table('public', 'user_role', 'user_role table exists');

select has_column('public', 'user_role', 'user_id', 'user_id column exist');
select col_type_is('public', 'user_role', 'user_id', 'uuid', 'user_id column is of type uuid');
select col_not_null('public', 'user_role', 'user_id', 'user_id column is not null');
select col_is_fk('public', 'user_role', 'user_id', 'user_id column is fk');
select fk_ok('public', 'user_role', 'user_id', 'public', 'profile', 'user_id', 'user_id column is fk to public.profile.user_id');

select has_column('public', 'user_role', 'role_id', 'role_id column exist');
select col_type_is('public', 'user_role', 'role_id', 'bigint', 'role_id column is of type bigint');
select col_not_null('public', 'user_role', 'role_id', 'role_id column is not null');
select col_is_fk('public', 'user_role', 'role_id', 'role_id column is fk');
select fk_ok('public', 'user_role', 'role_id', 'public', 'role', 'id', 'role_id column is fk to public.role.id');

select col_is_pk('public', 'user_role', ARRAY['user_id', 'role_id'], 'user_id and role_id columns are pk');

select test_audit_columns('public', 'user_role');


select * from finish();

rollback;
