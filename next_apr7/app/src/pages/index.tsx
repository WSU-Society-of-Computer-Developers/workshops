import { getUsers } from '@/lib/api'
import type { JSONPlaceholderTypes } from "@/lib/api"
import Head from 'next/head'
import Link from "next/link"
import Card from '@/comps/Card'

// Next.js will pre-render this page on each request using the data returned by getServerSideProps w/ server-side rendering (SSR).
export const getServerSideProps = async () => {
  const users: JSONPlaceholderTypes.User[] = await getUsers()
  return {
    props: {
      users
    },
  }
}

export default function Home({ users }: { users: JSONPlaceholderTypes.User[] }) {
  return (
    <>
      <h3 className='text-gray-400'>All users</h3>
      {/* There's probably a better way to arrange these cards... */}
      <div className="container columns-1 sm:columns-2 md:columns-3 mx-auto">
        {users.map(({ id, name, username }) =>
          <Link href={'/users/' + id} key={id}><Card key={id} title={name}><span>@{username}</span></Card></Link>
        )}
      </div>
    </>
  )
}
