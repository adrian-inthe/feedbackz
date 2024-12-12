import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateFeedbackDto as SharedDto } from '../../../../shared/types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto implements SharedDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    description: 'The name of the feedback',
    type: String,
    maxLength: 50,
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(320)
  @ApiProperty({
    description: 'The email address of the user submitting the feedback',
    type: String,
    maxLength: 320,
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
  @MaxLength(100)
  @ApiProperty({
    description: 'The title of the feedback',
    type: String,
    maxLength: 100,
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @ApiProperty({
    description: 'The content of the feedback',
    type: String,
    maxLength: 1000,
  })
  message: string;
}
