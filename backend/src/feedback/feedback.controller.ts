import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Feedback } from './schemas/feedback.schema';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createFeedback(
    @Body() createFeedbackDto: CreateFeedbackDto,
  ): Promise<Feedback> {
    return this.feedbackService.createFeedback(createFeedbackDto);
  }

  @Get()
  async getAllFeedback(): Promise<Feedback[]> {
    const feedbacks = await this.feedbackService.getFeedbackList();
    if (!feedbacks || feedbacks.length === 0) {
      throw new NotFoundException('No feedbacks found');
    }
    return feedbacks;
  }
}
