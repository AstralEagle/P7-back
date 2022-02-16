require('dotenv').config({path: './config/.env'})
const database = require('../config/DB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const db = database.getDB();


exports.signup = (req, res, next) => {
  if (
    !req.body.password |
    !req.body.name |
    !req.body.last_name |
    !req.body.email
  ) {
    res.status(400).send({ error: "Missing input" });
  } else {
    const sql = "SELECT * FROM users WHERE ?";
    const value = { email: req.body.email };
    db.query(sql, value, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      } else if (result[0]) {
        res.status(400).json({ error: "Email déja utilisé" });
      } else {
        addUser(req.body, res);
      }
    });
  }
};
exports.login = (req, res, next) => {
  if (!req.body.email | !req.body.password) {
    res.status(400).send({ error: "Information introuvable" });
  } else {
    const sql = "SELECT password, id FROM users WHERE ?";
    const values = { email: req.body.email };
    db.query(sql, values, (err, result) => {
      if (!result[0]) {
        res.status(400).send({ error: "Utilisateur introuvable" });
      } else {
        user = result[0];
        bcrypt
          .compare(req.body.password, user.password)
          .then((result) => {
            res.status(200).json({
              userID: user.id,
              token: jwt.sign({ userID: user.id }, process.env.KEYTOKEN, {
                expiresIn: "24h",
              }),
            });
          })
          .catch((err) =>
            res.status(400).json({ error: "Mot de passe incorrect" })
          );
      }
    });
  }
};
exports.getUser = (req, res, next) => {
  if (!req.params.id) {
    res.status(400).json({ error: "Information introuvable" });
  } else {
    const sql = "SELECT name, last_name, post, date FROM users WHERE ?";
    const value = {
      id: req.params.id,
    };
    db.query(sql, value, (err, result) => {
      if (!result[0]) {
        console.log(err);
        res.status(500).json({ error: "Utilisateur non trouvé" });
      } else {
        res.status(200).json(result[0]);
      }
    });
  }
};
exports.deleteUser = (req, res, next) => {
  if (!req.body.userID) {
    res.status(400).json({ error: "Information introuvable" });
  } else {
    const sqlOne = "SELECT * FROM users WHERE id = ?";
    const values = {
      id: req.body.userID,
    };
    db.query(sqlOne, values, (err, result) => {
      if (err) {
        res.status(400).send({ error: err });
      }
      if (result[0].id == res.params.id || result[0].op == 1) {
        const sqlDelet = "DELETE FROM users WHERE id = ?";
        const values = req.params.id;
        db.query(sqlDelet, values, (err, result) => {
          if (err) {
            res.status(400).send({ error: err });
          } else {
            res.status(200).json({ message: "Supression effectué" });
          }
        });
      }
    });
  }
}
exports.updateUser = (req, res,next) => {
    
}

//-------------------FUNCTION
const addUser = (values,res) => {
    bcrypt
    .hash(values.password, 10)
    .then((hash) => {
        const sql = "INSERT INTO users SET ?";
      const value = {
        name: values.name,
        last_name: values.last_name,
        date: new Date(Date.now()),
        password: hash,
        email: values.email,
      };
    db.query(sql,value,(err,result) =>{
        if(err){
            res.status(500).send({error: err})
        }
        setAccessDefault(res);
    })})
    .catch((err) => { res.status(500).send({error: err})})
}
const setAccessDefault = (res) => {
    const sql = 'SELECT id FROM users ORDER By id DESC LIMIT 1';
    db.query(sql,(err,result) => {
        if(err){
            res.status(500).send({error: err})
        }
        addDefaultAccess(result[0].id,res)
    });
}
const addDefaultAccess = (idUser,res) => {
    const value = {
        id_user : idUser,
        id_channel : 1
    }
    const sql = "INSERT INTO access SET ?";
    db.query(sql,value,(err,result) =>{
        if(err){
            console.log(err)
            res.status(500).send({error: err})
        }
        res.status(200).json({message : 'Success'})
        
    })
}