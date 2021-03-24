const User = require('../model/userModel');
const md5 = require('md5');

exports.registration = (request, response) => {
    let user = new User();
    user.name = request.body.name;
    user.surname = request.body.surname;
    user.email = request.body.email;
    user.password = getPasswordHash(request.body.password);
    user.save((err) => {
        if (err) {
            if (err.code === 11000) {
                response.status(409).send({message: 'This e-mail already exists!'});
                return;
            }
            response.status(400).send(err);
            return
        }
        
        let User = {name: user.name, surname: user.surname, email: user.email, id: user._id }; 
        response.status(200).send({
            registratedUser: User
        });

    })
};

exports.login = (request, response) => {
    User.findOne({email: request.body.email, password: getPasswordHash(request.body.password)}, (err, user) => {
        if (!user) {
            response.status(404).send({
                message: 'User was not found.'
            });
            return;
        }
        if (err) {
            response.send(err);
            return;
        }

        let User = {name: user.name, surname: user.surname, email: user.email, id: user._id }; 
        response.status(200).send({
            signedInUser: User
        });
    })
};

let getPasswordHash = (password) => {
    return md5(password);
};
