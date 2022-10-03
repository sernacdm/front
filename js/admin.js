const nombreUsuario = document.querySelector("#nombreUsuario") 
const linkCerrarSesion = document.querySelector("#linkCerrarSesion")
const urlListaPlantas = "http://localhost:8080/api/v1/Plant/Plants"
const urlIdUsuario= "http://localhost:8080/api/v1/User/UserByUsername/"+localStorage.getItem('userName')

const btnPlantaEstadoSelecionadaOpciones = document.querySelector(".planta_estado_selecionada_opciones")
const btnPlantaEstadoSelecionadaVer = document.querySelector(".planta_estado_selecionada_ver")
const btnPlantaEstadoSelecionadaQuitar = document.querySelector(".planta_estado_selecionada_quitar")
const btnPlantaEstadoSelecionadaMas = document.querySelector(".planta_estado_selecionada_mas")
const modalAgregarPlanta = document.querySelector(".modal_agregar_planta")
const btnModalAgregarPlantaConfirmar = document.querySelector("#modal_agregar_planta_btn_confirmar");
const btnModalAgregarPlantaCancelar = document.querySelector('#modal_agregar_planta_btn_cancelar');
const modalAgregarPlantaContenedorPlantas = document.querySelector('.modal_agregar_plantacontenedor_plantas')
let plantas
let idUsuario


btnModalAgregarPlantaCancelar.addEventListener("click",()=>{
    modalAgregarPlanta.classList.toggle('mostrarf')
    window.onscroll = "";
    btnPlantaEstadoSelecionadaVer.classList.toggle('reset-transform')
    btnPlantaEstadoSelecionadaQuitar.classList.toggle('reset-transform')
    btnPlantaEstadoSelecionadaMas.classList.toggle('reset-transform')

})





btnPlantaEstadoSelecionadaOpciones.addEventListener("click",()=>{

    btnPlantaEstadoSelecionadaVer.classList.toggle('reset-transform')
    btnPlantaEstadoSelecionadaQuitar.classList.toggle('reset-transform')
    btnPlantaEstadoSelecionadaMas.classList.toggle('reset-transform')

})


btnPlantaEstadoSelecionadaMas.addEventListener('click',()=>{

    /* console.log("clik en mas") */
    modalAgregarPlanta.classList.toggle('mostrarf')
    window.scrollTo(0,0)
    window.onscroll = () => { window.scroll(0, 0); };

}) 


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

btnPlantaEstadoSelecionadaOpciones.addEventListener("click",()=>{

})


async function plantaUsuario(url){
    await fetch(url,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then((response) => response.json())
    .then((data3)=>{
        console.log(data3.data.processes);
    })
    .catch((err) => console.log(err))
}



async function plantasUsuario(){
    await fetch(urlIdUsuario,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then((response) => response.json())
    .then((data2)=>{
        idUsuario = data2.data.id
        let urlPlantasUsuario = "http://localhost:8080/api/v1/Process/ProcessesByUser/"+idUsuario
        console.log(urlPlantasUsuario)
        plantaUsuario(urlPlantasUsuario)
        
    })
    .catch((err) => console.log(err))

    

}

plantasUsuario()



async function listaPlantas(){

    await fetch(urlListaPlantas,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }   
    })
    .then((response) => response.json())
    .then((data)=> {
       
        plantas = data.data
      
        template = ""
        plantas.forEach(element => {
            template = template + `<div class="modal_agregar_plantacontenedor_planta">
                <img class="modal_agregar_planta_imagen" src="https://loremflickr.com/320/240/dog" alt="">
                <label class="modal_agregar_planta_texto">${element['name']}</label>
                <input type="checkbox" name="" id="" value="${element['id']}">
            </div>`
        });


        modalAgregarPlantaContenedorPlantas.innerHTML = template
        /* modalAgregarPlantaContenedorPlantas.innerHTML =;   */
    })
    .catch((err) => console.log(err))

}

listaPlantas()


