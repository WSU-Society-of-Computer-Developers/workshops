import Card from "@/comps/Card"
import { getUsers } from "@/lib/api"
import Head from "next/head"
import Link from "next/link"

export const getServerSideProps = async () => {
  const users = await getUsers()
  return {
    props: {
      users
    }
  }
}

export default function Home({ users }) {
  return (
    <>
    <Head>
      <title>User directory</title>
      <meta name="description" content="All users on the app."/>
    </Head>
      <h3 className="text-gray-400">All users</h3>
      <hr/>
      <div className="container columns-1 sm:columns-2 md:columns-3 mx-auto">
        <ul>
          {users.map(({ id, name, username }) =>
            <Link key={id} href={'/users/' + id}><Card title={name}><span>@{username}</span></Card></Link>
          )}
        </ul>
      </div>
    </>
  )
}
