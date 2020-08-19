import React from "react";
import { Route } from 'react-router-dom'
import Header from './components/Header';
import HomePg from "./components/HomePg";
import Form from "./components/Form";
import ConfirmPg from "./components/ConfirmPg";

const App = () => {
  return (
  <div>
    <Header/>
    <Route exact path="/">
      <HomePg/>
    </Route>
    <Route path="/form">
      <Form/>
    </Route>
    <Route path ="/confirmation">
      <ConfirmPg/>
    </Route>
  </div>   
  );
};
export default App;
