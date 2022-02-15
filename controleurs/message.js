const database = require('../config/DB');

const db = database.getDB();

//Marche
exports.getAllMessages = (req, res, next) => {
    const sql = 'SELECT messages.id,messages.message,messages.time,messages.id_reply,messages.id_user,users.name as user_name,users.last_name as user_last_name FROM messages JOIN users on id_user = users.id WHERE ? ORDER BY messages.id';
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
  const sql = 'SELECT messages.id, messages.message, messages.time, messages.id_reply, messages.id_user, users.name as user_name, users.last_name as user_last_name FROM messages JOIN users on id_user = users.id WHERE ?';
  const value = {
        "messages.id" : req.params.id
    };
    db.query(sql, value, (err, result) => {
        if(err){
          console.log(err);
            res.status(500).json(err);
        }
        res.status(200).json(result[0]);
    })
}


//Marche
exports.createMessage = (req, res, next) => {
  if (!req.body.userID || !req.body.message || !req.params.id) {
    res.status(400).end();
  } else {
    const date = new Date(Date.now());
    const sql = "INSERT INTO messages SET ?";
    const value = {
      id_user: req.body.userID,
      message: req.body.message,
      time: date,
      id_channel: req.params.id,
    };
    if (req.body.replyID !== undefined) {
      value.id_reply = req.body.replyID;
    }

    db.query(sql, value, (err, result) => {
      console.log(err);
      if (err) {
        res.status(500).json(err);
      }
      res.status(200).json({ message: "Message envoyer!" });
    });
  }
}
exports.deleteMessage = (req, res, next) => {
  if (!req.body.userID || !req.params.id) {
    res.status(400).end();
  } else {
    const sql = "SELECT * FROM messages WHERE ?";
    const value = {
      id: req.params.id,
    };
    db.query(sql, value, (err, result) => {
      if (result[0].id_user === parseInt(req.body.userID)) {
        deleteMessageById(req.params.id, res);
      } else {
        res.status(400).json({ message: "Error" });
      }
    });
  }
}
// ---------------- FUNCTION 
const deleteMessageById = (idMessage , res) => {
  const sql = "DELETE FROM messages WHERE ?";
  const value = { id : idMessage };
      db.query(sql, value, (err, result) => {
        if (err) {
          console.log(err)
          return res.status(500).json(err);
        }
        res.status(200).json({ message: "Succes delete" });
      });
}
