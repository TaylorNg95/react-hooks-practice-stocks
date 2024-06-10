import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [purchased, setPurchased] = useState([])
  const [filter, setFilter] = useState('Tech')
  const [sort, setSort] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/stocks')
      .then(response => response.json())
      .then(stocks => setStocks(stocks))
  }, [])

  const filteredStocks = stocks.filter(stock => stock.type === filter)
  const displayedStocks = filteredStocks.sort((a, b) => {
    if(sort === 'Alphabetically'){
      return a.name.localeCompare(b.name)
    } else if(sort === 'Price'){
      return a.price - b.price
    }
  })

  function buyStock(id){
    const purchasedStock = stocks.find(stock => stock.id === id)
    if(purchased.includes(purchasedStock) === false){
      setPurchased([...purchased, purchasedStock])
    } else setPurchased(purchased.filter(stock => stock.id !== id))
  }

  return (
    <div>
      <SearchBar filter={filter} setFilter={setFilter} sort={sort} setSort={setSort}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={displayedStocks} buyStock={buyStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer purchased={purchased} buyStock={buyStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
