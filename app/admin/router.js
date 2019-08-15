const Router = require('koa-router');
const ctrl = require('./controllers');

const router = new Router();

router.post('/create-category', ctrl.createCategory);

module.exports = router;
