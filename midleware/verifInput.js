module.exports = (req,res,next) => {
  var verifInput = true;

  // ------------------ Verif Caract
  if (req.body.email) {
    console.log("Verif Email");
    var regExp =
      /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    if (!regExp.test(req.body.email)) {
      verifInput = false;
      console.log("email Not verifed");
      res.status(400).json({ error: "Email non conforme" });
    }
  }

  if (req.body.name) {
    console.log("Verif Name");
    var regExp =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{5,45}$/;
    if (!regExp.test(req.body.name)) {
      verifInput = false;
      res.status(400).json({ error: "Nom non conforme" });
    }
  }

  if (req.body.last_name) {
    console.log("Verif Nom");
    var regExp =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{5,45}$/;
    if (!regExp.test(req.body.last_name)) {
      verifInput = false;
      res.status(400).json({ error: "Nom non conforme" });
    }
  }

  if (req.body.description) {
    console.log("Verif Description");
    var regExp = /^.{5,250}$/;
    if (!regExp.test(req.body.description)) {
      verifInput = false;
      res.status(400).json({ error: "Description non conform" });
    }
  }

  if (req.body.message) {
    var regEx = /^.{5,250}$/;
    if (!regEx.test(req.body.message)) {
      verifInput = false;
      res.status(400).json({ error: "Message non valid" });
    }
  }

  if (req.body.nameChan) {
    console.log("Verif Description");
    var regExp = /^.{3,45}$/;
    if (!regExp.test(req.body.nameChan)) {
      verifInput = false;
      res.status(400).json({ error: "Nom de channel non valid" });
    }
  }
  if (req.body.postName) {
    console.log("Verif Description");
    var regExp = /^.{3,45}$/;
    if (!regExp.test(req.body.postName)) {
      verifInput = false;
      res.status(400).json({ error: "Nom de post non valid" });
    }
  }

  // -------------- Verif Number
  if (req.body.userID) {
    var regEx = /^[0-9]{1,10}$/;
    if (!regEx.test(req.body.userID)) {
      verifInput = false;
      res.status(400).json({ error: "UserId non valid" });
    }
  }

  if (req.body.idUser) {
    var regEx = /^[0-9]{1,10}$/;
    if (!regEx.test(req.body.idUser)) {
      verifInput = false;
      res.status(400).json({ error: "IdUser non valid" });
    }
  }

  if (req.body.replyID) {
    var regEx = /^[0-9]{1,10}$/;
    if (!regEx.test(req.body.replyID)) {
      verifInput = false;
      res.status(400).json({ error: "ReplyID non valid" });
    }
  }

  //--------- END
  if (verifInput) {
    next();
  }
}