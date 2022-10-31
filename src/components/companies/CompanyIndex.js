import React from 'react'
import { Form, Button, Container } from 'react-bootstrap'


const CompanyIndex = (props) => {

    

    return (
        <>
            {/* need to add name, id, value, on change?*/}
            <div className="company-search-container float-left d-flex align-items-center justify-content-center text-center">
                <div className="mb-5">
                    <Form.Control
                    placeholder="Search a Company"
                    >
                    </Form.Control>
                    <Button className="mt-3">
                        Search
                    </Button>
                </div>
            </div>
        </>
    )
}

export default CompanyIndex