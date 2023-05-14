import React, { useState, useContext } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button"
import { SetUserContext } from "./App";

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

    return (
        <div>
            <Container>
                <Col sm={6}>
                <h1>Sign up</h1>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="row">
                        <Col sm={4}>
                            <Form.Label htmlFor='FirstName'> First name </Form.Label>
                        </Col>
                        <Col sm={8}>
                            <Form.Control
                                id='FirstName-input'
                                name='FirstName'
                                placeholder='Enter first name'
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Form.Group>
                    <br/><br/>
                    <Form.Group className="row">
                        <Col sm={4}>
                            <Form.Label htmlFor='LastName'> Last name </Form.Label>
                        </Col>
                        <Col sm={8}>
                            <Form.Control
                                id='LastName-input'
                                name='LastName'
                                placeholder='Enter last name'
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Form.Group>
                    <br/><br/>
                    <Form.Group className="row" controlId="EmailForm">
                        <Col sm={4}>
                            <Form.Label htmlFor='Email'> Email </Form.Label>
                        </Col>
                        <Col sm={8}>
                            <Form.Control 
                                id='Email-input'
                                name='Email'
                                placeholder='Enter Email'
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col sm={4}/>
                        <Col sm={8}>
                            { errors.FirstName ? <span style={{color:'red', textAlign:'left'}}> { errors.FirstName } | </span> : null }
                            { errors.LastName ? <span style={{color:'red'}}> { errors.LastName } | </span> : null }
                            { errors.Email ? <span style={{color:'red'}}> { errors.Email }</span> : null }
                        </Col>
                    </Row>
                    <div>
                        <Button
                            type='submit'
                            variant='text' // 'danger'
                            size='lg'
                        >
                            Sign up
                        </Button>
                    </div>
                </Form>
                </Col>
            </Container>
        </div>
    )
}
