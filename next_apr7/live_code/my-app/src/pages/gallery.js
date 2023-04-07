import Card from "@/comps/Card"
import { getPhotos } from "@/lib/api"
import Head from "next/head"

export const getStaticProps = async () => {
    const photos = await getPhotos()
    return {
        props: { photos },
        revalidate: 5 * 60 // 5 minutes
    }
}

export default function Gallery({ photos }) {
    return <>
        <Head>
            <title>Gallery</title>
            <meta name="description" content="All images on the app." />
        </Head>
        <h3 className="text-gray-400">Gallery</h3>
        <hr />
        <div className="columns-1 md:columns-2 xl:columns-4">
            {photos?.map(({ id, title, url }) => 
                <Card img={url} title={title} key={id}>{title}</Card>
            )}
        </div>
    </>
}