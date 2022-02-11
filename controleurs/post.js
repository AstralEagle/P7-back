const database = require('../config/DB');

const db = database.getDB();

exports.getMessage = (req,res,next) => {
    const request = "SELECT * FROM groupomania.post"
    db.query(request,(err,result) => {
        res.status(200).json(result);
    })

}
exports.postMessage = (req, res, next) => {
    if(!req.body.description | !req.body.userID | !req.body.name) {
        res.status(400).json({error: "No Message"})
    }
    else{
        const request = "INSERT INTO post SET ?"
        const values = {
            id_user : req.body.userID,
            name : req.body.name,
            description : req.body.description
        }
        db.query(request,values,(err,result) => {
            if(err) {
                console.log(err)
                res.status(400).json({err})
            }
            else{
                res.status(200).json({message: "Post create"})
            }
        })
    }
}
exports.getMessageById = (req,res,next) => {
    console.log("GetLike")
    const idUser = req.headers.authorization.split(" ")[2];
    console.log(idUser)
    const request = "SELECT * FROM groupomania.like WHERE ?";
    const value = {id_post : req.params.id}
    db.query(request,value,(err,result) => {
        console.log(result)
        console.log(err)
        const findlike = result.find(u => u.id_user == idUser );
        console.log(findlike)
        if(findlike != null) {
            console.log("like")
            res.status(200).json({
                nbrLike : result.length,
                isLike : true
            })
        }
        else{
            res.status(200).json({nbrLike : result.length})
        }
    })
}

exports.deleteMessage = (req, res, next) => {

}
exports.likeMessage = (req, res, next) => {
    if(!req.body.userID){
        res.status(400).json({error: "No user"})
    }
    else{
        const sqlOne = " SELECT * FROM groupomania.like WHERE id_post = ? AND id_user = ?"
        const values = [parseInt(req.params.id), parseInt(req.body.userID)]
        console.log(values)
        db.query(sqlOne,values,(err,result) => {
            if (err) {
                res.status(400).json({error: err})
            }
            console.log("Like trouver pour l'id "+req.body.userID+" est de "+result.length);
            if(result.length === 0){
                console.log('add like')
                const sqlCreate = "INSERT INTO groupomania.like SET ?"
                const valuesCreate = {
                    id_user : parseInt(req.body.userID),
                    id_post : parseInt(req.params.id)
                }
                db.query(sqlCreate,valuesCreate,(err,result) => {
                    console.log("Succes Create");
                    if(!err)
                    res.status(200).json({isLike: true})
                })
            }
            else if(result.length == 1){
                console.log('remove like')
                const sqlDelet = "DELETE FROM groupomania.like WHERE ?"
                const valuesDelet = {
                    id : result[0].id
                }
                db.query(sqlDelet,valuesDelet,(err,result) => {
                    console.log("Succes Remove");
                    if(!err)
                    res.status(200).json({isLike:false})
                })
            }
        })
    }

}
exports.commentMessage = (req, res, next) => {

}
exports.getMessageUser = (req, res, next) => {
}