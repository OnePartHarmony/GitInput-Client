import React from 'react'

const CompanyUpdate = ({ company, handleChange, handleUpdatePet }) => {
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
			<button onClick={handleUpdatePet}>Update company</button>
		</>
	)
}

export default CompanyUpdate