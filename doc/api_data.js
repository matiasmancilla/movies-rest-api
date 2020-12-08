define({ "api": [
  {
    "type": "delete",
    "url": "/movies/:id",
    "title": "Eliminar Película",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Película id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 {message: 'Película eliminada correctamente' }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Not Found",
          "content": "HTTP/1.1 404 {error: 'La película no existe' }",
          "type": "json"
        },
        {
          "title": "Delete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "Movies",
    "name": "DeleteMoviesId"
  },
  {
    "type": "get",
    "url": "/movies",
    "title": "Listar todas las Películas",
    "group": "Movies",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "peliculas",
            "description": "<p>Lista de películas</p>"
          },
          {
            "group": "Success 200",
            "type": "id",
            "optional": false,
            "field": "peliculas.id",
            "description": "<p>Película id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "peliculas.title",
            "description": "<p>Película nombre</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "peliculas.synopsis",
            "description": "<p>Película sinopsis</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "peliculas.releaseDate",
            "description": "<p>Película fecha lanzamiento</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": " HTTP/1.1 200 OK\n [    {\n  \"id\": 1,\n  \"title\": \"The Matrix\",\n  \"releaseDate\": \"1999-07-14\",\n  \"synopsis\": \"When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.\"\n},]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "Movies",
    "name": "GetMovies"
  },
  {
    "type": "get",
    "url": "/movies/:id",
    "title": "Buscar Película",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Película id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "id",
            "optional": false,
            "field": "peliculas.id",
            "description": "<p>Película id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "peliculas.title",
            "description": "<p>Película nombre</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "peliculas.synopsis",
            "description": "<p>Película sinopsis</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "peliculas.releaseDate",
            "description": "<p>Película fecha lanzamiento</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n {\n  \"id\": 2,\n  \"title\": \"The Godfather\",\n  \"releaseDate\": \"1972-09-20\",\n  \"synopsis\": \"The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.\"\n},",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "La película no existe",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        },
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "Movies",
    "name": "GetMoviesId"
  },
  {
    "type": "post",
    "url": "/movies",
    "title": "Guardar nueva Película",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Película nombre</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "releaseDate",
            "description": "<p>Película fecha lanzamiento</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "synopsis",
            "description": "<p>Película sinopsis</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"title\": \"Joker\",\n  \"releaseDate\": \"2019-10-02\",\n  \"synopsis\": \"In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.\n   This path brings him face-to-face with his alter-ego: the Joker.\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "id",
            "optional": false,
            "field": "peliculas.id",
            "description": "<p>Película id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "peliculas.title",
            "description": "<p>Película nombre</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "peliculas.synopsis",
            "description": "<p>Película sinopsis</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "peliculas.releaseDate",
            "description": "<p>Película fecha lanzamiento</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 OK\n{\n  \"id\": 100\n  \"title\": \"Joker\",\n  \"releaseDate\": \"2019-10-02\",\n  \"synopsis\": \"In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.\n   This path brings him face-to-face with his alter-ego: the Joker.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "Movies",
    "name": "PostMovies"
  },
  {
    "type": "put",
    "url": "/movies/:id",
    "title": "Actualizar una Película",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Película id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Película nombre</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "releaseDate",
            "description": "<p>Película fecha lanzamiento</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "synopsis",
            "description": "<p>Película sinopsis</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"id\": 100\n  \"title\": \"The Joker\",\n  \"releaseDate\": \"2019-10-02\",\n  \"synopsis\": \"new sinopsis\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 {message: 'Película actualizada correctamente' }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "La película no existe",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        },
        {
          "title": "Update error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "Movies",
    "name": "PutMoviesId"
  }
] });
