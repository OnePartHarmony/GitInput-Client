import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}

const authenticatedOptions = (
	<>
		<Nav.Item className="ms-3">
			<Link to='/companies' style={linkStyle}>
				View Companies
			</Link>
		</Nav.Item>
		<Nav.Item className="ms-3">
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item className="ms-3">
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item className="ms-3">
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item className="ms-3">
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
		{/* TEMP ROUTE */}
		<Nav.Item className="ms-3">
		    <Link to='/companies' style={linkStyle}>Temp Companies</Link>
        </Nav.Item>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Item>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Item>
	</>
)

const Header = ({ user }) => (
	<Navbar bg='primary' variant='dark' expand='md'>
		<Navbar.Brand>
            <Link to='/' style={linkStyle} className="ms-3">
                react-auth-template
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='nav justify-content-end me-5' style={{ width: "100%" }}>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.email}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
