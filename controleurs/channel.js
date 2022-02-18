const database = require('../config/DB');

const db = database.getDB();

//Marche (retourne les id des channels)
exports.getAllChannels = (req, res, next) => {
    console.log('getAllChannels');
    const sql = "SELECT id_channel,op FROM acces WHERE ?";
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
    const sql = "SELECT * FROM channel WHERE ?";
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
    if(!req.body.nameChan || !req.body.userID){
        res.status(404).end();
    }
    const sql = "INSERT INTO channel SET ?";
    const value = {
        name : req.body.nameChan,
    }
    db.query(sql, value, (err, result) => {
        if(err){
            res.status(500).json(err)
        }
        setAccessDefault(req.body.userID)
        res.status(200).json({message: "Channel créer"});
    })
    
}
//Marche pas tre bien | ajouter la suppression des acces et des message du channel
exports.removeChannel =  (req, res, next) => {
    console.log("Channel 1")
  if (!req.body.userID || req.params.id) {
    res.status(404).end();
  }
  const sql = "DELETE FROM channel WHERE ?";
  const value = {
    id: req.params.id,
  };

  db.query(sql,value,(err, result) => {
    console.log("Channel 2")
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
      console.log("Channel 3")
      
        console.log("Channel 4")
    res.status(200).json({message: "Test"})
    }
    
  );
}


//----------------------------- FUNCTION

const deleteAllAccess = (idChan, res) => {
    console.log("Acces 1")
    const sql = "SELECT * FROM acces WHERE ?"
    const value = {
        id_channel : idChan
    }
    console.log("Acces 2")
    db.query(sql,value,(err, result) => {
        console.log("Acces 3")
        if(err){
         console.log(err);
         res.status(500).json({error : err})
     }
     else if(result.length > 0){
         console.log(result);
         console.log("Acces 4")
         for (let access of result){
             console.log(access.id);
             removeAcces(access.id, res);
            }
        }
            console.log("Acces 5")
    }
      );
     console.log("Acces 6")
}
const removeAcces = (id,res) => {
    console.log("Acces 1 by id:"+id)
    const sql = "DELETE FROM acces WHERE ?";
    const value = {
      id: id,
    };
    console.log("Acces 2 by id:"+id)
    db.query(sql, value, (err, result) => {
        console.log("Acces 3 by id:"+id)
        if(err) {
            console.log(err);
            res.status(500).json({error : err})
        }
        console.log("Acces 4 by id:"+id)
    })
}

const deleteAllMessage =  (idChan, res) => {
    console.log("Message 1")
    const sql = "SELECT * FROM message WHERE ?"
    const value = {
        id_channel : idChan
    }
    console.log("Message 2")
    db.query(sql,value,(err, result) => {
        console.log("Message 3")
     if(err){
         console.log(err);
         res.status(500).json({error : err})
     }
     else if(result.length > 0){
         console.log("Message 4")
         for (let access of result){
             removeMessage(access.id, res);
         }
        }
        console.log("Message 5")
    }
      );
}

const removeMessage = (id,res) => {
    console.log("Message 1 by id:"+id)
    const sql = "DELETE FROM message WHERE ?";
    const value = {
      id: id,
    };
    console.log("Message 2 by id:"+id)
    db.query(sql, value, (err, result) => {
        console.log("Message 3 by id:"+id)
        if(err) {
            console.log(err);
            res.status(500).json({error : err})
        }
        console.log("Message 4 by id:"+id)
    })
}



const setAccessDefault = (userId) => {
    const sql = 'SELECT id FROM channel ORDER BY id DESC LIMIT 1';
    db.query(sql,(err,result) => {
        if(err){
            throw err;
        }
        addDefaultAccess(result[0].id,userId);
    });
}
const addDefaultAccess = (idChan,userId) => {
    const value = {
        id_user : userId,
        id_channel : idChan,
        op : 1
    }
    const sql = "INSERT INTO acces SET ?";
    db.query(sql,value,(err,result) =>{
        console.log(err)
        console.log(result)
    })
}