import { ApiProperty } from '@nestjs/swagger';
import { Feedback } from '../schemas/feedback.schema';

export class PaginatedResponse {
  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'Total number of feedbacks',
    example: 100,
  })
  totalCount: number;

  @ApiProperty({
    type: [Feedback],
    description: 'List of feedbacks for the current page',
  })
  data: Feedback[];
}
