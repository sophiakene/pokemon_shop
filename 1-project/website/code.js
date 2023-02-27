// maybe we can have the functions sorted by the html page we need them for?

// login page
function checkPassword() {
    if (document.getElementById("newPassword") !== document.getElementById("passwordControl")) {
        document.getElementById("spaceForError").innerHTML = "Passwords don't match"
    }
}
// more functions we might need (later):
//login: check if email + password match; check if email is registered
//sign up: check if email has correct format; check if password meets requirements if any 