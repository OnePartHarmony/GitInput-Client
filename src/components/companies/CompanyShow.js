import CompanyProfile from './CompanyProfile'
import ReviewIndex from '../reviews/ReviewIndex'

const CompanyShow = (props) => {

    const {company} = props
    

    return (
        <div style={{display: "flex"}}>
            <CompanyProfile company={company} />
            <ReviewIndex company={company} />
        </div>
    )
}

export default CompanyShow