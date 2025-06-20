import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BlogRight from "../components/BlogRight";
import NavLink from "../components/NavLink";
import logo from "../assets/img/logo.png"

import axios from "axios";
import { Html5Qrcode } from "html5-qrcode";

const RechercheInvite = () => {
  const [invitesList, setInvitesList] = useState([]);
  const [inputId, setInputId] = useState("");
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const scannerRef = useRef(null);



  const handleLogout = async () => {
    try {
      // Supprimer le token (localStorage ou sessionStorage selon ton app)
      localStorage.removeItem('token');

      // Appel de l'API de déconnexion (pas strictement nécessaire, mais bon pour les logs côté serveur)
      await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`, {}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Redirection vers la page de connexion
      navigate('/login-page');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      alert("Erreur lors de la déconnexion");
    }
  }
  // Récupération des invités
  const invites = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/api/invites`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const data = response.data.invites || [];
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des Invités:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchInvites = async () => {
      const data = await invites();
      setInvitesList(data);
    };
    fetchInvites();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = invitesList.find(
      (invite) => String(invite.inviteId).trim() === inputId.trim()
    );
    if (found) {
      navigate(`/invites/${found.inviteId}`);
    } else {
      setError("Identifiant inconnu");
    }
  };

const startScanner = () => {
  setError(null);
  setIsScanning(true);

  const html5QrCode = new Html5Qrcode("scanner");

  html5QrCode
    .start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      (decodedText) => {
        console.log("QR Code détecté :", decodedText);

        html5QrCode.stop().then(() => {
          setIsScanning(false);

          try {
            const url = new URL(decodedText);
            const path = url.pathname;
            navigate(path);
          } catch (err) {
            console.error("❌ URL invalide dans le QR Code :", decodedText);
            setError("QR Code invalide");
          }
        });
      },
      (errorMessage) => {
        console.warn("Erreur scan :", errorMessage);
      }
    )
    .catch((err) => {
      console.error("Erreur démarrage scanner :", err);
      setIsScanning(false);
    });
};

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* ---- NAVLINK (gauche, desktop seulement) ---- */}
      <div className="hidden md:block md:w-64">
        <NavLink />
      </div>

      {/* ---- MOBILE HEADER + NAVIGATION ---- */}
      <div className="bg-gray-800 text-white w-full p-4 flex justify-between items-center md:hidden">
          <h1 className="text-xl font-bold size-12"><img src={logo} className='w-max' alt="logo-wedd" /></h1>
          <button
          className="bg-gray-700 px-3 py-1 rounded"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <nav className="bg-gray-800 text-white flex flex-col gap-3 p-4 w-full md:hidden">
          <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Dashboard</Link>
          <Link to="/liste-reunions" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Réunions</Link>
          <Link to="/ajout-invite" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Ajouter un invité</Link>
          <Link to="/recherche-invite" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Recherche invité</Link>
          <Link to="/profil" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Profil</Link>
          <Link onClick={() =>{ setMenuOpen(false); handleLogout()}} className="text-red-400 hover:text-red-300">Déconnexion</Link>
        
        </nav>
      )}

      {/* ---- FORMULAIRE PRINCIPAL CENTRÉ ---- */}
      <div className="flex-1 bg-[#717171] flex items-center justify-center p-4">
        <div className="bg-white shadow-lg p-6 md:p-8 rounded-2xl w-full max-w-md flex flex-col items-center text-center">
          <h2 className="text-xl font-bold mb-6 text-black">
            Entrer l'identifiant de l'invité
          </h2>

          <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mb-4">
              <input
                type="text"
                placeholder="Identifiant de l'invité"
                className="w-full p-3 text-base border border-[#C6C6C6] rounded-lg"
                value={inputId}
                onChange={(e) => {
                  setInputId(e.target.value);
                  setError(null);
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#016CEC] font-bold text-white px-6 py-3 rounded-lg hover:bg-[#0156BC]"
            >
              CHERCHER
            </button>
          </form>

          <button
            type="button"
            onClick={startScanner}
            className="mt-4 w-full bg-green-600 font-bold text-white px-6 py-3 rounded-lg hover:bg-green-800"
          >
            📷 Scanner un QR Code
          </button>

          {error && (
            <div className="mt-4">
              <span className="text-red-600 font-bold">{error}</span>
            </div>
          )}

          {isScanning && (
            <div id="scanner" className="mt-6 w-full h-60 bg-gray-100 rounded-md shadow-inner" />
          )}
        </div>
      </div>

      {/* ---- BLOGRIGHT (droite, desktop seulement) ---- */}
      <div className="hidden md:block md:w-64">
        <BlogRight />
      </div>
    </div>
  );
};
export default RechercheInvite;
