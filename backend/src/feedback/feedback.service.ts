import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Feedback } from './schemas/feedback.schema';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private feedbackModel: Model<Feedback>,
  ) {}

  async createFeedback(
    createFeedbackDto: CreateFeedbackDto,
  ): Promise<Feedback> {
    const feedback = new this.feedbackModel({
      _id: new Types.ObjectId(),
      ...createFeedbackDto,
    });
    return feedback.save();
  }

  async getAllFeedback(): Promise<Feedback[]> {
    return this.feedbackModel.find().sort({ createdAt: 1 }).exec();
  }
}
