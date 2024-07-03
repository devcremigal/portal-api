import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(data: CreateUserDto) {
    const chkUser = await this.findByEMail(data.email);

    if (chkUser) {
      throw new BadRequestException(
        `El correo electronico ${data.email} ya existe`,
      );
    }

    const hashedPassword = await this.hashPassword(data.password);
    const user = this.userRepo.create({
      ...data,
      password: hashedPassword,
    });

    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOne({
      where: { id },
    });
  }

  findByEMail(email: string) {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);

    if (changes.password) {
      changes.password = await this.hashPassword(changes.password);
    }

    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async validateUser(email: string, plainPassword: string): Promise<User> {
    const user = await this.findByEMail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const passwordValid = await this.comparePasswords(
      plainPassword,
      user.password,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    return user;
  }
}
