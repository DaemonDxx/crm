import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invite } from './invite.model';
import { InviteCreateDto } from './invite.create.dto';

@Injectable()
export class InviteService {

  constructor(@InjectModel('Invite') private inviteModel: Model<Invite>

  ) {
  }

  async create(inviteCreateDTO: InviteCreateDto, fromUserID: string): Promise<Invite> {
    const ob = Object.assign(inviteCreateDTO, { userFrom: fromUserID });
    const invite = new this.inviteModel(ob);
    return invite.save();
  }

}
