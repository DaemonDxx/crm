import { IUserInterface } from '../../user/user.interface';

function GetFullNameUser(user: IUserInterface) {
  return `${user.lastName} ${user.firstName[0]}.${user.thirdName[0]}.`
}

export {GetFullNameUser}