import styles from './App.module.css';
import { useState } from 'react';
import { Level,Levels,calcImc } from './level';
import down from '../img/down.png';
import up from '../img/up.png';
import log from '../img/powered.png';
import arrowBack from '../img/leftarrow.png'


function App() {
 
  const [height,setHeight] = useState<number>(0);
  const [weight,setWeight] = useState<number>(0);
  const [toShow,setToShow] = useState<Level | null>(null)
  const [isDisable,setIsDisable] = useState<boolean>(false)

  const toSend = () =>{
    if(height && weight){
      setToShow(calcImc(height,weight))
      setIsDisable(true)
    }else{
      alert('Preencha todos os campos ')
    }
  }

  const back = ()=>{
    setHeight(0);
    setWeight(0);
    setToShow(null)
    setIsDisable(false)
  }

  return (
    <div className={styles.main}>
      
      <header className={styles.header}>
        <img src={log} width={150} alt="" />
      </header>
      
      <div className={styles.contanier}>
        <div className={styles.areaLeft}>
            <h1>Calule o seu IMC.</h1>
            <p>IMC é a sigla para Índice de Massa Corporal. É uma medida internacional usada para verificar se uma pessoa está em seu peso ideal com base em sua altura e peso. </p>
          <input 
            disabled = {isDisable} 
            type="number" 
            placeholder='Digite a sua altura. Ex: 1.5 (em metros)'
            value={height > 0 ? height:'' }
            onChange={ev=>setHeight(parseFloat(ev.target.value))}
          />
            <input 
            disabled = {isDisable}
            type="number" 
            placeholder='Digite o seu peso. Ex: 78.6 (em Kg)'
            value={weight > 0 ? weight : ''}
            onChange={ev=>setWeight(parseFloat(ev.target.value))}
          />
          <button onClick={toSend} disabled = {isDisable}>Calcular</button>
        </div>
         
        <div className={styles.areaRigth}>

          { toShow === null && 
            <div className={styles.grid}>
              {Levels.map((item,index)=>(
                <div key= {index} style={{background:item.bg}} className={styles.card}> 
                  <div className={styles.hand}>
                    <img src={item.icon === 'down'? down : up}  width={40} />
                  </div>
                  <h2>{item.name}</h2>
                  <span>IMC está entre {item.imc[0]} e {item.imc[1]}</span>
                </div>
              ))}
            </div>
          }

          {toShow && 
            <div className={styles.areaCard}> 
              
              <img onClick={back} src={arrowBack} className={styles.arrow} width={50}/>           
              
              <div style={{background:toShow.bg}} className={styles.cardEnd}> 
                <div className={styles.hand}>
                  <img src={toShow.icon === 'down'? down : up}  width={40} />
                </div>
                <h2>{toShow.name}</h2>
                <div className={styles.info}>Seu IMC é de {toShow.yourimc} Kg/m²</div>
                <span>IMC está entre {toShow.imc[0]} e {toShow.imc[1]}</span>
              </div>
            </div>          
          }

        </div>   
      </div>
    </div>
  )
}

export default App
