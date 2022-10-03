import "../styles/Login.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientLogin(){

    const navigate = useNavigate() 

    const [usernameSignIn,setUsernameSignIn] = useState('')
    const [passwordSignIn,setPasswordSignIn] = useState('')
    const handleLogin = (ev) => {
        console.log(usernameSignIn, passwordSignIn)
        ev.preventDefault();
        fetch('http://localhost:8080/login', {
                'method':'POST',
                'body': JSON.stringify(
                    {
                        'username': usernameSignIn,
                        'password': passwordSignIn
                }),
                'headers': {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  }
            }).then((data)=>data.json()).then((json)=>{
                console.log(json)
                if (json.status==='success'){
                    navigate('/upload');
                }else{
                    alert("Please make sure you've signed up already!")
                } 
            })
    }

    const [usernameSignUp,setUsernameSignUp] = useState('');
    const [passwordSignUp,setPasswordSignUp] = useState('');
    const [nameSignUp,setNameSignUp] = useState('');
    const backToLogIn = useEffect(()=>{
        const signUpButton = document.getElementById('sign-up-button');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    })

    const  handleRegister =  (ev) => {
        if(usernameSignUp != null && passwordSignUp != null && nameSignUp != null){
            ev.preventDefault();
            fetch('http://localhost:8080/register', {
                'method':'POST',
                'body': JSON.stringify(
                    {
                        'name': nameSignUp,
                        'username': usernameSignUp,
                        'password': passwordSignUp
                }),
                'headers': {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  }
            })
            .then((data)=>{
                data.json()
            })
            .then((json)=>{
                console.log(json);
                setNameSignUp('');
                setUsernameSignUp('');
                setPasswordSignUp('');
                alert('Sign up successfully!');
                backToLogIn();
            })
            
        }
        
    }

    useEffect(()=>{
        const toSignUpButton = document.getElementById('signUp');
        const backButton = document.getElementById('back');
        const container = document.getElementById('container');
        

        toSignUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });
        
        backButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
        
    })
    



    return (
        <div className="container" id="container">
            <div className="form-container sign-up-container">
                <form action="#" id='sign-up-form' onSubmit={handleRegister}>
                    <h1>Create Account</h1>
                    <input type="text" onChange={(event)=>{setNameSignUp(event.target.value);}} value={nameSignUp} placeholder="Username" id='sign-up-name'/>
                    <input type="email" onChange={(event)=>{setUsernameSignUp(event.target.value);}} value={usernameSignUp} placeholder="Email" id='sign-up-email'/>
                    <input type="password" onChange={(event)=>{setPasswordSignUp(event.target.value);}} value={passwordSignUp} placeholder="Password" id='sign-up-password'/>
                    <button className='sign-up-button' id='sign-up-button'>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form  id='sign-in-form' onSubmit={handleLogin}>
                    <h1>Sign in</h1>
                    <input type="text" onChange={(event)=>{setUsernameSignIn(event.target.value);}} placeholder="Username" id='sign-in-email' />
                    <input type="password" onChange={(event)=>{setPasswordSignIn(event.target.value)}} placeholder="Password" id='sign-in-password' />
                    <a href="#">Forgot your password?</a>
                    <button className='sign-in-button'>Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>I've got an acoount already!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="back">back</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Don't have account?</h1>
                        <p>Let's sign up to be a part of us for FREE!</p>
                        <button className="ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>

    );
}
