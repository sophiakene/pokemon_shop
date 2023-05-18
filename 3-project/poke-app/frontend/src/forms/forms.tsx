import { Container, Row, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import './form.css'
import { LoginForm } from "./Login"
import { SignUpForm } from './SignUp'

export function Forms() {
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col sm={2}/>

                    <Col sm={4}>
                        <br/>
                        <h2>Already registered?</h2>
                        <br/>
                        <LoginForm/>
                    </Col>

                    <Col sm={4}>
                        <br/>
                        <h2>New here?</h2>
                        <br/>
                        <SignUpForm/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
