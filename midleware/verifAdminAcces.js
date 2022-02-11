const database = require('../config/DB');

const db = database.getDB();

module.exports = (req,res, next) => {
    const userID = req.headers.authorization.split(' ')[2];
    const sql = 'SELECT op FROM user WHERE ?';
    const value = {id : userID};
    db.query(sql, value, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).json(err);
        }
        if(result[0].op === 1) {
            next();
        }
        else{
            verifAccesAdmin(req,res,next);
        }
    })
};
const verifAccesAdmin = (req,res,next) => {
    if(!req.params.id) {
        res.status(404).end();
    }
    const userID = parseInt(req.headers.authorization.split(' ')[2]);
    const sql = 'SELECT * FROM groupomania.acces WHERE ? AND ?'
    const value = [
      {
        id_user: userID,
      },
      {
        id_channel: req.params.id,
      },
    ];
    db.query(sql, value, (err, result) =>{
        if(!result[0] || err) {
            res.status(404).json({error: 'Pas d\'acces'});
        }
        else{
            console.log("test")
            if(result[0].op === 1){
                next();
            }
            else{
                res.status(404).json({error: 'Pas d\'acces'});
            }
        }
    })
}