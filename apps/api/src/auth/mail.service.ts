import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  sendMail(to: string, token: string) {
    const resetLink = `http://yourapp.com/reset-password?token=${token}`;

    const mailOptions = {
      from: 'messenger-mail-servce',
      to: to,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`,
    };

    this.mailService.sendMail(mailOptions);
  }
}
