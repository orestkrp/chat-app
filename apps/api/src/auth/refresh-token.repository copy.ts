import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from '../shemas/refresh-token.scheme';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Repository } from 'src/database/repository';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshToken> {
  constructor(
    @InjectModel(RefreshToken.name) refreshTokenModel: Model<RefreshToken>,
  ) {
    super(refreshTokenModel);
  }
}
