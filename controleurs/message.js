const database = require('../config/DB');
const fs = require('fs');

const db = database.getDB();

//Marche
exports.getAllMessages = (req, res, next) => {
    const sql = 'SELECT messages.id,messages.message,messages.time,messages.url_img ,messages.id_reply,messages.id_user,users.name as user_name,users.last_name as user_last_name FROM messages JOIN users on id_user = users.id WHERE ? ORDER BY messages.id';
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

  const valeurs = req.file?
  {
    ...JSON.parse(req.body.message),
    imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }:{...req.body}
  console.log(valeurs)

  if (!valeurs.userID ||!req.params.id) {
    res.status(400).json({error: "Manque d'information" });
  } else if(valeurs.message || valeurs.imageUrl) {
    const sql = "INSERT INTO messages SET ?";
    const value = {
      id_user: valeurs.userID,
      message: valeurs.message,
      time: new Date(Date.now()),
      id_channel: req.params.id,
      url_img : valeurs.imageUrl
    };
    if (valeurs.replyID !== undefined) {
      value.id_reply = valeurs.replyID;
    }
    db.query(sql, value, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      }
      res.status(200).json({ message: "Message envoyer!" });
    });
  }else{
    res.status(400).json({error: "Manque d'information" });
  }
}

exports.deleteMessage = (req, res, next) => {
  if (!req.body.userID || !req.params.id) {
    res.status(400).end();
  } else {
    const sql = "SELECT id_user, url_img, id FROM messages WHERE ?";
    const value = {
      id: req.params.id,
    };
    db.query(sql, value, (err, result) => {
      console.log(result);
      if (result[0].id_user === parseInt(req.body.userID)) {
        deleteMessageById(result[0], res);
      } else {
        res.status(400).json({ message: "Error" });
      }
    });
  }
}
// ---------------- FUNCTION 
const deleteMessageById = (message , res) => {
  const sql = "DELETE FROM messages WHERE ?";
  const value = { id : message.id };
      db.query(sql, value, (err, result) => {
        if (err) {
          console.log(err)
          return res.status(500).json(err);
        }
        const filename = message.url_img.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {})
        res.status(200).json({ message: "Succes delete" });
      });
}
