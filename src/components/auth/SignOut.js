import { useNavigate } from 'react-router-dom'
import { signOut } from '../../api/auth'

const SignOut = (props) => {
	const { clearUser, user } = props

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			.then(() => navigate('/'))
			.then(() => clearUser())
    }

	return (
        onSignOut()
	)
}

export default SignOut
