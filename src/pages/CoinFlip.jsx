const CoinFlip = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Coin Flip Game</h1>
        <p className="mb-6">Flip a coin and guess the outcome!</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Flip Coin
        </button>
      </div>
    </div>
  );
}

export default CoinFlip;