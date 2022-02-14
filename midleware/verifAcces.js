const database = require('../config/DB');

const db = database.getDB();

module.exports = (req,res, next) => {
    if(!req.params.id) {
        res.status(404).end();
    }
    const userID = parseInt(req.headers.authorization.split(' ')[2]);
    const sql = 'SELECT * FROM groupomania.access WHERE ? AND ?'
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
            next();
        }
    })
};