import Button from "react-bootstrap/Button"
import { SetUserContext } from "../header"
import React, { useState, useContext } from "react"
import { Container, Form, Row } from "react-bootstrap"

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

export function SignUpForm() {
    const [SignUpData, setSignUpData] = useState<SignUpData>({ FirstName : "", LastName : "", Email : "" })
    const [errors, setError] = useState<SignUpError>({})
    const { setLoggedInUser, setLoggedInUserId } = useContext(SetUserContext)
    
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
        const isValidInput = 
            !(validationError.hasOwnProperty(FIRSTNAME) 
              || validationError.hasOwnProperty(LASTNAME) 
              || validationError.hasOwnProperty(EMAIL))
        return isValidInput
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
                fetch('http://localhost:3005/customers', {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json; charset=UTF-8' },
                    body: JSON.stringify(user),
                })
                .then(userResult => userResult.json())
                .then(userResult => {
                    if (userResult.hasOwnProperty('error')) {
                        setError({ Email : 'Mail is already in use' })
                    }
                    else {
                        setLoggedInUserId(userResult.id)
                        setLoggedInUser(userResult.firstName + ' ' + userResult.lastName)
                        // Create basket for user
                        fetch(`http://localhost:3005/customers/${userResult.id}/baskets`, {
                            method: 'POST',
                            headers: { 'Content-type': 'application/json; charset=UTF-8' },
                        }).catch(error => console.log({ errorAddingBasket: error}))
                    }
                })
                .catch(error => console.log({ errorAddingUser: error }))
        }
    }
    return (
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
                { errors.FirstName ? <span className="errorMsg"> { errors.FirstName } </span> : null }
                { errors.LastName ? <span className="errorMsg"> { errors.LastName } </span> : null }
                { errors.Email ? <span className="errorMsg"> { errors.Email } </span> : null }
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
    );
}
