import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('auth/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  @EventPattern('profile_created')
  async createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }
}
