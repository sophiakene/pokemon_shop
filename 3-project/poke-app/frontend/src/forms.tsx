import React, { useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button"

export type SignUpData = {
    Username : string
    Password : string
}

type SignUpError = { 
    Username? : string
    Password? : string
}
const PASSWORD = "Password"
const USERNAME = "Username"

export function SignUpForm() {
    const [SignUpData, setSignUpData] = useState<SignUpData>({ Username : "", Password : "" })
    const [errors, setError] = useState<SignUpError>({})

    function errorExists() { return errors.hasOwnProperty(USERNAME) || errors.hasOwnProperty(PASSWORD) }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const inputName = event.target.name
        const inputValue = event.target.value
        // Use indexed property of SignUpData state variable to set it
        // Merges previous state object with new object { inputName : inputValue },
        // that only sets one of the properties
        setSignUpData(previousSignUpDataState => (
            { ...previousSignUpDataState, ...{ [inputName] : inputValue } }
        ))
    }

    function validateInput() {
        let validationError : SignUpError = {}

        if (!SignUpData.Username) { 
            validationError.Username = "User name is required"
        } else if (SignUpData.Username.length > 16) {
            validationError.Username = "User name must be 16 characters or less"
        }

        if (!SignUpData.Password) {
            validationError.Password = "Password is required"
        } else if (SignUpData.Password.length < 8) {
            validationError.Password = "Password must use at least 8 characters"
        }

        setError(validationError)

        return errorExists()
    }

    function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        console.log({currentState:SignUpData, errors: errors})
        const isValid = validateInput()
        if (isValid) {
            // Call backend to add data
            // useEffect() 
        }
    }

    return (
        <div>
            <Container>
                <Col sm={6}>
                <h1>Sign up</h1>
                <Form onSubmit={onSubmit}>
                    <Form.Group >
                        <Row>
                            <Col sm={4}>
                                <Form.Label htmlFor='userName'> User name </Form.Label>
                            </Col>
                            <Col sm={8}>
                                <Form.Control
                                    id='userName-input'
                                    name='Username'
                                    placeholder='Enter user name'
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <br/><br/>
                    <Form.Group className="mb-3" controlId="passwordForm">
                        <Row>
                            <Col sm={4}>
                                <Form.Label htmlFor='password'> Password </Form.Label>
                            </Col>
                            <Col sm={8}>
                                <Form.Control 
                                    id='password-input'
                                    name='Password'
                                    placeholder='Enter password'
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Row>
                        <Col sm={3}/>
                        <Col sm={9}>
                            { errors.Username ? <span style={{color:'red', textAlign:'left'}}> { errors.Username } | </span> : null }
                            { errors.Password ? <span style={{color:'red'}}> { errors.Password }</span> : null }
                        </Col>
                    </Row>
                    <div>
                        <Button
                            type='submit'
                            variant='text' // 'danger'
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
