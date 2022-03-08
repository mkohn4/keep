const {
  AuthenticationError
} = require('apollo-server-express');
// import user model
const {
  User
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
        //   .populate('savedbooks');

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
    // TODO: add a new todo
    addToDo: async (parent, args, context) => {
      if (context.user) {
        const updateUser = await User.findOneAndUpdate({
          _id: context.user._id
        }, {
          $push: {
            toDo: args
          }
        }, {
          new: true,
          runValidators: true
        });

        return updateUser;
      }

      throw new AuthenticationError('You need to be logged in');
    },


    removeToDo: async (parent, { _id }, context) => {
      if (context.user) {
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { toDo: { _id: _id } } },
          { new: true }
        );

        return updateUser;
      }

      throw new AuthenticationError('You need to be logged in');
    }

    // updateToDo: async (parent, { _id }, context) => {
    //   if (context.user) {
    //     const updateUser = await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $set: { toDo: { _id: _id } } },
    //       { new: true }
    //     );

    //     return updateUser;
    //   }

    //   throw new AuthenticationError('You need to be logged in');
    // }

    // TODO: update todo text
    // TODO: update to opposite boolean
  }
};

module.exports = resolvers