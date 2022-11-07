import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'

const SignUp = (props) => {
  
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const navigate = useNavigate()

	const onSignUp = (event) => {
		event.preventDefault()

		const { msgAlert, setUser } = props

        const credentials = {username, password, passwordConfirmation}

		signUp(credentials)
			.then(() => signIn(credentials))
			.then((res) => setUser(res.data.user))
			.then(() => navigate('/'))
			.catch((error) => {
                setUsername('')
                setPassword('')
                setPasswordConfirmation('')
				msgAlert({
					heading: 'Sign Up Failed with error: ' + error.message,
					message: messages.signUpFailure,
					variant: 'danger',
				})
			})
	}


    return (
        <>
            <style>{'body { height:100vh; width:100vw; background-color: rgba(159, 159, 159, .3); background-image: linear-gradient(60deg, rgba(237, 237, 237, 1) 35%, transparent 30%), linear-gradient(-400deg, rgba(202, 235, 242, .7) 40%, transparent 30%);}'}</style>
            <div className='row auth-form' style={{ margin: '100px auto 0 auto'}}>
                <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                    <h3 className="mb-3 text-center">Sign Up</h3>
                    <Form onSubmit={onSignUp}>
                        <Form.Group controlId='username'>
                            <Form.Label className="mb-0">Username</Form.Label>
                            <Form.Control
                                className="mb-3"
                                required
                                type='text'
                                name='username'
                                value={username}
                                placeholder='Enter username'
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label className="mb-0">Password</Form.Label>
                            <Form.Control
                                className="mb-3"
                                required
                                name='password'
                                value={password}
                                type='password'
                                placeholder='Password'
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='passwordConfirmation'>
                            <Form.Label className="mb-0">Password Confirmation</Form.Label>
                            <Form.Control
                                className="mb-3"
                                required
                                name='passwordConfirmation'
                                value={passwordConfirmation}
                                type='password'
                                placeholder='Confirm Password'
                                onChange={e => setPasswordConfirmation(e.target.value)}
                            />
                        </Form.Group>
                        <button className='comment-btn' type='submit' style={{margin: "10px 0 30px 0"}}>Submit</button>
                    </Form>
                </div>
            </div>
        </>
        
    )

}

export default SignUp