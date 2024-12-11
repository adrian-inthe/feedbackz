import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CreateFeedbackDto as SharedDto } from '../../../../shared/types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto implements SharedDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the feedback',
    type: String,
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The email address of the user submitting the feedback',
    type: String,
  })
  email: string;

  @IsEnum(['Bug', 'Suggestion'])
  @IsNotEmpty()
  @ApiProperty({
    description: 'The type of feedback, either "Bug" or "Suggestion"',
    enum: ['Bug', 'Suggestion'],
    type: String,
  })
  type: 'Bug' | 'Suggestion';

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the feedback',
    type: String,
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The content of the feedback',
    type: String,
  })
  message: string;
}
