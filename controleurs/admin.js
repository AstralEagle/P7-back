const database = require("../config/DB");

const db = database.getDB();

exports.getAllMessageAlerte = (req, res, next) => {
  const sql =
    "SELECT messages.id,messages.message,COUNT(report.id) as nbrReport FROM messages join report on messages.id = report.id_message GROUP BY messages.id HAVING COUNT(report.id) >= ?";
  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
    res.status(200).json(result);
  });
};
exports.getAllPostAlerte = (req, res, next) => {
  const sql =
    "SELECT post.id,post.name,post.description,COUNT(report.id) as nbrReport FROM post join report on post.id = report.id_post GROUP BY post.id HAVING COUNT(report.id) >= ?";
  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
    res.status(200).json(result);
  });
};
exports.getAllCommentAlerte = (req, res, next) => {
  const sql =
    "SELECT comments.id,comments.comment,COUNT(report.id) as nbrReport FROM comments JOIN report ON comments.id = report.id_post GROUP BY comments.id HAVING COUNT(report.id) >= ?";
  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
    res.status(200).json(result);
  });
};

exports.dorceDeleteMessage = (req, res, next) => {
  const sql = "DELETE FROM messages WHERE ?";
  const value = { id: req.params.id };
  db.query(sql, value, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({ message: "Supression effectué" });
    }
  });
};
exports.dorceDeletePost = (req, res, next) => {
  const sql = "DELETE FROM post WHERE ?";
  const value = { id: req.params.id };
  db.query(sql, value, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({ message: "Supression effectué" });
    }
  });
};
exports.dorceDeleteComment = (req, res, next) => {
  const sql = "DELETE FROM comments WHERE ?";
  const value = { id: req.params.id };
  db.query(sql, value, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({ message: "Supression effectué" });
    }
  });
};
