import ElementUI from "element-ui";

function success(res, text) {
  let data = res.data;
  if (data.code == 200) {
    ElementUI.Message({
      message: text.ok,
      type: "success",
    });
  } else {
    ElementUI.Message({
      message: text.no,
      type: "error",
    });
  }
}

function error(err) {
  ElementUI.Message({
    message: err,
    type: "error",
  });
}

function listCode(res) {
  // console.log(res);
  let data = res.data;
  if (data.code == 200 && data.data.length > 0) {
    return data;
  } else {
    ElementUI.Message({
      message: data.msg,
      type: "error",
    });
    return;
  }
}

export { success, error, listCode };
