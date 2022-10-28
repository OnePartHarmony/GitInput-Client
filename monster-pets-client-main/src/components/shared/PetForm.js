import { Form, Button, Container } from 'react-bootstrap'

const PetForm = (props) => {
    // here are the props we're going to bring into our form
    const { pet, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <h3>{ heading }</h3>
            <Form onSubmit={ handleSubmit }>
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                    placeholder="what's your pet's name?"
                    name="name"
                    id="name"
                    value= { pet.name }
                    onChange={ handleChange }
                />
                <Form.Label>Type:</Form.Label>
                <Form.Control 
                    placeholder="what's type of pet?"
                    name="type"
                    id="type"
                    value= { pet.type }
                    onChange={ handleChange }
                />
                <Form.Label>Age:</Form.Label>
                <Form.Control 
                    placeholder="How old is your pet?"
                    type="number"
                    name="age"
                    id="age"
                    value= { pet.age }
                    onChange={ handleChange }
                />
                <Form.Check 
                    label="Is this pet adoptable?"
                    name="adoptable"
                    defaultChecked={ pet.adoptable }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default PetForm