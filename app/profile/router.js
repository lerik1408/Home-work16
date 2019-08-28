const Router = require('koa-router');
const passport = require('koa-passport');
const ctrl = require('./controllers');

const router = new Router();

router.get('/person', passport.authenticate('jwt', { session: false }), ctrl.profile);
router.put('/person', passport.authenticate('jwt', { session: false }), ctrl.profileUpdate);
router.put('/photo', passport.authenticate('jwt', { session: false }), ctrl.updateUserPhoto);
router.put('/category', passport.authenticate('jwt', { session: false }), ctrl.updateUserCategory);

module.exports = router;
