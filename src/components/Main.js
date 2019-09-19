import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Collaborators from "./Collaborators/Collaborators";
import CollaboratorDetails from "./Collaborators/CollaboratorDetail";
import AddCollaborator from "./Collaborators/AddCollaborator";
import EditCollaborator from "./Collaborators/EditCollaborator";
import Providers from "./Providers/Providers";
import ProviderDetails from "./Providers/ProviderDetails";
import AddProvider from "./Providers/AddProvider";
import EditProvider from "./Providers/EditProvider";
import MyApp from "./Tests/MyApp";
import CollaboratorDeals from "./CollaboratorDeals/CollabDeals";
import CollaboratorDealDetails from "./CollaboratorDeals/CollabDealDetails";
import AddCollaboratorDeal from "./CollaboratorDeals/AddCollabDeal";
import EditCollaboratorDeal from "./CollaboratorDeals/EditCollabDeal";
import NFsExit from "./NFsExit/NFsExit";
import NFExitDetails from "./NFsExit/NFExitDetails";
import AddNFExit from "./NFsExit/AddNFExit";
import EditNFExit from "./NFsExit/EditNFexit";
import NFsInbound from "./NFsInbound/NFsInbound";
import AddNFInbound from "./NFsInbound/AddNFInbound";
import NFInboundDetails from "./NFsInbound/NFsInboundDetails";
import EditNFInbound from "./NFsInbound/EditNFInbound";






const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/Collaborators" component={Collaborators} />
      <Route exact path="/Collaborators/add" component={AddCollaborator} />
      <Route exact path="/Collaborators/edit/:id" component={EditCollaborator} />
      <Route exact path="/Collaborators/:id" component={CollaboratorDetails} />
      <Route exact path="/Providers" component={Providers} />
      {/* <Route exact path="/myApp" component={MyApp} /> */}
      <Route exact path="/Providers/add" component={AddProvider} />
      <Route exact path="/Providers/edit/:id" component={EditProvider} />
      <Route exact path="/Providers/:id" component={ProviderDetails} />
      <Route exact path="/CollabDeals" component={CollaboratorDeals} />
      <Route exact path="/CollabDeals/add" component={AddCollaboratorDeal} />
      <Route exact path="/CollabDeals/edit/:id" component={EditCollaboratorDeal} />
      <Route exact path="/CollabDeals/:id" component={CollaboratorDealDetails} />
      <Route exact path="/NFsExit" component={NFsExit} />
      <Route exact path="/NFsExit/add" component={AddNFExit} />
      <Route exact path="/NFsExit/edit/:id" component={EditNFExit} />
      <Route exact path="/NFsExit/:id" component={NFExitDetails} />
      <Route exact path="/NFsInbound" component={NFsInbound} />
      <Route exact path="/NFsInbound/add" component={AddNFInbound} />
      <Route exact path="/NFsInbound/edit/:id" component={EditNFInbound} />
      <Route exact path="/NFsInbound/:id" component={NFInboundDetails} />




    </Switch>
  </main>
);

export default Main;
