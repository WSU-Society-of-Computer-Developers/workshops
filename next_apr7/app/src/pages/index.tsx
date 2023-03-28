import Nav from '@/comps/Nav'
import endpoints from '@/lib/api'
import type { JSONPlaceholderTypes } from "@/lib/api"
import Head from 'next/head'
import Image from 'next/image'
import Card from '@/comps/Card'

// this will run at each page request and during build time
export async function getStaticProps() {
  const users: JSONPlaceholderTypes.User[] = await loadUsers()

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
      <h3 className='text-gray-400'>All users</h3>
      {/* There's probably a better way to arrange these cards... */}
      <div className="container columns-1 sm:columns-2 md:columns-3 mx-auto">
        {users.map(({ id, name, email }) =>
          <Card key={id} title={name}>{email}</Card>
        )}
      </div>
    </>
  )
}
