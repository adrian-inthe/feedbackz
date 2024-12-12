import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/feedback-app',
    ),
    FeedbackModule,
  ],
})
export class AppModule {}
