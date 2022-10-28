
import PetIndex from "./pets/PetIndex"


const Home = (props) => {
	const { msgAlert } = props

	
	return (
		<div className='container-md'>
			<h2>All the pets</h2>
			<PetIndex msgAlert={msgAlert}/>
		</div>
	)
}

export default Home
