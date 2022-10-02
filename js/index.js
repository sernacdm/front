const btnCrearCuenta = document.querySelector('#btnCrearCuenta')
const modalCrearCuenta = document.querySelector('.modal_crear-cuenta')
const linkMenuMovilCrearCuenta = document.querySelector('#menu-movil_link_crear-cuenta')
const btnCrearCuentaModal = document.querySelector('.modal_crear-cuenta_btn_crear-cuenta ') 
const btnCancelarCrearCuentaModal = document.querySelector('.modal_crear-cuenta_btn_cancelar');
const linkModalCrearCuentaAtras = document.querySelector(".modal_crear-cuenta_volver")
const inputNombre = document.querySelector('#name')
const inputApellidos = document.querySelector('#lastName')
const inputEmail = document.querySelector('#email')
const inputUsername = document.querySelector('#username')
const inputPassword = document.querySelector("#password") ;
const inputRePassword = document.querySelector("#rePassword") ;
const urlAddUser =  "http://localhost:8080/api/v1/User/AddUser"



linkMenuMovilCrearCuenta.addEventListener("click",()=>{
    modalCrearCuenta.classList.toggle('mostrarf')
    window.onscroll = "";
    fondoMenu.classList.toggle('mostrarf')
})

btnCrearCuenta.addEventListener("click", ()=>{
    console.log("vamos a crear cuenta")
    modalCrearCuenta.classList.toggle('mostrarf')
    window.scrollTo(0,0)
    window.onscroll = () => { window.scroll(0, 0); };
    
})

linkModalCrearCuentaAtras.addEventListener("click",(event)=>{
    event.preventDefault()
    modalCrearCuenta.classList.toggle('mostrarf')
    window.onscroll = "";
})


btnCancelarCrearCuentaModal.addEventListener("click",()=>{
    modalCrearCuenta.classList.toggle('mostrarf')
    window.onscroll = "";
})


btnCrearCuentaModal.addEventListener("click",()=>{
    nombre = inputNombre.value
    apellidos = inputApellidos.value
    usuario = inputUsername.value
    correo = inputEmail.value
    pass1 = inputPassword.value
    pass2 = inputRePassword.value

    if(pass1 !== pass2 || pass1=="" || pass2=="" ){

        inputPassword.classList.toggle('error-input-movil')
        inputPassword.placeholder="las contraseñas no conciden";
        inputRePassword.classList.toggle('error-input-movil')
        inputRePassword.placeholder="las contraseñas no conciden";

    }else{
        
        datosUser = {
            lastName:apellidos,
            name:nombre,
            email:correo,
            username:usuario,
            password:pass1
        }

        fetch(urlAddUser,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }, 
            body: JSON.stringify(datosUser),
                
        })
        .then((response) => response.json())
        .then((data)=> {
            console.log(data)
        })
        .catch((err) => console.log(err))

    }

    
})