import hero_img from "../assets/img/empty-img.jpg"
import '../assets/css/index.css'

export default function Hero() {

    return (
        <>
            <div
                className="hero min-h-screen"
                style={{
                backgroundImage: `url( ${hero_img} )`,
                }}>
                <div className="hero-overlay bg-opacity-40"></div>
                <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Default Theme</h1>
                    <p className="mb-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus dolore qui ea. 
                    Necessitatibus assumenda totam est molestias 
                    id exercitationem laudantium repudiandae? Natus sint iure sit eos dolores voluptate ipsa tempore.
                    </p>
                    <button className="btn btn-primary">Contactez-nous</button>
                </div>
                </div>
            </div>
        </>
    )
}