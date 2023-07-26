import './App.css';
import Form from "./components/Form"
import img from "./images/linkedin.svg"
import gitH from "./images/github.svg"


function App() {
  return (
  <div>
    <main>
      <h1>Gerenciador de senhas</h1>
      <Form/>
     </main>
      <div id='contatos'>
        <a href="https://www.linkedin.com/in/ronalty-fernandes-dos-santos/" target="_blank"><img className="icons" src={img} alt="link github" /></a>
        <a href="https://github.com/ronaltyfernandes" target="_blank"><img className="icons" src={gitH} alt="link linkedin" /></a>
      </div>
    <footer>
      <p>Desenvolvido por <a href="https://www.linkedin.com/in/ronalty-fernandes-dos-santos/" target="_blank">Ronalty fernandes</a></p>
    </footer>
  </div>
  );
}

export default App;
