export enum C {
  COST_BY_MILLISECONDS = 0.001667,

  ADMIN_STATE_ONLINE = "online",
  ADMIN_STATE_OFFLINE = "offline",

  DRIVER_STATE_ACTIVE = "active",
  DRIVER_STATE_BANNED = "banned",

  SPOT_TYPE_STANDARD = "standard",

  SPOT_STATE_OPENED = "opened",
  SPOT_STATE_RESERVED = "reserved",
  SPOT_STATE_OCCUPIED = "occupied",

  LOT_STATE_OPENED = "opened",
  LOT_STATE_CLOSED = "closed",

  PAYMENT_ANNOTATION_CREDIT = "credit",
  PAYMENT_ANNOTATION_DEBIT = "debit",

  PAYMENT_ACTIVE = "active",
  PAYMENT_PROCESSING = "processing",
  PAYMENT_SUCCESSFUL = "successful",
  PAYMENT_DECLINED = "declined",

  REQUEST_PENDING = "pending",
  REQUEST_ACCEPTED = "accepted",
  REQUEST_REJECTED = "rejected",
  REQUEST_USED = "used",
  REQUEST_EXPIRED = "expired",

  MESSAGE_STATE_DELIVERED = "delivered",
  MESSAGE_STATE_READ = "read",

  NOTIFICATION_STATE_DISPATCHED = "dispatched",
  NOTIFICATION_STATE_RECEIVED = "received",

  ORM_LOTS = "LOTS",
  ORM_ADMINS = "ADMINS",
  ORM_DRIVERS = "DRIVERS",
  ORM_MESSAGES = "MESSAGES",
  ORM_REQUESTS = "REQUESTS",
  ORM_PAYMENTS = "PAYMENTS",
  ORM_NOTIFICATIONS = "NOTIFICATIONS",

  DB_FILE_PATH = "./public/db/index.json",

  API_ENDPOINT_AUTH = "/api/v1/auth?",
  API_ENDPOINT_RECOVER_EMAIL = "/api/v1/recover-email?",
  API_ENDPOINT_GET_ALL = "/api/v1/get_all?",
  API_ENDPOINT_GET = "/api/v1/get?",
  API_ENDPOINT_PUT = "/api/v1/put?",
  API_ENDPOINT_POST = "/api/v1/post?",
  API_ENDPOINT_DELETE = "/api/v1/delete?",
}
