<?php

// Auth
Route::get('login', 'Auth\LoginController@showLoginForm');
Route::post('login', 'Auth\LoginController@login')->name('admin.login');
Route::post('logout', 'Auth\LoginController@logout')->name('admin.logout');

// Api
Route::prefix('api')->middleware('auth:admin')->namespace('Api')->group(function () {
    // Admin Users
    Route::prefix('admin-users')->group(function () {
        //GetAdminUsersList
        /**
         * @api {get} /admin/api/admin-users Get Admin Users Lists
         * @apiName GetAdminUsersList
         * @apiGroup AdminUsers
         * @apiSuccess {Objects[]} data Array of users Objects
         *
         * @apiSuccessExample Successful Response
         * HTTP/1.1 200 OK
         *  {
         *      "data": [
         *          {
         *              "id": 1,
         *              "name": "Admin",
         *              "email": "dev@optixsolutions.co.uk",
         *              "username": "admin",
         *              "gravatar_url": "https://www.gravatar.com/avatar/05b26c4af4ca3b83a9a3cc1efb3ffefb",
         *              "created_at": "2020-10-06 06:51:50",
         *              "updated_at": "2020-10-06 06:51:50"
         *          }
         *      ]
         *  }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::get('/', 'AdminUsersController@index');

        //createAdminUser
        /**
         * @api {post} /admin/api/admin-users Create Admin User
         * @apiName createAdminUser
         * @apiGroup AdminUsers
         * @apiParam {String} name Mandatory Name.
         * @apiParam {String} username Mandatory Username, must be unique.
         * @apiParam {String} email Mandatory Email.
         * @apiParam {String} password Mandatory Password, The password must be at least 8 characters.
         *
         * @apiParamExample Example Body
         * {
         *  "name": "Admin",
         *  "username": "admin",
         *  "email": "admin@test.com",
         *  "password": "Admin123"
         * }
         *
         * @apiSuccessExample Success
         * {
         *   "data": {
         *    "id": 6,
         *    "name": "Test Admin",
         *    "email": "admin@test.com",
         *    "username": "test_admin",
         *    "gravatar_url": "https://www.gravatar.com/avatar/5b37040e6200edb3c7f409e994076872",
         *    "created_at": "2020-10-21 13:02:46",
         *    "updated_at": "2020-10-21 13:02:46"
         *  }
         * }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::post('/', 'AdminUsersController@store');

        //GetAdminUser
        /**
         * @api {get} /admin/api/admin-users/:id/edit Get Admin User
         * @apiName GetAdminUser
         * @apiGroup AdminUsers
         * @apiParam {Number} id User id
         *
         * @apiSuccess {Number} id User id
         * @apiSuccess {String} name User Name
         * @apiSuccess {String} email User Email
         * @apiSuccess {String} username User Username
         * @apiSuccess {String} gravatar_url User Gravatar url
         * @apiSuccess {DateTime} created_at User Created At
         * @apiSuccess {DateTime} updated_at User Updated At
         * 
         * @apiSuccessExample Successful Response
         * HTTP/1.1 200 OK
         * {
         *   "id": 1,
         *   "name": "Admin",
         *   "email": "dev@optixsolutions.co.uk",
         *   "username": "admin",
         *   "gravatar_url": "https://www.gravatar.com/avatar/05b26c4af4ca3b83a9a3cc1efb3ffefb",
         *   "created_at": "2020-10-06 06:51:50",
         *   "updated_at": "2020-10-06 06:51:50"
         * }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::get('{id}', 'AdminUsersController@show');

        //updateAdminUser
        /**
         * @api {patch} /admin/api/admin-users/:id Update Admin User
         * @apiName updateAdminUser
         * @apiGroup AdminUsers
         * @apiParam {Number} id User id
         *
         * @apiSuccessExample Successful Request
         * HTTP/1.1 200 OK
         * {
         *  "name": "Admin",
         *  "username": "admin",
         *  "email": "admin@test.com",
         *  "password": null
         * }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::patch('{id}', 'AdminUsersController@update');

        //deleteAdminUser
        /**
         * @api {delete} /admin/api/admin-users/:id Delete Admin User
         * @apiName deleteAdminUser
         * @apiGroup AdminUsers
         * @apiParam {Number} id User id
         *
         * @apiError UserNotFound The id of the USer was not found
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 404 Not Found
         * {
         *   message: "No query results for model [App\Models\AdminUser] :id."
         * }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::delete('{id}', 'AdminUsersController@destroy');
    });

    // Current Admin User
    Route::get('admin-user', 'AdminUsersController@show');

    // Media Folders
    Route::prefix('media-folders')->group(function () {

        //GetMediaFolders
        /**
         * @api {get} /admin/api/media-folders Get Media Folders
         * @apiName GetMediaFolders
         * @apiGroup Media Folders
         * @apiSuccess {Objects[]} data Array of Media Folders Objects
         *
         * @apiSuccessExample Successful Response
         * HTTP/1.1 200 OK
         * {
         *   "data": [
         *     {
         *       "id": 1,
         *       "name": "Test",
         *       "parent_id": null,
         *       "created_at": "2020-10-09 12:08:21",
         *       "updated_at": "2020-10-09 12:08:21"
         *     },
         *     {
         *       "id": 2,
         *       "name": "Test2",
         *       "parent_id": null,
         *       "created_at": "2020-10-22 11:25:46",
         *       "updated_at": "2020-10-22 11:25:46"
         *     }
         *   ]
         * }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::get('/', 'MediaFoldersController@index');

        //createMediaFolder
        /**
         * @api {post} /admin/api/media-folders Create Media Folder
         * @apiName createMediaFolder
         * @apiGroup Media Folders
         * @apiParam {String} name Mandatory Name.
         * @apiParam {Number} parent_id Parent Folder.
         *
         * @apiParamExample Example Body
         * {
         *  "id": null
         *  "name": "Test",
         *  "parent_id": 1
         * }
         *
         * @apiSuccessExample Success
         * {
         *   "data": {
         *    "id": 6,
         *    "name": "Test44",
         *    "parent_id": 1,
         *    "created_at": "2020-10-21 13:02:46",
         *    "updated_at": "2020-10-21 13:02:46"
         *  }
         * }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::post('/', 'MediaFoldersController@store');

        //GetMediaFolder
        /**
         * @api {get} /admin/api/media-folders/:id Get Media Folder
         * @apiName GetMediaFolder
         * @apiGroup Media Folders
         * @apiParam {Number} id Media Folder id
         *
         * @apiSuccess {Number} id User id
         * @apiSuccess {String} name Folder Name
         * @apiSuccess {Number} parent_id Parent Folder ID
         * @apiSuccess {DateTime} created_at Media Folder Created At
         * @apiSuccess {DateTime} updated_at Media Folder Updated At
         * 
         * @apiSuccessExample Successful Response
         * HTTP/1.1 200 OK
         * {
         *  "id": 1,
         *  "name": "Test",
         *  "parent_id": null,
         *  "created_at": "2020-10-09 12:08:21",
         *  "updated_at": "2020-10-09 12:08:21"
         * }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::get('{id}', 'MediaFoldersController@show');

        //updateMediaFolder
        /**
         * @api {patch} /admin/api/media-folders/:id Update Media Folder
         * @apiName updateMediaFolder
         * @apiGroup Media Folders
         * @apiParam {Number} id Media Folder id
         *
         * @apiSuccessExample Successful Request
         * HTTP/1.1 200 OK
         * {
         *  "name": "Test",
         *  "parent_id": 1
         * }
         *
         * @apiSuccessExample Success
         * {
         *   "data": {
         *    "id": 6,
         *    "name": "Test",
         *    "parent_id": 1,
         *    "created_at": "2020-10-21 13:02:46",
         *    "updated_at": "2020-10-21 13:02:46"
         *  }
         * }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::patch('{id}', 'MediaFoldersController@update');

        //deleteMediaFolder
        /**
         * @api {delete} /admin/api/media-folders/:id Delete Media Folder
         * @apiName deleteMediaFolder
         * @apiGroup Media Folders
         * @apiParam {Number} id Media Folder id
         *
         * @apiError UserNotFound The id of the USer was not found
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 404 Not Found
         * {
         *   message: "No query results for model [App\Models\MediaFolder] :id."
         * }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::delete('{id}', 'MediaFoldersController@destroy');
    });

    // Media
    Route::prefix('media')->group(function () {

        //GetMediaList
        /**
         * @api {get} /admin/api/media Get Media Lists
         * @apiName GetMedias
         * @apiGroup Media
         * @apiSuccess {Objects[]} data Array of media Objects
         *
         * @apiSuccessExample Successful Response
         * HTTP/1.1 200 OK
         *  {
         *      "data": [
         *          {
         *              "id": 1,
         *              "folder_id": null,
         *              "name": "test",
         *              "file_name": "test.csv",
         *              "caption": null,
         *              "alt_text": null,
         *              "extension": "csv",
         *              "url": "http://127.0.0.1:8001/admin/api/media?folder=root",
         *              "thumbnail_url": "http://localhost/storage/1/conversions/400x300/test.csv",
                        "mime_type": "text/plain",
                        "size": 232,
         *              "created_at": "2020-10-06 06:51:50",
         *              "updated_at": "2020-10-06 06:51:50"
         *          },
         *          {
         *              "id": 2,
         *              "folder_id": null,
         *              "name": "test",
         *              "file_name": "test2.csv",
         *              "caption": null,
         *              "alt_text": null,
         *              "extension": "csv",
         *              "url": "http://127.0.0.1:8001/admin/api/media?folder=root",
         *              "thumbnail_url": "http://localhost/storage/1/conversions/400x300/test2.csv",
         *              "mime_type": "text/plain",
         *              "size": 148555,
         *              "created_at": "2020-10-09 12:09:53",
         *              "updated_at": "2020-10-09 12:09:53"
         *          }
         *      ]
         *  }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::get('/', 'MediaController@index');

        //CreateMedia
        /**
         * @api {get} /admin/api/media Create Media
         * @apiName CreateMedia
         * @apiGroup Media
         * @apiSuccess {Objects[]} data Array of media Objects
         *
         * @apiSuccessExample Successful Response
         * HTTP/1.1 201 Created
         *  {
         *      "data": {
         *          "id": 1,
         *          "folder_id": null,
         *          "name": "test",
         *          "file_name": "test.csv",
         *          "caption": null,
         *          "alt_text": null,
         *          "extension": "csv",
         *          "url": "http://127.0.0.1:8001/admin/api/media?folder=root",
         *          "thumbnail_url": "http://localhost/storage/1/conversions/400x300/test.csv",
         *          "mime_type": "text/plain",
         *          "size": 232,
         *          "created_at": "2020-10-06 06:51:50",
         *          "updated_at": "2020-10-06 06:51:50"
         *      }
         *  }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::post('/', 'MediaController@store');

        //GetMedia
        /**
         * @api {get} /admin/api/media/:id Get Media
         * @apiName GetMedia
         * @apiGroup Media
         * @apiParam {Number} id Media id
         *
         * @apiSuccess {Number} id Media id
         * @apiSuccess {Number} id Folder id
         * @apiSuccess {String} file_name File Name
         * @apiSuccess {String} caption Caption
         * @apiSuccess {String} alt_text Alt Text
         * @apiSuccess {String} extension Extension
         * @apiSuccess {String} url URL
         * @apiSuccess {String} thumbnail_url Thumbnail URL
         * @apiSuccess {String} mime_type MIME Type
         * @apiSuccess {String} size Size
         * @apiSuccess {DateTime} created_at Menu Created At
         * @apiSuccess {DateTime} updated_at Menu Updated At
         * 
         * @apiSuccessExample Successful Response
         * HTTP/1.1 200 OK
         *  {
         *      "data": {
         *          "id": 1,
         *          "folder_id": null,
         *          "name": "test",
         *          "file_name": "test.csv",
         *          "caption": null,
         *          "alt_text": null,
         *          "extension": "csv",
         *          "url": "http://127.0.0.1:8001/admin/api/media?folder=root",
         *          "thumbnail_url": "http://localhost/storage/1/conversions/400x300/test.csv",
         *          "mime_type": "text/plain",
         *          "size": 232,
         *          "created_at": "2020-10-06 06:51:50",
         *          "updated_at": "2020-10-06 06:51:50"
         *      }
         *  }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::get('{id}', 'MediaController@show');

        //updateMedia
        /**
         * @api {patch} /admin/api/media/:id Update Media
         * @apiName updateMedia
         * @apiGroup Media
         * @apiParam {Number} id Media id
         *
         * @apiSuccessExample Successful Request
         * HTTP/1.1 200 OK
         * {
         *  "name": "Text",
         *  "alt_text": null, 
         *  "caption": null
         * }
         *
         * @apiSuccessExample Success
         * {
         *      "data": {
         *          "id": 1,
         *          "folder_id": null,
         *          "name": "text",
         *          "file_name": "test.csv",
         *          "caption": null,
         *          "alt_text": null,
         *          "extension": "csv",
         *          "url": "http://127.0.0.1:8001/admin/api/media?folder=root",
         *          "thumbnail_url": "http://localhost/storage/1/conversions/400x300/test.csv",
         *          "mime_type": "text/plain",
         *          "size": 232,
         *          "created_at": "2020-10-06 06:51:50",
         *          "updated_at": "2020-10-06 06:51:50"
         *      }
         * }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::patch('{id}', 'MediaController@update');

        //deleteMedia
        /**
         * @api {delete} /admin/api/media/:id Delete Media
         * @apiName deleteMedia
         * @apiGroup Media
         * @apiParam {Number} id Media id
         *
         * @apiError MediaNotFound The id of the Media was not found
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 404 Not Found
         * {
         *   message: "No query results for model [App\Models\Media] :id."
         * }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::delete('{id}', 'MediaController@destroy');
    });

    // Page Templates
    Route::prefix('page-templates')->group(function () {

        //GetPageTemplates
        /**
         * @api {get} /admin/api/page-templates Get Page Templates
         * @apiName GetPageTemplates
         * @apiGroup Page Template
         * @apiSuccess {Objects[]} data Array of Page Template Objects
         *
         * @apiSuccessExample Successful Response
         * HTTP/1.1 200 OK
         *  {
         *      "data": [
         *          {
         *              "id": "default",
         *              "name": "Default"
         *          }
         *      ]
         *  }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::get('/', 'PageTemplatesController@index');

        //GetPageTemplate
        /**
         * @api {get} /admin/api/page-templates/:id Get Page Template
         * @apiName GetPageTemplate
         * @apiGroup Page Template
         * @apiParam {Number} id Template id
         *
         * @apiSuccess {String} id Template id
         * @apiSuccess {String} name Template Name
         *
         * @apiSuccessExample Successful Response
         * HTTP/1.1 200 OK
         *  {
         *      "data": {
         *          "id": "default",
         *          "name": "Default"
         *      }
         *  }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::get('{id}', 'PageTemplatesController@show');
    });

    // Pages
    Route::prefix('pages')->group(function () {

        //GetPages
        /**
         * @api {get} /admin/api/pages?parent=root Get Pages Lists
         * @apiName GetPages
         * @apiGroup Pages
         * @apiSuccess {Objects[]} data Array of pages Objects
         *
         * @apiSuccessExample Successful Response
         * HTTP/1.1 200 OK
         *  {
         *    "data": [
         *      {
         *        "id": 1,
         *        "title": "Test",
         *        "slug": "test",
         *        "path": "test",
         *        "has_fixed_path": false,
         *        "parent_id": null,
         *        "children_count": 0,
         *        "template_id": "default",
         *        "template_name": "Default",
         *        "template_data": {
         *          "content": "<p>Hello World</p>",
         *          "image": {
         *            "id": 2,
         *            "folder_id": null,
         *            "name": "admin_tasks",
         *            "file_name": "admin_tasks.png",
         *            "caption": null,
         *            "alt_text": null,
         *            "extension": "png",
         *            "url": "http://localhost/storage/2/admin_tasks.png",
         *            "thumbnail_url": "http://localhost/storage/2/conversions/400x300/admin_tasks.png",
         *            "mime_type": "image/png",
         *            "size": 148555,
         *            "group": "image",
         *            "updated_at": "2020-10-09 12:09:53",
         *            "created_at": "2020-10-09 12:09:53"
         *          }
         *        },
         *        "has_fixed_template": false,
         *        "is_standalone": false,
         *        "is_deletable": true,
         *        "is_published": true,
         *        "meta": {
         *          "title": null,
         *          "description": null,
         *          "og_title": null,
         *          "og_description": null,
         *          "og_image": null,
         *          "additional_tags": null
         *        },
         *        "created_at": "2020-10-09 12:10:05",
         *        "updated_at": "2020-10-09 12:10:06"
         *      }
         *    ]
         *  }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::get('/', 'PagesController@index');

        //createPage
        /**
         * @api {post} /admin/api/pages Create Page
         * @apiName createPage
         * @apiGroup Pages
         * @apiParam {String} title Mandatory Title.
         * @apiParam {String} slug Mandatory Slug.
         * @apiParam {String} template_id Mandatory Template.
         * @apiParam {Object} [template_data[content, image_id]] Template Data.
         * @apiParam {Number} parent_id Parent ID.
         * @apiParam {Boolean} is_standalone Standalone.
         * @apiParam {Boolean} is_published Published.
         * @apiParam {Object} [meta[title, description, og_title, og_description, og_image_id, additional_tags]] Meta.
         *
         * @apiParamExample Example Body
         * {
         *    "title": "Test",
         *    "slug": "test",
         *    "template_id": "default",
         *    "template_data": {
         *      "content": "<p>Hello World</p>",
         *      "image_id": 2
         *    },
         *    "parent_id": null,
         *    "is_standalone": false,
         *    "is_published": true,
         *    "meta": {
         *      "title": null,
         *      "description": null,
         *      "og_title": null,
         *      "og_description": null,
         *      "og_image_id": null,
         *      "additional_tags": null
         *    }
         * }
         *
         * @apiSuccessExample Success
         * {
         *    "data": {
         *      "id": 1,
         *      "title": "Test",
         *      "slug": "test",
         *      "path": "test",
         *      "has_fixed_path": false,
         *      "parent_id": null,
         *      "template_id": "default",
         *      "template_name": "Default",
         *      "template_data": {
         *        "content": "<p>Hello World</p>",
         *        "image": {
         *          "id": 2,
         *          "folder_id": null,
         *          "name": "admin_tasks",
         *          "file_name": "admin_tasks.png",
         *          "caption": null,
         *          "alt_text": null,
         *          "extension": "png",
         *          "url": "http://localhost/storage/2/admin_tasks.png",
         *          "thumbnail_url": "http://localhost/storage/2/conversions/400x300/admin_tasks.png",
         *          "mime_type": "image/png",
         *          "size": 148555,
         *          "group": "image",
         *          "updated_at": "2020-10-09 12:09:53",
         *          "created_at": "2020-10-09 12:09:53"
         *        }
         *      },
         *      "has_fixed_template": false,
         *      "is_standalone": false,
         *      "is_deletable": true,
         *      "is_published": true,
         *      "meta": {
         *        "title": null,
         *        "description": null,
         *        "og_title": null,
         *        "og_description": null,
         *        "og_image": null,
         *        "additional_tags": null
         *      },
         *      "created_at": "2020-10-09 12:10:05",
         *      "updated_at": "2020-10-09 12:10:06"
         *    }
         *  }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::post('/', 'PagesController@store');

        //GetPage
        /**
         * @api {get} /admin/api/pages/:id Get Page
         * @apiName GetPage
         * @apiGroup Pages
         * @apiParam {Number} id Page id
         *
         * 
         * @apiSuccessExample Successful Response
         * HTTP/1.1 200 OK
         * {
         *    "data": {
         *      "id": 1,
         *      "title": "Test",
         *      "slug": "test",
         *      "path": "test",
         *      "has_fixed_path": false,
         *      "parent_id": null,
         *      "template_id": "default",
         *      "template_name": "Default",
         *      "template_data": {
         *        "content": "<p>Hello World</p>",
         *        "image": {
         *          "id": 2,
         *          "folder_id": null,
         *          "name": "admin_tasks",
         *          "file_name": "admin_tasks.png",
         *          "caption": null,
         *          "alt_text": null,
         *          "extension": "png",
         *          "url": "http://localhost/storage/2/admin_tasks.png",
         *          "thumbnail_url": "http://localhost/storage/2/conversions/400x300/admin_tasks.png",
         *          "mime_type": "image/png",
         *          "size": 148555,
         *          "group": "image",
         *          "updated_at": "2020-10-09 12:09:53",
         *          "created_at": "2020-10-09 12:09:53"
         *        }
         *      },
         *      "has_fixed_template": false,
         *      "is_standalone": false,
         *      "is_deletable": true,
         *      "is_published": true,
         *      "meta": {
         *        "title": null,
         *        "description": null,
         *        "og_title": null,
         *        "og_description": null,
         *        "og_image": null,
         *        "additional_tags": null
         *      },
         *      "created_at": "2020-10-09 12:10:05",
         *      "updated_at": "2020-10-09 12:10:06"
         *    }
         *  }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::get('{id}', 'PagesController@show');

        //updatePage
        /**
         * @api {patch} /admin/api/pages/:id Update Page
         * @apiName updatePage
         * @apiGroup Pages
         * @apiParam {Number} id Page id
         * @apiParam {String} title Mandatory Title.
         * @apiParam {String} slug Mandatory Slug.
         * @apiParam {Number} template_id Mandatory Template.
         *
         * @apiParamExample Example Body
         * {
         *    "title": "Test",
         *    "slug": "test",
         *    "template_id": "default",
         *    "template_data": {
         *      "content": "<p>Hello World</p>",
         *      "image_id": 2
         *    },
         *    "parent_id": null,
         *    "is_standalone": false,
         *    "is_published": true,
         *    "meta": {
         *      "title": null,
         *      "description": null,
         *      "og_title": null,
         *      "og_description": null,
         *      "og_image_id": null,
         *      "additional_tags": null
         *    }
         * }
         *
         * @apiSuccessExample Success
         * {
         *    "data": {
         *      "id": 1,
         *      "title": "Test",
         *      "slug": "test",
         *      "path": "test",
         *      "has_fixed_path": false,
         *      "parent_id": null,
         *      "template_id": "default",
         *      "template_name": "Default",
         *      "template_data": {
         *        "content": "<p>Hello World</p>",
         *        "image": {
         *          "id": 2,
         *          "folder_id": null,
         *          "name": "admin_tasks",
         *          "file_name": "admin_tasks.png",
         *          "caption": null,
         *          "alt_text": null,
         *          "extension": "png",
         *          "url": "http://localhost/storage/2/admin_tasks.png",
         *          "thumbnail_url": "http://localhost/storage/2/conversions/400x300/admin_tasks.png",
         *          "mime_type": "image/png",
         *          "size": 148555,
         *          "group": "image",
         *          "updated_at": "2020-10-09 12:09:53",
         *          "created_at": "2020-10-09 12:09:53"
         *        }
         *      },
         *      "has_fixed_template": false,
         *      "is_standalone": false,
         *      "is_deletable": true,
         *      "is_published": true,
         *      "meta": {
         *        "title": null,
         *        "description": null,
         *        "og_title": null,
         *        "og_description": null,
         *        "og_image": null,
         *        "additional_tags": null
         *      },
         *      "created_at": "2020-10-09 12:10:05",
         *      "updated_at": "2020-10-09 12:10:06"
         *    }
         *  }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::patch('{id}', 'PagesController@update');

        //deletePage
        /**
         * @api {delete} /admin/api/pages/:id Delete Page
         * @apiName deletePages
         * @apiGroup Pages
         * @apiParam {Number} id Page id
         *
         * @apiError PageNotFound The id of the Page was not found
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 404 Not Found
         * {
         *   message: "No query results for model [App\Models\Page] :id."
         * }
         *
         * @apiError Unauthenticated If user is not in the authorized session
         * 
         * @apiErrorExample Error-Response:
         * HTTP/1.1 401 Unauthorized
         * {
         *   message: "Unauthenticated"
         * }
         */
        Route::delete('{id}', 'PagesController@destroy');
    });

    // Linkables
    Route::get('linkable-types', 'LinkableTypesController@index');
    Route::get('linkable-types/{alias}', 'LinkableTypesController@show');
    Route::get('linkable-types/{alias}/items', 'LinkableItemsController@index');

    // Menus

    //GetMenus
    /**
     * @api {get} /admin/api/menus Get Menus Lists
     * @apiName GetMenus
     * @apiGroup Menus
     * @apiSuccess {Objects[]} data Array of menus Objects
     *
     * @apiSuccessExample Successful Response
     * HTTP/1.1 200 OK
     *  {
     *      "data": [
     *          {
     *              "id": 1,
     *              "name": "Primary Navigation",
     *              "identifier": "primary",
     *              "is_deletable": false,
     *              "created_at": "2020-10-06 06:51:50",
     *              "updated_at": "2020-10-06 06:51:50"
     *          }
     *      ]
     *  }
     *
     * @apiError Unauthenticated If user is not in the authorized session
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 401 Unauthorized
     * {
     *   message: "Unauthenticated"
     * }
     */
    Route::get('menus', 'MenusController@index');

    //createMenu
    /**
     * @api {post} /admin/api/menus Create Menu
     * @apiName createMenu
     * @apiGroup Menus
     * @apiParam {String} name Mandatory Name.
     * @apiParam {String} identifier Mandatory Identifier.
     *
     * @apiParamExample Example Body
     * {
     *  "name": "Primary Navigation",
     *  "identifier": "primary"
     * }
     *
     * @apiSuccessExample Success
     * {
     *   "data": {
     *    "id": 6,
     *    "name": "Primary Navigation",
     *    "identifier": "primary",
     *    "is_deletable": true,
     *    "created_at": "2020-10-21 14:06:49",
     *    "updated_at": "2020-10-21 14:06:49"
     *  }
     * }
     *
     * @apiError Unauthenticated If user is not in the authorized session
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 401 Unauthorized
     * {
     *   message: "Unauthenticated"
     * }
     */
    Route::post('menus', 'MenusController@store');

    //GetMenu
    /**
     * @api {get} /admin/api/menus/:id Get Menu
     * @apiName GetMenu
     * @apiGroup Menus
     * @apiParam {Number} id Menu id
     *
     * @apiSuccess {Number} id Menu id
     * @apiSuccess {String} name Menu Name
     * @apiSuccess {String} identifier Menu Identifier
     * @apiSuccess {Boolean} is_deletable Menu delete enable default having true
     * @apiSuccess {DateTime} created_at Menu Created At
     * @apiSuccess {DateTime} updated_at Menu Updated At
     * 
     * @apiSuccessExample Successful Response
     * HTTP/1.1 200 OK
     * {
     *   "id": 1,
     *   "name": "Primary Navigation",
     *   "identifier": "primary",
     *   "is_deletable": true,
     *   "created_at": "2020-10-06 06:51:50",
     *   "updated_at": "2020-10-06 06:51:50"
     * }
     *
     * @apiError Unauthenticated If user is not in the authorized session
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 401 Unauthorized
     * {
     *   message: "Unauthenticated"
     * }
     */
    Route::get('menus/{id}', 'MenusController@show');

    //updateMenu
    /**
     * @api {patch} /admin/api/menus/:id Update Menu
     * @apiName updateMenu
     * @apiGroup Menus
     * @apiParam {Number} id Menu id
     *
     * @apiSuccessExample Successful Request
     * HTTP/1.1 200 OK
     * {
     *  "name": "Primary Navigation",
     *  "identifier": "primary"
     * }
     *
     * @apiSuccessExample Success
     * {
     *   "data": {
     *    "id": 6,
     *    "name": "Primary Navigation",
     *    "identifier": "primary",
     *    "is_deletable": true,
     *    "created_at": "2020-10-21 14:06:49",
     *    "updated_at": "2020-10-22 13:02:46"
     *  }
     * }
     *
     * @apiError Unauthenticated If user is not in the authorized session
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 401 Unauthorized
     * {
     *   message: "Unauthenticated"
     * }
     */
    Route::patch('menus/{id}', 'MenusController@update');

    //deleteMenu
    /**
     * @api {delete} /admin/api/menus/:id Delete Menu
     * @apiName deleteMenu
     * @apiGroup Menus
     * @apiParam {Number} id Menu id
     *
     * @apiError MenuNotFound The id of the Menu was not found
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     * {
     *   message: "No query results for model [App\Models\Menu] :id."
     * }
     *
     * @apiError Unauthenticated If user is not in the authorized session
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 401 Unauthorized
     * {
     *   message: "Unauthenticated"
     * }
     */
    Route::delete('menus/{id}', 'MenusController@destroy');

    // Menu Items
    //GetMenuItems
    /**
     * @api {get} /admin/api/menus/:id/items Get Menu Items
     * @apiName GetMenuItems
     * @apiGroup Menu Items
     * @apiParam {Number} id Menu id
     *
     * @apiSuccess {Number} id Menu id
     * @apiSuccess {String} label Label
     * @apiSuccess {Number} parent_id Parent ID
     * @apiSuccess {String} linkable_type Linkable Type
     * @apiSuccess {Number} linkable_id Linkable ID
     * @apiSuccess {String} linkable_label Linkable Label
     * @apiSuccess {String} url URL
     * @apiSuccess {String} url_parameters URL Parameter
     * @apiSuccess {Boolean} opens_in_new_tab Open in New Tab
     * @apiSuccess {Number} order Order
     * @apiSuccess {DateTime} created_at Menu Created At
     * @apiSuccess {DateTime} updated_at Menu Updated At
     * 
     * @apiSuccessExample Successful Response
     * HTTP/1.1 200 OK
     *  {
     *    "data": [
     *      {
     *          "id": 1,
     *          "label": "Test",
     *          "parent_id": null,
     *          "linkable_type": "App\Models\Page",
     *          "linkable_id": 1,
     *          "linkable_label": null,
     *          "url": "http://localhost/storage/2/admin_tasks.png",
     *          "url_parameters": null,
     *          "opens_in_new_tab": 0,
     *          "order": 1,
     *          "created_at": "2020-10-06 06:51:50",
     *          "updated_at": "2020-10-06 06:51:50"
     *      },
     *      {
     *          "id": 1,
     *          "label": "Test",
     *          "parent_id": null,
     *          "linkable_type": "App\Models\Page",
     *          "linkable_id": 1,
     *          "linkable_label": null,
     *          "url": "http://localhost/storage/2/admin_tasks.png",
     *          "url_parameters": null,
     *          "opens_in_new_tab": 0,
     *          "order": 1,
     *          "created_at": "2020-10-06 06:51:50",
     *          "updated_at": "2020-10-06 06:51:50"
     *      }
     *    ]
     *  }
     *
     * @apiError Unauthenticated If user is not in the authorized session
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 401 Unauthorized
     * {
     *   message: "Unauthenticated"
     * }
     */
    Route::get('menus/{menuId}/items', 'MenuItemsController@index');

    //createMenuItem
    /**
     * @api {post} /admin/api/menus/:id/items Create Menu Item
     * @apiName createMenuItem
     * @apiGroup Menu Items
     * @apiParam {String} label Mandatory Name.
     * @apiParam {Number} parent_id Parent ID.
     * @apiParam {String} url_parameters URL Parameters.
     * @apiParam {Boolean} opens_in_new_tab Open in new Tab.
     *
     * @apiParamExample Example Body
     * {
     *  "label": "Test",
     *  "parent_id": null,
     *  "url_parameters": null,
     *  "opens_in_new_tab": 0
     *  
     * }
     *
     * @apiSuccessExample Success
     * {
     *   "data": {
     *      "label": "Test",
     *      "parent_id": null,
     *      "linkable_type": "App\Models\Page",
     *      "linkable_id": 1,
     *      "linkable_label": null,
     *      "url": "http://localhost/storage/2/admin_tasks.png",
     *      "url_parameters": null,
     *      "opens_in_new_tab": 0,
     *      "order": 1,
     *  }
     * }
     *
     * @apiError Unauthenticated If user is not in the authorized session
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 401 Unauthorized
     * {
     *   message: "Unauthenticated"
     * }
     */
    Route::post('menus/{menuId}/items', 'MenuItemsController@store');

    /**
     * @api {get} /admin/api/menu-items/:id Get Menu Item
     * @apiName GetMenuItem
     * @apiGroup Menu Items
     * @apiParam {Number} id Menu Item id
     *
     * @apiSuccess {Number} id Menu id
     * @apiSuccess {String} name Menu Name
     * @apiSuccess {String} identifier Menu Identifier
     * @apiSuccess {Boolean} is_deletable Menu delete enable default having true
     * @apiSuccess {DateTime} created_at Menu Item Created At
     * @apiSuccess {DateTime} updated_at Menu Item Updated At
     * 
     * @apiSuccessExample Successful Response
     * HTTP/1.1 200 OK
     * {
     *   "id": 1,
     *   "label": "Test",
     *   "parent_id": null,
     *   "linkable_type": "App\Models\Page",
     *   "linkable_id": 1,
     *   "linkable_label": "Test",
     *   "url": "http://localhost/storage/2/admin_tasks.png",
     *   "url_parameters": null,
     *   "opens_in_new_tab": 0,
     *   "order": 1,
     *   "created_at": "2020-10-06 06:51:50",
     *   "updated_at": "2020-10-06 06:51:50"
     * }
     *
     * @apiError Unauthenticated If user is not in the authorized session
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 401 Unauthorized
     * {
     *   message: "Unauthenticated"
     * }
     */
    Route::get('menu-items/{id}', 'MenuItemsController@show');

    //updateMenuItem
    /**
     * @api {get} /admin/api/menu-items/:id Update Menu Item
     * @apiName updateMenuItem
     * @apiGroup Menu Items
     * @apiParam {Number} id Menu Item id
     *
     * @apiSuccessExample Successful Request
     * HTTP/1.1 200 OK
     * {
     *   "label": "Test",
     *   "parent_id": null,
     *   "url_parameters": null,
     *   "opens_in_new_tab": 0
     * }
     *
     * @apiSuccessExample Success
     * {
     *   "data": {
     *      "id": 6,
     *      "label": "Test",
     *      "parent_id": null,
     *      "linkable_type": "App\Models\Page",
     *      "linkable_id": 1,
     *      "linkable_label": "Test",
     *      "url": "http://localhost/storage/2/admin_tasks.png",
     *      "url_parameters": null,
     *      "opens_in_new_tab": 0,
     *      "order": 1,
     *      "created_at": "2020-10-06 06:51:50",
     *      "updated_at": "2020-10-06 06:51:50"
     *  }
     * }
     *
     * @apiError Unauthenticated If user is not in the authorized session
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 401 Unauthorized
     * {
     *   message: "Unauthenticated"
     * }
     */
    Route::patch('menu-items/{id}', 'MenuItemsController@update');

    //moveMenuItem
    /**
     * @api {put} /admin/api/menu-items/:id/move Move Menu Item
     * @apiName moveMenuItem
     * @apiGroup Menu Items
     * @apiParam {Number} id Menu Item id
     *
     * @apiSuccessExample Successful Request
     * HTTP/1.1 200 OK
     * {
     *   "direction": "up"
     * }
     *
     * @apiError Unauthenticated If user is not in the authorized session
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 401 Unauthorized
     * {
     *   message: "Unauthenticated"
     * }
     */
    Route::put('menu-items/{id}/move', 'MenuItemsController@move');

    //deleteMenuItem
    /**
     * @api {delete} /admin/api/menu-items/:id Delete Menu Item
     * @apiName deleteMenuItem
     * @apiGroup Menu Items
     * @apiParam {Number} id Menu Item id
     *
     * @apiError MenuItemNotFound The id of the Menu Item was not found
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 404 Not Found
     * {
     *   message: "No query results for model [App\Models\MenuItem] :id."
     * }
     *
     * @apiError Unauthenticated If user is not in the authorized session
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 401 Unauthorized
     * {
     *   message: "Unauthenticated"
     * }
     */
    Route::delete('menu-items/{id}', 'MenuItemsController@destroy');

    /*--OPTIMUS-CLI:routes--*/
});

Route::view('{path?}', 'back.layouts.app')
     ->middleware('auth:admin')
     ->where('path', '.*')
     ->name('admin.dashboard');
