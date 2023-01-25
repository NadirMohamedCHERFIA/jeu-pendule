import './before.css'
import { React,useEffect,useRef } from 'react';
import Logo from './../../assets/37-378577_pendulum-clipart-school-pendulum.png'
// const img = document.querySelector('.beforelogo')
const Before =()=>{
    const main = useRef(null);
        useEffect(()=>{
        window.setTimeout(()=>{
        main.current.classList.add('disable');
    },3000);
        window.setTimeout(()=>{
            main.current.classList.add('displayNone');
        },500);
})
    return <>
        <div className="mainbef" ref={main}>
            <div className="mainbef-logo">
                <img className='beforelogo' src={Logo} alt="" />
            </div>
        </div>
    </>
}
export default Before