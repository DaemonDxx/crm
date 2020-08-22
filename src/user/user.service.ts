import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department } from './department.model';
import { Position } from './position.model';
import { CreateUserDto } from '../auth/createUser.dto';
import { InviteService } from '../invite/invite.service';
import { Invite } from '../invite/invite.model';

@Injectable()
export class UserService {

  constructor(
    @InjectModel('Department') private departmentModel: Model<Department>,
    @InjectModel('Position') private positionModel: Model<Position>,
    @InjectModel('User') private userModel: Model<User>,
    private inviteService: InviteService
  ) {
  }

  async findUserByID(id: string): Promise<User> {
    return this.userModel.findById(id).populate('department').populate('position').lean();
  }

  async createUser(createUserDTO: CreateUserDto): Promise<User> {
        const info = await this.validateData(createUserDTO);
        const {position, invite, ...user} = createUserDTO;
        const newUser = await new this.userModel(Object.assign(info, user)).save();
        const updateInvate = await this.closeInvite(invite, newUser);
        return newUser.save();

  }

  async closeInvite(inviteID: string, user:User): Promise<Invite> {
    const invite = await this.inviteService.getInviteById(inviteID);
    invite.userCreated = user._id;
    return invite.save();
  }

  async validateData(createUserDTO: CreateUserDto): Promise<any> {
      const invite = await this.inviteService.getInviteById(createUserDTO.invite);
      if (!invite) {
        throw new BadRequestException('Ваш инвайт код не действителен');
      }

      if (invite.userCreated) {
        throw new BadRequestException('Данный инвайт уже использован');
      }

      const department = await this.departmentModel.findById(invite.department);
      if (!department) {
        throw new BadRequestException('Ваш инвайт код не действителен');
      }

      const user = await this.userModel.findOne({username: createUserDTO.username});
      if (user) {
        throw new BadRequestException( 'Данный username уже существует');
      }

      const position = await this.positionModel.findById(createUserDTO.position);
      if (!position) {
        throw new BadRequestException( 'Такой должности не существует');
      }

      const permissions = invite.permissions;

      return {
        department,
        position,
        permissions
      }
  }

  async validateUser(username: string, password: string): Promise<any> {
      const user = await this.userModel.findOne({username}).populate('department').populate('position');
      if (user && user.password === password) {
        const {password, ...result} = user;
        return result;
      }
      return null;
  }

}
