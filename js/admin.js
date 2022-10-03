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
const plantaEstadoSelecionadaActual  = document.querySelector('.planta_estado_selecionada_actual_slider')
const plantaSelecionada = document.querySelector('.planta_selecionada_slider')
const plantaTips = document.querySelector('.planta_tips_contenedor_parrafos_slider')
/* const tituloPlantaSelecionada = document.querySelector(".planta_selecionada_titulo")
const parrafoPlantaSelecionada = document.querySelector(".planta_selecionada_parrafo")
 */
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
        infoUsuarioPlanta = data3.data.processes
        console.log(data3.data.processes)
        template2 = ""
        infoUsuarioPlanta.forEach(element=>{

            plantaTips.innerHTML += `<div class="swiper-slide">
                <p>${element.plant.nutritionalContribution}</p>   
            </div>`
            plantaSelecionada.innerHTML += `<div class="swiper-slide">
                <h2 class="planta_selecionada_titulo titulos-movil-700">${element.plant.name}</h2>
                <p class="planta_selecionada_parrafo">
                ${element.plant.generalInformation}
                </p>
            </div>` 
            plantaEstadoSelecionadaActual.innerHTML += `<div class="planta_estado_selecionada_paso swiper-slide">
                <h2>${element.plant.name}</h2  
            <div>`
        })
        //plantaEstadoSelecionadaActual.innerHTML = template2
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

setTimeout(()=>{
    var swiper = new Swiper(".mySwiper", {
        pagination: {
          el: ".planta_estado_selecionada_control_posicion",
          type: "fraction",
        },
        navigation: {
          nextEl: ".planta_estado_selecionada_control_siguiente",
          prevEl: ".planta_estado_selecionada_control_atras",
        },
    });

    var swiper2 = new Swiper(".mySwiper2", {
        pagination: {
          el: ".planta_estado_selecionada_control_posicion",
          type: "fraction",
        },
        navigation: {
          nextEl: ".planta_estado_selecionada_control_siguiente",
          prevEl: ".planta_estado_selecionada_control_atras",
        },
    });

    var swiper3 = new Swiper(".mySwiper3", {
        pagination: {
          el: ".planta_estado_selecionada_control_posicion",
          type: "fraction",
        },
        navigation: {
          nextEl: ".planta_estado_selecionada_control_siguiente",
          prevEl: ".planta_estado_selecionada_control_atras",
        },
    });
    
},5000)

