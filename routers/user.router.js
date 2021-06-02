const { Router } = require('express');
const router = Router();
const { userService } = require('../services');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', async (req, res) => {
  const users = await userService.read();
  res.send(users);
});

router.get('/findAll', async (req, res) => {
  const csv = await userService.exportToCVSFindAll();
  res.send(csv);
  console.log('Time END: ', Date.now());
});

router.get('/pagination', async (req, res) => {
  const csv = await userService.exportToCVSPagination();
  res.send(csv);
});

router.get('/cursor', async (req, res) => {
  await userService.exportToCSVCursor(res);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const user = await userService.read(id);
  if (!user) return res.send("User doesn't exist!!!");
  return res.send(user);
});

router.use(function timeLog(req, res, next) {
  next();
});

module.exports = router;
