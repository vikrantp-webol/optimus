import client from '../../../util/api-client';

// Posts
export const getPosts = params => client.fetch('posts', params);
export const getPost = id => client.fetch(`posts/${id}`);
export const createPost = params => client.create('posts', params);
export const updatePost = (id, params) => client.update(`posts/${id}`, params);
export const deletePost = id => client.destroy(`posts/${id}`);

// Post Tags
export const getPostTags = params => client.fetch('post-tags', params);
export const getPostTag = id => client.fetch(`post-tags/${id}`);
export const createPostTag = params => client.create('post-tags', params);
export const updatePostTag = (id, params) => client.update(`post-tags/${id}`, params);
export const deletePostTag = id => client.destroy(`post-tags/${id}`);
