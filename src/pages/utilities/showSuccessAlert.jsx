import Swal from "sweetalert2";
import "AlertStyle.css";

function showSuccessAlert(type = "default") {
    const titleMessage = () => {
        switch (type) {
            case "login":
                return "You have successfully logged in!";
            case "signUp":
                return "You have successfully signed up!";
            default:
                return "Success!";
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