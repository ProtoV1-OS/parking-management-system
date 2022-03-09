import { C } from "./Constants";

class Mock {
  db;

  constructor() {
    fetch(C.DB_FILE_PATH)
      .then((res) => res.json())
      .then((data) => {
        this.db = data;
      })
      .catch((error) => console.error(error));
  }

  backend({ body, endpoint }) {
    return new Promise((resolve, reject) => {
      const idx = setInterval(() => {
        if (this.db) {
          clearInterval(idx);
          let pointer = [];
          const { pathname, searchParams } = new URL(
            "http://localhost:3000" + endpoint
          );
          const dbTable = searchParams.get("table");
          for (const [key, value] of searchParams) {
            if (key != "table") {
              pointer = [key, value];
            }
          }

          switch (pathname + "?") {
            case C.API_ENDPOINT_GET_ALL:
              resolve(this.db[dbTable]);
              break;

            case C.API_ENDPOINT_GET:
              resolve(
                this.db[dbTable].filter(
                  (entry) => entry[pointer[0]] === pointer[1]
                )[0]
              );
              break;

            case C.API_ENDPOINT_POST:
              this.db[dbTable].push(JSON.parse(body));
              resolve(JSON.parse(body));
              break;

            case C.API_ENDPOINT_PUT:
              let res;
              this.db[dbTable] = this.db[dbTable].map((entry) => {
                if (entry[pointer[0]] === pointer[1]) {
                  res = { ...entry, ...JSON.parse(body) };
                  return res;
                } else {
                  return entry;
                }
              });
              resolve(res);
              break;

            case C.API_ENDPOINT_DELETE:
              this.db[dbTable] = this.db[dbTable].filter(
                (entry) => entry[pointer[0]] !== pointer[1]
              );
              resolve("{status: SUCCESSFUL}");
              break;

            case C.API_ENDPOINT_AUTH:
              resolve(
                this.db[dbTable].filter(
                  (entry) =>
                    entry.password === JSON.parse(body).password &&
                    (entry.name === JSON.parse(body).name ||
                      (entry.email && entry.email === JSON.parse(body).email))
                )[0]
              );
              break;

            case C.API_ENDPOINT_RECOVER_EMAIL:
              resolve("{status: SUCCESSFUL}");
              break;

            default:
              reject(`Unknown api endpoint ${pathname}`);
              break;
          }
        }
      }, 500);
    });
  }
}

export const M = new Mock();
