class PermissionList {

  constructor(
    public notification: string = 'notification',
    public admin: string = 'admin'
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

export default PermissionList
