import client from '../../../util/api-client';

// Users
export const getAdminUsers = params => client.fetch('admin-users', params);
export const getAdminUser = id => client.fetch(`admin-users/${id}`);
export const createAdminUser = params => client.create('admin-users', params);
export const updateAdminUser = (id, params) => client.update(`admin-users/${id}`, params);
export const deleteAdminUser = id => client.destroy(`admin-users/${id}`);
