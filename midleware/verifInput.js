const fs = require('fs');

module.exports = (req,res,next) => {
  var verifInput = true;

  const valeurs = req.file?
  { ...JSON.parse(req.body.message)}:
  {...req.body}

  // ------------------ Verif Caract
  if (valeurs.email) {
    console.log("Verif Email");
    var regExp =
      /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    if (!regExp.test(valeurs.email)) {
      verifInput = false;
      console.log("email Not verifed");
      res.status(400).json({ error: "Email non conforme" });
    }
  }

  if (valeurs.name) {
    console.log("Verif Name");
    var regExp =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{3,45}$/;
    if (!regExp.test(valeurs.name)) {
      verifInput = false;
      res.status(400).json({ error: "Prenom non conforme" });
    }
  }

  if (valeurs.last_name) {
    console.log("Verif Nom");
    var regExp =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,45}$/;
    if (!regExp.test(valeurs.last_name)) {
      verifInput = false;
      res.status(400).json({ error: "Nom non conforme" });
    }
  }

  if (valeurs.description) {
    console.log("Verif Description");
    var regExp = /^.{5,250}$/;
    if (!regExp.test(valeurs.description)) {
      verifInput = false;
      res.status(400).json({ error: "Description non conform" });
    }
  }

  if (valeurs.message) {
    var regEx = /^.{5,250}$/;
    if (!regEx.test(valeurs.message)) {
      verifInput = false;
      res.status(400).json({ error: "Message non valid" });
    }
  }

  if (valeurs.nameChan) {
    console.log("Verif Description");
    var regExp = /^.{3,45}$/;
    if (!regExp.test(valeurs.nameChan)) {
      verifInput = false;
      res.status(400).json({ error: "Nom de channel non valid" });
    }
  }
  if (valeurs.postName) {
    console.log("Verif Description");
    var regExp = /^.{3,45}$/;
    if (!regExp.test(valeurs.postName)) {
      verifInput = false;
      res.status(400).json({ error: "Nom de post non valid" });
    }
  }

  // -------------- Verif Number
  if (valeurs.userID) {
    var regEx = /^[0-9]{1,10}$/;
    if (!regEx.test(valeurs.userID)) {
      verifInput = false;
      res.status(400).json({ error: "UserId non valid" });
    }
  }

  if (valeurs.idUser) {
    var regEx = /^[0-9]{1,10}$/;
    if (!regEx.test(valeurs.idUser)) {
      verifInput = false;
      res.status(400).json({ error: "IdUser non valid" });
    }
  }

  if (valeurs.replyID) {
    var regEx = /^[0-9]{1,10}$/;
    if (!regEx.test(valeurs.replyID)) {
      verifInput = false;
      res.status(400).json({ error: "ReplyID non valid" });
    }
  }

  //--------- END
  if (verifInput) {
    next();
  }
  else if (req.file){
    fs.unlink(`/images/${req.file.filename}`,() => {console.log("Image deleted")});
  }
}