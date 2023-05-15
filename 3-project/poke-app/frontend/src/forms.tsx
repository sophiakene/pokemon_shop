import React, { useState, useContext } from "react"
import { Container, Form, Row, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from "react-bootstrap/Button"
import { SetUserContext } from "./App"
import './form.css'

export type SignUpData = {
    FirstName : string
    LastName : string
    Email : string
}

type SignUpError = { 
    FirstName? : string
    LastName? : string
    Email? : string
}
const EMAIL = "Email"
const FIRSTNAME = "FirstName"
const LASTNAME = "LastName"

export function LoginForm() {
    const [SignUpData, setSignUpData] = useState<SignUpData>({ FirstName : "", LastName : "", Email : "" })
    const [errors, setError] = useState<SignUpError>({})
    const { setLoggedInUser, setLoggedInUserId } = useContext(SetUserContext)

    function errorExists() { return errors.hasOwnProperty(FIRSTNAME) || errors.hasOwnProperty(LASTNAME) || errors.hasOwnProperty(EMAIL) }
    
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const inputName = event.target.name
        const inputValue = event.target.value
        // Use indexed property of SignUpData state variable to set it
        // Merges previous state object with new object { inputName : inputValue }, that only sets one of the properties
        setSignUpData(previousSignUpDataState => (
            { ...previousSignUpDataState, ...{ [inputName] : inputValue } }
        ))
    }

    function validateInput() {
        let validationError : SignUpError = {}

        if (!SignUpData.FirstName) { 
            validationError.FirstName = "First name is required"
        } else if (SignUpData.FirstName.length > 16) {
            validationError.FirstName = "First name must be 16 characters or less"
        }

        if (!SignUpData.LastName) { 
            validationError.LastName = "Last name is required"
        } else if (SignUpData.LastName.length > 16) {
            validationError.LastName = "Last name must be 16 characters or less"
        }
        if (!SignUpData.Email) {
            validationError.Email = "Email is required"
        } else if (! /@/.test(SignUpData.Email)) { // Use regular expression
            validationError.Email = "Email must contain '@'"
        }
        setError(validationError)

        return !errorExists()
    }

    function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        const isValid = validateInput()
        if (isValid) {
                // Call backend to add user data                 
                const user = {
                  "firstName": SignUpData.FirstName,
                  "lastName": SignUpData.LastName,
                  "mail": SignUpData.Email 
                }
               // event.preventDefault()
                fetch('http://localhost:3005/customers', {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json; charset=UTF-8' },
                    body: JSON.stringify(user),
                })
                .then(userResult => userResult.json())
                .then(js => { console.log({js:js})
                    setLoggedInUser(js.firstName + js.lastName)
                    setLoggedInUserId(js.id)
                }) // save logged in user somewhere, so we can use it.
                .catch(error => console.log({ error: error }))
        }
    }

    function onRegisteredSubmit(event: React.FormEvent) {
        event.preventDefault()
        // get customer from backend based on mail
        // throw error if not exists
    }

    return (
        <div>
            <Container fluid>
                <Row>
                <Col sm={2}/>
                <Col sm={4}>
                    <br/>
                    <h2>Already registered?</h2>
                    <br/>
                    <Container className="form-container">
                        <Form onSubmit={onRegisteredSubmit}>
                            <Form.Group className='row'>
                                <Form.Control
                                    name='Email'
                                    placeholder='Enter Email'
                                />
                            </Form.Group>
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
                </Col>
                <Col sm={4}>
                    <br/>
                    <h2>New here?</h2>
                    <br/>
                    <Container className="form-container">
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="row">
                                <Form.Control
                                    className="user-signup-input"
                                    id='FirstName-input'
                                    name='FirstName'
                                    placeholder='Enter first name'
                                    onChange={handleInputChange}
                                />
                        </Form.Group>
                        <br/>
                        <Form.Group className="row">
                                <Form.Control
                                    className="user-signup-input"
                                    id='LastName-input'
                                    name='LastName'
                                    placeholder='Enter last name'
                                    onChange={handleInputChange}
                                />
                        </Form.Group>
                        <br/>
                        <Form.Group className="row" controlId="EmailForm">
                                <Form.Control
                                    className="user-signup-input"
                                    id='Email-input'
                                    name='Email'
                                    placeholder='Enter Email'
                                    onChange={handleInputChange}
                                />
                        </Form.Group>
                        <Row>
                            { errors.FirstName ? <span style={{color:'red', textAlign:'left'}}> { errors.FirstName } | </span> : null }
                            { errors.LastName ? <span style={{color:'red'}}> { errors.LastName } | </span> : null }
                            { errors.Email ? <span style={{color:'red'}}> { errors.Email }</span> : null }
                        </Row>
                        <br/>
                        <Row>
                            <Button
                                type='submit'
                                variant='danger'
                                size='lg'
                            >
                                Sign up
                            </Button>
                        </Row>
                    </Form>
                    
                    </Container>
                </Col>
                </Row>
            </Container>
        </div>
    )
}
