const res = require('express/lib/response');
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
    console.log('getMessage',req.params.id)
    const request = "SELECT * FROM groupomania.like WHERE id_post = ?";
    db.query(request,req.params.id,(err,result) => {
        console.log(result, result.length)
        res.status(200).json(result.length)
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
        db.query(sqlOne,values,(err,result) => {
            if (err) {
                res.status(400).json({error: err})
            }
            if(result.length == 0){
                console.log('add like')
                const sqlCreate = "INSERT INTO groupomania.like SET ?"
                const valuesCreate = {
                    id_user : parseInt(req.body.userID),
                    id_post : parseInt(req.params.id)
                }
                db.query(sqlCreate,valuesCreate,(err,result) => {
                    console.log("Succes Create");
                    if(!err)
                    res.status(200).json({message : "Like"})
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
                    res.status(200).json({message:"Unlike"})
                })
            }
        })
    }

}
exports.commentMessage = (req, res, next) => {

}
exports.getMessageUser = (req, res, next) => {

}