import * as React from 'react';

const Leaderboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      <p>Top users ranked by total PLS earned.</p>
      {/* Leaderboard content will go here */}
    </div>
  );
};

export default Leaderboard;