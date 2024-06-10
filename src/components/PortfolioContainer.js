import React from "react";
import Stock from "./Stock";

function PortfolioContainer({purchased, buyStock}) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {
        purchased.map(stock => <Stock key={stock.id} stock={stock} buyStock={buyStock}/>)
      }
    </div>
  );
}

export default PortfolioContainer;
