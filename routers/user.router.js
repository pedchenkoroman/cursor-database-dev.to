const { Router } = require('express');

const { userService, ParserCSVService } = require('../services');

const router = Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', async (req, res) => {
  const users = await userService.read();
  res.send(users);
});

router.get('/csv', async (req, res) => {
  const users = await userService.read();
  const csv = ParserCSVService.getParseSync({
    fields: ['id', 'firstName', 'lastName'],
  }).parse(users);
  res.send(csv);
  console.log('Time END: ', Date.now());
});

router.get('/pagination', async (req, res) => {
  return userService.readAllByChunk().pipe(res);
});

router.get('/pagination/csv', async (req, res) => {
  return userService
    .readAllByChunk()
    .pipe(
      ParserCSVService.getTransformParser({
        fields: ['id', 'firstName', 'lastName'],
      }),
    )
    .pipe(res);
});

router.get('/cursor', async (req, res) => {
  return userService.getUsersStream().pipe(res);
});

router.get('/cursor/csv', async (req, res) => {
  return userService
    .getUsersStream()
    .pipe(
      ParserCSVService.getTransformParser({
        fields: ['id', 'firstName', 'lastName'],
      }),
    )
    .pipe(res);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const users = await userService.read(id);
  if (!users.length) return res.send("User doesn't exist!!!");
  return res.send(users);
});

router.use(function timeLog(req, res, next) {
  next();
});

module.exports = router;
