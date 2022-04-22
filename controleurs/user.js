require("dotenv").config({ path: "./config/.env" });
const database = require("../config/DB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = database.getDB();

exports.signup = (req, res, next) => {
  if (
    !req.body.password |
    !req.body.name |
    !req.body.last_name |
    !req.body.email
  ) {
    res.status(400).send({ error: "Veuillez remplir tout les champs" });
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
    res.status(400).send({ error: "Email ou mot de passe incorrect" });
  } else {
    const sql = "SELECT password, id FROM users WHERE ?";
    const values = { email: req.body.email };
    db.query(sql, values, (err, result) => {
      if (!result[0]) {
        res.status(400).send({ error: "Utilisateur introuvable" });
      } else {
        user = result[0];
        console.log(user,req.body.password);
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if(valid){
              res.status(200).json({
                userID: user.id,
                token: jwt.sign({ userID: user.id }, process.env.KEYTOKEN, {
                  expiresIn: "24h",
                }),
              });
            }
            else
            res.status(400).json({ error: "Mot de passe incorrect" })
          })
          .catch((err) =>
          res.status(400).json({ error: "Mot de passe incorrect" })

          );
      }
    });
  }
};
exports.verifDeleteUser = (req, res, next) => {
  if (!req.body.userID) {
    res.status(400).json({ error: "Information introuvable" });
  } else {
    if (req.params.id === req.body.userID) {
      next();
    } 
    else {
      const sql = "SELECT * FROM users WHERE ?";
      const value = {
        id: req.body.userID,
      };
      db.query(sql, value, (err, result) => {
        if (err) {
          res.status(500).send({ error: err });
        }
        else if (result[0].op == 1) {
          next();
        }
        else{
          res.status(400).json({ error : 'Action impossible'})
        }
      });
    }
  }
};
exports.deleteUser = (req, res, next) => {
  const sql = "DELETE FROM users WHERE id = ?";
  const value = req.params.id;
  db.query(sql, value, (err, result) => {
    if (err) {
      res.status(400).send({ error: err });
    } else {
      res.status(200).json({ message: "Supression effectué" });
    }
  });
};






exports.getUser = (req, res, next) => {
  if (!req.params.id) {
    res.status(400).json({ error: "Information introuvable" });
  } else {
    const sql = "SELECT users.name,users.last_name, users.date, COUNT(distinct post.id) AS nbrPost, COUNT(distinct likes.id) AS nbrLike FROM users LEFT JOIN post on users.id = post.id_user LEFT JOIN likes ON users.id = likes.id_user WHERE ?";
    const value = {
      'users.id': req.params.id,
    };
    db.query(sql, value, (err, result) => {
      console.log(result[0])
      if (!result[0].name) {
        console.log(err);
        res.status(500).json({ error: "Utilisateur non trouvé" });
      } else {
        result[0].date = result[0].date.split(' ')[0].replace('-','/').replace('-','/');
        console.log(result[0])
        res.status(200).json(result[0]);
      }
    });
    
  }
};

exports.getLikeByUser = (req, res, next) => {
  const sql = 'SELECT post.id,post.name,post.description, users.name as userName, users.last_name as userlastName,COUNT(DISTINCT likes.id) as nbrLike, COUNT(DISTINCT comments.id) as nbrComment,( select count(likes.id) from likes where likes.id_post=post.id AND ? ) as isTrue FROM post LEFT JOIN likes on post.id = likes.id_post LEFT JOIN comments on post.id = comments.id_post JOIN users on post.id_user = users.id WHERE ? GROUP BY post.id'
  const value = [{
    'likes.id_user': req.headers.authorization.split(" ")[2]
  }, {
    'likes.id_user': req.params.id
  }]
  db.query(sql, value, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
    else {
      res.status(200).json(result)
    }
  })
};
exports.getPostByUser = (req, res, next) => {
  const sql = 'SELECT post.id,post.name,post.description, users.name as userName, users.last_name as userlastName,COUNT(DISTINCT likes.id) as nbrLike, COUNT(DISTINCT comments.id) as nbrComment,( select count(likes.id) from likes where likes.id_post=post.id AND ? ) as isTrue FROM post LEFT JOIN likes on post.id = likes.id_post LEFT JOIN comments on post.id = comments.id_post JOIN users on post.id_user = users.id WHERE ? GROUP BY post.id'
  const value = [{
    'likes.id_user': req.headers.authorization.split(" ")[2]
  }, {
    'post.id_user': req.params.id
  }]
  db.query(sql, value, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err })
    }
    else {
      res.status(200).json(result)
    }
  })
}

exports.getMyUser = (req, res, next) => {
  const sql = 'SELECT name ,last_name ,op FROM users WHERE ?'
  const value = {
    id: req.headers.authorization.split(' ')[2]
  }
  db.query(sql, value, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err })
    }
    else {
      if (result[0].op === 1) {
        result[0].op = true;
      }
      else{
        result[0].op = false;
      }
      res.status(200).json(result[0])
    }
  })
}


//-------------------FUNCTION
const addUser = (values, res) => {
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
      db.query(sql, value, (err, result) => {
        if (err) {
          res.status(500).send({ error: err });
        }
        setAccessDefault(res);
      });
    })
    .catch((err) => {
      res.status(500).send({ error: err });
    });
};
const setAccessDefault = (res) => {
  const sql = "SELECT id FROM users ORDER By id DESC LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    }
    addDefaultAccess(result[0].id, res);
  });
};
const addDefaultAccess = (idUser, res) => {
  const value = {
    id_user: idUser,
    id_channel: 1,
  };
  const sql = "INSERT INTO access SET ?";
  db.query(sql, value, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: err });
    }
    res.status(200).json({ message: "Success" });
  });
};
