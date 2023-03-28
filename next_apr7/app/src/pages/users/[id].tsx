// dynamic routing for specific users
import { getSpecificUser, getUsers, JSONPlaceholderTypes } from "@/lib/api"

export const getStaticPaths = async () => {
    const users = await getUsers()
    return {
        paths: users.map(({ id }) => {
            return {
                params: { id: id.toString() }
            }
        }), // needs: [ { params: { id: 1 } }, { params: { id: 2 } }, ... ]
        fallback: true
    }
}

export const getStaticProps = async (context: { params: { id: string } }) => {
    const id = context.params.id
    const user = await getSpecificUser(id)
    return {
        props: { user }
    }
}

export default function User({ user }: { user: JSONPlaceholderTypes.User }) {
    return <></>
}  