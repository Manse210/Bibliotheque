import React from "react";
import { createRoot } from "react-dom/client";

function App() {
    return React.createElement("h1", null, "React fonctionne dans Laravel 13 !");
}

const root = createRoot(document.getElementById("app"));
root.render(React.createElement(App, null));