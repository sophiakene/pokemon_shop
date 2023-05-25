import { useContext, useState } from "react"
import { SetUserContext } from "../header"
import { Container, Form, Row, Button } from "react-bootstrap"

type LoginError = { Email?: string }

export function LoginForm() {
    const { setLoggedInUser, setLoggedInUserId } = useContext(SetUserContext)
    const [loginMail, setLoginMail] = useState("")
    const [loginError, setLoginError] = useState<LoginError>({})

    function validateLoginMail() {
        let validationError : LoginError = {}
        console.log({loginMail:loginMail})
        if ((!loginMail) || loginMail === "") { validationError.Email = "Email is required" }
        else if (! /@/.test(loginMail)) { validationError.Email = "Email must contain '@'" }
        setLoginError(validationError)
        const isValid = !(validationError.hasOwnProperty('Email'))
        return isValid
    }

    function onRegisteredSubmit(event: React.FormEvent) {
        event.preventDefault()
        const isValidFormat = validateLoginMail()
        if (isValidFormat) {
            // get customer from backend based on mail
            fetch(`http://localhost:3005/customers/${loginMail}`, {
                    method: 'GET',
                    headers: { 'Content-type': 'application/json; charset=UTF-8' },
            })
            .then(userResult => userResult.json())
            .then(userResult => {
                if (userResult.hasOwnProperty('error')) {
                    setLoginError({ Email: `User with email ${loginMail} does not exist`})
                } else {
                    setLoggedInUserId(userResult.id)
                    setLoggedInUser(userResult.firstName + ' ' + userResult.lastName)
                }
            })
            .catch(error => setLoginError({ Email: `User with email ${loginMail} does not exist`}))
        }
    }
    return (
        <Container className="form-container">
        <Form onSubmit={onRegisteredSubmit}>
            <Form.Group className='row'>
                <Form.Control
                    name='Email'
                    placeholder='Enter Email'
                    onChange={e => setLoginMail(e.target.value) }
                />
            </Form.Group>
            <Row>
                { loginError.Email ? <span className="errorMsg">{ loginError.Email }</span>: null}
            </Row>
            <br/>
            <Row>
                <Button
                    type='submit'
                    variant='danger'
                    size='lg'
                >
                    Login
                </Button>
            </Row>
        </Form>
    </Container>
    );
}