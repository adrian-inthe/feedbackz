import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Feedback } from './schemas/feedback.schema';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginatedResponse } from './dto/paginated-response.dto';

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
  @ApiOperation({ summary: 'Retrieve feedback list with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number (default is 1)',
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page (default is 10)',
    type: Number,
    example: 10,
  })
  @ApiQuery({
    name: 'filterByType',
    required: false,
    description: 'Filter by feedback type ("Bug" or "Suggestion")',
    type: String,
    example: 'Bug',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description:
      'Sort by field and direction (e.g. "createdAt.asc", "createdAt.desc", "name.asc", "name.desc")',
    type: String,
    example: 'createdAt.desc',
  })
  @ApiResponse({
    status: 200,
    description: 'Feedback list retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'No feedback found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAllFeedback(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('filterByType') filterByType?: string,
    @Query('sortBy') sortBy: string = 'createdAt.desc',
  ): Promise<PaginatedResponse> {
    const feedbacks = await this.feedbackService.getFeedbackList(
      page,
      limit,
      filterByType,
      sortBy,
    );
    if (!feedbacks || feedbacks.data.length === 0) {
      throw new NotFoundException('No feedbacks found');
    }
    return feedbacks;
  }
}
