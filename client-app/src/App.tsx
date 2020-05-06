import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component{

  state = {
    value :[]
  }
  componentDidMount(): void {
    axios.get('localhost:5000/api/values')
        .then((response)=>{
          this.setState({
            value:response.data
          })
        })
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <ul>
              {this.state.value.map((value:any) => (
                <li>{value.name}</li>
              ))}
            </ul>

          </header>
        </div>
    );
    
  }

 
}

export default App;
