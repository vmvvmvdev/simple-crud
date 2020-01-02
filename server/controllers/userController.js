const userModel = require('../models/User');

const userController = {
  createUser: async (req, res, next)=> {
    try {

      const {email, userName, lastName, birthDate, description} = req.body;

      if([email, userName, lastName, birthDate].some(value=>value == null)) {
        const allFieldsRequiredError = new Error(' all requried fields must by provided:email, userName, lastName, birthDate');
        allFieldsRequiredError.status = 400;
        throw allFieldsRequiredError;
      }

      const newUser = new userModel({email, userName, lastName, birthDate, description});
      await newUser.save();
      return res.json({message:'user successfully created'});
    } catch(error) {
      next(error);
    }
  },
  getUsers: async ( req, res )=> {
    try {

      const {page=1, limit=20} = req.query;
      const users = await userModel.paginate({}, { page, limit });
      res.json(users);
      
    } catch(error) {
      next(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const {id} = req.body;
      if(id == null) {
        const idRequiredError = new Error('id must be provided');
        idRequiredError.status = 400;
        throw idRequiredError;
      }

      await userModel.findByIdAndRemove(id);
      res.json({message:'user successfully deleted'});

    } catch(error) {
      next(error);
    }
  },

  updateUser: async (req, res) => {
      try {
        const {_id, ...params} = req.body;
        if(id == null) {
          const idRequiredError = new Error('id must be provided');
          idRequiredError.status = 400;
          throw idRequiredError;
        }
        await userModel.findOneAndUpdate({_id},params);
        res.json({message:'user successfully updated'});

      } catch(error) {
        next(error);
      }
  }

}

module.exports = userController;