const {
  AuthenticationError
} = require('apollo-server-express');
// import user model
const {
  User, ToDo
} = require('../models');
// import sign token function from auth
const {
  signToken
} = require('../utils/auth');

const resolvers = {

  // get a single user by either their id or their username
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({
          _id: context.user._id
        })
        .populate('toDo');

        return userData
      }
      throw new AuthenticationError('Not logged in');
    }
  },

  Mutation: {
    // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return {
        token,
        user
      };
    },
    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    login: async (parent, {
      email,
      password
    }) => {
      const user = await User.findOne({
        email
      });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return {
        token,
        user
      };
    },

    // Add a new todo
    addToDo: async (parent, args, context) => {
      if (context.user) {
        const newToDo = await ToDo.create(args)
        const updateToDo = await User.findOneAndUpdate({
          _id: context.user._id
        }, 
        {
          $push: {
            toDo:  newToDo._id 
          }
        }, 
        {
          new: true,
          runValidators: true
        })
        .select('-__v -password')
        .populate('toDo');

        return updateToDo;
      }

      throw new AuthenticationError('You need to be logged in');
    },


    removeToDo: async (parent, { _id }, context) => {
      if (context.user) {
        const updateToDo = await User.findOneAndUpdate(
          { _id: context.user._id },
          { 
          $pull: { toDo: _id }
          },
          { new: true }
        )
        .select('-__v -password')
        .populate('toDo');
        return updateToDo;
      }

      throw new AuthenticationError('You need to be logged in');
    },

    updateToDoDone: async (parent, { _id }, context) => {
      if (context.user) {
        const updateToDo = await ToDo.findOneAndUpdate(
          { _id: _id },
          { done: true },
          { new: true }
        );

        return updateToDo;
      }

      throw new AuthenticationError('You need to be logged in');
    },

    updateToDoNotDone: async (parent, { _id }, context) => {
      if (context.user) {
        const updateToDo = await ToDo.findOneAndUpdate(
          { _id: _id },
          { done: false },
          { new: true }
        );

        return updateToDo;
      }

      throw new AuthenticationError('You need to be logged in');
    },

    updateToDoText: async (parent, { _id }, context) => {
      if (context.user) {
        const testText = "test text"
        const updateToDo = await ToDo.findOneAndUpdate(
          { _id: _id },
          { text: testText },
          { new: true }
        );

        return updateToDo
      }

      throw new AuthenticationError('You need to be logged in');
    }
  }
};

module.exports = resolvers