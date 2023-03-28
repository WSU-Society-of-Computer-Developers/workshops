import Nav from "./Nav";

type LayoutProps = {
    children: JSX.Element
}

export default function Layout({ children }: LayoutProps) {
    return <>
        <div className='mx-8 mt-4'>
                <h1 className='text-lg'>Next App</h1>
                <Nav />
                {children}
        </div>
    </>
}