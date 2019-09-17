function image(req, res) {
  const db = req.app.get("db");
  let imageFile = req.files.file;
  const { cohortId } = req.params;

  imageFile.mv(
    `${__dirname}/../../src/client/images/class-header-images/${req.body.filename}`,
    function(err) {
      if (err) {
        return res.status(500).send(err);
      } else {
        db.query(
          `UPDATE cohorts SET class_header = '${cohortId}.png' WHERE id = '${cohortId}'`
        )
          .then(cohorts => {
            res.status(201).json({ cohorts });
          })
          .catch(err => {
            console.log(err);
            res.status(500).end();
          });
      }
    }
  );
}

function imageChat(req, res) {
  const db = req.app.get("db");
  const { fileName } = req.params;
  let imageFile = req.files.file;
  
  if (!req.files){
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  imageFile.mv(
    `${__dirname}/../../src/client/images/chat-images/${fileName}`,
    function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ msg: "ok" })
    }
  );
}


function cohort(req, res) {
  const db = req.app.get("db");
  const { cohortId } = req.params;

  db.query(`SELECT class_header FROM cohorts WHERE id = '${cohortId}'`)
    .then(class_header => {
      res.status(201).send(class_header);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
}

function setToDefault(req, res) {
  const db = req.app.get("db");
  const { cohortId } = req.params;

  db.query(`UPDATE cohorts SET class_header = null WHERE id = '${cohortId}'`)
    .then(class_header => {
      res.status(201).send(class_header);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
}

module.exports = {
  image,
  cohort,
  setToDefault,
  imageChat
};
