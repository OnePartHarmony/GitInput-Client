import { Form, Container, Button } from 'react-bootstrap'


const CompanyForm = (props) => {
    const { company, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <h3>{ heading }</h3>
            <Form onSubmit={ handleSubmit }>
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                    placeholder="What's your company's name?"
                    name="name"
                    id="name"
                    value= { company.name }
                    onChange={ handleChange }
                />
                <Form.Label>Logo:</Form.Label>
                <Form.Control 
                    placeholder="What's type of company?"
                    name="logo"
                    id="logo"
                    value= { company.type }
                    onChange={ handleChange }
                />
                <Form.Label>Domain:</Form.Label>
                <Form.Control 
                    placeholder="Google.com"
                    name="domain"
                    id="domain"
                    value= { company.domain }
                    onChange={ handleChange }
                />
                <Form.Label>Description:</Form.Label>
                <Form.Control 
                    placeholder="Company description"
                    name="description"
                    id="description"
                    value= { company.description }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default CompanyForm