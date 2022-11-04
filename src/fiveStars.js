//this function creates five stars, with the number of yellow ones dependent on a parameter

const fiveStars = (rating) => {
    
    const starsArray = Array.from({length: rating}, (a,index) => 
            <svg key={index} width="30" height="30" viewBox="0 0 60 60"><path fill="gold" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/></svg>
        )
        while (starsArray.length < 5) {
            let newIndex = starsArray.length
            starsArray.push(
                <svg key={newIndex} width="30" height="30" viewBox="0 0 60 60"><path fill="grey" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/></svg>
            )
        }

    return starsArray
}

export default fiveStars