import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {List, Header, Icon} from 'semantic-ui-react'
        
        
        
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
        <div>
            <Header as='h2'>
                <Icon name='plug' />
                <Header.Content>Social App</Header.Content>
            </Header>
              
            <List>
               
              {this.state.value.map((value:any) => (
                <List.Item key={value.id}>{value.name}</List.Item>
              ))}
            </List>

          
        </div>
    );
    
  }

 
}

export default App;
