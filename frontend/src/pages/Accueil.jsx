import React from "react";
import Table from "../components/Table";
import Notification from "../components/Notification";
import Graphe from "../components/Graphe";
import Informations from "./Informations";

// import NavLink from "../components/NavLink";
// import Inscription from "./Inscription";
// import Subtitle from "../components/Subtitle";
// import Image from "../components/Image";
// import Title from "../components/Title";
// import Input from "../components/Input";
// import Bouton from "../components/Bouton";
// import logo from "../assets/img/logo.png";
// import Connexion from './Connexion';
import Dashboard from './Dashboard';
import MesReunions from "./MesReunions";
import AjoutReunion from "./AjoutReunion";
import ModifierReunion from "./ModifierReunion";
import AjoutInvite from "./AjoutInvite";
import ModifierInvite from "./ModifierInvite";
import NextMeeting from "../components/NextMeeting";
import InfoProfile from "../components/InfoProfile";
import BlogRight from "../components/BlogRight";
import RechercheInvite from "./RechercheInvite";
import ShowInvite from "./ShowInvite";
import Connexion from "./Connexion";
import { Link } from "react-router-dom";
import InstallPWAButton from "../components/InstallPWAButton";
import download from "../assets/icons/download.png"

function Accueil() {

return (
    <>
<InstallPWAButton />     
<div className={`flex m-8 items-center gap-4 `}>
        <span className="text-gray-500 mr-6 w-10 h-10">
          {/* <img src={search} alt="recherche-invite" className={activeLink === 'recherche-invite' ? 'text-gray-900' : 'text-gray-500'} /> */}
        </span>
        <Link to="/login-page" className={` 'text-gray-900' : 'text-gray-700'}`}>
          Connexion
        </Link>
      </div>

      <div className={`flex m-8 items-center gap-4 `}>
        <span className="text-gray-500 mr-6 w-10 h-10">
          {/* <img src={search} alt="recherche-invite" className={activeLink === 'recherche-invite' ? 'text-gray-900' : 'text-gray-500'} /> */}
        </span>
        <Link to="/register-page" className={` 'text-gray-900' : 'text-gray-700'}`}>
          Inscription
        </Link>
      </div>
    </>
  )
}

export default Accueil
