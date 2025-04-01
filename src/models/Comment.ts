import mongoose, { Schema, Document } from 'mongoose'
import { IUser } from './User'

export interface IComment extends Document {
  postId: mongoose.Types.ObjectId | string
  parentId: mongoose.Types.ObjectId | null
  number: number
  userId: mongoose.Types.ObjectId | IUser | string
  createdAt: number
}

const CommentSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'User ID is required'] },
  postId: { type: mongoose.Schema.Types.ObjectId },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
  number: { type: Number, required: [true, 'Number result is required'] },
  createdAt: { type: Number, required: [true, 'Created date is required'] },
})

const Comment = mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema)

export default Comment
