import client from '../../../util/api-client';

// Pages
export const getPages = params => client.fetch('pages', params);
export const getPage = id => client.fetch(`pages/${id}`);
export const createPage = params => client.create('pages', params);
export const updatePage = (id, params) => client.update(`pages/${id}`, params);
export const movePage = (id, direction) => client.put(`pages/${id}/move`, { direction });
export const deletePage = id => client.destroy(`pages/${id}`);

// Page Templates
export const getPageTemplates = params => client.fetch('page-templates', params);
