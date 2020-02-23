import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    sushis: [],
    shownConveyorSushis: [],
    sushiEndIndex: 3,
    tableSushis: [],
    remainingMoney: 100
  }

  componentDidMount() {
     fetch("http://localhost:3000/sushis").then(resp => resp.json())
     .then(data => {
       this.setState({
         sushis: data,
         shownConveyorSushis: data.slice(0, 4)
       })
     })
  }

  handleGetMoreSushiClick = () => {
    // replace conveyor shown sushi with next four sushi
    // update endIndex 
    console.log("handleGetMoreSushiClick called")
    this.setState((prevState) => {
      return {
        ...prevState,
        shownConveyorSushis: prevState.sushis.slice((prevState.sushiEndIndex + 1) % prevState.sushis.length, (prevState.sushiEndIndex + 4) % prevState.sushis.length),
        sushiEndIndex: (prevState.sushiEndIndex + 4) % prevState.sushis.length
      }
    })
  }

  handleAddSushiToTableClick = (sushiId) => {
    // charge customer if they have enough money
    const sushi = this.state.shownConveyorSushis.find(s => s.id === sushiId)
    if (sushi.price < this.state.remainingMoney) {

     const newRemainingMoney = this.state.remainingMoney - sushi.price
     this.setState((prevState) => {
       return {
        ...prevState,
       remainingMoney: newRemainingMoney,
       shownConveyorSushis: prevState.shownConveyorSushis.filter(s => s.id !== sushi.id),
       tableSushis: [...prevState.tableSushis, sushi]
      }
     })
     // remove sushi from shownConveyorSushis
     // put sushi on table
     } 

  }

  handleEatSushiClick = (sushiId) => {
     // remove sushi from tableSushis
     this.setState((prevState) => {
           return {
             ...prevState,
             tableSushis: prevState.tableSushis.filter(s => s.id !== sushiId)
           }
     })
  }

  render() {
    return (
      <div className="app">
        <SushiContainer handleGetMoreSushiClick={this.handleGetMoreSushiClick} handleAddSushiToTableClick={this.handleAddSushiToTableClick} shownConveyorSushis={this.state.shownConveyorSushis} />
        <Table handleEatSushiClick={this.handleEatSushiClick} remainingMoney={this.state.remainingMoney} tableSushis={this.state.tableSushis} />
      </div>
    );
  }
}

export default App;