const database = require('../config/DB');

const db = database.getDB();


module.exports = (req,res, next) => {
    const userID = req.headers.authorization.split(' ')[2];
    const sql = 'SELECT op FROM users WHERE ?';
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
            res.status(400).json({error: 'Vous ne possédez pas les droits'})
        }
    })
};
