import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.create({
      username,
      password: hashedPassword,
    });

    await this.save(newUser);
  }
}
