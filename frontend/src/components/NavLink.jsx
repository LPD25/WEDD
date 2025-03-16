import React from 'react'
import { useState } from 'react'
import home from '../assets/icons/home.svg'
import edit from '../assets/icons/edit.svg'
import invite from '../assets/icons/invite.svg'
import reunion from '../assets/icons/reunion.svg'
function NavLink() {
  const [activeLink, setActiveLink] = useState('dashboard')

  return (
    <div className="w-64 flex flex-col gap-4 border border-gray-300">
      <div className={`flex m-8 items-center gap-4 ${activeLink !== 'dashboard' ? 'opacity-50' : ''}`}>
        <span className="text-gray-900 mr-6">
          <img src={home} alt="home" className={activeLink === 'dashboard' ? 'text-gray-900' : 'text-gray-500'} />
        </span>
        <a href="#" className={`font-semibold ${activeLink === 'dashboard' ? 'text-gray-900' : 'text-gray-700'}`} onClick={() => setActiveLink('dashboard')}>
          Dashboard
        </a>
      </div>

      <div className={`flex m-8 items-center gap-4 ${activeLink !== 'reunions' ? 'opacity-50' : ''}`}>
        <span className="text-gray-500 mr-6">
          <img src={reunion} alt="reunion" className={activeLink === 'reunions' ? 'text-gray-900' : 'text-gray-500'} />
        </span>
        <a href="#" className={`${activeLink === 'reunions' ? 'text-gray-900' : 'text-gray-700'}`} onClick={() => setActiveLink('reunions')}>
          Réunions
        </a>
      </div>

      <div className={`flex m-8 items-center gap-4 ${activeLink !== 'invite' ? 'opacity-50' : ''}`}>
        <span className="text-gray-500 mr-6">
          <img src={invite} alt="invite" className={activeLink === 'invite' ? 'text-gray-900' : 'text-gray-500'} />
        </span>
        <a href="#" className={`${activeLink === 'invite' ? 'text-gray-900' : 'text-gray-700'}`} onClick={() => setActiveLink('invite')}>
          Ajouter un invité
        </a>
      </div>

      <div className={`flex m-8 items-center gap-4 ${activeLink !== 'profil' ? 'opacity-50' : ''}`}>
        <span className="text-gray-500 mr-6">
          <img src={edit} alt="profil" className={activeLink === 'profil' ? 'text-gray-900' : 'text-gray-500'} />
        </span>
        <a href="#" className={`${activeLink === 'profil' ? 'text-gray-900' : 'text-gray-700'}`} onClick={() => setActiveLink('profil')}>
          Profil
        </a>
      </div>
    </div>
  )
}

export default NavLink