const nombreUsuario = document.querySelector("#nombreUsuario") 
const linkCerrarSesion = document.querySelector("#linkCerrarSesion")

if(localStorage.getItem('userName')){
    nombreUsuario.innerHTML = localStorage.getItem('userName')
}else{
    window.location.href="login.html";
}

linkCerrarSesion.addEventListener("click",()=>{
    localStorage.removeItem('login')
    localStorage.removeItem('userName')
    window.location.href="index.html"
})