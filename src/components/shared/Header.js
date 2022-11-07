import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'


const authenticatedOptions = (
	<>
		<Nav.Item className="nav-item ms-4">
			<Link to='change-password' className="nav-item">
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item className="ms-4">
			<Link to='sign-out' className="nav-item">
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item className="nav-item ms-4">
		    <Link to='sign-up' className="nav-item">
				Sign Up
			</Link>
        </Nav.Item>
        <Nav.Item className="nav-item ms-4">
		    <Link to='sign-in' className="nav-item">
				Sign In
			</Link>
        </Nav.Item>
	</>
)


const Header = ({ user }) => (
	<Navbar className='nav-bar p-0' variant='dark' expand='xl'>
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
					<Link to='/companies' className="nav-item">
						View Companies
					</Link>
				</Nav.Item>
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
