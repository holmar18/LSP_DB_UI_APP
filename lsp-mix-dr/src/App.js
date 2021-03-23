import React from 'react';
import './app.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// Screens 
import MainScreen from './screens/mainScreen';
import AddScreen from './screens/addScreen';
import LoginScreen from './screens/loginScreen';


const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

function App() {
  return (
    <div className='main'>
        <BrowserRouter>
        <AlertProvider template={AlertTemplate} {...options}>
            <Switch>
                <Route exact path="/" render={props => <LoginScreen {...props}/> } />
                <Route exact path="/main" render={props => <MainScreen {...props}/> } />
                <Route exact path="/new" render={ props => <AddScreen {...props} /> } />
                <Route exact path="/new/:newId" render={ props => <AddScreen itemId={props} /> } />
            </Switch>
            </AlertProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
