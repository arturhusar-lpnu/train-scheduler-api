import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { UserErrors } from './enums/user-errors.enum';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    try {
      return await this.userRepo.createUser(authCredentialsDto);
    } catch (error) {
      if (+error.code === UserErrors.DuplicateName) {
        throw new ConflictException('Username is taken');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  public async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;

    const user = await this.userRepo.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const paylaod: JwtPayload = { username };
      const accessToken = this.jwtService.sign(paylaod);

      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'User Not Found. Try create a new account',
      );
    }
  }
}
