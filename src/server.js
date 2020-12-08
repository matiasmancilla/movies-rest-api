const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

// App constants
const port = process.env.PORT || 3000;
const apiPrefix = '/api';

// mock data
let db = require('./movies.json');

// Create the Express app & setup middlewares
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: /http:\/\/(127(\.\d){3}|localhost)/ }));
app.options('*', cors());
app.use('/apidoc', express.static('doc'));

// ***************************************************************************

// Configure routes
const router = express.Router();

// ----------------------------------------------

/**
 * @api {get} /movies Listar todas las Películas
 * @apiGroup Movies
 * @apiSuccess {Object[]} peliculas Lista de películas
 * @apiSuccess {id} peliculas.id Película id
 * @apiSuccess {String} peliculas.title Película nombre
 * @apiSuccess {String} peliculas.synopsis Película sinopsis
 * @apiSuccess {Date} peliculas.releaseDate Película fecha lanzamiento
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [    {
 *     "id": 1,
 *     "title": "The Matrix",
 *     "releaseDate": "1999-07-14",
 *     "synopsis": "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence."
 *   },]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/movies', (req, res) => {
  const movies = db;

  return res.json(movies);
});

// ----------------------------------------------

/**
 * @api {get} /movies/:id Buscar Película
 * @apiGroup Movies
 * @apiParam {id} id Película id
 * @apiSuccess {id} peliculas.id Película id
 * @apiSuccess {String} peliculas.title Película nombre
 * @apiSuccess {String} peliculas.synopsis Película sinopsis
 * @apiSuccess {Date} peliculas.releaseDate Película fecha lanzamiento
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  {
 *   "id": 2,
 *   "title": "The Godfather",
 *   "releaseDate": "1972-09-20",
 *   "synopsis": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
 * },
 * @apiErrorExample {json} La película no existe
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/movies/:id', (req, res) => {
  const movie = db.filter((m) => m.id == req.params.id)[0];

  if (!movie) {
    return res.status(404).json({ error: 'La película no existe' });
  }

  return res.json(movie);
});

// ----------------------------------------------

/**
 * @api {post} /movies Guardar nueva Película
 * @apiGroup Movies
 * @apiParam {String} title Película nombre
 * @apiParam {Date} releaseDate Película fecha lanzamiento
 * @apiParam {String} synopsis Película sinopsis
 * @apiParamExample {json} Input
 *    {
 *      "title": "Joker",
 *      "releaseDate": "2019-10-02",
 *      "synopsis": "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.
 *       This path brings him face-to-face with his alter-ego: the Joker."
 *    }
 * @apiSuccess {id} peliculas.id Película id
 * @apiSuccess {String} peliculas.title Película nombre
 * @apiSuccess {String} peliculas.synopsis Película sinopsis
 * @apiSuccess {Date} peliculas.releaseDate Película fecha lanzamiento
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 OK
 *    {
 *      "id": 100
 *      "title": "Joker",
 *      "releaseDate": "2019-10-02",
 *      "synopsis": "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.
 *       This path brings him face-to-face with his alter-ego: the Joker."
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/movies', (req, res) => {
  // Check parameters
  if (!req.body.title || !req.body.releaseDate) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const { title, releaseDate, synopsis } = req.body;

  // Check if movie exists
  const movieExists = db.filter((m) => m.title == title)[0];
  if (movieExists) {
    return res.status(409).json({ error: `La película ya existe` });
  }

  //obtengo un id para la nueva pelicula
  const newID = Math.max.apply(
    Math,
    db.map(function (o) {
      return o.id;
    })
  );

  const newMovie = {
    id: newID + 1,
    title: title,
    release_date: releaseDate,
    synopsis: synopsis || `-sin datos-`,
  };

  db.push(newMovie);
  const response = {
    statusCode: 201,
    statusText: 'Resource created',
    data: newMovie,
  };
  return res.status(201).json(response);
});

// ----------------------------------------------

/**
 * @api {put} /movies/:id Actualizar una Película
 * @apiGroup Movies
 * @apiParam {id} id Película id
 * @apiParam {String} title Película nombre
 * @apiParam {Date} releaseDate Película fecha lanzamiento
 * @apiParam {String} synopsis Película sinopsis
 * @apiParamExample {json} Input
 *    {
 *      "id": 100
 *      "title": "The Joker",
 *      "releaseDate": "2019-10-02",
 *      "synopsis": "new sinopsis"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 {message: 'Película actualizada correctamente' }
 * @apiErrorExample {json} La película no existe
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/movies/:id', function (req, res) {
  // Check parameters
  if (!req.params.id || !req.body.title || !req.body.releaseDate) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const { title, releaseDate, synopsis } = req.body;

  // Check if movie exists
  let objIndex = db.findIndex((obj) => obj.id == req.params.id);

  if (objIndex == -1) {
    return res.status(404).json({ error: `La película no existe` });
  }

  db[objIndex] = {
    id: Number(req.params.id),
    title: title,
    releaseDate: releaseDate,
    synopsis: synopsis || `-sin datos-`,
  };

  return res
    .status(200)
    .json({ message: 'Película actualizada correctamente' });
});

// ----------------------------------------------

/**
 * @api {delete} /movies/:id Eliminar Película
 * @apiGroup Movies
 * @apiParam {id} id Película id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 {message: 'Película eliminada correctamente' }
 *  * @apiErrorExample {json} Not Found
 *    HTTP/1.1 404 {error: 'La película no existe' }
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/movies/:id', (req, res) => {
  const movie = db.filter((m) => m.id == req.params.id)[0];

  if (!movie) {
    return res.status(404).json({ error: 'La película no existe' });
  }
  //elimino pelicula
  db = db.filter((p) => p.id != req.params.id);

  res.status(200).json({ message: 'Película eliminada correctamente' });
});

// ----------------------------------------------

// ***************************************************************************

// Add 'api` prefix to all routes
app.use(apiPrefix, router);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
