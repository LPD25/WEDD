import React from 'react';
import image_couple from '../assets/img/image_couple.jpg';
import logo from '../assets/img/logo.png';
import Input from '../components/Input';
import Image from '../components/Image';
import Title from '../components/Title';
function Inscription() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 h-96 md:h-full">
        <Image
          src={image_couple}
          alt="image_couple"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex w-full md:w-1/2 flex-col justify-center px-4 md:px-6 py-4 md:py-6 lg:px-8">
        <div className="mx-auto w-full max-w-sm text-center">
          <Image
            alt="Logo"
            src={logo}
            className="mx-auto h-32 md:h-48 w-auto"
          />
          <Title
            fontWeight="font-bold"
            fontSize="text-2xl"
            className="mt-4 md:mt-6 text-center md:text-2xl tracking-tight text-gray-900"
          >
            CREER MON COMPTE
          </Title>
        </div>

        <div className="mt-4 md:mt-6 mx-auto w-full max-w-sm">
          <form action="#" method="POST" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                width="w-full"
                type="text"
                name="nom"
                placeholder="Nom"
                required={true}
              />
              <Input
                width="w-full"
                type="text"
                name="prenom"
                placeholder="Prénom"
                required={true}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                width="w-full"
                type="email"
                name="email"
                placeholder="Email"
                required={true}
              />
              <Input
                width="w-full"
                type="number"
                name="telephone"
                placeholder="Numéro de téléphone"
                required={true}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                width="w-full"
                type="password"
                name="password"
                placeholder="Mot de passe"
                required={true}
              />
              <Input
                width="w-full"
                type="password"
                name="confirmPassword"
                placeholder="Confirmer mot de passe"
                required={true}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                width="w-full"
                type="date"
                name="dateMarriage"
                placeholder="Date de mariage"
                required={true}
              />
              <Input
                width="w-full"
                type="text"
                name="lieuMarriage"
                placeholder="Lieu de mariage"
                required={true}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Input
                  width="w-full"
                  type="color"
                  name="couleurSite"
                  placeholder="Couleur du site"
                  required={true}
                  className="p-1 h-10 w-20 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                />
                <span className="text-sm">Couleur du site</span>
              </div>
              <Input
                width="w-full"
                type="text"
                name="themeMariage"
                placeholder="Thème du mariage"
                required={true}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="flex  w-full justify-center rounded-md bg-[#016CEC] px-3 py-1.5 text-sm font-semibold text-white opacity-90 shadow-xs hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Créer mon compte
              </button>
            </div>
          </form>

          <p className="mt-4 md:mt-6 text-center text-sm text-black">
            Avez vous déjà un compte ?
            <a
              href="#"
              className="font-semibold ml-1 text-[#016CEC] opacity-80 hover:opacity-100"
            >
              Connectez vous
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Inscription;
