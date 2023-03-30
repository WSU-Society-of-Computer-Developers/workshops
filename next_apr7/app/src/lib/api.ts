// backend url -> https://jsonplaceholder.typicode.com

async function getFromEndpoint<T>(endpoint: string): Promise<T> {
    const res = await fetch(process.env.BACKEND + endpoint)
    const data = await res.json()
    return data
}
// for index
export const getUsers = () =>
    getFromEndpoint<JSONPlaceholderTypes.User[]>("/users")

// for gallery
export const getPhotos = () =>
    getFromEndpoint<JSONPlaceholderTypes.Photo[]>("/photos")


// for specific users [id] (getStaticPaths)
export const getSpecificUser = (id: number | string) =>
    getFromEndpoint<JSONPlaceholderTypes.User[]>("/users/" + id)

export declare namespace JSONPlaceholderTypes {
    /**
     * @interface User under "/users" for each entry of array 
     */
    interface User {
        id: number,
        name: string,
        username: string,
        email: string,
        address: {
            street: string,
            suite: string,
            city: string,
            zipcode: string,
            geo: {
                lat: string,
                lng: string
            }
        }
        phone: string,
        website: string,
        company: {
            name: string,
            catchPhrase: string,
            bs: string
        }
    }
    interface Photo {
        albumId: number,
        id: number,
        title: string,
        url: string,
        thumbnailUrl: string
    }
}