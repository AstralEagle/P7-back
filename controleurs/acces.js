const database = require('../config/DB');


const db = database.getDB();

//Marche | ajouter la verif si l'acces n'existe pas deja
exports.addAccess = (req, res, next) => {
  if (!req.body.userID || !req.params.id) {
    res.status(404).end();
  } else {
    const sql = "SELECT * FROM access WHERE ? AND ?";

    const value = [
      {
        id_user: req.body.userID,
      },
      { id_channel: req.params.id },
    ];
    db.query(sql, value, (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      }
      if (result.length === 0) {
        addAccesFromUser(value, res);
      } else {
        res.status(400).json({ message: "Vous y avez deja acces" });
      }
    });
  }
}
//Marche
exports.removeAccess = (req, res, next) => {
  if (!req.body.userID || !req.params.id) {
    res.status(404).end();
  } else {
    const sql = "DELETE FROM access WHERE ? AND ?";
    const value = [
      {
        id_user: req.body.userID,
      },
      {
        id_channel: req.params.id,
      },
    ];
    db.query(sql, value, (err, result) => {
      if (err) {
        console.log(err);
        res.status(403).end();
      }
      deleteMessageFromChannelUser();
      res.status(200).end();
    });
  }
}
exports.forceRemoveAccess = (req, res, next) => {
  console.log(req.body, "force Delete");
  if (!req.body.idUser || !req.params.id) {
    res.status(404).end();
  } else {
    const sql = "SELECT id FROM access WHERE ? AND ?";
    const value = [
      {
        id_user: req.body.idUser,
      },
      {
        id_channel: req.params.id,
      },
    ];
    db.query(sql, value, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).end();
      }
      removeAccessFromId(result[0].id, res);
    });
  }
}
//Marche
exports.getAllAccess = (req, res, next) => {
  if (!req.params.id) {
    res.status(404).end();
  } else {
    const sql = "SELECT * FROM access WHERE ?";
    const value = {
      id_channel: req.params.id,
    };
    db.query(sql, value, (err, result) => {
      if (err) {
        res.status(500).json(err);
      }
      res.status(200).json(result);
    });
  }
}

exports.addAdmin = (req, res) => {
  if (!req.params.id || !req.body.idUser) {
    res.status(404).end();
  } else {
    const sql = "SELECT id FROM  access WHERE ? AND ?";
    const value = [{ id_user: req.body.idUser }, { id_channel: req.params.id }];
    db.query(sql, value, (err, result) => {
      if (!result[0] || err) {
        res.status(500).json(err);
      } else {
        editAdminAcces(1, result[0].id, res);
      }
    });
  }
}


exports.removeAdmin = (req, res) => {
  if (!req.params.id || !req.body.idUser) {
    res.status(404).end();
  } else {
    const sql = "SELECT id FROM  access WHERE ? AND ?";
    const value = [{ id_user: req.body.idUser }, { id_channel: req.params.id }];
    db.query(sql, value, (err, result) => {
      if (!result[0] || err) {
        res.status(500).json(err);
      } else {
        editAdminAcces(0, result[0].id, res);
      }
    });
  }
}
//---------------------------- Function 
const removeAccessFromId = (idAcces, res)=> {
    const sql = 'DELETE FROM access WHERE ?'
    const value = {
        id: idAcces
    }
    db.query(sql, value, (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json(err);
        }
        res.status(200).json({message : 'Success'});
    })
}
const addAccesFromUser = (values,res) => {
  const sql = "INSERT INTO access SET ?";
  const value = {
    id_user: values[0].id_user,
    id_channel: values[1].id_channel,
  };

  db.query(sql, value, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    }
    res.status(200).end();
  });
}
const editAdminAcces = (admin,idAcces,res) => {
  const sql = "UPDATE access SET ? WHERE ?";
  const value = [
    {
      op: admin,
    },
    { id: idAcces },
  ];
  db.query(sql, value, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
    res.status(200).json({ message: "Successfully" });
  });
}