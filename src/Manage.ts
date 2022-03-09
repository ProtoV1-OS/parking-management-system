import { C } from "./Constants";
import { Api } from "./Api";

interface IPointer {
  [key: string]: string;
}

export class Manage extends Api {
  constructor(uid: string) {
    super(uid);
  }

  protected recoverEmail() {
    if (this.ORM === C.ORM_DRIVERS) {
      return new Promise<boolean>((resolve, reject) => {
        this.fetch({
          body: this.serialize(this),
          endpoint:
            C.API_ENDPOINT_RECOVER_EMAIL + this.parseQuery({ table: this.ORM }),
          method: "POST",
        })
          .then(() => resolve(true))
          .catch((error) => reject(error));
      });
    } else {
      return Promise.reject();
    }
  }

  protected auth<T>() {
    if (this.ORM === C.ORM_ADMINS || this.ORM === C.ORM_DRIVERS) {
      return new Promise<T>((resolve, reject) => {
        this.fetch({
          body: this.serialize(this),
          endpoint: C.API_ENDPOINT_AUTH + this.parseQuery({ table: this.ORM }),
          method: "POST",
        })
          .then((dto) => resolve(this.deserialize<T>(dto)))
          .catch((error) => reject(error));
      });
    } else {
      return Promise.reject();
    }
  }

  protected post<T>() {
    return new Promise<T>((resolve, reject) => {
      this.fetch({
        body: this.serialize(this),
        endpoint: C.API_ENDPOINT_POST + this.parseQuery({ table: this.ORM }),
        method: "POST",
      })
        .then((dto) => resolve(this.deserialize<T>(dto)))
        .catch((error) => reject(error));
    });
  }

  protected put<T>(pointer: IPointer) {
    return new Promise<T>((resolve, reject) => {
      this.fetch({
        body: this.serialize(this),
        endpoint:
          C.API_ENDPOINT_PUT + this.parseQuery({ ...pointer, table: this.ORM }),
        method: "PUT",
      })
        .then((dto) => resolve(this.deserialize<T>(dto)))
        .catch((error) => reject(error));
    });
  }

  get<T>(pointer: IPointer) {
    return new Promise<T>((resolve, reject) => {
      this.fetch({
        endpoint:
          C.API_ENDPOINT_GET + this.parseQuery({ ...pointer, table: this.ORM }),
        method: "GET",
      })
        .then((dto) => resolve(this.deserialize<T>(dto)))
        .catch((error) => reject(error));
    });
  }

  delete(pointer: IPointer) {
    return new Promise<boolean>((resolve, reject) => {
      this.fetch({
        endpoint:
          C.API_ENDPOINT_DELETE +
          this.parseQuery({ ...pointer, table: this.ORM }),
        method: "DELETE",
      })
        .then(() => resolve(true))
        .catch((error) => reject(error));
    });
  }
}
