const database = require('../config/DB');

const db = database.getDB();

exports.getMessage = (req, res, next) => {

    const sql = "SELECT post.id,post.name,post.description, users.name as userName, users.last_name as userLastName,COUNT(DISTINCT likes.id) as nbrLike, COUNT(DISTINCT comments.id) as nbrComment FROM post LEFT JOIN likes on post.id = likes.id_post LEFT JOIN comments on post.id = comments.id_post JOIN users on post.id_user = users.id GROUP BY post.id ORDER BY post.id DESC  "
    db.query(sql, (err, result) => {
        res.status(200).json(result);
    })
}
exports.getPostByID = (req,res,next) => {
  
    const sql = 'SELECT post.id,post.name,post.description, users.name as userName, users.last_name as userlastName,COUNT(DISTINCT likes.id) as nbrLike, COUNT(DISTINCT comments.id) as nbrComment FROM post LEFT JOIN likes on post.id = likes.id_post LEFT JOIN comments on post.id = comments.id_post JOIN users on post.id_user = users.id WHERE ? GROUP BY post.id'
    const value = {'post.id' : req.params.id}
    db.query(sql,value,(err,result) => {
        if(err){
            console.log(err)
            res.status(500).json({error : err})
        }
        else{
            if(!result[0]){
                res.status(400).json({error : "Post introuvable"})
            }
            else{
                res.status(200).json(result[0])
            }

        }
    })

}
exports.postMessage = (req, res, next) => {
    if (!req.body.description | !req.body.userID | !req.body.postName) {
        res.status(400).json({ error: "No Message" })
    }
    else {
        const request = "INSERT INTO post SET ?"
        const values = {
            id_user: req.body.userID,
            name: req.body.postName,
            description: req.body.description
        }
        db.query(request, values, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).json({ err })
            }
            else {
                res.status(200).json({ message: "Post create" })
            }
        })
    }
}
exports.getLikeByID = (req, res, next) => {

    console.log("GetLike")
    const idUser = req.headers.authorization.split(" ")[2];
    console.log(idUser)

    const request = "SELECT * FROM groupomania.likes WHERE ?";
    const value = { id_post: req.params.id }
    db.query(request, value, (err, result) => {
        console.log(result)
        console.log(err)
        const findlike = result.find(u => u.id_user == idUser);
        console.log(findlike)
        if (findlike != null) {
            console.log("like")
            res.status(200).json({
                nbrLike: result.length,
                isLike: true
            })
        }
        else {
            res.status(200).json({ nbrLike: result.length })
        }
    })
}
exports.getCommentByID =(req,res,next) => {
    const sql = 'SELECT * FROM comments WHERE ?'
    const value = {id_post : req.params.id}

    db.query(sql,value,(err,result) => {
        if(err){
            console.log(err)
            res.status(500).json({error : err})
        }
        else{
            res.status(200).json(result)
        }
    })
}

exports.deleteMessage = (req, res, next) => {

}
exports.likeMessage = (req, res, next) => {
    if (!req.body.userID) {
        res.status(400).json({ error: "No user" })
    }
    else {
        const sqlOne = " SELECT * FROM groupomania.likes WHERE id_post = ? AND id_user = ?"
        const values = [parseInt(req.params.id), parseInt(req.body.userID)]
        console.log(values)
        db.query(sqlOne, values, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).json({ error: err })
            }
            console.log("Like trouver pour l'id " + req.body.userID + " est de " + result.length);
            if (result.length === 0) {
                console.log('add like')
                const sqlCreate = "INSERT INTO groupomania.likes SET ?"
                const valuesCreate = {
                    id_user: parseInt(req.body.userID),
                    id_post: parseInt(req.params.id)
                }
                db.query(sqlCreate, valuesCreate, (err, result) => {
                    console.log("Succes Create");
                    if (!err)
                        res.status(200).json({ isLike: true })
                })
            }
            else if (result.length == 1) {
                console.log('remove like')
                const sqlDelet = "DELETE FROM groupomania.likes WHERE ?"
                const valuesDelet = {
                    id: result[0].id
                }
                db.query(sqlDelet, valuesDelet, (err, result) => {
                    console.log("Succes Remove");
                    if (!err)
                        res.status(200).json({ isLike: false })
                })
            }
        })
    }

}
exports.commentMessage = (req, res, next) => {

    const sql = 'INSERT INTO comments SET ?'
    const value = {
        id_user : req.body.userID ,
        id_post : req.params.id ,
        comment : req.body.comment 
    }
    db.query(sql,value,(err,result) => {
        if(err){
            console.log(err)
            res.status(500).json(err)
        }
        else{
            console.log("Commentaire envoyer")
            res.status(200).json({message : "Commentaire envoyer avec succes"})
        }
    })

}
exports.getMessageUser = (req, res, next) => {
}
exports.getIsLike = (req,res,next) => {
    const sql = 'SELECT * FROM likes WHERE ? AND ?';
    const value = [{id_user : req.headers.authorization.split(" ")[2]},
                    {id_post : req.params.id}]
    db.query(sql,value,(err,result) => {
        if(err){
            console.log(err);
            res.status(500).json({error : err});
        }
        else if(result[0]){
            res.status(200).json({isLiked : true});
        }
        else{
            res.status(200).json({isLiked : false});
        }
    });
}