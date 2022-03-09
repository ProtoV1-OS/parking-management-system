import { C } from "./Constants";
import { Api, IApiProps } from "./Api";
import { Admin } from "./Admin";
import { Driver } from "./Driver";
import { Lot } from "./Lot";
import { Message } from "./Message";
import { Request } from "./Request";
import { Payment } from "./Payment";
import { Notification } from "./Notification";

const CLS = {
  [C.ORM_ADMINS]: Admin,
  [C.ORM_DRIVERS]: Driver,
  [C.ORM_LOTS]: Lot,
  [C.ORM_MESSAGES]: Message,
  [C.ORM_NOTIFICATIONS]: Notification,
  [C.ORM_REQUESTS]: Request,
  [C.ORM_PAYMENTS]: Payment,
};

export class Collection extends Api {
  constructor(dbTable: IApiProps["ORM"]) {
    super();
    this.ORM = dbTable;
    this.constructor = CLS[dbTable];
  }

  then<T>(func: (arg: T[]) => T[]) {
    return new Promise<T[]>((resolve, reject) => {
      this.fetch({
        endpoint: C.API_ENDPOINT_GET_ALL + this.parseQuery({ table: this.ORM }),
        method: "GET",
      })
        .then((dtoList) => this.deserializeArray<T>(dtoList))
        .then((list) => resolve(func(list)))
        .catch((error) => reject(error));
    });
  }
}
