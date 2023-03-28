import Card from "@/comps/Card"
import { getPhotos, JSONPlaceholderTypes } from "@/lib/api"

// Next.js will pre-render this page at build time using the props returned by getStaticProps w/ Static Site Generation (SSG)
export const getStaticProps = async () => {
    const photos: JSONPlaceholderTypes.Photo[] = await getPhotos()
    return {
        props: { photos },
        revalidate: 5 * 60, // this will re-run every 5 minutes and on first request
    }
}

export default function Gallery({ photos }: { photos: JSONPlaceholderTypes.Photo[] }) {
    return <>
        <h3 className='text-gray-400'>Gallery</h3>
        <div className="columns-1 md:columns-2 xl:columns-4">
            {photos.map(({ id, title, url }) => <Card img={url} title={title} key={id}>{title}</Card>)}
        </div>
    </>
}