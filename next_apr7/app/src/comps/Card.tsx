import Image from "next/image"

type CardProps = {
    title: string,
    img?: string,
    children: string | JSX.Element
}

export default function Card({ title, img, children }: CardProps) {
    return <>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-1">
            <div className="md:flex">
                <div className="md:shrink-0">
                    {img && <Image className="h-48 w-full object-cover md:h-full md:w-48" src={img} alt={title} />}
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{title}</div>
                    <p className="mt-2 text-slate-500">{children}</p>
                </div>
            </div>
        </div>
    </>
}