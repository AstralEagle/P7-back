const database = require('../config/DB');

const db = database.getDB();

exports.conditionReportMessage = (req,res, next) => {
  if (!req.body.userID || !req.params.id) {
    res.status(400).end();
  } else {
    const sql = "SELECT id FROM report WHERE ? AND ?";
    const value = [{ id_message: req.params.id }, { id_user: req.body.userID }];
    db.query(sql, value, (err, result) => {
      console.log(result);
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
      if (result.length > 0) {
        res.status(400).json({ error: "Vous avez deja report ce message!" });
      } else {
        next();
      }
    });
  }
}
exports.reportMessage = (req,res,next) => {
  if (!req.body.userID || !req.params.id) {
    res.status(400).end();
  } else {
    const sql = "INSERT INTO report SET ?";
    const value = {
      id_message: req.params.id,
      id_user: req.body.userID,
    };
    db.query(sql, value, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
      res.status(200).json({ message: " Report Success!" });
    });
  }
}

exports.conditionReportPost = (req,res, next) => {
  if (!req.body.userID || !req.params.id) {
    res.status(400).end();
  } else {
    const sql = "SELECT id FROM report WHERE ? AND ?";
    const value = [{ id_post: req.params.id }, { id_user: req.body.userID }];
    db.query(sql, value, (err, result) => {
      console.log(result);
      if (err) {
        res.status(500).json({ error: err });
      }
      if (result.length > 0) {
        res.status(400).json({ error: "Vous avez deja report ce post!" });
      } else {
      console.log(err);
          next();
      }
    });
  }
}
exports.reportPost = (req, res, next) => {
  if (!req.body.userID || !req.params.id) {
    res.status(400).end();
  } else {
    const sql = "INSERT INTO report SET ?";
    const value = {
      id_post: req.params.id,
      id_user: req.body.userID,
    };
    db.query(sql, value, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
      res.status(200).json({ message: " Report Success!" });
    });
  }
}

exports.conditionReportComment = (req,res, next) => {
  if (!req.body.userID || !req.params.id) {
    res.status(400).end();
  } else {
    const sql = "SELECT id FROM report WHERE ? AND ?";
    const value = [{ id_comment: req.params.id }, { id_user: req.body.userID }];
    db.query(sql, value, (err, result) => {
      console.log(result);
      if (err) {
        res.status(500).json({ error: err });
      }
      if (result.length > 0) {
        res.status(400).json({ error: "Vous avez deja report ce post!" });
      } else {
      console.log(err);
          next();
      }
    });
  }
}
exports.reportComment = (req, res, next) => {
  if (!req.body.userID || !req.params.id) {
    res.status(400).end();
  } else {
    const sql = "INSERT INTO report SET ?";
    const value = {
      id_comment: req.params.id,
      id_user: req.body.userID,
    };
    db.query(sql, value, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
      res.status(200).json({ message: " Report Success!" });
    });
  }
}


exports.getAllMessageAlerte = (req,res, next) => {
  const sql = "SELECT messages.id,messages.message,COUNT(report.id) as nbrReport FROM messages join report on messages.id = report.id_message GROUP BY messages.id HAVING COUNT(report.id) >= ?";
  db.query(sql,req.params.id,(err,result) => {
    if(err){
      console.log(err);
      res.status(500).json({error:err})
    }
    res.status(200).json(result);
  });
}
exports.getAllPostAlerte = (req, res, next) => {
  const sql = 'SELECT post.id,post.name,post.description,COUNT(report.id) as nbrReport FROM post join report on post.id = report.id_post GROUP BY post.id HAVING COUNT(report.id) >= ?'
  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
    res.status(200).json(result);
  });
}
exports.getAllCommentAlerte = (req, res, next) => {
  const sql = 'SELECT comments.id,comments.comment,COUNT(report.id) as nbrReport FROM comments JOIN report ON comments.id = report.id_post GROUP BY comments.id HAVING COUNT(report.id) >= ?'
  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
    res.status(200).json(result);
  });
}




exports.getAllReportOnMessage = (req,res,next) => {
  if (!req.params.id) {
    res.status(400).end();
  } else {
    const sql = "SELECT id FROM report WHERE ?";
    const value = {
      id_message: req.params.id,
    };
    db.query(sql, value, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
      for (let val of result) {
        removeReport(val.id, res);
      }
    });
  }
}

//------------------- FUNCTION

const removeReport = (idReport, res) => {
  const sql = "DELETE FROM report WHERE ?";
  const value = {
    id : idReport
  }
  db.query(sql,value, (err,result) => {
    if(err){
      console.log(err);
      res.status(500).json({error:err})
    }
  })
}