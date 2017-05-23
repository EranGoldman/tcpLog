import mongoose, { Schema } from 'mongoose'

const logSchema = new Schema({
  source: {
    type: String
  },
  type: {
    type: String
  },
  message: {
    type: String
  },
  comment: {
    type: String
  }
}, {
  timestamps: true
})

logSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      source: this.source,
      type: this.type,
      message: this.message,
      comment: this.comment,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Log', logSchema)

export const schema = model.schema
export default model
