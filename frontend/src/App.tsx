import React from 'react';
import { Provider } from "react-redux";
import Application from "./Application";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import store from "./Application/store";

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
    <div>
     <Routes>
      <Route path="/" element={<Navigate to="Application"/>}/>
      <Route path="/Application/*" element={<Application />} />
     </Routes>
    </div>
    </Provider>
   </HashRouter>
  );
}

export default App;
