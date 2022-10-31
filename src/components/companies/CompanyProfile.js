


const CompanyProfile = (props) => {

    const {company, showReviewForm} = props
    

    return (
        <div className="mt-5" style={{flex: 1, textAlign: "center"}}>
            <div className="mb-5" style={{backgroundColor: "rgb(197,231,255)", border: "2px solid rgb(114,195,255)", width: "33vw", margin: "auto"}}>
                <h3>Company Name</h3>
                <h4>Company Average Rating</h4>
                <h4>Average Starting Salaries by Position:</h4>
                <h5>Entry:</h5>
                <h5>Junior:</h5>
                <h5>Senior:</h5>
                <h5>Management:</h5>
                <img src={`https://logo.clearbit.com/${company.domain}`} alt={`${company.name} logo`}/>
                <p>Company Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                <h5>companyWebsite.net</h5>
            </div>
            <button className="btn btn-primary" onClick={showReviewForm}>Leave a Review</button>
        </div>
    )
}

export default CompanyProfile