import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl">
        {/* Decorative images positioned around the content */}
        <img
          src="/assets/vendespil_01.png"
          alt="Characters"
          className="absolute -top-32 -left-24 w-40 sm:w-52 animate-float opacity-95"
        />
        <img
          src="/assets/vendespil_02.png"
          alt="Detective"
          className="absolute -top-28 -right-20 w-32 sm:w-44 animate-bounce-soft opacity-95"
        />
        <img
          src="/assets/catch/user_blop_1.png"
          alt="Hero"
          className="absolute -bottom-20 -left-16 w-28 sm:w-36 animate-pulse-soft opacity-95"
        />
        <img
          src="/assets/catch/fang_1.png"
          alt="Good item"
          className="absolute -bottom-24 -right-12 w-32 sm:w-40 animate-float opacity-95"
        />
        <img
          src="/assets/vendespil_04.png"
          alt="Blops creatures"
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-60 sm:w-72 animate-bounce-soft opacity-95"
        />

        {/* Centered content */}
        <div className="relative z-10 text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border-4 border-purple-300">
          <h1 className="text-5xl sm:text-6xl font-bold mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Blops spil
          </h1>
          <p className="text-xl sm:text-2xl mb-10 font-medium text-purple-800">
            Vælg et spil og begynd at spille!
          </p>
          <div className="flex flex-col gap-4">
            <Link
              to="/memory"
              className="game-button game-button-primary text-xl sm:text-2xl px-12 py-4"
            >
              Vendespil
            </Link>
            <Link
              to="/catch"
              className="game-button game-button-primary text-xl sm:text-2xl px-12 py-4"
            >
              Fangespil
            </Link>
          </div>

          {/* Credits */}
          <div className="mt-10">
            <div className="flex justify-center items-start gap-8 flex-wrap">
              <div className="flex flex-col items-center gap-2">
                <a
                  href="https://www.bloderforeningen.dk/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/assets/logos/bloderforeningen-logo.png"
                    alt="Bloderforeningen"
                    className="h-8 opacity-70 hover:opacity-100 transition-opacity"
                  />
                </a>
                <p className="text-sm font-medium text-purple-700">Udgivelse</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <a
                  href="https://www.caretoons.dk/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/assets/logos/caretoons-logo.png"
                    alt="CareToons"
                    className="h-8 opacity-70 hover:opacity-100 transition-opacity"
                  />
                </a>
                <p className="text-sm font-medium text-purple-700">Udvikling</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <a
                  href="https://www.zarahjuul.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/assets/logos/zarahjuul-logo.webp"
                    alt="Zarah Juul"
                    className="h-8 opacity-70 hover:opacity-100 transition-opacity"
                  />
                </a>
                <p className="text-sm font-medium text-purple-700">
                  Illustration
                </p>
              </div>
            </div>
            <p className="text-xs text-purple-600 text-center mt-6">
              Programmering: Fritz Dörmann
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
