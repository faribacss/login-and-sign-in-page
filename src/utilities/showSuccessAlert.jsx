// SweetAlert2 for displaying success alerts
import { t } from "i18next";
import Swal from "sweetalert2";


function showSuccessAlert(type = "default") {
    const titleMessage = () => {
        switch (type) {
            case "login":
                return t("alerts.loginSuccess");
            case "signUp":
                return t("alerts.signupSuccess");
            default:
                return t("alerts.defaultSuccess");
        }
    };
    return Swal.fire({
        customClass: {
            popup: 'custom-swal'
        },
        position: "top-end",
        icon: "success",
        title: titleMessage(),
        showConfirmButton: false,
        timer: 1800,
    });
}
export default showSuccessAlert;