import { C } from "./Constants";
import { Manage } from "./Manage";
import { Lot } from "./Lot";
import { Payment } from "./Payment";
import { Driver } from "./Driver";

interface IRequestProps {
  uid: string;
  start: string;
  end: string;
  lotUID: string;
  paymentUID: string;
  spotType: C.SPOT_TYPE_STANDARD;
  state:
    | C.REQUEST_PENDING
    | C.REQUEST_ACCEPTED
    | C.REQUEST_REJECTED
    | C.REQUEST_USED
    | C.REQUEST_EXPIRED;
}

export class Request extends Manage {
  private start: IRequestProps["start"];
  private end: IRequestProps["end"];
  private state: IRequestProps["state"];
  private spotType: IRequestProps["spotType"];
  private lotUID: IRequestProps["lotUID"];
  private paymentUID: IRequestProps["paymentUID"];

  constructor({
    lotUID,
    paymentUID,
    start,
    end,
    spotType,
    uid,
  }: Partial<IRequestProps> = {}) {
    super(uid);
    this.lotUID = lotUID;
    this.paymentUID = paymentUID;
    this.state = C.REQUEST_PENDING;
    this.spotType = spotType || C.SPOT_TYPE_STANDARD;
    this.ORM = C.ORM_REQUESTS;
    this.start = new Date(start).toString();
    this.end = new Date(end).toString();
  }

  modify({ state }: Partial<IRequestProps> = {}) {
    this.state = state || this.state;
    return this.put<Request>({ uid: this.uid });
  }

  send() {
    return this.post<Request>();
  }

  accept() {
    return this.modify({ state: C.REQUEST_ACCEPTED }).then((res) => res);
  }

  reject() {
    return this.modify({ state: C.REQUEST_REJECTED }).then((res) => res);
  }

  automate() {
    return Promise.resolve("some thing");
  }

  cost() {
    return (
      (new Date(this.end).getTime() - new Date(this.start).getTime()) *
      C.COST_BY_MILLISECONDS
    );
  }

  checkIn() {
    this.state = C.REQUEST_USED;
    return new Promise((resolve, reject) => {
      this.modify()
        .then((request) => {
          new Lot()
            .get<Lot>({ uid: request.lotUID })
            .then((lot) => resolve(lot.occupyRandomSpot()));
        })
        .catch((error) => reject(error));
    });
  }

  toString() {
    return new Promise<string>((resolve) => {
      Promise.all([
        new Payment()
          .get<Payment>({ uid: this.paymentUID })
          .then((payment) =>
            new Driver()
              .get<Driver>({ uid: payment.driverUID })
              .then((driver) => driver)
          ),
        new Lot().get<Lot>({ uid: this.lotUID }).then((lot) => lot),
      ])
        .then(([driver, lot]) => {
          resolve(
            `${driver.name.toUpperCase()} - Requested to Park at ${
              lot.name
            } (${this._formatDate(new Date(this.start))} - ${this._formatDate(
              new Date(this.end)
            )})`
          );
        })
        .catch(() => resolve("Error!! request object invalid"));
    });
  }

  _formatDate(date) {
    const padTo2Digits = (num) => num.toString().padStart(2, "0");
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join("-") +
      " " +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        // padTo2Digits(date.getSeconds()),
      ].join(":")
    );
  }
}
