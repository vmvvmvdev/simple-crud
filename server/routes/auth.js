const express = require('express');
const router = express.Router();
const passport = require('passport');

const createEditor = require('../modules/editor/createEditor');
const findEditorByEmail = require('../modules/editor/findEditorByEmail');

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(req.user);
  res.json(true);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json(true)
});

router.get('/checkLogin', (req, res) => {
  if (req.user) {
    res.json(true)
  } else {
    res.json(false)
  }
});

router.post('/register', async (req, res, next) => {

  const {email, password} = req.body;

  if(email == null || password == null) {
    const allFieldsRequiredError = new Error(' all requried fields must by provided:email, password');
    allFieldsRequiredError.status = 400;
    return next(allFieldsRequiredError)
  }

  const isEditorExists = await findEditorByEmail(email);

  if(isEditorExists) {
    const alreadyExistsError = new Error('editor alrady exists');
    alreadyExistsError.status = 409;
    return next(alreadyExistsError)
  }

  await createEditor(email, password);

  res.redirect(307, './login');
});


module.exports = router;