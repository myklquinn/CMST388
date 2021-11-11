
const errMsg = document.createElement("span");
errMsg.className = 'errorMessage';

function validateForm() {
    document.querySelectorAll(".errorMessage").forEach((a)=>{a.remove()});
    document.querySelectorAll(".validationError").forEach((a)=>{a.classList.remove("validationError")});

    let firstName = textField("#fname");
    let lastName = textField("#lname");
    let address = textField("#address");
    let city = textField("#city");
    let state = stateSelect();
    let zipcode = zipcodeField();
    let phone = phoneField();
    let email = emailField();
    let contact = contactField();

    if (!firstName || !lastName || !address || !city || !state || !zipcode || !phone || !email || !contact) {
        return false;
    } else {
        return false;
    }
}

function genericError(target) {
    errMsg.innerText = 'This field is required.';
    target.append(errMsg.cloneNode(true));
    target.classList.add("validationError");
}

function charStringError(target) {
    errMsg.innerText = 'Invalid entry. Valid characters: A-Z a-z 0-9 - _ # ( ) . \\ ';;
    target.append(errMsg.cloneNode(true));
    target.classList.add("validationError");
}

function numStringError(target) {
    errMsg.innerText = 'Invalid entry. You may only enter numbers.';;
    target.append(errMsg.cloneNode(true));
    target.classList.add("validationError");
}

function emailFormatError(target) {
    errMsg.innerText = 'Please enter a valid email address.';;
    target.append(errMsg.cloneNode(true));
    target.classList.add("validationError");
}

function emailMatchError(target) {
    errMsg.innerText = 'Invalid entry. Please verify your email addresses match.';;
    target.append(errMsg.cloneNode(true));
    target.classList.add("validationError");
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function textField(target) {
    alphaNumSpec = new RegExp('[\\w0-9-_#().\'\ ]','gi');

    target = document.querySelector(target);
    parent = target.parentElement;
    val = target.value;
    valCheck = val.replace(alphaNumSpec,'');
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

function stateSelect() {
    target = document.querySelector("#state");
    parent = target.parentElement.parentElement;
    val = target.value;

    if (!val) {
        console.log("state failed")
        genericError(parent);
        return false;
    } else {
        return true;
    }
}

function zipcodeField() {
    target = document.querySelector("#zipcode");
    parent = target.parentElement;
    val = target.value
    valCheck = val.replace(/[0-9]/g, '')

    if (!val) {
        genericError(parent);
        return false;
    } else if (valCheck.length) {
        numStringError(parent);
        return false;
    } else {
        return true;
    }
}

function phoneField() {
    acInput = document.querySelector("#areacode");
    acParent = acInput.parentElement;
    acVal = acInput.value
    acValCheck = acVal.replace(/[0-9]/g, '')

    phInput = document.querySelector("#phone");
    phParent = phInput.parentElement;
    phVal = phInput.value
    phValCheck = phVal.replace(/[0-9]/g, '')

    validAC = false;
    validPH = false;

    if (!acVal) {
        genericError(acParent)
    } if (acValCheck.length) {
        numStringError(acParent)
    } else {
        validAC = true;
    }

    if (!phVal) {
        genericError(phParent)
    } if (phValCheck.length) {
        numStringError(phParent)
    } else {
        validPH = true;
    }

    if (validAC && validPH) {
        return true;
    } else {
        return false;
    }

}

function emailField() {
    emailInput1 = document.querySelector("#email1")
    emailParent1 = emailInput1.parentElement
    emailVal1 = emailInput1.value
    emailValid1 = validateEmail(emailVal1);

    
    emailInput2 = document.querySelector("#email2")
    emailParent2 = emailInput2.parentElement
    emailVal2 = emailInput2.value
    emailValid2 = validateEmail(emailVal2);

    if (!emailVal1) {
        genericError(emailParent1);
    } else if (emailVal1 && !emailValid1) {
        emailFormatError(emailParent1);
    }
    
    if (!emailVal2) {
        genericError(emailParent2);
    } else if (emailVal2 && !emailValid2) {
        emailFormatError(emailParent2);
    }
    if (emailValid1 && emailValid2 && emailValid1 == emailValid2) {
        return true;
    } else {
        return false;
    }
}

function contactField() {
    target = document.querySelectorAll(`input[name='contact']`)
    parent = target[0].closest('.choiceGp')
    values = Array.from(target).map((a) => {return a.checked}) 

    if (!values.includes(true)) {
        genericError(parent)
        return false
    } else {
        return true
    }
}