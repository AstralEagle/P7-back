module.exports = (req,res,next) => {
  if (req.body.email) {
    console.log("Verif Email");
  } else {
    res.status(400).json({ error: "Email non conforme" });
  }

  if (req.body.name) {
    console.log("Verif Name");
  } else {
    res.status(400).json({ error: "Nom non conforme" });
  }

  if (req.body.last_name) {
    console.log("Verif Nom");
  } else {
    res.status(400).json({ error: "Nom non conforme" });
  }

  if (req.body.description) {
    console.log("Verif Description");
  } else {
    res.status(400).json({ error: "Description non conform" });
  }
}