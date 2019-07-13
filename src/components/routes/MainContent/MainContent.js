// @flow
import React, { Suspense } from "react";
import { Router } from "@reach/router";
import HomePageContainer from "../../containers/HomePageContainer/HomePageContainer";
import AppPageContainer from "../../containers/AppPageContainer/AppPageContainer";

function MainContent(): React$Node {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router primary={false}>
        <HomePageContainer path="/" />
        <AppPageContainer path="/appPage" />
      </Router>
    </Suspense>
  );
}

export default MainContent;
