exports.module = {
  db: {
    ADMINS: [{}],
    DRIVERS: [{}],
    PAYMENTS: [{}],
    REQUESTS: [{}],
    MESSAGES: [{}],
    LOTS: [{}],
    json() {
      delete this.json;
      return Promise.resolve(this);
    },
  },
};
