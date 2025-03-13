import logo from "../assets/img/empty-logo.png"
import '../assets/css/index.css'

export default function Navbar() {

    return (
    <>
        <div className="navbar bg-base-200">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li><a href="#">Accueil</a></li>
                    <li><a href="#">A Propos</a></li>
                    <li>
                    <a>Pages</a>
                    <ul className="p-2">
                        <li><a href="#">Services</a></li>
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                    </li>
                    <li><a>Blog</a></li>
                </ul>
                </div>
                <a className="btn btn-ghost text-xl"><img src={logo} className="w-12 rounded hover:bg-base-200" alt="" /></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                <li><a href="#">Accueil</a></li>
                <li><a href="#">A Propos</a></li>
                <li>
                    <details>
                    <summary>Pages</summary>
                    <ul className="p-2">
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">FAQs</a></li>
                    </ul>
                    </details>
                </li>
                <li><a href="#">Blog</a></li>
                </ul>
            </div>
            <div className="navbar-end gap-2">
                <a className="btn btn-outline-primary">Se connecter</a>
                <a className="btn btn-primary">S'inscrire</a>
            </div>
        </div>
    </>
)
}
    