import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'

const SignIn = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()


	const onSignIn = (event) => {
		event.preventDefault()
		const { msgAlert, setUser } = props

        const credentials = {username, password}

		signIn(credentials)
			.then((res) => setUser(res.data.user))
			.then(() => navigate('/'))
			.catch((error) => {
                setUsername('')
                setPassword('')
				msgAlert({
					heading: 'Sign In Failed with error: ' + error.message,
					message: messages.signInFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <>
            <style>{'body { height:100vh; width:100vw; background-color: rgba(159, 159, 159, .3); background-image: linear-gradient(60deg, rgba(237, 237, 237, 1) 35%, transparent 30%), linear-gradient(-400deg, rgba(202, 235, 242, .7) 40%, transparent 30%);}'}</style>
            <div className='row auth-form' style={{ margin: '100px auto 0 auto'}}>
                <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                    <h3 className="mb-3 text-center">Sign In</h3>
                    <Form onSubmit={onSignIn}>
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
                        <button className='comment-btn' type='submit' style={{margin: "10px 0 30px 0"}}>Submit</button>
                    </Form>
                </div>
            </div>
        </>
        
    )
}

export default SignIn
