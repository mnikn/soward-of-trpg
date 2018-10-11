declare const electron: any;
const path = electron.remote.require('path');

export class AppContext {
  public static DND3R_ROLE_PATH = path.resolve('./dist/data/dnd3r/role.json');
}
