function image(req, res) {
  let imageFile = req.files.file;

  imageFile.mv(
    `${__dirname}/../../src/client/images/class-header-images/${req.body.filename}`,
    function(err) {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.json({ file: `public/${req.body.filename}` });
      }
    }
  );
}

module.exports = {
  image
};
