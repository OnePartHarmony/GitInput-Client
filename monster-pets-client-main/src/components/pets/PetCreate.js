import React, { useState } from 'react' 
import { petCreate } from '../../api/pet'
import { useNavigate } from 'react-router-dom'

import PetForm from '../shared/PetForm'

const PetCreate = ({ user, msgAlert }) => {
    const navigate = useNavigate()

    const defaultPet = {
        name: '',
        type: '',
        age: '',
        adoptable: false
    }

    const [pet, setPet] = useState(defaultPet)

    const handleChange = (e) => {
        // to keep the values as users input info 
        // first spread the current pet
        // then comma and modify the key to the value you need
        // this was fine for the old way of building a pet
        // need new stuff to handle new data types number and boolean
        // setPet({...pet, [event.target.name]: event.target.value})
        setPet(prevPet => {
            const updatedName = e.target.name
            let updatedValue = e.target.value
            // this handles our number type
            if (e.target.type === 'number') {
                // this looks at the input type and changes from the default type of string to an actual number
                updatedValue = parseInt(e.target.value)
            }

            // now we handle the checkbox
            if (updatedName === "adoptable" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "adoptable" && !e.target.checked) {
                updatedValue = false
            }

            const updatedPet = { [updatedName]: updatedValue }

            return { ...prevPet, ...updatedPet }
        })
    }

    const handleCreatePet = (e) => {
        e.preventDefault()
        
        petCreate(pet, user)
            .then(res => { navigate(`/pets/${res.data.pet.id}`)})
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Create Pet',
                    variant: 'success'
                })
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Create Pet Failure' + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <PetForm
            pet={ pet }
            handleChange={ handleChange }
            heading="Add a new pet!"
            handleSubmit={ handleCreatePet }
        />
	)
}

export default PetCreate