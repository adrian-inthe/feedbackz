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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Create feedback' })
  @ApiBody({
    description: 'The feedback to be created',
    type: CreateFeedbackDto,
  })
  @ApiResponse({ status: 201, description: 'Feedback created successfully' })
  @ApiResponse({ status: 400, description: 'Feedback validation error' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createFeedback(
    @Body() createFeedbackDto: CreateFeedbackDto,
  ): Promise<Feedback> {
    return this.feedbackService.createFeedback(createFeedbackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve feedback list' })
  @ApiResponse({
    status: 200,
    description: 'Feedback list retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'No feedback found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAllFeedback(): Promise<Feedback[]> {
    const feedbacks = await this.feedbackService.getFeedbackList();
    if (!feedbacks || feedbacks.length === 0) {
      throw new NotFoundException('No feedbacks found');
    }
    return feedbacks;
  }
}
