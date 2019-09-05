import client from '../../../util/api-client';

// Users
export const getUsers = params => client.fetch('users', params);
export const getUser = id => client.fetch(`users/${id}`);
export const createUser = params => client.create('users', params);
export const updateUser = (id, params) => client.update(`users/${id}`, params);
export const deleteUser = id => client.destroy(`users/${id}`);
