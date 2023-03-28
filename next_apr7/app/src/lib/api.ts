// backend url -> https://jsonplaceholder.typicode.com

async function loadFromPath(path: string): Promise<any> {
    const res = await fetch(process.env.BACKEND + path)
    const data = await res.json()
    return data
}

const endpoints = {
    loadUsers: loadFromPath("/users"),
    loadPhotos: loadFromPath("/photos")
}

export default endpoints

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