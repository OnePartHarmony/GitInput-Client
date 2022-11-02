import React, {useState} from 'react'
import { companyCreate } from '../../api/company'

import CompanyForm from './CompanyForm'

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
            <CompanyForm
            company={ company }
            handleChange={ handleChange }
            heading="Add a new Company!"
            handleSubmit={ handleCreateCompany }
        />
		)
}

export default CompanyCreate