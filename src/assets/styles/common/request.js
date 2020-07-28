import axios from "axios";
import router from "../../../router/index";
import { Toast } from "vant";

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function push(path, params) {
  router.push({ path, query: params });
}

export function toast(text) {
  Toast(text);
}
export function fail(text) {
  Toast.fail(text);
}
export function load(options) {
  Toast.loading(options);
}

export function success(text) {
  Toast.success(text);
}
