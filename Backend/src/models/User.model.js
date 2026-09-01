import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  // Basic Info
  displayId: {
    type: String,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // never return password in queries
  },

  // Balances
  VEs: {
    type: Number,
    default: 0,
    min: 0,
  },
  SVEs: {
    type: Number,
    default: 0,
    min: 0,
  },
  Tokens: {
    type: Number,
    default: 0,
    min: 0,
  },

  // Role
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

  // Status
  isActive: {
    type: Boolean,
    default: true,
  },

}, { timestamps: true });

// ── Hash password before saving ──────────────────────
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return ;
  this.password = await bcrypt.hash(this.password, 12);

});

// ── Generate masked display ID like VE****25 ─────────
userSchema.pre('save', function () {
  if (!this.displayId && this._id) {
    const str = this._id.toString();
    this.displayId = 'VE' + str.slice(-4).toUpperCase();
  }
});

// ── Compare password method ──────────────────────────
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;