const router = require('express').Router();
const authController = require('../controller/authController');
const factsController = require('../controller/factsController');

router.route('/facts')
    .get(factsController.getAllFacts);

router.route('/facts/:fact_id')
    .get(factsController.getById);

router.route('/registration').post(authController.registration);
router.route('/login').post(authController.login);

module.exports = router;