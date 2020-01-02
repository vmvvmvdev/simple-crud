const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const findEditorByEmail = require('../../modules/editor/findEditorByEmail');

const fieldNames = {
	usernameField: 'email',
	passwordField: 'password'
};

const verifyCallback = async (email, password, done) => {
	try {

		console.log(email, password);
		const editor = await findEditorByEmail(email);

		if(editor==null) {
			console.log('editor not found', email);
			return done(null, false, { error: 'Invalid email or password.'})
		} 

		const isPasswordValid = await editor.comparePassword(password);

		if(!isPasswordValid) {
			console.log('password doesn\'t match');
			return  done(null, false, { error: 'Invalid email or password.'})
		} 

		return done(null, editor);

	} catch(error) {
		return done(error);
	}
}

const localStrategy = new LocalStrategy(fieldNames, verifyCallback);

passport.use(localStrategy);