export function switchValidation(element, isValid) {
  if (isValid) {
    element.className = element.className.replace("is-invalid", "");
    if (!element.className.includes("is-valid")) {
      element.className += " is-valid";
    }
    return;
  }
  if (!element.className.includes("is-invalid")) {
    element.className = element.className.replace("is-valid", "");

    if (!element.className.includes("is-invalid")) {
      element.className += " is-invalid";
    }
  }
}
