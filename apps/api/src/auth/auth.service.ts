import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.secvice';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { SingUpDTO } from './dto/sing-up.dto';
import * as bcrypt from 'bcrypt';

import { SignInDTO } from './dto/sing-in.dto';
import { nanoid } from 'nanoid';
import { RefreshTokenRepository } from './refresh-token.repository copy';
import { MailService } from './mail.service';
import { ResetTokenRepository } from './reset-token.repository';
import { HASH_ROUND } from 'src/config/constants';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly resetTokenRepository: ResetTokenRepository,
    private readonly mailService: MailService,
  ) {}

  async singIn({ email, password }: SignInDTO) {
    const user = await this.validateUser(email, password);

    const tokens = await this.generateTokens(user._id.toString());

    return {
      tokens,
      userId: user._id,
    };
  }

  async singUp({ username, email, password }: SingUpDTO) {
    const isEmailInUse = await this.userService.getUserByEmail(email);
    if (isEmailInUse) {
      throw new BadRequestException('User is already exist');
    }
    const hashedPassword = await this.hashPassword(password);

    return await this.userService.createUser({
      username,
      email,
      password: hashedPassword,
    });
  }

  async signOut(userId: string) {
    await this.expireRefreshToken(userId);
    return { message: 'Successfully signed out' };
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, HASH_ROUND);
  }
  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('No user found');
    }
    const passwordEquals = await this.comparePassword(password, user?.password);

    if (!passwordEquals) {
      throw new UnauthorizedException('Invalid email or passoword');
    }

    return user;
  }

  async generateTokens(id: string) {
    const accessToken = this.jwtService.sign({
      id,
    });
    const refreshToken = uuidv4();
    await this.storeRefreshToken(refreshToken, id);
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(token: string) {
    const refreshToken = await this.refreshTokenRepository.findOne({
      token,
      expiryDate: { $gte: new Date() },
    });

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh Token is invalid');
    }

    return this.generateTokens(refreshToken._id.toString());
  }

  async storeRefreshToken(token: string, userId: string) {
    let expiryDate = new Date();
    expiryDate = moment(expiryDate).add(3, 'm').toDate();
    await this.refreshTokenRepository.upsert(
      { userId },
      { $set: { expiryDate, token } },
    );
  }

  async expireRefreshToken(userId: string) {
    const expiryDate = new Date();
    await this.refreshTokenRepository.upsert(
      { userId },
      { $set: { expiryDate } },
    );
  }

  async changePassword(
    oldPassword: string,
    newPassword: string,
    userId: string,
  ) {
    const user = await this.userService.getUser(userId);

    if (!user) {
      throw new NotFoundException('No user found');
    }

    const isCorrectPassword = await this.comparePassword(
      oldPassword,
      user.password,
    );

    if (!isCorrectPassword) {
      throw new ForbiddenException('Old password is not correct');
    }

    const newHashedPassword = await this.hashPassword(newPassword);
    user.password = newHashedPassword;
    user.save();
    return user.toJSON();
  }

  async forgotPassword(email: string) {
    const user = await this.userService.getUserByEmail(email);

    if (user) {
      const resetToken = nanoid(64);
      let expiryDate = new Date();
      expiryDate = moment(expiryDate).add(1, 'h').toDate();

      this.resetTokenRepository.create({
        userId: user._id.toString(),
        token: resetToken,
        expiryDate,
      });
      this.mailService.sendMail('unterdog28@gmail.com', resetToken);
    }
    return { message: 'If the user exists, they will reciave an email' };
  }

  async resetPassword(resetToken: string, newPassword: string) {
    const token = await this.resetTokenRepository.findOne({
      token: resetToken,
      $gte: { expiryDate: new Date() },
    });

    if (!token) {
      throw new BadRequestException('Reset token is invalid');
    }

    const user = await this.userService.getUser(token.userId);

    if (!user) {
      throw new BadRequestException('No user found');
    }

    const newHashedPassword = await this.hashPassword(newPassword);

    user.password = newHashedPassword;

    await user.save();

    return { message: 'Password was correctly reseted' };
  }
}
