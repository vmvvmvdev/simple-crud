const EditorModel = require('../../models/Editor');

const findEditorByEmail = async (email)=> {
  const editor = await EditorModel.findOne({email});
  return editor;
}

module.exports = findEditorByEmail;