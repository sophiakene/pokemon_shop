// login page
function checkPassword() {
    if (document.getElementById("newPassword") !== document.getElementById("passwordControl")) {
        document.getElementById("spaceForError").innerHTML = "Passwords don't match"
    }
}

function storeName() {
    let newName = document.getElementById("username");
    sessionStorage.setItem("newName", newName.value);
        }

//function storeOldName() {
//    let oldName = document.getElementById("oldUsername");
//    sessionStorage.setItem("oldName", oldName.value);
//       }

function showName() {
    // check if new user name first
    const name = sessionStorage.newName
    //const oldName = sessionStorage.oldName

    if (name !== undefined) {
        console.log("name", name)
        document.getElementById("welcomeHeader").innerHTML = "Welcome back to" + "<br />" + "PokéShop, " + name + "!"
    }
    //
    // if it's undefined, check if old user name is available 
    //else if (oldName !== undefined) { 
    //    document.getElementById("welcomeHeader").innerHTML = "Welcome back to PokéShop, " + oldName + "!"
    // }
}



// more functions we might need (later):
//login: check if email + password match; check if email is registered
//sign up: check if email has correct format; check if password meets requirements if any 