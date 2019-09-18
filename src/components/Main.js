import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Providers from "./Providers/Providers";
import ProviderDetails from "./Providers/ProviderDetails";
import AddProvider from "./Providers/AddProvider";
import EditProvider from "./Providers/EditProvider";
import MyApp from "./Tests/MyApp";
import CollaboratorDeals from "./Providers/CollabDeals";




const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/Providers" component={Providers} />
      {/* <Route exact path="/myApp" component={MyApp} /> */}
      <Route exact path="/Providers/add" component={AddProvider} />
      <Route exact path="/Providers/edit/:id" component={EditProvider} />
      <Route exact path="/Providers/:id" component={ProviderDetails} />
      <Route exact path="/CollabDeals" component={CollaboratorDeals} />
    </Switch>
  </main>
);

export default Main;
