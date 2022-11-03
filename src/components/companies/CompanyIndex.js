import React, { useEffect, useState } from 'react'
import { Form, Button, Card, Container } from 'react-bootstrap'
import { companyIndex } from '../../api/company'
import { Link } from 'react-router-dom'
import CreateCompanyModal from './CreateCompanyModal'


const CompanyIndex = (props) => {

    const {msgAlert, user} = props
 
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
            <Card key={index} className="company-card text-center mb-3 d-flex flex-column">
                <Card.Title>
                <p className="company-name mt-2">{company.name}</p>
                </Card.Title>
                <div className="logo-index-container">
                    <img className="logo-company-index" src={company.logo}></img>
                </div>
                <Button className="btn mt-2 mb-2 company-link" href={`https://www.${company.domain}`}>{company.name} Website</Button>
                <div className= "description-container">
                    <p className="company-description">{company.description}</p>
                </div>
                <Link to={`/companies/${company._id}`} state={company} className="company-button mt-auto mb-3">View Company Reviews</Link>
            </Card>
        )
    })

    return (
        <>  
            <main className="company-index">
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
                        {user ? 
                            <div className="company-create">
                                <h5>
                                Don't see your company at all?
                                <br/>
                                Create it!
                                </h5>
                            <CreateCompanyModal user={user} msgAlert={msgAlert}/>
                            </div>
                        : null }
                        
                    </div>
                </div>
                <div className="company-card-container">
                    {allCompanies.length > 0 ? allCompaniesJSX : "Loading..."}
                </div>
            </main>  
        </>
    )
}

export default CompanyIndex