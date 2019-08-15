const Router = require('koa-router');
const ctrl = require('./controllers');

const router = new Router();

router.get('/people/:id', ctrl.search);
router.get('/people', ctrl.search);

router.get('/category', ctrl.getCategory);

module.exports = router;
