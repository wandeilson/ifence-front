import toastr from "toastr";
import "toastr/build/toastr.min.js";
import "toastr/build/toastr.css";


toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
};

export function showMessage(type, title, message, config) {
    toastr[type](message, title, config);
}

export function showSuccessMessage(title, message, config) {
    showMessage("success", title ? title : "Sucesso" , message, config);
}

export function showInfoMessage(title, message, config) {
    showMessage("info", title ? title : "Informação", message, config);
}

export function showWarningMessage(title, message, config) {
    showMessage("warning", title ? title : "Alerta", message, config);
}

export function showErrorMessage(title, message, config) {
    showMessage("error", title ? title : "Erro", message, config);
}
