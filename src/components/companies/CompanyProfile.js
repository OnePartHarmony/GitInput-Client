


const CompanyProfile = (props) => {

    const {company, showReviewForm} = props
    

    return (
        <div className="mt-5" style={{flex: 1, textAlign: "center"}}>
            <div className="mb-5" style={{backgroundColor: "rgb(197,231,255)", border: "2px solid rgb(114,195,255)", width: "33vw", margin: "auto", padding: "10px"}}>
                <h3>{company.name}</h3>
                {company.averageRating ? <h4>company.averageRating</h4> : null}
                <img src={company.logo} alt={`${company.name} logo`}/>
                <p>{company.description} </p>
                <h5>{company.domain}</h5>
            </div>
            <button className="btn btn-primary" onClick={showReviewForm}>Leave a Review</button>
        </div>
    )
}

export default CompanyProfile