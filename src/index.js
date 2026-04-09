import React from 'react';
import { Provider } from "./components/ui/provider.jsx";
import { createSystem, defineConfig } from "@chakra-ui/react"
import ReactDOM from 'react-dom/client';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: "#DFDFDF" },
        secondary: { value: "#2B4141" },
        accent: { value: "#4A90E2" },
      },
      fonts: {
        body: { value: "manrope, system-ui, sans-serif" },
        heading: { value: "'Plus Jakarta Sans Variable', system-ui, sans-serif" },
      },
      shadows: {
        subtle: { value: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" },
        card: { value: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" },
      },
      spacing: {
        container: { value: "1rem" },
      },
      radii: {
        card: { value: "0.75rem" },
      },
    },
    breakpoints: {
      sm: "640px",
      md: "768px", 
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    semanticTokens: {
      colors: {
        "bg.canvas": {
          value: { base: "#ffffff", _dark: "#0f0f0f" },
        },
        "bg.surface": {
          value: { base: "#f8f9fa", _dark: "#1a1a1a" },
        },
        "bg.subtle": {
          value: { base: "#f1f3f4", _dark: "#2a2a2a" },
        },
        "bg.muted": {
          value: { base: "#e8eaed", _dark: "#3a3a3a" },
        },
        "fg.default": {
          value: { base: "#1a1a1a", _dark: "#ffffff" },
        },
        "fg.muted": {
          value: { base: "#6b7280", _dark: "#9ca3af" },
        },
        "fg.subtle": {
          value: { base: "#9ca3af", _dark: "#6b7280" },
        },
        "border.subtle": {
          value: { base: "#e5e7eb", _dark: "#374151" },
        },
      },
    },
  },
  globalCss: {
    body: {
      bg: "bg.canvas",
      color: "fg.default",
      fontFamily: "body",
      lineHeight: "1.6",
    },
    "*": {
      boxSizing: "border-box",
    },
  },
});

const system = createSystem(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider value={system}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
