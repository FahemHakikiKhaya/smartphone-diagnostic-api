import { Module } from '@nestjs/common';
import { UserResultController } from './user-result.controller';
import { UserResultService } from './user-result.service';

@Module({
  controllers: [UserResultController],
  providers: [UserResultService]
})
export class UserResultModule {}
