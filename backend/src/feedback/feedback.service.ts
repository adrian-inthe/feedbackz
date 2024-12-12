import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Feedback } from './schemas/feedback.schema';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  private readonly logger = new Logger(FeedbackService.name);

  constructor(
    @InjectModel(Feedback.name) private feedbackModel: Model<Feedback>,
  ) {}

  async createFeedback(
    createFeedbackDto: CreateFeedbackDto,
  ): Promise<Feedback> {
    try {
      const feedback = new this.feedbackModel({
        _id: new Types.ObjectId(),
        ...createFeedbackDto,
        createdAt: new Date(),
      });
      return await feedback.save();
    } catch (error) {
      this.logger.error('Error creating feedback:', error);
      throw new InternalServerErrorException('Failed to create feedback');
    }
  }

  async getFeedbackList(): Promise<Feedback[]> {
    try {
      return await this.feedbackModel.find().sort({ createdAt: 1 }).exec();
    } catch (error) {
      this.logger.error('Error retrieving feedback list:', error);
      throw new InternalServerErrorException(
        'Failed to retrieve feedback list',
      );
    }
  }
}
