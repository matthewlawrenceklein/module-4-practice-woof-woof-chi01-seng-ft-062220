import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state= {
    allDogs : [],
    selectedDog : {},
    filterStatus : false
  }

  componentDidMount(){
    fetch('http://localhost:3000/pups')
      .then(resp => resp.json())
      .then(dogsData => {
        this.setState({
          allDogs : dogsData
        })
      })
  } 
 
  showDetails = (dogObj) => {
    this.setState({
      selectedDog : dogObj
    })
  }

  handleGoodBad = (dogObj) => {

    console.log(dogObj.isGoodDog)

    const dogBody = {
      isGoodDog : !dogObj.isGoodDog
    }

    const reqObj = {
      method : 'PATCH', 
      headers: { 
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(dogBody)
    }

    fetch(`http://localhost:3000/pups/${dogObj.id}`, reqObj)
      .then(resp => resp.json())
      .then(dogData => {
        this.showDetails(dogData)
      })

  }

  handleFilter = () => {
    this.setState({
      filterStatus : !this.state.filterStatus
    })
    console.log(this.state.filterStatus)
  }

  renderPups = () => {

    if(this.state.filterStatus){
      const onlyGood = this.state.allDogs.filter(dog => dog.isGoodDog === true )
      return onlyGood.map((dog) => {
        return <span onClick={ () => this.showDetails(dog) }> { dog.name } </span>
      })
      }
     else {
      return this.state.allDogs.map((dog) => {
        return <span onClick={ () => this.showDetails(dog) }> { dog.name } </span>
      })
    }
  }

  render() {
    return (
      <div className="App">
      <div id="filter-div">
    <button id="good-dog-filter" onClick={() => this.handleFilter()}> {this.state.filterStatus ? 'Filter good dogs: ON' : 'Filter good dogs: OFF'}</button>
      </div>
      <div id="dog-bar">
      { this.renderPups() }
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          <img src={this.state.selectedDog ? this.state.selectedDog.image : null }></img>
          <h2> {this.state.selectedDog? this.state.selectedDog.name : null } </h2>
          <button onClick={() => this.handleGoodBad(this.state.selectedDog)}> {this.state.selectedDog.isGoodDog? 'IS GOOD' : 'BAD' } </button>
        </div>
      </div>
    </div>
    );
  }
}

export default App;




