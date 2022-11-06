import React, { useEffect, useState } from 'react'
import { Form, Card } from 'react-bootstrap'
import { companyIndex } from '../../api/company'
import { Link } from 'react-router-dom'
import CreateCompanyModal from './CreateCompanyModal'


const CompanyIndex = (props) => {

    const {msgAlert, user} = props
 
    const [allCompanies, setAllCompanies] = useState([])
    const [filteredCompanies, setFilteredCompanies] = useState([])

    useEffect(() => {
        companyIndex()
            .then(res => {
                setAllCompanies(res.data.companies)
                setFilteredCompanies(res.data.companies)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Failed to find companies' + error,
                    variant: 'danger'
                })
            })
    }, [msgAlert])

    const allCompaniesJSX = filteredCompanies.map((company, index) => {
 
        return (
            <Card key={index} className="company-card text-center mb-3 d-flex flex-column">
                <Card.Title>
                <p className="company-name">{company.name}</p>
                </Card.Title>
                <div className="logo-index-container mb-3">
                    <img className="logo-company-index" alt="logo" src={company.logo}></img>
                </div>
                <section className="index-review-container">
                    {company.numberOfReviews ? (company.numberOfReviews === 1 ? <div>1 Review</div> : 
                    <div>{company.numberOfReviews} Reviews</div> ) : null }
                </section>
                <div className= "description-container text-center">
                    <p className="company-description mt-2">{company.description}</p>
                </div>
                <div className="index-btn-container mt-auto mb-2">
                    <a className="company-button company-link" target="_blank" href={`https://www.${company.domain}`}> Website</a>
                    <Link to={`/companies/${company._id}`} state={company} className="company-button">Reviews</Link>
                </div>
            </Card>
        )
    })

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    const searchCompanies = (e) => {
        let companies=allCompanies
        let capital = capitalizeFirstLetter(e.target.value)
        let lower = e.target.value.toLowerCase()
        let upper = e.target.value.toUpperCase()
        let filtered = companies.filter(company => company["name"].includes(lower) || company["name"].includes(capital) || company["name"].includes(upper))
        setFilteredCompanies(filtered)
    }
    
    return (
        <> 
            <main className="company-index">
                <div className="company-search-container text-center">
                    <div className="mb-5 company-search-box">
                        <section className="m-3 mt-0">Don't see your company listed? 
                        <br/>
                        Search for it!</section>
                        <Form.Control
                        className="text-center"
                        placeholder="Search a Company"
                        onChange={(e) => searchCompanies(e)}
                        >
                        </Form.Control>
                        <button className="search-btn mt-3 mb-5">
                            Search
                        </button>
                        {user ? 
                            <div className="company-create">
                                <section>
                                Don't see your company in the search?
                                <br/>
                                Create it!
                                </section>
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
