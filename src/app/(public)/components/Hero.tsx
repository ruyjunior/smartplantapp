import Image from "next/image";
import heroImg from "../../../../public/images/hero/hero.png";

export const Hero = () => {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={heroImg}
        alt="Smart Plant APP"
        fill
        priority
        className="object-cover object-center w-full h-full opacity-70 rounded-lg"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30 dark:from-black/80" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 xl:px-0">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6 ml-5">
              Smart Plant APP
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed ml-5" >
              A maneira inteligente de gerenciar, monitorar e cuidar das suas plantas
              de forma simples e eficiente.
            </p>

            <div className="flex flex-wrap gap-4 ml-5">
              <button className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
                Começar Agora
              </button>

              <button className="px-8 py-3 bg-white/10 text-white font-semibold rounded-lg backdrop-blur hover:bg-white/20 transition-colors">
                Saiba Mais
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};