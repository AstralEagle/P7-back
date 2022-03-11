const database = require('../config/DB');

const db = database.getDB();

//Marche (retourne les id des channels)
exports.getAllChannels = (req, res, next) => {
  const sql = "SELECT id_channel,op FROM access WHERE ?";
  const value = {
    id_user: parseInt(req.headers.authorization.split(' ')[2]),
  }
  db.query(sql, value, (err, result) => {
    if (err) {
      res.status(500).json({ error: err })
    }
    res.status(200).json(result);
  });
}
//Marche
exports.getChannelByID = (req, res, next) => {
  if (!req.params.id) {
    res.status(404).end();
  } else {
    console.log("getChannelBy", req.params.id);
    const sql = "SELECT * FROM channels WHERE ?";
    const value = {
      id: req.params.id,
    };
    db.query(sql, value, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
      res.status(200).json(result[0]);
    });
  }
}
//Marche
exports.createChannel = (req, res, next) => {
  if (!req.body.nameChan || !req.body.userID) {
    res.status(404).end();
  } else {
    const sql = "INSERT INTO channels SET ?";
    const value = {
      name: req.body.nameChan,
    };
    db.query(sql, value, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
      setAccessDefault(req.body.userID);
      res.status(200).json({ message: "Channel créer" });
    });
  }
}
//Marche 
exports.removeChannel = (req, res, next) => {
  if (!req.body.userID || !req.params.id) {
    res.status(404).json({error: 'Missing input'});
  } else {
    const sql = "DELETE FROM channels WHERE ?";
    const value = {
      id: req.params.id,
    };
    db.query(sql, value, (err, result) => {
      console.log("Channel 2");
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({ message: "Channel deleted" })
      }
    });
  }
}


//----------------------------- FUNCTION

const setAccessDefault = (userId) => {
  const sql = 'SELECT id FROM channels ORDER BY id DESC LIMIT 1';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    addDefaultAccess(result[0].id, userId);
  });
}
const addDefaultAccess = (idChan, userId) => {
  const value = {
    id_user: userId,
    id_channel: idChan,
    op: 1
  }
  const sql = "INSERT INTO access SET ?";
  db.query(sql, value, (err, result) => {
    console.log(err)
    console.log(result)
  })

}