const database = require('../config/DB');

const db = database.getDB();

//Marche | ajouter la verif si l'acces n'existe pas deja
exports.addAccess = (req, res, next) => {
    if(!req.body.userID || ! req.params.id){
        res.status(404).end();
    }
    const sql = "INSERT INTO groupomania.acces SET ?";
    const value = {
        id_user : req.body.userID,
        id_channel : req.params.id
    }
    db.query(sql, value, (err, result) => {
        if(err) {
            res.status(403).end();
        }
        res.status(200).end();
    })
}
//Marche
exports.removeAccess = (req, res, next) => {
    if(!req.body.userID || ! req.params.id){
        res.status(403).end();
    }
    const sql = "DELETE FROM groupomania.acces WHERE ? AND ?";
    const value = [
      {
        id_user: parseInt(req.body.userID),
      },
      {
        id_channel: parseInt(req.params.id),
      },
    ];
    db.query(sql, value, (err, result) => {
        if(err) {
            console.log(err);
            res.status(403).end();
        }
        res.status(200).end();
    })
}