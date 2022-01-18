const database = require('../config/DB');
const bcrypt = require('bcrypt');


const db = database.getDB();


exports.signup = (req, res, next) => {
    if(!req.body.password | !req.body.name | !req.body.last_name |!req.body.email) {
        res.status(400).send({error: 'Missing input'});
    }else{
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
        const request = "INSERT INTO user SET ?";
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
                    res.status(200).send({error: 'User create'});
                    
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
        const request = "SELECT password FROM user WHERE 'email' = ?";
        const values = {email: req.body.email};
        db.query(request,values,(err,result) => {
            if(!result){
                res.status(400).send({error: 'Utilisateur incorrect'});
                
            }else{
                bcrypt.compare(req.body.password, result[0].password)
                .then(result => {
                    console.log("Connexion");
                    res.status.json({success : "login"})
                })
                .catch(err => res.status(400).send({error:"Mot de passe incorrect"}))
            }
        });
    }
};
exports.getUser = (req, res, next) => {
    console.log("getUser");
    if (!req.query.id) {
        res.status(400).send({error: 'Missing input'});
    }
    else{
        const request = "SELECT name, last_name, post, date FROM user WHERE id = ?";
        const values = req.query.id;
        db.query(request,values,(err,result) => {
            if(!result){
                res.status(400).send({error: 'Utilisateur non trouvé'});
            }else{
                console.log(result);
                res.status(200).json(result[0])
            }
        });
    }
};
exports.deleteUser = (req, res, next) => {
    

};