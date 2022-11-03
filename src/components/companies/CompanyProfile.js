const CompanyProfile = (props) => {

    const {company, showReviewForm, user} = props
    

    return (
        <>
        <style>{'body { height:100vh; width:100vw; background-color: rgba(159, 159, 159, .3); background-image: linear-gradient(60deg, rgba(237, 237, 237, 1) 35%, transparent 30%), linear-gradient(-400deg, rgba(202, 235, 242, .7) 40%, transparent 30%);}'}</style>

        <div className="mt-5" style={{flex: 1, textAlign: "center"}}>
            <div className="d-flex flex-column align-items-center company-profile mb-5" style={{width: "33vw", margin: "auto", padding: "10px"}}>
                <div className="title-box">
                    <div className="profile-title">{company.name}</div>
                </div>
                {company.averageRating ? <h4>company.averageRating</h4> : null}
                <img className="profile-logo" src={company.logo} alt={`${company.name} logo`}/>
                <p className="profile-description">{company.description} </p>
                <a href={`https://www.${company.domain}`} target="_blank" className="company-button">{company.domain}</a>
            </div>
            {user ? <button className="btn btn-primary" onClick={showReviewForm}>Leave a Review</button> : null}
            
        </div>
        </>
    )
}

export default CompanyProfile