import Swal from "sweetalert2";
import "../../index.css";

function showErrorAlert(type = "default") {
    const titleMessage = () => {
        switch (type) {
            case "login":
                return "Login failed! Please check your credentials.";
            case "signUp":
                return "Sign up failed! Please try again.";
            default:
                return "Error!";
        }
    };
    
    return Swal.fire({
        customClass: {
            popup: 'custom-swal'
        },
        position: "top-end",
        icon: "error",
        title: titleMessage(),
        showConfirmButton: false,
        timer: 1500,
    });
}

export default showErrorAlert;