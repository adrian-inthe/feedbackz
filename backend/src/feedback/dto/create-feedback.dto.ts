import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CreateFeedbackDto as SharedDto } from '../../../../shared/types';

export class CreateFeedbackDto implements SharedDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(['Bug', 'Suggestion'])
  @IsNotEmpty()
  type: 'Bug' | 'Suggestion';

  @IsString()
  @IsNotEmpty()
  message: string;
}
