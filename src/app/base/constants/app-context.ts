declare const electron: any;
const path = electron.remote.require('path');

export class AppContext {
  public static DND3R_ROLE_PATH = path.resolve('./dist/data/dnd3r/role.json');

  public static DND3R_DATA_PATH = 'src/app/dnd/dnd3r/resources/data';

  public static getRelativePath(relativePath: string) {
    return path.resolve(relativePath);
  }

  public static getDnd3rData(type: string) {
    return AppContext.getRelativePath(this.DND3R_DATA_PATH + `/${type}.json`);
  }
}
