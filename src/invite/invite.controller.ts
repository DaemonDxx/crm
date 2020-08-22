import { Body, Controller, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { Invite } from './invite.model';
import { InviteService } from './invite.service';
import { InviteCreateDto } from './invite.create.dto';
import { InvitePipe } from './invite.pipe';
import { PermissionGuard } from '../Utils/permission.guard';
import { Permissions } from '../Utils/permissions.decorator';
import PermissionsList from '../Utils/PermissionsList';
import { AuthGuard } from '@nestjs/passport';

@Controller('invite')
export class InviteController {

  constructor(private inviteService: InviteService) {
  }

  @Post('/')
  @Permissions(PermissionsList.creator, PermissionsList.invite)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @UsePipes(new InvitePipe())
  async createInvite(@Body() inviteCreateDTO: InviteCreateDto, @Req() req): Promise<Invite> {
    return await this.inviteService.create(inviteCreateDTO, req.user._id);
  }

}
