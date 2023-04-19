export type Level = {
    name:string,
    bg:string,
    icon: 'down'|'up',
    imc: number[],
    yourimc?: number
}

export const Levels : Level [] = [
    {name:'Magreza', bg:'#96A3AB', icon:'down', imc:[0,18.5]},
    {name:'Normal', bg:'#0EAD69', icon:'up', imc:[18.6,24.99]},
    {name:'Sobrepeso', bg:'#E2B039', icon:'down', imc:[25,30]},
    {name:'Obesidade', bg:'#C3423F', icon:'down', imc:[30.1,99]},
]

export const calcImc = (height:number, weight:number)=>{
     const imc = parseFloat((weight / (height * height)).toFixed(2)) 

     for (let i in Levels){
        if(imc >= Levels[i].imc[0] && imc <= Levels[i].imc[1]){
            Levels[i].yourimc = imc
            return Levels[i] 
        }
     }
     return null
}