import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'

const ChangePassword = (props) => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    
    const { msgAlert, user } = props
    
    const navigate = useNavigate()

	const onChangePassword = (event) => {
		event.preventDefault()
		
        const passwords = {oldPassword, newPassword}

		changePassword(passwords, user)
			.then(() => navigate('/'))
			.catch((error) => {
				setOldPassword('')
                setNewPassword('')
				msgAlert({
					heading: 'Change Password Failed with error: ' + error.message,
					message: messages.changePasswordFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <>

            <style>{'body { height:100vh; width:100vw; background-color: rgba(159, 159, 159, .3); background-image: linear-gradient(60deg, rgba(237, 237, 237, 1) 35%, transparent 30%), linear-gradient(-400deg, rgba(202, 235, 242, .7) 40%, transparent 30%);}'}</style>
            <div className='row auth-form' style={{ margin: '100px auto 0 auto'}}>
                <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                    <h3 className="mb-3 text-center">Change Password</h3>
                    <Form onSubmit={onChangePassword}>
                        <Form.Group controlId='oldPassword'>
                            <Form.Label>Old password</Form.Label>
                            <Form.Control
                                required
                                name='oldPassword'
                                value={oldPassword}
                                type='password'
                                placeholder='Old Password'
                                onChange={e => setOldPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='newPassword'>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                required
                                name='newPassword'
                                value={newPassword}
                                type='password'
                                placeholder='New Password'
                                onChange={e => setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                        <button className='comment-btn' type='submit' style={{margin: "20px 0 30px 0"}}>Submit</button>
                    </Form>
                </div>
            </div>
        </>        
    )
}

export default ChangePassword