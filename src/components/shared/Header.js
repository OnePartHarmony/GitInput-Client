import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'


const authenticatedOptions = (
	<>
		<Nav.Item className="nav-item ms-4">
			<Nav.Link eventKey="2" as={Link}  to='change-password' className="nav-item">
				Change Password
			</Nav.Link>
		</Nav.Item>
		<Nav.Item className="ms-4">
			<Nav.Link eventKey="3" as={Link}  to='sign-out' className="nav-item">
				Sign Out
			</Nav.Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item className="nav-item ms-4">
		    <Nav.Link eventKey="4" as={Link}  to='sign-up' className="nav-item">
				Sign Up
			</Nav.Link>
        </Nav.Item>
        <Nav.Item className="nav-item ms-4">
		    <Nav.Link eventKey="5" as={Link}  to='sign-in' className="nav-item">
				Sign In
			</Nav.Link>
        </Nav.Item>
	</>
)


const Header = ({ user }) => (
	<Navbar collapseOnSelect={true} className='nav-bar p-0' variant='dark' expand='xl'>
		<Navbar.Brand>
            <Link to='/' className="ms-3 site-name">
                &lt;Git Input/&gt;
            </Link>
        </Navbar.Brand>
		{user && 
			<span className='welcome-nav item ms-1'>Welcome, {user.username}</span>
		}
		<Navbar.Toggle aria-controls='basic-navbar-nav' className='me-4'/>		
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='nav justify-content-end me-5 nav-link' style={{ width: "100%" }}>				
				<Nav.Item className="ms-4">
					<Nav.Link eventKey="1" as={Link} to='/companies' className="nav-item">
						View Companies
					</Nav.Link>
				</Nav.Item>
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
