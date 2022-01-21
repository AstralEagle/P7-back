const res = require('express/lib/response');
const database = require('../config/DB');


const db = database.getDB();

exports.getMessage = (req,res,next) => {
    const request = "SELECT * FROM post"
    db.query(request,(err,result) => {
        res.status(200).json(result);
    })

}
exports.postMessage = (req, res, next) => {
    console.log('post');
    console.log(req.body)
    if(!req.body.description | !req.body.userID | !req.body.name) {
        res.status(400).json({error: "No Message"})
    }
    else{
        console.log('test');
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
exports.deleteMessage = (req, res, next) => {

}
exports.likeMessage = (req, res, next) => {

}
exports.commentMessage = (req, res, next) => {

}
exports.getMessageUser = (req, res, next) => {

}