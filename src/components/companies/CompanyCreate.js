import React, {useState} from 'react'
import { companyCreate } from '../../api/company'

const CompanyCreate = ({ user, msgAlert }) => {

    const defaultCompany = {
        name: '',
        logo: '',
        domain: '',
        description: ''
    }

    const [company, setCompany] = useState(defaultCompany)

    const handleChange = (event) => {
        setCompany({...company, [event.target.name]: event.target.value})
    }

    const handleCreateCompany = () => {
        companyCreate(company, user)
        .then(() => {
            msgAlert({
                heading: 'Success',
                message: 'Create Company',
                variant: 'success'
            })
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Create Company Failure' + error,
                variant: 'danger'
            })
        })
    }

    return (
			<>
				<input
					type='text'
					value={company.name}
					name='name'
					onChange={handleChange}
				/>
				<input
					type='text'
					value={company.logo}
					name='logo'
					onChange={handleChange}
				/>
                <input
					type='text'
					value={company.domain}
					name='domain'
					onChange={handleChange}
				/>
                 <input
					type='text'
					value={company.description}
					name='description'
					onChange={handleChange}
				/>
				<button onClick={handleCreateCompany}>Create A New Company</button>
			</>
		)
}

export default CompanyCreate