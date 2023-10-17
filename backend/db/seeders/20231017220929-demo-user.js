'use strict';
const bcrypt = require("bcryptjs");

const { User } = require('../models'); // Import the User model

module.exports = {
  async up(queryInterface, Sequelize) {
    const options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA; // Define your schema in options object
    }

    await User.bulkCreate([
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    const options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA; // Define your schema in options object
    }

    const Op = Sequelize.Op;

    return User.destroy({
      where: {
        username: {
          [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'],
        },
      },
    });
  },
};
