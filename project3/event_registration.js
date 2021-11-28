// Set ticket purchase limit
const ticketLimit = 3;
const ticketCost = 14.99;
const maxMinutes = 10
const maxTime = new Date()
maxTime.setMinutes(maxTime.getMinutes() + maxMinutes)

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
    let tickets = ticketCount();
    let fullName = textField("#name");
    let email = emailField();

    // Checks that all validation responses are true and returns response to form action
    if (!fullName || !email || !tickets) {
        return false;
    } else {
        document.querySelector("#ticketCount").innerText = document.querySelector("#tickets").value
        document.querySelector("#totalAmount").innerText = document.querySelector("#cost").value
        document.querySelector("#counter").classList.toggle("infoHidden")
        document.querySelector("#idForm").classList.toggle("infoHidden")
        document.querySelector("#purchaseComplete").classList.toggle("infoHidden")
        return false;
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

// Generates alphanumeric string error message for invalid characters
function charStringError2(target) {
    errMsg.innerText = `Invalid entry. Valid entry: 1-${ticketLimit}`;
    target.append(errMsg.cloneNode(true));
    target.classList.add("validationError");
}

// Generates numeric string error message for invalid characters and entry length
function numStringError(target, num) {
    errMsg.innerText = `Invalid entry. You may not purchase more than ${num} tickets.`;
    target.append(errMsg.cloneNode(true));
    target.classList.add("validationError");
}

// Generates invalid email format error message
function emailFormatError(target) {
    errMsg.innerText = 'Please enter a valid email address.';
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

// Validates value of tickets selected
function ticketCount() {
    clearErrors();
    target = document.querySelector("#tickets")
    parent = target.parentElement
    val = target.value

    cost = document.querySelector("#cost")

    nameInput = document.querySelector("#name").parentElement;
    nameHidden = nameInput.classList.contains("contactHidden");
    emailInput = document.querySelector("#email").parentElement;
    emailHidden = emailInput.classList.contains("contactHidden");
    
    // Validates element value
    if (!isNaN(val)) { 
        valInt = parseInt(val)
        if (valInt > 0 && valInt <= ticketLimit) {
            cost.value = `$${valInt * ticketCost}`;
            if (nameHidden) { nameInput.classList.toggle("contactHidden") }
            if (emailHidden) { emailInput.classList.toggle("contactHidden") }
            return true;
        } else {
            if (!nameHidden) { nameInput.classList.toggle("contactHidden") }
            if (!emailHidden) { emailInput.classList.toggle("contactHidden") }
            numStringError(parent, ticketLimit);
            return false
        }
    } else if (isNaN(val)) {
        charStringError2(parent);
        if (!nameHidden) { nameInput.classList.toggle("contactHidden") }
        if (!emailHidden) { emailInput.classList.toggle("contactHidden") }
        return false;
    } else {
        genericError(parent);
        if (!nameHidden) { nameInput.classList.toggle("contactHidden") }
        if (!emailHidden) { emailInput.classList.toggle("contactHidden") }
        return false;
    }
}

// Validates value of a text field
function textField(target) {
    // sets approved charaters for text field value
    regex = new RegExp('[\\w0-9-_#().\'\ ]','gi');

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

// Validates value of email fields
function emailField() {

    // Collects email element information
    emailInput1 = document.querySelector("#email")
    emailParent1 = emailInput1.parentElement
    emailVal1 = emailInput1.value
    emailValid1 = validateEmail(emailVal1);
    emailLen1 = false;

    // Validates email element value
    if (!emailVal1) {
        genericError(emailParent1);
    } else if (emailVal1 && !emailValid1) {
        emailFormatError(emailParent1);
    } else if (emailValid1 && (emailVal1.split("@")[0].length > 64 || emailVal1.split("@")[1].length > 252)) {
        emailLengthError(emailParent1)
    } else {
        emailLen1 = true;
    }
    
    // Returns validation results
    if (emailValid1 && emailLen1) {
        return true;
    } else {
        return false;
    }
}
// Adds event listener to clear error messages and styles upon form reset
{
    document.querySelector(`input[type='reset']`).addEventListener("click", clearErrors)
    document.querySelector("#tickets").addEventListener("keyup", ticketCount)
    document.querySelector("#timeRemaining").innerText = "0" + (maxMinutes-1) + ":59"
}

let timer = setInterval(function() {

    now = new Date()
    diff = maxTime - now
    minutes = new Date(diff).getMinutes()
    seconds = new Date(diff).getSeconds()
    timeRemaining = ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2)
    document.querySelector("#timeRemaining").innerText = timeRemaining
    if (minutes === 0 && seconds === 0) {
        clearInterval(timer)
        document.querySelector("#counter").classList.toggle("infoHidden")
        document.querySelector("#idForm").classList.toggle("infoHidden")
        document.querySelector("#timeOver").classList.toggle("infoHidden")
        setTimeout(() => { location.href = "index.html" }, 5000)
    }
 
}, 1000);