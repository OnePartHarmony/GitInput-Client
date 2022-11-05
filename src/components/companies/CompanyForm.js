import { Form, Container} from 'react-bootstrap'


const CompanyForm = (props) => {
    const { company, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <h3 className="text-center label">{ heading }</h3>
            <Form onSubmit={ handleSubmit }>
                <Form.Label className="label mb-0 mt-3">Name:</Form.Label>
                <Form.Control 
                    className="mb-3"                    
                    placeholder="What's your company's name?"
                    name="name"
                    id="name"
                    value= { company.name }
                    onChange={ handleChange }
                />
                <Form.Label className="label mb-0">Logo (direct image link):</Form.Label>
                <Form.Control 
                    className="mb-3"                    
                    placeholder="https://i.imgur.com/companyLogo.jpg"
                    name="logo"
                    id="logo"
                    type="url"
                    value= { company.logo }
                    onChange={ handleChange }
                />
                <Form.Label className="label mb-0">Domain:</Form.Label>
                <Form.Control 
                    className="mb-3"
                    placeholder="google.com"
                    name="domain"
                    id="domain"
                    value= { company.domain }
                    onChange={ handleChange }
                />
                <Form.Label className="label mb-0">Description:</Form.Label>
                <Form.Control 
                    className="mb-3"
                    placeholder="Company description"
                    name="description"
                    id="description"
                    value= { company.description }
                    onChange={ handleChange }
                />
                <div className="text-center">
                    <button className="search-btn mt-3" type="submit">Submit</button>
                </div>
            </Form>
        </Container>
    )
}

export default CompanyForm
