import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { Invite } from './invite.model';
import { InviteService } from './invite.service';
import { InviteCreateDto } from './invite.create.dto';
import { InvitePipe } from './invite.pipe';

@Controller('invite')
export class InviteController {

  constructor(private inviteService: InviteService) {
  }

  @Post('/')
  @UsePipes(new InvitePipe())
  async createInvite(@Body() inviteCreateDTO: InviteCreateDto): Promise<Invite> {
    return await this.inviteService.create(inviteCreateDTO, '5f409d08e21518d675cbf747');
  }

}
