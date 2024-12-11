import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/feedback-app'),
    FeedbackModule,
  ],
})
export class AppModule {}
