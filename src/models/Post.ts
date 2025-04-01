import mongoose, { Schema, Document } from 'mongoose'
import { IUser } from './User'

export interface IPost extends Document {
  number: number
  userId: mongoose.Types.ObjectId | IUser
  createdAt: Date
}

const PostSchema: Schema = new Schema({
  number: { type: Number, required: [true, 'Starting number is required'] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'User ID is required'] },
  createdAt: { type: Number },
})

const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema)

export default Post
