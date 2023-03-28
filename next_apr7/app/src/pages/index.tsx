import Nav from '@/comps/Nav'
import { loadUsers } from '@/lib/api'
import type { JSONPlaceholderTypes } from "@/lib/api"
import Head from 'next/head'
import Image from 'next/image'

// this will run at each page request and during build time
export async function getStaticProps() {
  const users = await loadUsers()
  return {
    props: {
      users
    },
    // below will regenerate the page at most every 10 seconds
    // revalidate: 5 * 60 * 1000 
  }
}

export default function Home({ users }: { users: JSONPlaceholderTypes.User[] }) {
  return (
    <>
      <div className='mx-8 mt-4'>
        <h1 className='text-lg'>Home</h1>
        <Nav />
        {/* <h3 className='text-gray-400'>All users</h3> */}
        {users.map(({ id, email }) => <li key={id}>{email}</li>)}
      </div>
    </>
  )
}
