import { promisify } from 'util';
import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
  compareHash(hash) {
    return bcrypt.compare(hash, this.password);
  },
  generateToken() {
    return jwt.sign({ _id: this._id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
  },
  authenticate(token) {
    return promisify(jwt.verify)(token, authConfig.secret);
  },
};

export default model('User', UserSchema);
