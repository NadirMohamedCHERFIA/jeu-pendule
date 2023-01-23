import React,{useEffect, useState} from 'react'
import './main.css'
import data from './../../data/liste.txt'
import Axios from 'axios'
const adding = (array,index,letter)=>{
    return array.substring(0,index) + letter + array.substring(index+1,array.length)
}
const diffOptions=[
    {
        id:1,
        option:'Easy',
        tries:8,
        length:5,
        shows:2
    },
    {
        id:2,
        option:'Meduim',
        tries:6,
        length:8,
        shows:2
    },
    {
        id:3,
        option:'Hard',
        tries:5,
        length:10,
        shows:1
    },
]

const Main = () => {
    const [text,setText] = useState("");
    const [diff,setDiff] = useState("")
    const [submitedGuessWord,setSubmitedGuessWord] = useState('')
    const [searched,setSearched] = useState('')
    const [newGame,setNewGame] = useState(true)
    const [numberOfTries,setNumberOfTries] = useState(10)
    const [arrayOfCashed,setArrayOfCashed] = useState([])
    const [indexes,setIndexes] = useState({idd:1,idf:3})
    const [items,setItems] = useState([])
    const [cashedWord,setCashedWord] =useState(searched ? "_".repeat(searched.length) : null)
    const [mode,setMode] = useState("char")
    useEffect(()=>{
        Axios(data)
        .then((res)=>{
            setText(res.data)
        }).catch((err)=>console.log(err))
    },[])
    const words = text.split(/\r?\n/)
    let easywords=[]
    let meduimwords=[]
    let hardwords=[]
    words.forEach((w)=>{
        if(w.length>=3 && w.length<=5){
            easywords.push(w)
        }else if(w.length>=6 && w.length<=8){
            meduimwords.push(w)
        }else if(w.length>=9 && w.length<=12){
            hardwords.push(w)
        }
    })
    const handleClick=(id)=>{
        if(newGame){
            diffOptions.forEach((d)=>{
                if(d.id===id){
                    setDiff(d)
                    setNumberOfTries(d.tries)
                }
            })
            }
    }
    useEffect(()=>{
        if(newGame){
            if(diff.option===diffOptions[0].option){
                setSearched(easywords[Math.floor(Math.random()*((easywords.length)-1))])
            }else if (diff.option===diffOptions[1].option){
                setSearched(meduimwords[Math.floor(Math.random()*((meduimwords.length)-1))])
            }else if (diff.option===diffOptions[2].option){
                setSearched(hardwords[Math.floor(Math.random()*((hardwords.length)-1))])
            }
        }
        
    },[diff.option])
    useEffect(()=>{
        if(searched){
            setNewGame(false)
            let i1 =Math.floor(Math.random()*searched.length)
            let i2 =Math.floor(Math.random()*searched.length)
            if(i1===i2){
                i2 =Math.floor(Math.random()*searched.length)
            }
            // let itemstmp=[]
            setIndexes([i1,i2])
            let temp =adding( "_".repeat(searched.length),i1,searched[i1])
            temp = adding(temp,i2,searched[i2])
            setCashedWord(temp)
        }
        
    },[searched])
    useEffect(()=>{
    },[numberOfTries])
    const handlechangesubmitguess = (e)=>{
        setSubmitedGuessWord((e.target.value).toUpperCase())
    }
    useEffect(()=>{
        setArrayOfCashed([...arrayOfCashed,cashedWord])
        console.log(cashedWord)
        let itemstmp=[]
        // arrayOfCashed.forEach((a)=>{
            if(cashedWord){
                for(let i=0;i<cashedWord.length;i++){
                    itemstmp.push(<span className={i===indexes[0] || i===indexes[1] ? "blue" : cashedWord[i]!=="_" && i!==indexes[0] & i!==indexes[1]  ? "vert":null}>{cashedWord[i]}</span>)
                }
                itemstmp.push(<br></br>)
                setItems([...items,...itemstmp])
                itemstmp=[]
            }
        // }) 
    },[cashedWord])
    const handlesubmitclick = ()=>{
        console.log(searched)
        console.log(submitedGuessWord)
        var temp=cashedWord
        setArrayOfCashed([...arrayOfCashed,temp])
        if(mode==="char")
        {   
            for(let i=0;i<searched.length;i++){
                if(searched[i]===submitedGuessWord){
                    temp = adding(temp,i,searched[i])
                }
            }
            setCashedWord(temp)
            if(temp===cashedWord){
                setNumberOfTries((numberOfTries)=>(numberOfTries-1))
            }
            setSubmitedGuessWord('')
            if(temp===searched && numberOfTries!==0 ){
                const popup = document.querySelector('.popup')
                const popupM = document.querySelector('.popup__main')
                popupM.textContent=`Congratulation you won the word is: ${searched} !Start a new game`
                popup.classList.add('active')
                handleNewGameClick()
                window.setTimeout(()=>{
                    popup.classList.remove('active')
                },4000)
            }else if(numberOfTries===1 && temp!=="searched"){
                const popup = document.querySelector('.popup')
                const popupM = document.querySelector('.popup__main')
                popupM.textContent=`Unfortunetly you lost the word is: ${searched} !Start a new game`
                popup.classList.add('danger')
                handleNewGameClick()
                window.setTimeout(()=>{
                    popup.classList.remove('danger')
                },4000)
            }
        }else if (mode==="word"){
            for(let i=0;i<searched.length;i++){
                if(searched[i]===submitedGuessWord[i]){
                    
                    temp = adding(temp,i,searched[i])
                }
            }
            setCashedWord(temp)
            if(temp===cashedWord){
                setNumberOfTries((numberOfTries)=>(numberOfTries-1))
            }
            setSubmitedGuessWord('')
            if(temp===searched && numberOfTries!==0 ){
                const popup = document.querySelector('.popup')
                const popupM = document.querySelector('.popup__main')
                popupM.textContent=`Congratulation you won the word is: ${searched} !Start a new game`
                popup.classList.add('active')
                handleNewGameClick()
                window.setTimeout(()=>{
                    popup.classList.remove('active')
                },4000)
            }else if(numberOfTries===1 && temp!=="searched"){
                const popup = document.querySelector('.popup')
                const popupM = document.querySelector('.popup__main')
                popupM.textContent=`Unfortunetly you lost the word is: ${searched} !Start a new game`
                popup.classList.add('danger')
                handleNewGameClick()
                window.setTimeout(()=>{
                    popup.classList.remove('danger')
                },4000)
            }
        }

    }
    const handleNewGameClick = ()=>{
        setNewGame(true)
        setCashedWord('')
        setSearched('')
        setArrayOfCashed([])
        setDiff("")
        setItems([])
        setMode("char")
    }
    const handlekeydown=(e)=>{
        if(e.key==='Enter'){
            handlesubmitclick()
        }
    }

    const handleSelect = (e)=>{
        setMode(e.target.value)
    }
    return (
    <div className='container'>
        <div className="main">
                {newGame ? "Select difficulty level" : null}
            <div className="diff">
                {diffOptions.map((d)=>
                    <div className={d.option===diff.option ? "btn btn-primary" : "btn"} key={d.id} onClick={()=>{handleClick(d.id)}}>{d.option}</div>
                )}
            </div>
            <div className="try">
                {searched 
                ? <div className='tries__container'>
                    <div className='try__title'>
                    </div>
                    <div className="tries">
                    Tries Left : {numberOfTries}
                    </div>
                </div>
                : "Press New Game and chose difficulty level to start"}<br></br>
                    {
                        !newGame ? items : null
                    }
            </div>
            <div className="try__input">
                {!newGame 
                ?
                <div className='input'>
                    <select name="" id="" onChange={handleSelect}>
                        <option value="char">by char</option>
                        <option value="word">by word</option>
                    </select>
                    <input type="text"  value={submitedGuessWord} placeholder={mode==='char' ? "Guess char ..." :mode==="word"? "Guess word...":null} onKeyDown={handlekeydown} onChange={handlechangesubmitguess}/></div>
                    :null}
                <div className="btn" onClick={handlesubmitclick} >
                    Submit Try
                </div>
                <div className="btn" onClick={handleNewGameClick}>
                    New game
                </div>
            </div>
        <div className="popup">
            <div className="popup__main">
                {/* Congratulation you found the word {searched} ! */}
            </div>
        </div>
        </div>
    </div>
    )
}

export default Main