require('dotenv').config({path: './config/.env'})
const database = require('../config/DB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const db = database.getDB();


exports.signup = (req, res, next) => {
    console.log('signup');
    if(!req.body.password | !req.body.name | !req.body.last_name |!req.body.email) {
        res.status(400).send({error: 'Missing input'});
    }else{
        console.log(req.body)
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
        const request = "INSERT INTO groupomania.user SET ?";
        const values = {
            name:       req.body.name,
            last_name:  req.body.last_name,
            date:       new Date(Date.now()),
            password:   hash,
            email:      req.body.email
        };
            db.query(request,values,(err,result) => {
                if(!result){
                    res.status(400).send({error: 'Internal error'});
                    
                }else{
                    res.status(200).send({message: 'User create'});
                    
                }
            })
        })
        .catch(err => res.status(500).json({error: err.message}));
    }   
};
exports.login = (req, res, next) => {
    console.log("login");
    if (!req.body.email | !req.body.password) {
        res.status(400).send({error: 'Missing input'});
    }
    else{
        const request = "SELECT password, id FROM groupomania.user WHERE ?";
        const values = {email: req.body.email};
        db.query(request,values,(err,result) => {
            if(!result){
                res.status(400).send({error: 'Utilisateur incorrect'});
                
            }else{
                user = result[0];
                bcrypt.compare(req.body.password, user.password)
                .then(result => {
                    console.log("user "+user.id+" log")
                    res.status(200).json({
                        userID : user.id,
                        token: jwt.sign(
                            {userID: user.id},
                            process.env.KEYTOKEN,
                            {expiresIn: '24h' }
                        )
                    })

                })
                .catch(err => res.status(400).send({error:"Mot de passe incorrect"}))
            }
        });
    }
};
exports.getUser = (req, res, next) => {
    console.log("getUser");
    if (!req.params.id) {
        res.status(400).send({error: 'Missing input'});
    }
    else{
        const request = "SELECT name, last_name, post, date FROM groupomania.user WHERE ?";
        const value = {
            id : req.params.id
        }
        db.query(request,value,(err,result) => {
            if(!result){
                res.status(400).send({error: 'Utilisateur non trouvé'});
            }else{
                res.status(200).json(result[0])
            }
        });
    }
};
exports.deleteUser = (req, res, next) => {
    const sqlOne = "SELECT * FROM user WHERE id = ?";
    const values = {
        id : req.body.userID
    }
    db.query(sqlOne,values,(err,result) => {
        if(err){
            res.status(400).send({error: err})
        }
        if (result[0].id == res.params.id || result[0].op == 1) {
            const sqlDelet = "DELETE FROM user WHERE id = ?";
            const values = req.params.id;
            db.query(sqlDelet,values,(err,result) =>{
                if(err){
                    res.status(400).send({error: err})
                }
                else{
                    res.status(200).json({message : "Succes Delete"})
                }
            })
        }
    })

};