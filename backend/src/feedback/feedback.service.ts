import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Feedback } from './schemas/feedback.schema';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { PaginatedResponse } from './dto/paginated-response.dto';

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

  async getFeedbackList(
    page: number,
    limit: number,
    filterByType?: string,
    sortBy: string = 'createdAt.desc',
  ): Promise<PaginatedResponse> {
    try {
      const query: any = {};
      if (filterByType) {
        query.type = filterByType;
      }

      const totalCount = await this.feedbackModel.countDocuments(query);

      // Define the sort based on the `sortBy` parameter
      const sort: any = {};
      if (sortBy === 'createdAt.asc') {
        sort.createdAt = 1;
      } else if (sortBy === 'createdAt.desc') {
        sort.createdAt = -1;
      } else if (sortBy === 'name.asc') {
        sort.name = 1;
      } else if (sortBy === 'name.desc') {
        sort.name = -1;
      }

      const feedbacks = await this.feedbackModel
        .find(query) // Apply the filter query here
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sort) // Apply sorting here
        .exec();

      return {
        page,
        limit,
        totalCount,
        data: feedbacks,
      };
    } catch (error) {
      this.logger.error('Error retrieving feedback list:', error);
      throw new InternalServerErrorException(
        'Failed to retrieve feedback list',
      );
    }
  }
}
