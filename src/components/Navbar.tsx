import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { getToken } from "../utils/tools"

export function Navbar() {




      return (
          <NavbarBs className="bg-white shadow-sm mb-3">
              <Container>
                  <Nav className = "sme-auto">
                      <Nav.Link to = "ServiceList" as = {NavLink} >
                          Service List
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
                      {/* { getToken() && <Nav.Link to = "Profile" as = {NavLink} >
                          Profile
                      </Nav.Link>} */}
                      <Nav.Link to = "/login" as = {NavLink} >
                          Log Out
                      </Nav.Link>
                  </Nav>
              </Container>
          </NavbarBs>
      )
  }
