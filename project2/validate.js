// Create error message container
const errMsg = document.createElement("span");
errMsg.className = 'errorMessage';

// Clears error message container and styles
function clearErrors() {
    document.querySelectorAll(".errorMessage").forEach((a)=>{a.remove()});
    document.querySelectorAll(".validationError").forEach((a)=>{a.classList.remove("validationError")});
}

// Executes for validation routine
function validateForm() {
    clearErrors();

    // Calls validation functions for each required form field
    let firstName = textField("#fname");
    let lastName = textField("#lname");
    let address = textField("#address");
    let city = textField("#city");
    let state = stateSelect();
    let zipcode = zipcodeField();
    let phone = phoneField();
    let email = emailField();
    let contact = contactField();

    // Checks that all validation responses are true and returns response to form action
    if (!firstName || !lastName || !address || !city || !state || !zipcode || !phone || !email || !contact) {
        return false;
    } else {
        return true;
    }
}

// Generates basic error message
function genericError(target) {
    errMsg.innerText = 'This field is required.';
    target.append(errMsg.cloneNode(true));
    target.classList.add("validationError");
}

// Generates alphanumeric string error message for invalid characters
function charStringError(target) {
    errMsg.innerText = 'Invalid entry. Valid characters: A-Z a-z 0-9 - _ # ( ) . \\ ';
    target.append(errMsg.cloneNode(true));
    target.classList.add("validationError");
}

// Generates numeric string error message for invalid characters and entry length
function numStringError(target, num) {
    errMsg.innerText = `Invalid entry. You must enter ${num} digits.`;
    target.append(errMsg.cloneNode(true));
    target.classList.add("validationError");
}

// Generates invalid email format error message
function emailFormatError(target) {
    errMsg.innerText = 'Please enter a valid email address.';
    target.append(errMsg.cloneNode(true));
    target.classList.add("validationError");
}

// Generates mis-matched email error
function emailMatchError(target) {
    errMsg.innerText = 'Invalid entry. Please verify your email addresses match.';
    target.append(errMsg.cloneNode(true));
    target.classList.add("validationError");
}

// Generate email string length error message
function emailLengthError(target) {
    errMsg.innerText = 'Invalid entry. Your email exceeds the max length name[64]@domain.com[252].';
    target.append(errMsg.cloneNode(true));
    target.classList.add("validationError");
}

// Validates the format of an email address string
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Generates error message for contact method checkboxes
function contactMethodError(target) {
    errMsg.innerText = 'You must select at least two contact methods.';
    target.append(errMsg.cloneNode(true));
    target.classList.add("validationError");
}

// Validates value of a text field
function textField(target) {
    // sets approved charaters for text field value
    regex = new RegExp('[\\w0-9-_#().\'\ ]','gi');

    // changes approved charaters for text field value for city input
    if (target == '#city') {
        regex = new RegExp('[\\w\ ]','gi');
    }

    // Collects element information
    target = document.querySelector(target);
    parent = target.parentElement;
    val = target.value;
    valCheck = val.replace(regex,'');

    // Validates element value
    if (val.length && !valCheck.length) { 
        return true; 
    } else if (valCheck.length) {
        charStringError(parent);
        return false;
    } else {
        genericError(parent);
        return false;
    }
}

// Validates value of state select field
function stateSelect() {

    // Collects element information
    target = document.querySelector("#state");
    parent = target.parentElement.parentElement;
    val = target.value;

    // Validates element value
    if (!val) {
        genericError(parent);
        return false;
    } else {
        return true;
    }
}

// Validates value of zipcode field
function zipcodeField() {

    // Collects element information
    target = document.querySelector("#zipcode");
    parent = target.parentElement;
    val = target.value
    valCheck = val.replace(/[0-9]/g, '')

    // Validates element value
    if (!val) {
        genericError(parent);
        return false;
    } else if (valCheck.length || val.length !== 5) {
        numStringError(parent, 5);
        return false;
    } else {
        return true;
    }
}

// Validates value of areacode and phone number fields
function phoneField() {

    // Collects areacode element information
    acInput = document.querySelector("#areacode");
    acParent = acInput.parentElement;
    acVal = acInput.value
    acValCheck = acVal.replace(/[0-9]/g, '')

    // Collects phone number element information
    phInput = document.querySelector("#phone");
    phParent = phInput.parentElement;
    phVal = phInput.value
    phValCheck = phVal.replace(/[0-9]/g, '')

    // Sets validation check variables
    validAC = false;
    validPH = false;

    // Validates areacode element value
    if (!acVal) {
        genericError(acParent)
    } if (acValCheck.length || acVal.length !== 3) {
        numStringError(acParent, 3)
    } else {
        validAC = true;
    }

    // Validates phone numnber element value
    if (!phVal) {
        genericError(phParent)
    } if (phValCheck.length || phVal.length !== 7) {
        numStringError(phParent, 7)
    } else {
        validPH = true;
    }

    // Return validation results
    if (validAC && validPH) {
        return true;
    } else {
        return false;
    }

}

// Validates value of email fields
function emailField() {

    // Collects email 1 element information
    emailInput1 = document.querySelector("#email1")
    emailParent1 = emailInput1.parentElement
    emailVal1 = emailInput1.value
    emailValid1 = validateEmail(emailVal1);
    emailLen1 = false;
    
    // Collects email 2 element information
    emailInput2 = document.querySelector("#email2")
    emailParent2 = emailInput2.parentElement
    emailVal2 = emailInput2.value
    emailValid2 = validateEmail(emailVal2);
    emailLen2 = false;

    // Validates email 1 element value
    if (!emailVal1) {
        genericError(emailParent1);
    } else if (emailVal1 && !emailValid1) {
        emailFormatError(emailParent1);
    } else if (emailValid1 && (emailVal1.split("@")[0].length > 64 || emailVal1.split("@")[1].length > 252)) {
        emailLengthError(emailParent1)
    } else {
        emailLen1 = true;
    }
    
    // Validates email 2 element value
    if (!emailVal2) {
        genericError(emailParent2);
    } else if (emailVal2 && !emailValid2) {
        emailFormatError(emailParent2);
    } else if (emailValid2 && (emailVal2.split("@")[0].length > 64 || emailVal2.split("@")[1].length > 252)) {
        emailLengthError(emailParent1)
    } else {
        emailLen2 = true;
    }

    // Validates email fields match
    if (emailValid1 && emailValid2 && emailVal1 !== emailVal2) {
        emailMatchError(emailParent2);
    } 
    
    // Returns validation results
    if (emailValid1 && emailValid2 && emailLen1 && emailLen2 && emailVal1 == emailVal2) {
        return true;
    } else {
        return false;
    }
}

// Validates value of contact method section
function contactField() {

    // Collects element information
    target = document.querySelectorAll(`input[name='contact']`)
    parent = target[0].closest('.choiceGp')
    values = Array.from(target).filter((a) => {if (a.checked) return true}) 

    // Validates at least two are selected and returns results
    if (values.length < 2) {
        contactMethodError(parent)
        return false
    } else {
        return true
    }
}

// Adds event listener to clear error messages and styles upon form reset
{
    document.querySelector(`input[type='reset']`).addEventListener("click", clearErrors)
}