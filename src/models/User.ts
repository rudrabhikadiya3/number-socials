// models/User.ts
import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
  username: string
  password: string
  createdAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  createdAt: {
    type: Number,
    required: [true, 'Created date is required'],
  },
})

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User
