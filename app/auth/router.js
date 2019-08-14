const Router = require('koa-router');
const passport = require('koa-passport');
const ctrl = require('./controllers');

const router = new Router();

router.post('/sign-up', ctrl.signUp);
router.post('/sign-in', ctrl.signIn);
router.get('/profile', passport.authenticate('jwt', { session: false }), ctrl.profile);
router.put('/profile', passport.authenticate('jwt', { session: false }), ctrl.profileUpdate)
router.get('/test', ctrl.test);

router.get('/search/:id', ctrl.search);
router.get('/search', ctrl.search);

router.put('/photo', passport.authenticate('jwt', { session: false }), ctrl.updateUserPhoto);

router.post('/create-category', ctrl.createCategory);
router.get('/category', ctrl.getCategory);

router.get('/email', ctrl.sendEmail);
module.exports = router;
