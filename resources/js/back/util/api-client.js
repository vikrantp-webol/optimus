const client = axios.create({
    baseURL: '/admin/api/',
});

// Make a get request
const fetch = (uri, params = {}) => {
    return client.get(uri, { params });
};

// Make a put request
const put = (uri, params = {}) => {
    return client.put(uri, { params });
};

// Make a post request
const create = (uri, params = {}) => {
    return client.post(uri, params);
};

// Make a patch request
const update = (uri, params = {}) => {
    return client.patch(uri, params);
};

// Make a delete request
const destroy = uri => {
    return client.delete(uri);
};

// Pages
export const getPages = params => fetch('pages', params);
export const getPage = id => fetch(`pages/${id}`);
export const createPage = params => create('pages', params);
export const updatePage = (id, params) => update(`pages/${id}`, params);
export const deletePage = id => destroy(`pages/${id}`);

// Page Templates
export const getPageTemplates = params => fetch('page-templates', params);

// Posts
export const getPosts = params => fetch('posts', params);
export const getPost = id => fetch(`posts/${id}`);
export const createPost = params => create('posts', params);
export const updatePost = (id, params) => update(`posts/${id}`, params);
export const deletePost = id => destroy(`posts/${id}`);

// Post Tags
export const getPostTags = params => fetch('post-tags', params);
export const getPostTag = id => fetch(`post-tags/${id}`);
export const createPostTag = params => create('post-tags', params);
export const updatePostTag = (id, params) => update(`post-tags/${id}`, params);
export const deletePostTag = id => destroy(`post-tags/${id}`);

// Users
export const getUsers = params => fetch('users', params);
export const getUser = id => fetch(`users/${id}`);
export const createUser = params => create('users', params);
export const updateUser = (id, params) => update(`users/${id}`, params);
export const deleteUser = id => destroy(`users/${id}`);
