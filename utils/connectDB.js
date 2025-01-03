const mongoose = require('mongoose');

module.exports = async () => {
  const string = process.env.DB_CONNECTION.replace(
    '<db_password>',
    process.env.DB_PASSWORD
  );

  await mongoose.connect(string);

  console.log('Mongo connected! 🦊');
};
