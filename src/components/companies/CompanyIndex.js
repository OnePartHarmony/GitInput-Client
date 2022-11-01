import React, { useEffect, useState } from 'react'
import { Form, Button, Card, Container } from 'react-bootstrap'
import { companyIndex } from '../../api/company'
import { Link } from 'react-router-dom'


const CompanyIndex = (props) => {

    const {msgAlert} = props
 
    const [allCompanies, setAllCompanies] = useState([])

    useEffect(() => {
        companyIndex()
            .then(res => {
                setAllCompanies(res.data.companies)
                console.log(allCompanies)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Failed to find companies' + error,
                    variant: 'danger'
                })
            })
    }, [])

    const allCompaniesJSX = allCompanies.map((company, index) => {
        return (
            <Card key={index} className="company-card text-center mb-3">
                <h1 className="company-name mt-2">{company.name}</h1>
                <img className="logo-company-index" src={company.logo}></img>
                <a className="btn btn-primary mt-2 mb-2 company-link" href={`https://www.${company.domain}`}>{company.name} Website</a>
                <p className="company-description">{company.description}</p>
                <Link to={`/companies/${company._id}`} className="btn btn-success">View Company Reviews</Link>
            </Card>
        )
    })

    return (
        <>  
            <Container className="company-index">
                {/* need to add name, id, value, on change?*/}
                <div className="company-search-container text-center">
                    <div className="mb-5 company-search-box">
                        <section className="m-3 mt-0">Don't see your company listed? Search and add it!</section>
                        <Form.Control
                        className="text-center"
                        placeholder="Search a Company"
                        >
                        </Form.Control>
                        <Button className="mt-3 mb-5">
                            Search
                        </Button>
                    </div>
                </div>
                <div className="company-card-container">
                    {allCompanies.length > 0 ? allCompaniesJSX : "Loading..."}
                </div>
            </Container>
        </>
    )
}

export default CompanyIndex