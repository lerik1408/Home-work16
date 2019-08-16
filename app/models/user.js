/* eslint-disable */
const mongoose = require('mongoose');
const config = require('config');
const crypto = require('crypto');
const Category = require('./category')
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function checkEmail(value) {
        const re = /^(\S+)@([a-z0-9-]+)(\.)([a-z]{2,4})(\.?)([a-z]{0,4})+$/;
        return re.test(value);
      },
      message: props => `${props.value} is not a valid email.`,
    },
  },
  photo: {
    type: String,
    default: config.get('defaultUserPhotoUrl'),
  },
  gender: {
    type: String,
    enum: ['Mr', 'Ms','undefined?'],
    default: 'undefined?',
  },
  stack: [{
    ref: Category,
    type: mongoose.Schema.Types.ObjectId,
    // default: 'Front-end',
  }],
    // enum: ['Front-end','Back-end'],
    // default: 'Front-end',
  country: {
    type: String,
    default: 'Ukraine',
  },
  dailyRate: {
    type: Number,
    default: 500,
  },
  mobile: {
    type: String,
  },
  rating: {
    type: Number,
    default: 3,
  },
  passwordHash: {
    type: String,
  },
  salt: {
    type: String,
  },
  company: {
    type: String,
  },
  token: {
    type: String,
    default: "tok",
  },
});

userSchema.virtual('password')
  .set(function (password) {
    if (!password) {
      this.invalidate('password', 'Password can\'t be empty!');
    }

    if (password !== undefined) {
      if (password.length < 6) {
        this.invalidate('password', 'Password can\'t be less than 6 symbols!');
      }
    }

    this._plainPassword = password;

    if (password) {
      this.salt = crypto.randomBytes(config.get('crypto').hash.length).toString('base64');
      this.passwordHash = crypto.pbkdf2Sync(
        password,
        this.salt,
        config.get('crypto').hash.iterations,
        config.get('crypto').hash.length,
        'sha1',
      ).toString('base64');
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  })
  .get(function () {
    this._plainPassword;
  });

userSchema.methods.checkPassword = function (password) {
  if (!password) return false;
  if (!this.passwordHash) return false;

  return crypto.pbkdf2Sync(
    password,
    this.salt,
    config.get('crypto').hash.iterations,
    config.get('crypto').hash.length,
    'sha1',
  ).toString('base64') === this.passwordHash;
};


module.exports = mongoose.model('User', userSchema);
