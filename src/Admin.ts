import { C } from "./Constants";
import { Manage } from "./Manage";

interface IAdminProps {
  uid: string;
  name: string;
  password: string;
  state: C.ADMIN_STATE_ONLINE | C.ADMIN_STATE_OFFLINE;
}

export class Admin extends Manage {
  private name: IAdminProps["name"];
  private password: IAdminProps["password"];
  private state: IAdminProps["state"];

  constructor({ name, password, uid }: Partial<IAdminProps> = {}) {
    super(uid);
    this.name = name;
    this.password = password;
    this.ORM = C.ORM_ADMINS;
  }

  modify({ name, password, state }: Partial<IAdminProps> = {}) {
    this.name = name || this.name;
    this.state = state || this.state;
    this.password = password || this.password;
    return this.put<Admin>({ name: this.name });
  }

  register() {
    return this.post<Admin>();
  }

  login() {
    return new Promise((resolve, reject) => {
      this.auth<Admin>()
        .then((admin) => resolve(admin.modify({ state: C.ADMIN_STATE_ONLINE })))
        .catch((error) => reject(error));
    });
  }

  logout() {
    this.state = C.ADMIN_STATE_OFFLINE;
  }
}
