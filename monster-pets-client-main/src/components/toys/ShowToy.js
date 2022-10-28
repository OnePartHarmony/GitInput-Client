import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { deleteToy } from '../../api/toys'
import EditToyModal from './EditToyModal'

const ShowToy = (props) => {
    const { toy, pet, user, msgAlert, triggerRefresh } = props
    console.log('this is the props', props)

    const [editToyModalShow, setEditToyModalShow] = useState(false)

    // this will set the color of the card based on the condition
    const setBgCondition = (cond) => {
        if (cond === 'new') {
            return({ width: '18rem', backgroundColor: '#b5ead7'})
        } else if (cond === 'used') {
            return({ width: '18rem', backgroundColor: '#ffdac1'})
        } else {
            return({ width: '18rem', backgroundColor: '#ff9aa2'})
        }
    }

    // this function removes a toy, is only available to pet owner
    const destroyToy = () => {
        deleteToy(user, pet._id, toy._id)
            .then(() => {
                msgAlert({
                    heading: 'Toy deleted!',
                    message: 'Bye Bye toy!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className="m-2" style={setBgCondition(toy.condition)}>
                <Card.Header>{ toy.name }</Card.Header>
                <Card.Body>
                    <small>{ toy.description }</small><br/>
                    <small>
                        { toy.isSqueaky ? 'squeak squeak' : 'stoic silence'}
                    </small><br/>
                    <small>Condition: { toy.condition }</small>
                </Card.Body>
                <Card.Footer>
                    { 
                        user && pet.owner && user._id === pet.owner._id 
                        ?
                        <>
                           <Button 
                            variant="warning"
                            onClick={() => setEditToyModalShow(true)}
                            >
                            Edit Toy
                            </Button>   
                            <Button 
                                variant="danger"
                                onClick={() => destroyToy()}
                            >
                                Delete Toy
                            </Button>       
                        </>
  
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditToyModal 
                user={user}
                pet={pet}
                currentToy={toy}
                show={editToyModalShow}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
                handleClose={() => setEditToyModalShow(false)}
            />
        </>
    )
}

export default ShowToy