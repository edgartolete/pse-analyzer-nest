import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private dataSource: DataSource) {}

  async create(createUser: CreateUserDto) {
    return await this.dataSource
      .createQueryBuilder()
      .insert()
      .into('user')
      .values({ ...createUser })
      .execute();
  }

  findAll() {
    return `This action returns all users`;
  }

  async findUserByname(username: string): Promise<User | null> {
    return await this.dataSource
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.username = :username', { username })
      .getOne();
  }

  async findOne(id: number) {
    return await this.dataSource
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.id = :id', { id })
      .getOne();
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  async updatePassword(id: number, password: string) {
    return await this.dataSource
      .createQueryBuilder()
      .update(User)
      .set({ password })
      .where('id = :id', { id })
      .execute();
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
