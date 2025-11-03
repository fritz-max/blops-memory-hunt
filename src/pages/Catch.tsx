import CatchGame from "@/components/fangespil/CatchGame";

const Catch = () => {
  return (
    <div className="h-[100dvh] bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200 flex items-center justify-center p-4 overflow-hidden fixed inset-0 touch-none">
      <CatchGame />
    </div>
  );
};

export default Catch;
