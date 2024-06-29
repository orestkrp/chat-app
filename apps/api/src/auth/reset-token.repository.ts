import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ResetToken } from '../shemas/reset-token.scheme';
import { Repository } from 'src/database/repository';

@Injectable()
export class ResetTokenRepository extends Repository<ResetToken> {
  constructor(
    @InjectModel(ResetToken.name) refreshTokenModel: Model<ResetToken>,
  ) {
    super(refreshTokenModel);
  }
}
