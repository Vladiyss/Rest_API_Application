const Fact = require('../model/factsModel');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getAllFacts = (request, response) => {
    Fact.find().sort({[request.query.sort]: request.query.order}).exec((err, facts) => {
        if (err) {
            response.json({
                status: "error",
                message: err,
            });
        }
        response.json({
            status: "success",
            message: "Facts was successfully retrieved",
            payload: facts
        });
    })
};

exports.new = (request, response) => {
    {
        let fact = new Fact();
        fact.title = request.body.title;
        fact.content = request.body.content;
        fact.save((err) => {
            response.status(200).json({
                message: 'New fact was created!',
                payload: fact
            });
        });
    }
};

exports.getById = (request, response) => {
    let id = request.params.fact_id;
    if (!ObjectId.isValid(id)) {
        response.status(400).send({
            message: 'Bad id!'
        });
        return;
    }
    Fact.findById(id, (err, fact) => {
        if (err) {
            response.send(err);
        }
            
        response.status(200).send({
            message: 'Fact details.',
            payload: fact
        });
    });
};

exports.update = (request, response) => {
    let id = request.params.fact_id;
    if (!ObjectId.isValid(id)) {
        response.status(400).send({
            message: 'Bad id!'
        });
        return;
    }
    Fact.findById(id, (err, fact) => {
        if (err) {
            response.send(err);
        }
        fact.name = request.body.title ? request.body.name : fact.name;
        fact.content = request.body.content ? request.body.content : fact.content;

        let popFlag = false;
	    for (let i = 0; i < fact.likes.length; i++) {
	        if (fact.likes[i] == request.body.userID) {
	            fact.likes.pop(request.body.userID);
		        popFlag = true;
	        }
	    }
	
	    if (!popFlag) {
	        fact.likes.push(request.body.userID);
	    }
	    console.log(fact.likes.length);

        fact.save((err) => {
            if (err) {
                response.status(400).send(err);
            }
            response.status(200).send({
                message: 'Fact info was updated',
                payload: fact
            });
        });
    });
};


exports.delete = function (request, response) {
    let id = request.params.fact_id;
    if (!ObjectId.isValid(id)) {
        response.status(400).send({
            message: 'Bad id!'
        });
        return;
    }
    Fact.deleteOne({
        _id: id
    }, (err, fact) => {
        if (err) {
            response.send(err);
        }
            
        response.status(204).send({
            status: "Success",
            message: 'Fact was deleted'
        });
    });
};
