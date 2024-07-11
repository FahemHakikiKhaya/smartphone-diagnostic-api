import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserResultDTO } from './dto/create-user-result.dto';
import { UserResultService } from './user-result.service';

@Controller('user-results')
export class UserResultController {
  constructor(private readonly userResultService: UserResultService) {}
  @Post('/')
  async createUserResult(@Body() body: CreateUserResultDTO) {
    return await this.userResultService.createUserResult(body);
  }

  @Get(':id')
  async getUserResult(@Param('id') id: number) {
    return await this.userResultService.getUserResult(id);
  }
}
