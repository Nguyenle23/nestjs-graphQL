import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { SignUpInput } from './dto/signup-input';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { SignInInput } from './dto/signin-input';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async signup(signUpInput: SignUpInput) {
    const hash = await bcrypt.hash(signUpInput.password, saltOrRounds);
    const checkExist = await this.prisma.user.findUnique({
      where: { phoneNumber: signUpInput.phoneNumber },
    });
    if (checkExist) {
      throw new ForbiddenException('Phone number already exists');
    }
    const user = await this.prisma.user.create({
      data: {
        userName: signUpInput.userName,
        phoneNumber: signUpInput.phoneNumber,
        nameDisplay: signUpInput.nameDisplay,
        avatarURL: "https://res.cloudinary.com/nguyenle23/image/upload/v1666155475/house/pngwing.com_t7z9cj.png",
        password: hash,
      },
    });
    const { accessToken, refreshToken } = await this.createToken(
      user.userID,
      user.phoneNumber
    );
    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async signin(signInInput: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: { phoneNumber: signInInput.phoneNumber },
    });
    if (!user) {
      throw new ForbiddenException('Phone number does not exist');
    }
    const isMatch = await bcrypt.compare(
      signInInput.password,
      user.password,
    );
    if (!isMatch) {
      throw new ForbiddenException('Password is incorrect');
    }
    const { accessToken, refreshToken } = await this.createToken(
      user.userID,
      user.phoneNumber,
    );
    return {
      accessToken,
      refreshToken,
      user
    }
  }

  async createToken(userID: number, phoneNumber: string) {
    const accessToken = await this.jwtService.sign(
      { userID, phoneNumber },
      {
        expiresIn: '1m',
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      }
    );
    const refreshToken = await this.jwtService.sign(
      { userID, phoneNumber, accessToken },
      {
        expiresIn: '7d',
        secret: this.configService.get('REFESH_TOKEN_SECRET'),
      }
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(userID: number) {
    const user = await this.prisma.user.findUnique({
      where: { userID },
    });
    if (!user) {
      throw new ForbiddenException('User does not exist');
    }
    return {
      loggedOut: true,
    };
  }

  async getNewTokens(userID: number, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { userID: userID },
    });
    if (!user) {
      throw new ForbiddenException('User does not exist');
    }
    const { accessToken, refreshToken: newRefreshToken } = await this.createToken(
      user.userID,
      user.phoneNumber,
    );
    return {
      accessToken,
      refreshToken: newRefreshToken,
      user,
    }; 
  }
}
