const Router = require('koa-router');
const ctrl = require('./controllers');

const router = new Router();

router.get('/profile:id', ctrl.profile);
router.post('/people', ctrl.people);

router.get('/category', ctrl.getCategory);

module.exports = router;
