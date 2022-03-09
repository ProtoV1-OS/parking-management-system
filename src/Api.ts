import { C } from "./Constants";
import { M } from "./Mock";
import { ObjectMapper, JsonIgnore } from "./vendors";

export interface IApiProps {
  ORM:
    | C.ORM_ADMINS
    | C.ORM_DRIVERS
    | C.ORM_LOTS
    | C.ORM_MESSAGES
    | C.ORM_NOTIFICATIONS
    | C.ORM_REQUESTS
    | C.ORM_PAYMENTS;
  uid: string;
}

interface IFetchProps {
  body: String;
  endpoint: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
}

export class Api {
  // @JsonIgnore()
  public mem;

  public ORM: IApiProps["ORM"];
  public uid: IApiProps["uid"];

  constructor(uid?: IApiProps["uid"]) {
    this.uid = uid || Math.random().toString(16).slice(2);
  }

  protected deserializeArray<T>(dtoList: Object[]) {
    return ObjectMapper.deserializeArray<T>(this.constructor as any, dtoList);
  }

  protected deserialize<T>(dto: Object) {
    return ObjectMapper.deserialize<T>(this.constructor as any, dto);
  }

  protected serialize(cls: Object) {
    return ObjectMapper.serialize(cls);
  }

  protected parseQuery(arg = {}) {
    return new URLSearchParams({ ...arg });
  }

  protected fetch({ body, endpoint, method }: Partial<IFetchProps>) {
    // return fetch(endpoint, {
    //   method,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   ...(body ? { body } : {}),
    // })
    //   .then((response) => response.json())
    //   .then((data) => JSON.parse(data))
    //   .catch((error) => console.error(error));

    // TODO:
    // using mock backend (tech debt)
    return Promise.resolve(M.backend({ body, endpoint }));
  }
}
