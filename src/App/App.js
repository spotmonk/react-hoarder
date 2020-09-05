import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.scss';
import firebase from 'firebase/app';
import 'firebase/auth';

import fbConnection from '../helpers/data/connection';
import MyNavBar from '../components/pages/MyNavBar/MyNavBar';
import Stuff from '../components/pages/Stuff/Stuff';
import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import NewItem from '../components/pages/NewItem/NewItem';
import SingleItem from '../components/pages/SingleItem/SingleItem';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavBar authed={authed}/>
            <div className="container">
              <Switch>
                <PrivateRoute path="/home" component={Home} authed={authed} />
                <PrivateRoute path="/stuff/new" component={NewItem} authed={authed} />
                <PrivateRoute path="/stuff/:itemId" component={SingleItem} authed={authed} />
                <PrivateRoute path="/stuff" component={Stuff} authed={authed} />
                <PublicRoute path="/auth" component={Auth} authed={authed} />
                <Redirect from="*" to="/home" />
              </Switch>
            </div>
          </React.Fragment>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
