import React from 'react';
import image_couple from '../assets/img/image_couple.jpg';
import logo from '../assets/img/logo.png';
import Input from '../components/Input';
import Image from '../components/Image';
import Title from '../components/Title';
function Connexion() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 h-96 md:h-full">
        <Image
          src={image_couple}
          alt="image_couple"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex w-full md:w-1/2 flex-col justify-center px-4 md:px-6 py-8 md:py-12 lg:px-8">
        <div className="mx-auto w-full max-w-sm text-center">
          <Image
            alt="Logo"
            src={logo}
            className="mx-auto h-40 md:h-60 w-auto"
          />
          <Title
            fontWeight="font-bold"
            fontSize="text-2xl"
            className="mt-6 md:mt-10 text-center  md:text-2xl  tracking-tight text-gray-900"
          >
            CONNEXION AU COMPTE
          </Title>
        </div>

        <div className="mt-8 md:mt-10 mx-auto w-full max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <Input
              width="w-full"
              type="email"
              name="email"
              placeholder="Email"
              required={true}
            />

            <div>
              <Input
                width="w-full"
                type="password"
                name="password"
                placeholder="Mot de passe"
                required={true}
              />

              <div className="mt-3 flex justify-end">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-[#016CEC] hover:underline underline-offset-8"
                  >
                    Mot de passe oublié?
                  </a>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#016CEC] px-3 py-1.5 text-sm font-semibold text-white opacity-90 shadow-xs hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Se connecter
              </button>
            </div>
          </form>

          <p className="mt-8 md:mt-10 text-center text-sm text-black">
            Vous n'avez pas de compte ?
            <a
              href="#"
              className="font-semibold ml-1 text-[#016CEC] opacity-80 hover:opacity-100"
            >
              Créer un compte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Connexion;
