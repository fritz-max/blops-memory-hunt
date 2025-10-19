import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200 flex items-center justify-center">
      <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border-4 border-purple-300 max-w-2xl mx-8">
        <h1 className="text-5xl sm:text-6xl font-bold mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Blops vendespil
        </h1>
        <p className="text-xl sm:text-2xl mb-10 font-medium text-purple-800">
          Vælg et spil og begynd at spille!
        </p>
        <div className="flex flex-col gap-4">
          <Link
            to="/memory"
            className="game-button game-button-primary text-xl sm:text-2xl px-12 py-4"
          >
            Hukommelsesspil
          </Link>
          <Link
            to="/catch"
            className="game-button game-button-primary text-xl sm:text-2xl px-12 py-4"
          >
            Fangespil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
