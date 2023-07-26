import { HtmlHTMLAttributes, useState } from "react";

function Senha() {
  const [storage, ] = useState(localStorage.getItem("myData"));
  const [esconder, setEsconder] = useState(true);
  const [deuErrado, setDeuErrado] = useState(false);
  if(storage != null && (!deuErrado) ){
    const valorStorage = JSON.parse(storage);
    if (valorStorage.length > 0 ) {
      function Apagar(props:ParentNode|null) {
        if (props !== null) {
          if (valorStorage.length > 1) {
            props?.parentNode?.removeChild(props)
            valorStorage.splice(1 ,1)
            localStorage.setItem("myData", JSON.stringify(valorStorage));

          }else{
            props?.parentNode?.removeChild(props)
            localStorage.clear()
            setDeuErrado(true)
            }
       }
     }

     function Senhadiv(enviaValor:object|any) {
        return(
         <div>
           <label className="flex senha" >Esconder Senhas
           <input type="checkbox" onChange={()=>setEsconder(!esconder)} checked={esconder}></input></label>
           <div className="senhas-container">{Object.values(enviaValor.enviaValor).slice().reverse()
           .map((e:any, i, ) => {
             return(
               <div id={`${i}`} className ="senhas" key={`senhaSalvas${i}`}>
                <a className="links" href={e.url}>{`${e.nomeDoSeviço}`}</a>
                 <p>{e.login}</p>
                 <p>{esconder? '******' : e.senha }</p>
                 <button data-testid="remove-btn" id='remove-btn' className='btn-danger' onClick={(e)=>{Apagar(e.currentTarget.parentNode)}}>Apagar</button>
               </div>
                );
               }
             )
           }
           </div>
         </div>
       );
     }
     return(<Senhadiv enviaValor={valorStorage} />)

    }
  }else{
    return(
    <div className="senhas-container">
      <p>nenhuma senha cadastrada</p>
    </div>)
  }
  }

export default Senha;