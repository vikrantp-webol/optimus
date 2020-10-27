define({ "api": [
  {
    "type": "get",
    "url": "/admin/api/admin-users/:id/edit",
    "title": "Get Admin User",
    "name": "GetAdminUser",
    "group": "AdminUsers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User Username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gravatar_url",
            "description": "<p>User Gravatar url</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "created_at",
            "description": "<p>User Created At</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "updated_at",
            "description": "<p>User Updated At</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"name\": \"Admin\",\n  \"email\": \"dev@optixsolutions.co.uk\",\n  \"username\": \"admin\",\n  \"gravatar_url\": \"https://www.gravatar.com/avatar/05b26c4af4ca3b83a9a3cc1efb3ffefb\",\n  \"created_at\": \"2020-10-06 06:51:50\",\n  \"updated_at\": \"2020-10-06 06:51:50\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "AdminUsers"
  },
  {
    "type": "get",
    "url": "/admin/api/admin-users",
    "title": "Get Admin Users Lists",
    "name": "GetAdminUsersList",
    "group": "AdminUsers",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Objects[]",
            "optional": false,
            "field": "data",
            "description": "<p>Array of users Objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response",
          "content": "HTTP/1.1 200 OK\n {\n     \"data\": [\n         {\n             \"id\": 1,\n             \"name\": \"Admin\",\n             \"email\": \"dev@optixsolutions.co.uk\",\n             \"username\": \"admin\",\n             \"gravatar_url\": \"https://www.gravatar.com/avatar/05b26c4af4ca3b83a9a3cc1efb3ffefb\",\n             \"created_at\": \"2020-10-06 06:51:50\",\n             \"updated_at\": \"2020-10-06 06:51:50\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "AdminUsers"
  },
  {
    "type": "post",
    "url": "/admin/api/admin-users",
    "title": "Create Admin User",
    "name": "createAdminUser",
    "group": "AdminUsers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Mandatory Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Mandatory Username, must be unique.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Mandatory Email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Mandatory Password, The password must be at least 8 characters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body",
          "content": "{\n \"name\": \"Admin\",\n \"username\": \"admin\",\n \"email\": \"admin@test.com\",\n \"password\": \"Admin123\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n  \"data\": {\n   \"id\": 6,\n   \"name\": \"Test Admin\",\n   \"email\": \"admin@test.com\",\n   \"username\": \"test_admin\",\n   \"gravatar_url\": \"https://www.gravatar.com/avatar/5b37040e6200edb3c7f409e994076872\",\n   \"created_at\": \"2020-10-21 13:02:46\",\n   \"updated_at\": \"2020-10-21 13:02:46\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "AdminUsers"
  },
  {
    "type": "delete",
    "url": "/admin/api/admin-users/:id",
    "title": "Delete Admin User",
    "name": "deleteAdminUser",
    "group": "AdminUsers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User id</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the USer was not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  message: \"No query results for model [App\\Models\\AdminUser] :id.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "AdminUsers"
  },
  {
    "type": "patch",
    "url": "/admin/api/admin-users/:id",
    "title": "Update Admin User",
    "name": "updateAdminUser",
    "group": "AdminUsers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Successful Request",
          "content": "HTTP/1.1 200 OK\n{\n \"name\": \"Admin\",\n \"username\": \"admin\",\n \"email\": \"admin@test.com\",\n \"password\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "AdminUsers"
  },
  {
    "type": "get",
    "url": "/admin/api/media",
    "title": "Create Media",
    "name": "CreateMedia",
    "group": "Media",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Objects[]",
            "optional": false,
            "field": "data",
            "description": "<p>Array of media Objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response",
          "content": "HTTP/1.1 201 Created\n {\n     \"data\": {\n         \"id\": 1,\n         \"folder_id\": null,\n         \"name\": \"test\",\n         \"file_name\": \"test.csv\",\n         \"caption\": null,\n         \"alt_text\": null,\n         \"extension\": \"csv\",\n         \"url\": \"http://127.0.0.1:8001/admin/api/media?folder=root\",\n         \"thumbnail_url\": \"http://localhost/storage/1/conversions/400x300/test.csv\",\n         \"mime_type\": \"text/plain\",\n         \"size\": 232,\n         \"created_at\": \"2020-10-06 06:51:50\",\n         \"updated_at\": \"2020-10-06 06:51:50\"\n     }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Media"
  },
  {
    "type": "get",
    "url": "/admin/api/media/:id",
    "title": "Get Media",
    "name": "GetMedia",
    "group": "Media",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Media id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Media id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "file_name",
            "description": "<p>File Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "caption",
            "description": "<p>Caption</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "alt_text",
            "description": "<p>Alt Text</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "extension",
            "description": "<p>Extension</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "thumbnail_url",
            "description": "<p>Thumbnail URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mime_type",
            "description": "<p>MIME Type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "size",
            "description": "<p>Size</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "created_at",
            "description": "<p>Menu Created At</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Menu Updated At</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response",
          "content": "HTTP/1.1 200 OK\n {\n     \"data\": {\n         \"id\": 1,\n         \"folder_id\": null,\n         \"name\": \"test\",\n         \"file_name\": \"test.csv\",\n         \"caption\": null,\n         \"alt_text\": null,\n         \"extension\": \"csv\",\n         \"url\": \"http://127.0.0.1:8001/admin/api/media?folder=root\",\n         \"thumbnail_url\": \"http://localhost/storage/1/conversions/400x300/test.csv\",\n         \"mime_type\": \"text/plain\",\n         \"size\": 232,\n         \"created_at\": \"2020-10-06 06:51:50\",\n         \"updated_at\": \"2020-10-06 06:51:50\"\n     }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Media"
  },
  {
    "type": "get",
    "url": "/admin/api/media",
    "title": "Get Media Lists",
    "name": "GetMedias",
    "group": "Media",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Objects[]",
            "optional": false,
            "field": "data",
            "description": "<p>Array of media Objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response",
          "content": "HTTP/1.1 200 OK\n {\n     \"data\": [\n         {\n             \"id\": 1,\n             \"folder_id\": null,\n             \"name\": \"test\",\n             \"file_name\": \"test.csv\",\n             \"caption\": null,\n             \"alt_text\": null,\n             \"extension\": \"csv\",\n             \"url\": \"http://127.0.0.1:8001/admin/api/media?folder=root\",\n             \"thumbnail_url\": \"http://localhost/storage/1/conversions/400x300/test.csv\",\n                        \"mime_type\": \"text/plain\",\n                        \"size\": 232,\n             \"created_at\": \"2020-10-06 06:51:50\",\n             \"updated_at\": \"2020-10-06 06:51:50\"\n         },\n         {\n             \"id\": 2,\n             \"folder_id\": null,\n             \"name\": \"test\",\n             \"file_name\": \"test2.csv\",\n             \"caption\": null,\n             \"alt_text\": null,\n             \"extension\": \"csv\",\n             \"url\": \"http://127.0.0.1:8001/admin/api/media?folder=root\",\n             \"thumbnail_url\": \"http://localhost/storage/1/conversions/400x300/test2.csv\",\n             \"mime_type\": \"text/plain\",\n             \"size\": 148555,\n             \"created_at\": \"2020-10-09 12:09:53\",\n             \"updated_at\": \"2020-10-09 12:09:53\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Media"
  },
  {
    "type": "get",
    "url": "/admin/api/media-folders/:id",
    "title": "Get Media Folder",
    "name": "GetMediaFolder",
    "group": "Media_Folders",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Media Folder id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Folder Name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parent_id",
            "description": "<p>Parent Folder ID</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "created_at",
            "description": "<p>Media Folder Created At</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Media Folder Updated At</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response",
          "content": "HTTP/1.1 200 OK\n{\n \"id\": 1,\n \"name\": \"Test\",\n \"parent_id\": null,\n \"created_at\": \"2020-10-09 12:08:21\",\n \"updated_at\": \"2020-10-09 12:08:21\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Media_Folders"
  },
  {
    "type": "get",
    "url": "/admin/api/media-folders",
    "title": "Get Media Folders",
    "name": "GetMediaFolders",
    "group": "Media_Folders",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Objects[]",
            "optional": false,
            "field": "data",
            "description": "<p>Array of Media Folders Objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"data\": [\n    {\n      \"id\": 1,\n      \"name\": \"Test\",\n      \"parent_id\": null,\n      \"created_at\": \"2020-10-09 12:08:21\",\n      \"updated_at\": \"2020-10-09 12:08:21\"\n    },\n    {\n      \"id\": 2,\n      \"name\": \"Test2\",\n      \"parent_id\": null,\n      \"created_at\": \"2020-10-22 11:25:46\",\n      \"updated_at\": \"2020-10-22 11:25:46\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Media_Folders"
  },
  {
    "type": "post",
    "url": "/admin/api/media-folders",
    "title": "Create Media Folder",
    "name": "createMediaFolder",
    "group": "Media_Folders",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Mandatory Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "parent_id",
            "description": "<p>Parent Folder.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body",
          "content": "{\n \"id\": null\n \"name\": \"Test\",\n \"parent_id\": 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n  \"data\": {\n   \"id\": 6,\n   \"name\": \"Test44\",\n   \"parent_id\": 1,\n   \"created_at\": \"2020-10-21 13:02:46\",\n   \"updated_at\": \"2020-10-21 13:02:46\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Media_Folders"
  },
  {
    "type": "delete",
    "url": "/admin/api/media-folders/:id",
    "title": "Delete Media Folder",
    "name": "deleteMediaFolder",
    "group": "Media_Folders",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Media Folder id</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the USer was not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  message: \"No query results for model [App\\Models\\MediaFolder] :id.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Media_Folders"
  },
  {
    "type": "patch",
    "url": "/admin/api/media-folders/:id",
    "title": "Update Media Folder",
    "name": "updateMediaFolder",
    "group": "Media_Folders",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Media Folder id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Successful Request",
          "content": "HTTP/1.1 200 OK\n{\n \"name\": \"Test\",\n \"parent_id\": 1\n}",
          "type": "json"
        },
        {
          "title": "Success",
          "content": "{\n  \"data\": {\n   \"id\": 6,\n   \"name\": \"Test\",\n   \"parent_id\": 1,\n   \"created_at\": \"2020-10-21 13:02:46\",\n   \"updated_at\": \"2020-10-21 13:02:46\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Media_Folders"
  },
  {
    "type": "delete",
    "url": "/admin/api/media/:id",
    "title": "Delete Media",
    "name": "deleteMedia",
    "group": "Media",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Media id</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MediaNotFound",
            "description": "<p>The id of the Media was not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  message: \"No query results for model [App\\Models\\Media] :id.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Media"
  },
  {
    "type": "patch",
    "url": "/admin/api/media/:id",
    "title": "Update Media",
    "name": "updateMedia",
    "group": "Media",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Media id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Successful Request",
          "content": "HTTP/1.1 200 OK\n{\n \"name\": \"Text\",\n \"alt_text\": null, \n \"caption\": null\n}",
          "type": "json"
        },
        {
          "title": "Success",
          "content": "{\n     \"data\": {\n         \"id\": 1,\n         \"folder_id\": null,\n         \"name\": \"text\",\n         \"file_name\": \"test.csv\",\n         \"caption\": null,\n         \"alt_text\": null,\n         \"extension\": \"csv\",\n         \"url\": \"http://127.0.0.1:8001/admin/api/media?folder=root\",\n         \"thumbnail_url\": \"http://localhost/storage/1/conversions/400x300/test.csv\",\n         \"mime_type\": \"text/plain\",\n         \"size\": 232,\n         \"created_at\": \"2020-10-06 06:51:50\",\n         \"updated_at\": \"2020-10-06 06:51:50\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Media"
  },
  {
    "type": "get",
    "url": "/admin/api/menu-items/:id",
    "title": "Get Menu Item",
    "name": "GetMenuItem",
    "group": "Menu_Items",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Menu Item id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Menu id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Menu Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "identifier",
            "description": "<p>Menu Identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "is_deletable",
            "description": "<p>Menu delete enable default having true</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "created_at",
            "description": "<p>Menu Item Created At</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Menu Item Updated At</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"label\": \"Test\",\n  \"parent_id\": null,\n  \"linkable_type\": \"App\\Models\\Page\",\n  \"linkable_id\": 1,\n  \"linkable_label\": \"Test\",\n  \"url\": \"http://localhost/storage/2/admin_tasks.png\",\n  \"url_parameters\": null,\n  \"opens_in_new_tab\": 0,\n  \"order\": 1,\n  \"created_at\": \"2020-10-06 06:51:50\",\n  \"updated_at\": \"2020-10-06 06:51:50\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Menu_Items"
  },
  {
    "type": "get",
    "url": "/admin/api/menus/:id/items",
    "title": "Get Menu Items",
    "name": "GetMenuItems",
    "group": "Menu_Items",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Menu id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Menu id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>Label</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "parent_id",
            "description": "<p>Parent ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "linkable_type",
            "description": "<p>Linkable Type</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "linkable_id",
            "description": "<p>Linkable ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "linkable_label",
            "description": "<p>Linkable Label</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>URL</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "url_parameters",
            "description": "<p>URL Parameter</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "opens_in_new_tab",
            "description": "<p>Open in New Tab</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "order",
            "description": "<p>Order</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "created_at",
            "description": "<p>Menu Created At</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Menu Updated At</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response",
          "content": "HTTP/1.1 200 OK\n {\n   \"data\": [\n     {\n         \"id\": 1,\n         \"label\": \"Test\",\n         \"parent_id\": null,\n         \"linkable_type\": \"App\\Models\\Page\",\n         \"linkable_id\": 1,\n         \"linkable_label\": null,\n         \"url\": \"http://localhost/storage/2/admin_tasks.png\",\n         \"url_parameters\": null,\n         \"opens_in_new_tab\": 0,\n         \"order\": 1,\n         \"created_at\": \"2020-10-06 06:51:50\",\n         \"updated_at\": \"2020-10-06 06:51:50\"\n     },\n     {\n         \"id\": 1,\n         \"label\": \"Test\",\n         \"parent_id\": null,\n         \"linkable_type\": \"App\\Models\\Page\",\n         \"linkable_id\": 1,\n         \"linkable_label\": null,\n         \"url\": \"http://localhost/storage/2/admin_tasks.png\",\n         \"url_parameters\": null,\n         \"opens_in_new_tab\": 0,\n         \"order\": 1,\n         \"created_at\": \"2020-10-06 06:51:50\",\n         \"updated_at\": \"2020-10-06 06:51:50\"\n     }\n   ]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Menu_Items"
  },
  {
    "type": "post",
    "url": "/admin/api/menus/:id/items",
    "title": "Create Menu Item",
    "name": "createMenuItem",
    "group": "Menu_Items",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>Mandatory Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "parent_id",
            "description": "<p>Parent ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url_parameters",
            "description": "<p>URL Parameters.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "opens_in_new_tab",
            "description": "<p>Open in new Tab.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body",
          "content": "{\n \"label\": \"Test\",\n \"parent_id\": null,\n \"url_parameters\": null,\n \"opens_in_new_tab\": 0\n \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n  \"data\": {\n     \"label\": \"Test\",\n     \"parent_id\": null,\n     \"linkable_type\": \"App\\Models\\Page\",\n     \"linkable_id\": 1,\n     \"linkable_label\": null,\n     \"url\": \"http://localhost/storage/2/admin_tasks.png\",\n     \"url_parameters\": null,\n     \"opens_in_new_tab\": 0,\n     \"order\": 1,\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Menu_Items"
  },
  {
    "type": "delete",
    "url": "/admin/api/menu-items/:id",
    "title": "Delete Menu Item",
    "name": "deleteMenuItem",
    "group": "Menu_Items",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Menu Item id</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MenuItemNotFound",
            "description": "<p>The id of the Menu Item was not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  message: \"No query results for model [App\\Models\\MenuItem] :id.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Menu_Items"
  },
  {
    "type": "put",
    "url": "/admin/api/menu-items/:id/move",
    "title": "Move Menu Item",
    "name": "moveMenuItem",
    "group": "Menu_Items",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Menu Item id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Successful Request",
          "content": "HTTP/1.1 200 OK\n{\n  \"direction\": \"up\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Menu_Items"
  },
  {
    "type": "get",
    "url": "/admin/api/menu-items/:id",
    "title": "Update Menu Item",
    "name": "updateMenuItem",
    "group": "Menu_Items",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Menu Item id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Successful Request",
          "content": "HTTP/1.1 200 OK\n{\n  \"label\": \"Test\",\n  \"parent_id\": null,\n  \"url_parameters\": null,\n  \"opens_in_new_tab\": 0\n}",
          "type": "json"
        },
        {
          "title": "Success",
          "content": "{\n  \"data\": {\n     \"id\": 6,\n     \"label\": \"Test\",\n     \"parent_id\": null,\n     \"linkable_type\": \"App\\Models\\Page\",\n     \"linkable_id\": 1,\n     \"linkable_label\": \"Test\",\n     \"url\": \"http://localhost/storage/2/admin_tasks.png\",\n     \"url_parameters\": null,\n     \"opens_in_new_tab\": 0,\n     \"order\": 1,\n     \"created_at\": \"2020-10-06 06:51:50\",\n     \"updated_at\": \"2020-10-06 06:51:50\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Menu_Items"
  },
  {
    "type": "get",
    "url": "/admin/api/menus/:id",
    "title": "Get Menu",
    "name": "GetMenu",
    "group": "Menus",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Menu id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Menu id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Menu Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "identifier",
            "description": "<p>Menu Identifier</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "is_deletable",
            "description": "<p>Menu delete enable default having true</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "created_at",
            "description": "<p>Menu Created At</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Menu Updated At</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"name\": \"Primary Navigation\",\n  \"identifier\": \"primary\",\n  \"is_deletable\": true,\n  \"created_at\": \"2020-10-06 06:51:50\",\n  \"updated_at\": \"2020-10-06 06:51:50\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Menus"
  },
  {
    "type": "get",
    "url": "/admin/api/menus",
    "title": "Get Menus Lists",
    "name": "GetMenus",
    "group": "Menus",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Objects[]",
            "optional": false,
            "field": "data",
            "description": "<p>Array of menus Objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response",
          "content": "HTTP/1.1 200 OK\n {\n     \"data\": [\n         {\n             \"id\": 1,\n             \"name\": \"Primary Navigation\",\n             \"identifier\": \"primary\",\n             \"is_deletable\": false,\n             \"created_at\": \"2020-10-06 06:51:50\",\n             \"updated_at\": \"2020-10-06 06:51:50\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Menus"
  },
  {
    "type": "post",
    "url": "/admin/api/menus",
    "title": "Create Menu",
    "name": "createMenu",
    "group": "Menus",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Mandatory Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "identifier",
            "description": "<p>Mandatory Identifier.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body",
          "content": "{\n \"name\": \"Primary Navigation\",\n \"identifier\": \"primary\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n  \"data\": {\n   \"id\": 6,\n   \"name\": \"Primary Navigation\",\n   \"identifier\": \"primary\",\n   \"is_deletable\": true,\n   \"created_at\": \"2020-10-21 14:06:49\",\n   \"updated_at\": \"2020-10-21 14:06:49\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Menus"
  },
  {
    "type": "delete",
    "url": "/admin/api/menus/:id",
    "title": "Delete Menu",
    "name": "deleteMenu",
    "group": "Menus",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Menu id</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MenuNotFound",
            "description": "<p>The id of the Menu was not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  message: \"No query results for model [App\\Models\\Menu] :id.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Menus"
  },
  {
    "type": "patch",
    "url": "/admin/api/menus/:id",
    "title": "Update Menu",
    "name": "updateMenu",
    "group": "Menus",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Menu id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Successful Request",
          "content": "HTTP/1.1 200 OK\n{\n \"name\": \"Primary Navigation\",\n \"identifier\": \"primary\"\n}",
          "type": "json"
        },
        {
          "title": "Success",
          "content": "{\n  \"data\": {\n   \"id\": 6,\n   \"name\": \"Primary Navigation\",\n   \"identifier\": \"primary\",\n   \"is_deletable\": true,\n   \"created_at\": \"2020-10-21 14:06:49\",\n   \"updated_at\": \"2020-10-22 13:02:46\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Menus"
  },
  {
    "type": "get",
    "url": "/admin/api/page-templates/:id",
    "title": "Get Page Template",
    "name": "GetPageTemplate",
    "group": "Page_Template",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Template id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Template id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Template Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response",
          "content": "HTTP/1.1 200 OK\n {\n     \"data\": {\n         \"id\": \"default\",\n         \"name\": \"Default\"\n     }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Page_Template"
  },
  {
    "type": "get",
    "url": "/admin/api/page-templates",
    "title": "Get Page Templates",
    "name": "GetPageTemplates",
    "group": "Page_Template",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Objects[]",
            "optional": false,
            "field": "data",
            "description": "<p>Array of Page Template Objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response",
          "content": "HTTP/1.1 200 OK\n {\n     \"data\": [\n         {\n             \"id\": \"default\",\n             \"name\": \"Default\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Page_Template"
  },
  {
    "type": "get",
    "url": "/admin/api/pages/:id",
    "title": "Get Page",
    "name": "GetPage",
    "group": "Pages",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Page id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Successful Response",
          "content": "HTTP/1.1 200 OK\n{\n   \"data\": {\n     \"id\": 1,\n     \"title\": \"Test\",\n     \"slug\": \"test\",\n     \"path\": \"test\",\n     \"has_fixed_path\": false,\n     \"parent_id\": null,\n     \"template_id\": \"default\",\n     \"template_name\": \"Default\",\n     \"template_data\": {\n       \"content\": \"<p>Hello World</p>\",\n       \"image\": {\n         \"id\": 2,\n         \"folder_id\": null,\n         \"name\": \"admin_tasks\",\n         \"file_name\": \"admin_tasks.png\",\n         \"caption\": null,\n         \"alt_text\": null,\n         \"extension\": \"png\",\n         \"url\": \"http://localhost/storage/2/admin_tasks.png\",\n         \"thumbnail_url\": \"http://localhost/storage/2/conversions/400x300/admin_tasks.png\",\n         \"mime_type\": \"image/png\",\n         \"size\": 148555,\n         \"group\": \"image\",\n         \"updated_at\": \"2020-10-09 12:09:53\",\n         \"created_at\": \"2020-10-09 12:09:53\"\n       }\n     },\n     \"has_fixed_template\": false,\n     \"is_standalone\": false,\n     \"is_deletable\": true,\n     \"is_published\": true,\n     \"meta\": {\n       \"title\": null,\n       \"description\": null,\n       \"og_title\": null,\n       \"og_description\": null,\n       \"og_image\": null,\n       \"additional_tags\": null\n     },\n     \"created_at\": \"2020-10-09 12:10:05\",\n     \"updated_at\": \"2020-10-09 12:10:06\"\n   }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Pages"
  },
  {
    "type": "get",
    "url": "/admin/api/pages?parent=root",
    "title": "Get Pages Lists",
    "name": "GetPages",
    "group": "Pages",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Objects[]",
            "optional": false,
            "field": "data",
            "description": "<p>Array of pages Objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful Response",
          "content": "HTTP/1.1 200 OK\n {\n   \"data\": [\n     {\n       \"id\": 1,\n       \"title\": \"Test\",\n       \"slug\": \"test\",\n       \"path\": \"test\",\n       \"has_fixed_path\": false,\n       \"parent_id\": null,\n       \"children_count\": 0,\n       \"template_id\": \"default\",\n       \"template_name\": \"Default\",\n       \"template_data\": {\n         \"content\": \"<p>Hello World</p>\",\n         \"image\": {\n           \"id\": 2,\n           \"folder_id\": null,\n           \"name\": \"admin_tasks\",\n           \"file_name\": \"admin_tasks.png\",\n           \"caption\": null,\n           \"alt_text\": null,\n           \"extension\": \"png\",\n           \"url\": \"http://localhost/storage/2/admin_tasks.png\",\n           \"thumbnail_url\": \"http://localhost/storage/2/conversions/400x300/admin_tasks.png\",\n           \"mime_type\": \"image/png\",\n           \"size\": 148555,\n           \"group\": \"image\",\n           \"updated_at\": \"2020-10-09 12:09:53\",\n           \"created_at\": \"2020-10-09 12:09:53\"\n         }\n       },\n       \"has_fixed_template\": false,\n       \"is_standalone\": false,\n       \"is_deletable\": true,\n       \"is_published\": true,\n       \"meta\": {\n         \"title\": null,\n         \"description\": null,\n         \"og_title\": null,\n         \"og_description\": null,\n         \"og_image\": null,\n         \"additional_tags\": null\n       },\n       \"created_at\": \"2020-10-09 12:10:05\",\n       \"updated_at\": \"2020-10-09 12:10:06\"\n     }\n   ]\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Pages"
  },
  {
    "type": "post",
    "url": "/admin/api/pages",
    "title": "Create Page",
    "name": "createPage",
    "group": "Pages",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Mandatory Title.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "slug",
            "description": "<p>Mandatory Slug.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "template_id",
            "description": "<p>Mandatory Template.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "template_data",
            "description": "<p>[content, image_id]] Template Data.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "parent_id",
            "description": "<p>Parent ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "is_standalone",
            "description": "<p>Standalone.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "is_published",
            "description": "<p>Published.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "meta",
            "description": "<p>[title, description, og_title, og_description, og_image_id, additional_tags]] Meta.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body",
          "content": "{\n   \"title\": \"Test\",\n   \"slug\": \"test\",\n   \"template_id\": \"default\",\n   \"template_data\": {\n     \"content\": \"<p>Hello World</p>\",\n     \"image_id\": 2\n   },\n   \"parent_id\": null,\n   \"is_standalone\": false,\n   \"is_published\": true,\n   \"meta\": {\n     \"title\": null,\n     \"description\": null,\n     \"og_title\": null,\n     \"og_description\": null,\n     \"og_image_id\": null,\n     \"additional_tags\": null\n   }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n   \"data\": {\n     \"id\": 1,\n     \"title\": \"Test\",\n     \"slug\": \"test\",\n     \"path\": \"test\",\n     \"has_fixed_path\": false,\n     \"parent_id\": null,\n     \"template_id\": \"default\",\n     \"template_name\": \"Default\",\n     \"template_data\": {\n       \"content\": \"<p>Hello World</p>\",\n       \"image\": {\n         \"id\": 2,\n         \"folder_id\": null,\n         \"name\": \"admin_tasks\",\n         \"file_name\": \"admin_tasks.png\",\n         \"caption\": null,\n         \"alt_text\": null,\n         \"extension\": \"png\",\n         \"url\": \"http://localhost/storage/2/admin_tasks.png\",\n         \"thumbnail_url\": \"http://localhost/storage/2/conversions/400x300/admin_tasks.png\",\n         \"mime_type\": \"image/png\",\n         \"size\": 148555,\n         \"group\": \"image\",\n         \"updated_at\": \"2020-10-09 12:09:53\",\n         \"created_at\": \"2020-10-09 12:09:53\"\n       }\n     },\n     \"has_fixed_template\": false,\n     \"is_standalone\": false,\n     \"is_deletable\": true,\n     \"is_published\": true,\n     \"meta\": {\n       \"title\": null,\n       \"description\": null,\n       \"og_title\": null,\n       \"og_description\": null,\n       \"og_image\": null,\n       \"additional_tags\": null\n     },\n     \"created_at\": \"2020-10-09 12:10:05\",\n     \"updated_at\": \"2020-10-09 12:10:06\"\n   }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Pages"
  },
  {
    "type": "delete",
    "url": "/admin/api/pages/:id",
    "title": "Delete Page",
    "name": "deletePages",
    "group": "Pages",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Page id</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PageNotFound",
            "description": "<p>The id of the Page was not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  message: \"No query results for model [App\\Models\\Page] :id.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Pages"
  },
  {
    "type": "patch",
    "url": "/admin/api/pages/:id",
    "title": "Update Page",
    "name": "updatePage",
    "group": "Pages",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Page id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Mandatory Title.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "slug",
            "description": "<p>Mandatory Slug.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "template_id",
            "description": "<p>Mandatory Template.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example Body",
          "content": "{\n   \"title\": \"Test\",\n   \"slug\": \"test\",\n   \"template_id\": \"default\",\n   \"template_data\": {\n     \"content\": \"<p>Hello World</p>\",\n     \"image_id\": 2\n   },\n   \"parent_id\": null,\n   \"is_standalone\": false,\n   \"is_published\": true,\n   \"meta\": {\n     \"title\": null,\n     \"description\": null,\n     \"og_title\": null,\n     \"og_description\": null,\n     \"og_image_id\": null,\n     \"additional_tags\": null\n   }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n   \"data\": {\n     \"id\": 1,\n     \"title\": \"Test\",\n     \"slug\": \"test\",\n     \"path\": \"test\",\n     \"has_fixed_path\": false,\n     \"parent_id\": null,\n     \"template_id\": \"default\",\n     \"template_name\": \"Default\",\n     \"template_data\": {\n       \"content\": \"<p>Hello World</p>\",\n       \"image\": {\n         \"id\": 2,\n         \"folder_id\": null,\n         \"name\": \"admin_tasks\",\n         \"file_name\": \"admin_tasks.png\",\n         \"caption\": null,\n         \"alt_text\": null,\n         \"extension\": \"png\",\n         \"url\": \"http://localhost/storage/2/admin_tasks.png\",\n         \"thumbnail_url\": \"http://localhost/storage/2/conversions/400x300/admin_tasks.png\",\n         \"mime_type\": \"image/png\",\n         \"size\": 148555,\n         \"group\": \"image\",\n         \"updated_at\": \"2020-10-09 12:09:53\",\n         \"created_at\": \"2020-10-09 12:09:53\"\n       }\n     },\n     \"has_fixed_template\": false,\n     \"is_standalone\": false,\n     \"is_deletable\": true,\n     \"is_published\": true,\n     \"meta\": {\n       \"title\": null,\n       \"description\": null,\n       \"og_title\": null,\n       \"og_description\": null,\n       \"og_image\": null,\n       \"additional_tags\": null\n     },\n     \"created_at\": \"2020-10-09 12:10:05\",\n     \"updated_at\": \"2020-10-09 12:10:06\"\n   }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthenticated",
            "description": "<p>If user is not in the authorized session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  message: \"Unauthenticated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.php",
    "groupTitle": "Pages"
  }
] });
