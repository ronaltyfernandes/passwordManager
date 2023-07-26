import { useState } from 'react';
import Senha from './senhas';
import Swal from 'sweetalert2';

function Form() {
  const [cadastraNova, setCadastraNova] = useState(true);
  const [valoresNome, setValoresNome] = useState('');
  const [valoresLogin, setValoresLogin] = useState('');
  const [valoresSenha, setValoresSenha] = useState('');
  const [valoresURL, setValoresURL] = useState('');
  const [ativaBotao, setAtivaBotao] = useState(true);
  const [resetaLocalStorage, setResetaLocalStorage] = useState(true);
  const [estadoPassword, setEstadoPassword] = useState(false);
  const ifSenha = (valoresSenha.length >= 8);
  const ifSenhaMaior = (valoresSenha.length <= 16);
  const ifNomes = (valoresNome.length > 0);
  const ifLogin = (valoresLogin.length > 0);
  const regex = /^(?=.*?[0-9])/i;
  const regexE = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  const ifSenhaCaractere = (regexE.test(valoresSenha));
  const ifSenhaNumero = (regex.test(valoresSenha));

  function Cancelar() {
    setValoresSenha('');
    setAtivaBotao(true);
    setValoresLogin('');
    setValoresNome('');
    setValoresURL('');
  }

  function validar() {
    if (ifNomes && ifLogin && ifSenha && ifSenhaMaior && ifSenhaNumero && ifSenhaCaractere) {
      return setAtivaBotao(false);
    }
    setAtivaBotao(true);
  }
  function Display() {
    return (
    <section className='display'>
      <p className={ ifSenha ? 'valid-password-check' : 'invalid-password-check' }>Possuir 8 ou mais caracteres</p>
      <p className={ ifSenhaMaior ? 'valid-password-check' : 'invalid-password-check' }>Possuir até 16 caracteres</p>
      <p className={ ifSenhaNumero ? 'valid-password-check' : 'invalid-password-check' }>Possuir letras e números</p>
      <p className={ ifSenhaCaractere ? 'valid-password-check' : 'invalid-password-check' }>Possuir algum caractere especial</p>
    </section>);
  }

  function enviar() {
    const localData = {
      nomeDoSeviço: valoresNome,
      login: valoresLogin,
      senha: valoresSenha,
      url: valoresURL,
    };
    const items = JSON.parse(localStorage.getItem('myData') || '[]');
    items.push(localData);
    Swal.fire({
      title: 'Serviço cadastrado com sucesso!',
      timer: 1500,
      timerProgressBar: true,
      icon: 'success',
    });
    return (localStorage.setItem('myData', JSON.stringify(items)));
  }

  function limpar() {
    const arrays = document.querySelectorAll('input');
    arrays.forEach((e) => e.value = '');
    setValoresNome('');
    setValoresLogin('');
    setValoresSenha('');
    setValoresURL('');
    setAtivaBotao(true);
  }

  if (cadastraNova) {
    return(
      <div>
        <button className="botao-g" onClick={ () => { setCadastraNova(!cadastraNova); setResetaLocalStorage(!resetaLocalStorage); } }>Cadastrar nova senha</button>
        {resetaLocalStorage && <Senha />}
        {(!resetaLocalStorage) && <Senha />}

      </div>);
  }
  (document.querySelectorAll('.lixeira')).forEach((element) => {
    element.addEventListener('click', () => console.log('retorna'));
  });

  return (
    <div>
      <div className='flex'>
        <form>
          <label className="service-name">
            Nome do serviço
            <input
              required
              onChange={ (e) => { setValoresNome(e.currentTarget.value); validar(); } }
              type="text"
              id="serviço"
              className="service-name"
            />
          </label>
          <label className="service-name">
            Login
            <input
              onChange={ (e) => { setValoresLogin(e.currentTarget.value); validar(); } }
              type="text"
              id="login"
              className="login"
            />
          </label>
          <label className="service-name flex senha">
            Senha
            <input type="checkbox" id="checkBoxSenha" data-testid="show-hide-form-password" onChange={ () => setEstadoPassword(!estadoPassword) } />
            <input
              onKeyUp={ (e) => { setValoresSenha(e.currentTarget.value); validar(); } }
              type={ estadoPassword ? 'text' : 'password' }
              className="senha"
              id="senha"
            />
          </label>
          <label className="service-name">
            URL
            <input
              onChange={ (e) => setValoresURL(e.currentTarget.value) }
              type="text"
              id="url"
              className="url"
            />
          </label>
          <button
            className="botao-p"
            disabled={ ativaBotao }
            onClick={ () => { enviar(); setResetaLocalStorage(!resetaLocalStorage); setCadastraNova(!cadastraNova) ;limpar(); } }
          >
            Cadastrar
          </button>
          <button
            className="botao-p"
            onClick={ () => { setCadastraNova(!cadastraNova); Cancelar(); setResetaLocalStorage(!resetaLocalStorage); } }
          >
            Cancelar
          </button>
        </form>
        <Display />
    </div>
      {resetaLocalStorage && <Senha />}
      {(!resetaLocalStorage) && <Senha />}

    </div>
  );
}

export default Form;
