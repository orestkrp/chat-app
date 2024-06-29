import {
  Body,
  Controller,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sing-in.dto';
import { SingUpDTO } from './dto/sing-up.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard.ts';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: SignInDTO })
  @ApiResponse({ status: 200, description: 'Successfully signed in' })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
  async signIn(@Body() credentials: SignInDTO) {
    return await this.authService.singIn(credentials);
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: 'Successfully signed out' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async signOut(@Request() request) {
    console.log(request.user);
    return await this.authService.signOut(request.user.id);
  }

  @Post('/registration')
  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ type: SingUpDTO })
  @ApiResponse({ status: 201, description: 'Successfully signed up' })
  @ApiResponse({ status: 400, description: 'User already exists' })
  async sinUp(@Body() userDto: SingUpDTO) {
    console.log(userDto);
    return await this.authService.singUp(userDto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiBody({ type: RefreshTokenDTO })
  @ApiResponse({ status: 200, description: 'Tokens refreshed' })
  @ApiResponse({ status: 401, description: 'Token is invalid' })
  async refresh(@Body() { refreshToken }: RefreshTokenDTO) {
    return await this.authService.refreshTokens(refreshToken);
  }

  @UseGuards(AuthGuard)
  @Post('change-password')
  @ApiOperation({ summary: 'Change password' })
  @ApiBody({ type: ChangePasswordDTO })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Password changed' })
  @ApiResponse({ status: 403, description: 'Old password is incorrect' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async changePassword(
    @Body() { oldPassword, newPassword }: ChangePasswordDTO,
    @Req() request,
  ) {
    return await this.authService.changePassword(
      oldPassword,
      newPassword,
      request.user.id,
    );
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Forgot password' })
  @ApiBody({ type: ForgotPasswordDTO })
  @ApiResponse({ status: 200, description: 'Password reset email sent' })
  async forgotPassword(@Body() { email }: ForgotPasswordDTO) {
    return this.authService.forgotPassword(email);
  }

  @Put('reset-password')
  @ApiOperation({ summary: 'Reset password' })
  @ApiBody({ type: ResetPasswordDTO })
  @ApiResponse({ status: 200, description: 'Password reset' })
  @ApiResponse({ status: 400, description: 'Invalid reset token' })
  async resetPassword(@Body() { resetToken, newPassword }: ResetPasswordDTO) {
    return this.authService.resetPassword(resetToken, newPassword);
  }
}
