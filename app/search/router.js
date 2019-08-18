const Router = require('koa-router');
const ctrl = require('./controllers');

const router = new Router();

router.get('/profile:id', ctrl.profile);
router.get('/people', ctrl.search);
router.post('/test', ctrl.test)

router.get('/category', ctrl.getCategory);

module.exports = router;
