import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PetForm from '../shared/PetForm'
import { petUpdate } from '../../api/pet'

const EditPetModal = (props) => {
    const { 
        user, show, handleClose, 
        msgAlert, triggerRefresh 
    } = props

    const [pet, setPet] = useState(props.pet)

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

    const handleSubmit = (e) => {
        e.preventDefault()
        
        petUpdate(pet, user, props.pet._id)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Updated pet!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Update Pet Failure' + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton/>
            <Modal.Body>
                <PetForm 
                    pet={pet}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Pet"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditPetModal