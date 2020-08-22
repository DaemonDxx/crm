class PermissionList {

  constructor(
    public notification: string = 'notification',
    public admin: string = 'admin',
    public invite: string = 'invite',
    public creator: string = 'creator',
    public point: string = 'point',
  ) {
  }

  getPermissionArray(): string[] {
    const array: string[] = [];
    for (const key in this) {
        array.push(key);
    }
    return array;
  }

}

export default new PermissionList()