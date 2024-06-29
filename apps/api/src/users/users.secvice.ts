import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { SingUpDTO } from '../auth/dto/sing-up.dto';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(user: SingUpDTO) {
    return await this.usersRepository.create(user);
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne({
      email,
    });
  }

  async getUsers() {
    return await this.usersRepository.find({});
  }

  async updateAvatar(userId: Types.ObjectId, avatarUrl: string) {
    const user = await this.usersRepository.findOneAndUpdate(
      { _id: userId },
      { image: avatarUrl },
    );

    if (!user) {
      throw new BadRequestException('User is not found');
    }
    return user;
  }

  async getUser(id: string) {
    return await this.usersRepository.findById(id);
  }

  async searchUsers(search: string, page: number, limit: number) {
    const query = search ? { username: new RegExp(search, 'i') } : {};
    return await this.usersRepository.search(query, page, limit);
  }
}
