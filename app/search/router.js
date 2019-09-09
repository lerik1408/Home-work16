const Router = require('koa-router');
const ctrl = require('./controllers');

const router = new Router();

router.get('/profile:id', ctrl.profile);
router.post('/people/:id', ctrl.people);

router.get('/people', ctrl.people);
router.get('/location', ctrl.location);

router.get('/cheat', ctrl.cheat);

router.get('/category', ctrl.getCategory);

module.exports = router;
