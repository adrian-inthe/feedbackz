import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Feedback as FeedbackInterface } from '../../../../shared/types';

@Schema({ timestamps: true })
export class Feedback extends Document implements FeedbackInterface {
  @Prop({ required: false })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, enum: ['Bug', 'Suggestion'] })
  type: 'Bug' | 'Suggestion';

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  createdAt: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
