const Router = require('koa-router');
// const passport = require('koa-passport');
const ctrl = require('./controllers');

const router = new Router();

router.post('/sign-up', ctrl.signUp);
router.post('/sign-in', ctrl.signIn);
router.post('/check-email', ctrl.check);



router.get('/email', ctrl.sendEmail);
module.exports = router;
