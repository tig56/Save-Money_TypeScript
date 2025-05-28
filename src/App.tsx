import React from "react";
import { Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import ChildApp from "./components/ChildApp";
import GrandpaApp from "./components/GrandpaApp";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="child" element={<ChildApp />} />
      <Route path="grandpa" element={<GrandpaApp />} />
    </Routes>
  );
};

export default App;