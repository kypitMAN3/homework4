import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { RegistrationDto } from './dto/registration.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService) {}

    @EventPattern('user_created')
    @Post()
    registration(@Body() dto: RegistrationDto) {
        return this.profileService.registration(dto)
    }

    @Get(':id')
    getProfile(@Param('id') id: number) {
        return this.profileService.findProfileById(id)
    }

    @EventPattern('user_updated')
    @Put(':id')
    update(@Param('id') id: number, @Body() dto: CreateProfileDto) {
        return this.profileService.update(dto, id)
    }

    @EventPattern('user_deleted')
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.profileService.remove(id)
    }
}