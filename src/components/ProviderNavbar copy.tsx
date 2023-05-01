
import {Container, Navbar, Nav} from "react-bootstrap"
import { NavLink } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

export function ProviderNavbar() {
    return (
        <Navbar className="bg-white shadow-sm mb-3">
            <Container>
                <Nav className = "me-auto">
                    <Nav.Link to = "ServiceList" as = {NavLink} >
                        Service List mklm
                    </Nav.Link>
                    <Nav.Link to = "AddService" as = {NavLink} >
                        Add Service
                    </Nav.Link>
                    <Nav.Link to = "ServiceRequest" as = {NavLink} >
                        Service Request 
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link to = "Profile" as = {NavLink} >
                        Profile
                    </Nav.Link>
                    <Nav.Link to = "/login" as = {NavLink} >
                        Log Out
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}