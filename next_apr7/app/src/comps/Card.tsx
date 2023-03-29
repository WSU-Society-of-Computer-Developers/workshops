import Image from "next/image"

type CardProps = {
    title: string,
    img?: string,
    children: string | JSX.Element
}

export default function Card({ title, img, children }: CardProps) {
    return <>
        <div className="max-w-md mx-auto mb-1 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl hover:bg-slate-200">
            <div className="md:flex">
                <div className="sm:shrink-0">
                    {img && <Image width={600} height={600} className="h-48 w-full object-cover md:h-full md:w-48" src={img} alt={title} />}
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{title}</div>
                    <div className="mt-2 text-slate-500">{children}</div>
                </div>
            </div>
        </div>
    </>
}