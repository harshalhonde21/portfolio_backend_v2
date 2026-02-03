import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  source?: string;
  userAgent?: string;
  ipAddress?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, index: true },
    phone: { type: String, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    source: { type: String },
    userAgent: { type: String },
    ipAddress: { type: String },
    metadata: { type: Map, of: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const Contact = mongoose.model<IContact>('Contact', ContactSchema);
