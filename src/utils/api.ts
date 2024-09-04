import { ONE_DAY, ONE_HOUR } from "@/common/constants";
import axios from "axios";
import { Md5 } from "ts-md5";

_initUid();

export const api = axios.create({
  baseURL: import.meta.env.APP_API_URL,
  headers: {
    "Content-type": "application/json",
    "X-UID": localStorage.__X_UID__,
    "X-LANG": localStorage.__LANGUAGE__,
  },
});

api.interceptors.request.use(
  (config) => {
    if (localStorage.__TOKEN__) {
      config.headers["Authorization"] =
        `Bearer ${localStorage.__TOKEN__}`;
    }
    const timestamp = Date.now().toString();
    config.headers["X-TIMESTAMP"] = timestamp;
    config.headers["X-NONCE"] = _generateNonce(
      `${localStorage.__X_UID__}/${timestamp}`,
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

function _generateUID(prefix: string) {
  let cont = true;
  do {
    const uid = Math.random().toString(36).slice(2);
    if (_check(`${prefix}/${uid}`)) {
      cont = false;
      return `${prefix}.${uid}`;
    }
  } while (cont);
  return "";
}

function _generateNonce(prefix: string) {
  let cont = true;
  do {
    const nonce = Math.random().toString(36).slice(2);
    if (_check(`${prefix}/${nonce}`)) {
      cont = false;
      return nonce;
    }
  } while (cont);
  return "";
}

function _check(uid: string, end = "000") {
  return Md5.hashStr(uid).endsWith(end);
}

function _initUid() {
  const last = Number(localStorage?.__X_UID__?.split(".")[0] || 0);
  if (Date.now() - last > ONE_DAY) {
    delete localStorage.__X_UID__;
  }
  if (
    !localStorage.__X_UID__ ||
    !/.*\..*/.test(localStorage.__X_UID__)
  ) {
    localStorage.__X_UID__ = _generateUID(Date.now().toString());
  }

  const from = localStorage.__X_UID__.split(".")[1];
  if (Date.now() - parseInt(from) > ONE_HOUR) {
    localStorage.__X_UID__ = _generateUID(Date.now().toString());
  }
}
