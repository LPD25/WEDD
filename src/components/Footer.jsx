import x from "../assets/icons/x.svg"
import instagram from "../assets/icons/instagram.svg"
import facebook from "../assets/icons/facebook.svg"
import tiktok from "../assets/icons/tiktok.svg"
import logo from "../assets/img/empty-logo.png"
import '../assets/css/index.css'

export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <>
            <footer className="footer bg-base-200 text-base-content p-10">
                <nav>
                    <h6 className="footer-title">Liens Rapides</h6>
                    <a className="link link-hover">Accueil</a>
                    <a className="link link-hover">A Propos</a>
                    <a className="link link-hover">Services</a>
                    <a className="link link-hover">Contact</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Liens utiles</h6>
                    <a className="link link-hover">Blog</a>
                    <a className="link link-hover">FAQs</a>
                    <a className="link link-hover">Prendre un rendez-vous</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Pages légales</h6>
                    <a className="link link-hover">Conditions générales d'utilisation</a>
                    <a className="link link-hover">Politique de confidentialité</a>
                    <a className="link link-hover">Mentions légales</a>
                </nav>
                </footer>
                <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
                <aside className="grid-flow-col items-center">
                    <img src={logo} className="w-10 rounded" alt="" />
                    <p>
                    Copyright © {year} - Tous droits reservés.
                    <br />
                    Landing Page Designer
                    </p>
                </aside>
                <nav className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4">
                    <a href="#">
                        <img src={x} className="w-7" alt="" />
                    </a>
                    <a href="#">
                        <img src={instagram} className="w-7" alt="" />
                    </a>
                    <a href="#">
                        <img src={facebook} className="w-7" alt="" />
                    </a>
                    <a href="#">
                        <img src={tiktok} className="w-7" alt="" />
                    </a>
                    </div>
                </nav>
            </footer>
        </>
    )
}