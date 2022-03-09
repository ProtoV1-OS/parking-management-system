import { C } from "./Constants";
import { Manage } from "./Manage";

interface IPaymentProps {
  uid: string;
  driverUID: string;
  name: string;
  ccn: string;
  ccv: string;
  exp: string;
  annotation: C.PAYMENT_ANNOTATION_CREDIT | C.PAYMENT_ANNOTATION_DEBIT;
  state:
    | C.PAYMENT_ACTIVE
    | C.PAYMENT_PROCESSING
    | C.PAYMENT_SUCCESSFUL
    | C.PAYMENT_DECLINED;
}

export class Payment extends Manage {
  driverUID: IPaymentProps["driverUID"];
  name: IPaymentProps["name"];
  ccn: IPaymentProps["ccn"];
  ccv: IPaymentProps["ccv"];
  exp: IPaymentProps["exp"];
  state: IPaymentProps["state"];
  annotation: IPaymentProps["annotation"];

  constructor({
    driverUID,
    name,
    ccn,
    ccv,
    exp,
    uid,
  }: Partial<IPaymentProps> = {}) {
    super(uid);
    this.driverUID = driverUID;
    this.name = name;
    this.ccn = ccn;
    this.ccv = ccv;
    this.exp = new Date(exp).toString();
    this.state = C.PAYMENT_ACTIVE;
    this.ORM = C.ORM_PAYMENTS;
  }

  modify({ name, ccn, ccv, exp }: Partial<IPaymentProps> = {}) {
    this.name = name || this.name;
    this.ccn = ccn || this.ccn;
    this.ccv = ccv || this.ccv;
    this.exp = exp || this.exp;
    return this.put<Payment>({ uid: this.uid });
  }

  register() {
    return this.post<Payment>();
  }

  debit() {
    this.state = C.PAYMENT_PROCESSING;
    this.annotation = C.PAYMENT_ANNOTATION_DEBIT;
  }

  credit() {
    this.state = C.PAYMENT_PROCESSING;
    this.annotation = C.PAYMENT_ANNOTATION_CREDIT;
  }
}
