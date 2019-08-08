const Router = require('koa-router');
const passport = require('koa-passport');
const ctrl = require('./controllers');

const router = new Router();

router.post('/sign-up', ctrl.signUp);
router.post('/sign-in', ctrl.signIn);
router.get('/profile', passport.authenticate('jwt', { session: false }), ctrl.profile);
// router.get('/profile', ctrl.profile);
module.exports = router;
