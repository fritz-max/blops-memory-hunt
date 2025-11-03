import MemoryGame from "@/components/memoryspil/MemoryGame";

const Memory = () => {
  return (
    <div className="h-[100dvh] bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200 overflow-hidden fixed inset-0">
      <MemoryGame />
    </div>
  );
};

export default Memory;
