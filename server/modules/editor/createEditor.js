const EditorModel = require('../../models/Editor');

const createEditor = async (email, password)=>{
  const editor = new EditorModel({email, password});
  await editor.save();
  return editor;
}

module.exports = createEditor;