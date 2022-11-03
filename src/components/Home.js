const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
		
		<style>{'body { height:100vh; width:100vw; background-color: rgba(159, 159, 159, .3); background-image: linear-gradient(60deg, rgba(237, 237, 237, 1) 35%, transparent 30%), linear-gradient(-400deg, rgba(202, 235, 242, .7) 40%, transparent 30%);}'}</style>
		<section className="welcome-section">
			<div className="welcome-title">Welcome to</div>
			<div className="git-input">&lt;Git Input/&gt;</div>
			<div></div>
		</section>
		</>
	)
}

export default Home
