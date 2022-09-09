import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "./alert.scss";
const alert = (
  title = "",
  message = "",
  confirmFunc = () => {},
  cancelFunc = () => {},
  config = {}
) => {
  confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: "Đồng ý",
        onClick: () => confirmFunc(),
      },
      {
        label: "Huỷ",
        onClick: () => cancelFunc(),
      },
    ],
    keyCodeForClose: [],
  });
};

export default alert;
