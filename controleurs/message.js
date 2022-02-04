const database = require('../config/DB');

const db = database.getDB();

//Marche
exports.getAllMessages = (req, res, next) => {
    const sql = 'SELECT id,id_user,message,time,id_reply FROM groupomania.message WHERE ?';
    const value = {
        id_channel: req.params.id
    };
    db.query(sql, value, (err, result) => {
        if(err){
            res.status(500).json(err);
        }
        res.status(200).json(result);
    })
}
//Marche
exports.getMessage = (req, res, next) => {
    const sql = 'SELECT * FROM groupomania.message WHERE ?';
    const value = {
        id : req.params.id
    };
    db.query(sql, value, (err, result) => {
        if(err){
            res.status(500).json(err);
        }
        res.status(200).json(result[0]);
    })
}

//Marche
exports.createMessage = (req, res, next) => {
    if(!req.body.userID || !req.body.message || !req.params.id){
        res.status(400).end();
    }
    const date = new Date(Date.now());
    const sql = 'INSERT INTO groupomania.message SET ?';
    const value = {
        id_user : req.body.userID,
        message : req.body.message,
        time : date,
        id_channel: req.params.id,
    };
    db.query(sql, value, (err, result) => {
        if(err){
            res.status(500).json(err);
        }
        res.status(200).json({message : "Message envoyer!"});
    })
}
exports.deleteMessage = (req, res, next) => {
  console.log(req.body);
  if (!req.body.userID || !req.params.id) {
    res.status(400).end();
  }
  const sql = "SELECT * FROM groupomania.message WHERE ?";
  const value = {
    id: req.params.id,
  };
  db.query(sql, value, (err, result) => {
    console.log(err, req.body.userID);
    console.log(result);
    if (result[0].id_user === parseInt(req.body.userID)) {
      const sql2 = "DELETE FROM groupomania.message WHERE ?";
      db.query(sql2, value, (err2, result2) => {
        console.log(err2);
        if (err2) {
          return res.status(500).json(errs);
        }
        res.status(200).json({ message: "Succes delete" });
      });
    } else {
      res.status(500).json({ message: "Error" });
    }
  });
}
