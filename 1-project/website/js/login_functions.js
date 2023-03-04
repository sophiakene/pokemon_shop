// login page
function checkPassword() {
    if (document.getElementById("newPassword") !== document.getElementById("passwordControl")) {
        document.getElementById("spaceForError").innerHTML = "Passwords don't match"
    }
}

function storeNewName() {
    let newName = document.getElementById("newUsername");
    localStorage.setItem("newName", newName.value);
    alert(newName.value)
        }

function storeOldName() {
    let oldName = document.getElementById("oldUsername");
    localStorage.setItem("oldName", oldName.value);
    alert(oldName.value)
        }

function showName() {
    // check if new user name first
    if (newName !== undefined) {
        document.getElementById("nameField").innerHTML = newName
    }
    // if it's undefined, check if old user name is available
    else if (oldName !== undefined) {
        document.getElementById("nameField").innerHTML = oldName
    }
}



// more functions we might need (later):
//login: check if email + password match; check if email is registered
//sign up: check if email has correct format; check if password meets requirements if any 