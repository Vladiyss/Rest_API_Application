const router = require('express').Router();
const factsController = require('../controller/factsController');

router.route('/facts')
    .post(factsController.new);

router.route('/facts/:fact_id')
    .put(factsController.update)
    .delete(factsController.delete);

module.exports = router;
