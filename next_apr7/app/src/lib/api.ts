// backend url -> https://jsonplaceholder.typicode.com

export async function loadUsers(): Promise<JSONPlaceholderTypes.User[]> {
    const res = await fetch(process.env.BACKEND + "/users")
    const users = await res.json()
    return users
}

export declare namespace JSONPlaceholderTypes {
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
}