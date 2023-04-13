import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { RegistrationDto } from './dto/registration.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UsersService } from 'apps/auth/src/users/users.service';
import { AuthService } from 'apps/auth/src/auth.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProfileService {

  constructor(@InjectModel(Profile) private profileRepository: typeof Profile,
              @Inject('USER') private userService: ClientProxy
            ) {}

  async registration(dto: RegistrationDto) {                                                            
    const hashPassword = await bcrypt.hash(dto.password, 5)                                             
       
    const user = await lastValueFrom(
        this.userService.emit('profile_created', {
            email: dto.email, 
            password: hashPassword
        }),
      );

    await this.createProfile({fullName: dto.fullName, phoneNumber: dto.phoneNumber, userId: user.id})
    return user
}

async createProfile(dto: CreateProfileDto) {
    const profile = await this.profileRepository.create(dto)
    return profile
}

async update(dto: CreateProfileDto, id: number) {
    const profile = await this.findProfileById(id)

    if(profile) {
        await profile.update({...dto, userId: profile.userId})
        return profile
    }

    throw new HttpException('Profile not found', HttpStatus.NOT_FOUND)
}

async remove(id: number) {
    const profile = await this.findProfileById(id)

    if(profile) {
        await profile.destroy()
        return true
    }

    throw new HttpException('Profile not found', HttpStatus.NOT_FOUND)
}

async findProfileById(id: number) {
    const  profile = await this.profileRepository.findByPk(id)

    if (profile) {
        return profile
    }

    throw new HttpException('Profile not found', HttpStatus.NOT_FOUND)
}
}
