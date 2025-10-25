import Swal from "sweetalert2";

function IsTrue({ type = "default" }) {
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
    
    return (
        Swal.fire({
            customClass: {
                popup: 'custom-swal'
            },
            position: "top-end",
            icon: "success",
            title: titleMessage(),
            showConfirmButton: false,
            timer: 1500,
        })
    );
}
export default IsTrue;