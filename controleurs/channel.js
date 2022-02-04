const database = require('../config/DB');

const db = database.getDB();

//Marche (retourne les id des channels)
exports.getAllChannels = (req, res, next) => {
    console.log('getAllChannels');
    const sql = "SELECT id_channel FROM groupomania.acces WHERE ?";
    const value = {
        id_user : parseInt(req.headers.authorization.split(' ')[2]),
    }
    db.query(sql, value,(err,result)=>{
        if(err){
            res.status(500).json(err)
        }
        console.log(result);
        res.status(200).json(result);
    })
   
}
//Marche
exports.getChannelByID = (req, res, next) => {
    if(!req.params.id){
        res.status(404).end();
    }
    console.log('getChannelBy', req.params.id);
    const sql = "SELECT * FROM groupomania.channel WHERE ?";
    const value = {
        id : req.params.id,
    }
    db.query(sql, value,(err, result) => {
        if(err){
            res.status(500).json(err)
        }
        console.log(result);
        res.status(200).json(result[0]);
    })
    
}
//Marche
exports.createChannel = (req, res, next) => {
    if(!req.body.nameChan){
        res.status(404).end();
    }
    const sql = "INSERT INTO groupomania.channel SET ?";
    const value = {
        name : req.body.nameChan,
    }
    db.query(sql, value, (err, result) => {
        if(err){
            res.status(500).json(err)
        }
        res.status(200).json({message: "Channel créer"});
    })
    
}
//Marche pas tre bien | ajouter la suppression des acces et des message du channel
exports.removeChannel = (req, res, next) => {
    if(!req.body.userID || req.params.id){
        res.status(404).end();
    }
    const sql = "SELECT * FROM groupomania.acces WHERE ? AND ?";
    const value = [{
        id_user : req.body.userID
    },{
        id_channel : req.params.id
    }]
    db.query(sql, value, (err, result) => {
        console.log(result.length);
        if(result.length > 0){
            if (result[0].op) {
                const sql2 = "DELETE FROM groupomania.channel WHERE ?";
                const value2 = {
                  id: req.params.id,
                };
                db.query(sql2, value2, (err2, result2) => {
                    removeAllAcces(req.params.id);
              res.status(200).json({ message: "Channel supprimé" });
            });
          }
          res.status(400).end();
        }
        else{
            res.status(404).end();
        }
        })
    }

function removeAllAcces(id){
    const sql = "DELETE FROM groupomania.acces WHERE ?";
    const value = {
      id_channel: id,
    };
    ;
    db.query(sql, value, (err, result) => {
        if(err) {
            console.log(err);
            res.status(403).end();
        }
        res.status(200).end();
    })

}