// models/Comment.ts
import mongoose, { Schema, Document } from 'mongoose'
import { IUser } from './User'

export interface IComment extends Document {
  postId: mongoose.Types.ObjectId
  parentId: mongoose.Types.ObjectId | null
  number: number
  userId: mongoose.Types.ObjectId | IUser
  createdAt: number
}

const CommentSchema: Schema = new Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: [true, 'Post ID is required'] },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
  number: { type: Number, required: [true, 'Number result is required'] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'User ID is required'] },
  createdAt: { type: Number, required: [true, 'Created date is required'] },
})

const Comment = mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema)

export default Comment
