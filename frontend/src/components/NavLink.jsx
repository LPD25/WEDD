import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import home from '../assets/icons/home.svg';
import edit from '../assets/icons/edit.svg';
import invite from '../assets/icons/invite.svg';
import reunion from '../assets/icons/reunion.svg';
import help from '../assets/img/help.svg';
import search from '../assets/icons/search.png';
import Image from './Image';

function NavLink() {
  const [activeLink, setActiveLink] = useState('dashboard');
  const [isHovered, setIsHovered] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Synchronisation de l'état actif avec l'URL
  useEffect(() => {
    const path = location.pathname.split('/')[1];
    setActiveLink(path || 'dashboard');
  }, [location]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`, {}, {
        headers: { 'Content-Type': 'application/json' }
      });
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      alert("Erreur lors de la déconnexion");
    }
  }

  const navItems = [
    { id: 'dashboard', icon: home, label: 'Dashboard', path: '/dashboard' },
    { id: 'liste-reunions', icon: reunion, label: 'Réunions', path: '/liste-reunions' },
    { id: 'ajout-invite', icon: invite, label: 'Ajouter un invité', path: '/ajout-invite' },
    { id: 'profil', icon: edit, label: 'Profil', path: '/profil' },
    { id: 'recherche-invite', icon: search, label: 'Recherche invité', path: '/recherche-invite' }
  ];

  return (
    <motion.div 
      className="w-64 h-screen flex flex-col gap-2 border-r border-gray-200 bg-white shadow-sm fixed left-0 top-0 z-10"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-blue-700">WEDD</h1>
      </div>

      <div className="flex-1 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-2 p-4">
          {navItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setIsHovered(item.id)}
              onHoverEnd={() => setIsHovered(null)}
            >
              <Link
                to={item.path}
                className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                  activeLink === item.id 
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <motion.span 
                  animate={{
                    color: activeLink === item.id || isHovered === item.id ? '#be185d' : '#4b5563'
                  }}
                >
                  <img 
                    src={item.icon} 
                    alt={item.label} 
                    className="w-5 h-5" 
                  />
                </motion.span>
                <span className="font-medium">{item.label}</span>
                {activeLink === item.id && (
                  <motion.div 
                    className="ml-auto w-2 h-2 bg-blue-500 rounded-full"
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100 space-y-4">
          <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
            <Image src={help} className="w-48 mb-2" />
            <Link 
              to="/help-page" 
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline underline-offset-4"
            >
              Avez-vous besoin d'aide ?
            </Link>
          </div>

          <motion.button
            onClick={() => { setActiveLink('logout'); handleLogout(); }}
            className="w-full flex items-center justify-center gap-2 p-3 text-red-600 hover:text-red-800 rounded-lg hover:bg-blue-50 transition-colors"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Déconnexion</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default NavLink;