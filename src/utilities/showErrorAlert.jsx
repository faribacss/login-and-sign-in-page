// SweetAlert2 for displaying error alerts
import Swal from "sweetalert2";

function showErrorAlert(type = "default", customMessage = null) {
  const titleMessage = () => {
    if (customMessage) {
      return customMessage;
    }
    switch (type) {
      case "login":
        return t("alerts.loginError");
      case "signUp":
        return t("alerts.signupError");
      default:
        return t("alerts.defaultError");
    }
  };

  return Swal.fire({
    customClass: {
      popup: "custom-swal",
    },
    position: "top-end",
    icon: "error",
    title: titleMessage(),
    showConfirmButton: false,
    timer: 2000,
  });
}

export default showErrorAlert;
