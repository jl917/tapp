import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { ask } from "@tauri-apps/plugin-dialog";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri + React333</h1>

      <div className="row">
        <a
          href="https://vitejs.dev"
          target="_blank"
        >
          <img
            src="/vite.svg"
            className="logo vite"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://tauri.app"
          target="_blank"
        >
          <img
            src="/tauri.svg"
            className="logo tauri"
            alt="Tauri logo"
          />
        </a>
        <a
          href="https://reactjs.org"
          target="_blank"
        >
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <button
        onClick={async () => {
          const answer = await ask("This action cannot be reverted. Are you sure?", {
            title: "Tauri",
            kind: "warning",
          }).then((res) => {
            console.log(res);
          });
        }}
      >
        dialog
      </button>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
