import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createToy = (user, petId, newToy) => {
    console.log('the user in createToy', user)
    console.log('the newToy in createToy', newToy)
	return axios({
		url: `${apiUrl}/toys/${petId}`,
		method: 'POST',
		data: { toy: newToy }
	})
}

// UPDATE toy
export const updateToy = (user, petId, updatedToy) => {
    console.log('this is updatedToy', updatedToy)
	return axios({
		url: `${apiUrl}/toys/${petId}/${updatedToy._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { toy: updatedToy }
	})
}

// DELETE toy
export const deleteToy = (user, petId, toyId) => {
	return axios({
		url: `${apiUrl}/toys/${petId}/${toyId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}