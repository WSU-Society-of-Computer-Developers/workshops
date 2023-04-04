type NavItemProps = {
    children: string | JSX.Element,
    href: string
}

const NavItem = ({ href, children }: NavItemProps) => <>
    <li className={`mr-6 text-blue-500 hover:text-blue-800`}>
        <a href={href}>{children}</a>
    </li>
</>

export default function Nav() {
    return <>
        <hr />
        <ul className="flex items-center">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/gallery">Gallery</NavItem>
        </ul>
        <hr />
    </>
}
