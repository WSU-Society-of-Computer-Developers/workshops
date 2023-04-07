const url = "https://jsonplaceholder.typicode.com"

async function getFromEndpoint(endpoint) {
    const res = await fetch(url + endpoint)
    const data = await res.json()
    return data
}

export const getUsers = () => getFromEndpoint("/users")
export const getPhotos = () => getFromEndpoint("/photos")
export const getSpecificUser = (id) => getFromEndpoint("/users/" + id)