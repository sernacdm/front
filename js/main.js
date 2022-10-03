const btnMenuCerrar  = document.getElementById('cerrar_menu')
const btnMenu = document.querySelector('#menu');
const fondoMenu= document.querySelector('.contenedor-menu')
const controlesAvansados =  document.querySelector('.planta_estado_selecionada_controles-avazados') || "not found"; 
const btnLogin = document.querySelector("#login") || "not found";
const urlUser =  "http://localhost:8080/api/v1/Authenticate/Login"
const username = document.querySelector("#username")
const password = document.querySelector("#password")
const linkMenuM = document.querySelectorAll(".linkMenuMovil") || "not found"; //** link */

async function testFuncion(urlUser,datosUser){
    await fetch(urlUser,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }, 
        body: JSON.stringify(datosUser),
            
    })
    .then((response) => response.json())
    .then((data)=> {
        console.log(data.data)
         if(data.data == true){
            console.log("sesion iniciada")
            localStorage.setItem('login',1)
            localStorage.setItem('userName',usern)
            window.location.href="admin.html";
        }else{
            username.classList.toggle('error-input-movil')
            username.placeholder="las contraseñas no conciden";
            password.classList.toggle('error-input-movil')
            password.placeholder="las contraseñas no conciden";
            alert("los datos con coinciden")
        }

    })
    .catch((err) => console.log(err))
}

if(linkMenuM != "not found"){

    linkMenuM.forEach(element=>{
        element.addEventListener("click",()=>{fondoMenu.classList.toggle('mostrarf')})      
    })
}

if( btnLogin != "not found"){
    console.log("dando click")
    btnLogin.addEventListener("click",(event)=>{
        event.preventDefault()
        usern = username.value 
        passw =  password.value

        datosUser = {
            username : usern,
            password : passw
        }

        testFuncion(urlUser,datosUser)

        console.log("hola mundo")
    })
}

btnMenu.addEventListener("click",()=>{
    fondoMenu.classList.toggle('mostrarf')
        if(controlesAvansados!="not found"){
            controlesAvansados.classList.toggle('nomostrar')
        }
});

btnMenuCerrar.addEventListener("click",()=>{
    fondoMenu.classList.toggle('mostrarf')
    if(controlesAvansados!="not found"){
        controlesAvansados.classList.toggle('nomostrar')
    }
})

/* const urlUser =  "http://localhost:8080/api/v1/Authenticate/Login";

const user = {
    password:"prueba",
    username:"prueba"
}
fetch(urlUser,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }, 
    body: JSON.stringify(user),
    
    
})
.then((response) => response.json())
.then((data)=>console.log(data))
.catch((err) => console.log(err)); */


