import client from '../../../util/api-client';

// Menus
export const getMenus = params => client.fetch('menus', params);
export const getMenu = id => client.fetch(`menus/${id}`);
export const createMenu = params => client.create('menus', params);
export const updateMenu = (id, params) => client.update(`menus/${id}`, params);
export const publishMenu = id => client.update(`menus/${id}/publish`);
export const deleteMenu = id => client.destroy(`menus/${id}`);

// Menu Types
export const getMenuTypes = params => client.fetch('menu-types', params);

// Menu Items
export const getMenuItems = (menuId, params) => client.fetch(`menus/${menuId}/items`, params);
export const getMenuItem = id => client.fetch(`menu-items/${id}`);
export const createMenuItem = (menuId, params) => client.create(`menus/${menuId}/items`, params);
export const updateMenuItem = (id, params) => client.update(`menu-items/${id}`, params);
export const moveMenuItem = (id, direction) => client.put(`menu-items/${id}/move`, { direction });
export const deleteMenuItem = id => client.destroy(`menu-items/${id}`);

// Linkable Types
export const getLinkableTypes = params => client.fetch('linkable-types', params);
export const getLinkableItems = (type, params) => client.fetch(`linkable-types/${type}/items`, params);
