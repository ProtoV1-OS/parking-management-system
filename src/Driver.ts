import { C } from "./Constants";
import { Manage } from "./Manage";

interface IDriverProps {
  uid: string;
  name: string;
  email: string;
  password: string;
  state: C.DRIVER_STATE_ACTIVE | C.DRIVER_STATE_BANNED;
}

export class Driver extends Manage {
  name: IDriverProps["name"];
  email: IDriverProps["email"];
  password: IDriverProps["password"];
  state: IDriverProps["state"];

  constructor({ name, email, password, uid }: Partial<IDriverProps> = {}) {
    super(uid);
    this.name = name;
    this.email = email;
    this.password = password;
    this.state = C.DRIVER_STATE_ACTIVE;
    this.ORM = C.ORM_DRIVERS;
  }

  modify({ name, email, password, state }: Partial<IDriverProps> = {}) {
    this.name = name || this.name;
    this.email = email || this.email;
    this.state = state || this.state;
    this.password = password || this.password;
    return this.put<Driver>({ email: this.email });
  }

  register() {
    return this.post<Driver>();
  }

  login() {
    return this.auth<Driver>();
  }

  recover() {
    return this.recoverEmail();
  }

  logout() {}
}
