import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import Card from "./card.jsx";
import "./styles.css";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
      <main className="content">
        <h1 className="title">First of October Bingo</h1>
        <Card />
      </main>
);
