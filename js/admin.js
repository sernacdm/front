const nombreUsuario = document.querySelector("#nombreUsuario") 
const linkCerrarSesion = document.querySelector("#linkCerrarSesion")

const urlListaPlantas = "https://fathomless-taiga-12091.herokuapp.com/api/v1/Plant/Plants"
const urlIdUsuario= "https://fathomless-taiga-12091.herokuapp.com/api/v1/User/UserByUsername/"+localStorage.getItem('userName')
const urlAddPlanta = "https://fathomless-taiga-12091.herokuapp.com/api/v1/Process/AddProcess"
const urlEliminarPlanta ="https://fathomless-taiga-12091.herokuapp.com/api/v1/Process/DeleteProcess/"


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
const modalEliminarPlanta = document.querySelector('.modal_eliminar_planta')
const btnModalEliminarPlantaConfirmar = document.querySelector('.modal_eliminar_planta_botones_eliminar')
const btnModalEliminarPlantaCancelar = document.querySelector('.modal_recomendado_botones_cancelar')
const modalElimnarPlantasContenedor = document.querySelector('.modal_eliminar_plantacontenedor_plantas')
const btnModalElimarPlanta = document.querySelector(".planta_estado_selecionada_quitar")

/* const tituloPlantaSelecionada = document.querySelector(".planta_selecionada_titulo")
const parrafoPlantaSelecionada = document.querySelector(".planta_selecionada_parrafo")
 */

const bntModalAgregarPlantaConfirmar = document.querySelector("#modal_agregar_planta_btn_confirmar")
let plantas
let idUsuario
let plantasUsuarioComparar


/* async function eliminarPlanta(){
    await fetch(url,)
}
 */

async function eliminarElemnto(url){
    await fetch(url,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => response.json())
    .then((data7)=>{
        console.log("eliminando")
    })
    .catch((err) => console.log(err))

}



async function listaEliminarPlanta(){
   
    await fetch("https://fathomless-taiga-12091.herokuapp.com/api/v1/Process/ProcessesByUser/"+localStorage.getItem('userId'),{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then((response) => response.json())
    .then((data7)=>{
        console.log(data7)
        ciclo = data7.data.processes

        templateE=""
        ciclo.forEach((element)=>{
            templateE += `
            <div class="modal_agregar_plantacontenedor_planta">
                <img id="rImagen${element.plant.id}" class="modal_agregar_planta_imagen" src="https://loremflickr.com/320/240/dog" alt="">
                <label class="modal_agregar_planta_texto">${element.plant.name}</label>
                <button  class="btn-emilar-d" name="" id="${element.id}" value="${element.id}">X</button>
            </div>
        `
        })
        
        modalElimnarPlantasContenedor.innerHTML = templateE 

        ciclo.forEach((element)=>{
            imagenp=document.querySelector('#rImagen'+element.plant.id)
            imagenp.src="../images/admin/plantas/"+element.plant.id+".png"

            /* element.addEventListener('click',()=>{
                console.log("le diste al elemento "+element.id)
            }) */
        })

        botonesEliminar = document.querySelectorAll(".btn-emilar-d")
        botonesEliminar.forEach((element)=>{
            element.addEventListener('click',()=>{
                element.parentNode.classList.add('nomostrar')
                eliminarElemnto(urlEliminarPlanta+element.id)
            })
        })

    })
    

}

listaEliminarPlanta()

btnModalEliminarPlantaConfirmar.addEventListener("click",()=>{
    window.onscroll = "";
    modalEliminarPlanta.classList.toggle('mostrarf')
    location.reload(true)
})

btnModalElimarPlanta.addEventListener("click",()=>{
    modalEliminarPlanta.classList.toggle('mostrarf')
    window.scrollTo(0,0)
    window.onscroll = () => { window.scroll(0, 0); };
})
btnModalEliminarPlantaCancelar.addEventListener("click",()=>{
    window.onscroll = "";
    modalEliminarPlanta.classList.toggle('mostrarf')
})

async function agregarPlanta(url,idPlanta){

    userId=localStorage.getItem('userId')
    plantId=idPlanta

    datosUser = {
        plantId : plantId,
        userId :  userId
    }
    
    
    await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(datosUser)   
    })
    .then((response) => response.json())
    .then((data4)=>{
        if(data4.data==true){
            alert("planta agregada con exito! actuliza la pagina para ver los cambios")
        }
        
    })
    .catch((err) => console.log(err))
}

bntModalAgregarPlantaConfirmar.addEventListener("click",()=>{
    window.location.href="admin.html";
})


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

async function plantasConsultar(url){
    await fetch(url,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

    })
    .then((response) => response.json())
    .then((data5)=>{
        data5.data.processes.map((element)=>{
            /* console.log(element.plant.id)
            document.querySelector("#plant1"+element.plant.id).classList.add("nomostrar") */
            console.log(element.plant.id)
            test = document.querySelector("#plant"+element.plant.id)
            test.classList.add("nomostrar")
        })
    })
    .catch((err) => console.log(err))
}



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

        localStorage.setItem("userId",data3.data.id)
        infoUsuarioPlanta.forEach(element=>{
            if(element.germination==true){
                console.log("tenemos  uno")
            }
        })

        template2 = ""
        /* pasosPlanta = new Array () */
        infoUsuarioPlanta.forEach(element=>{
            pasosPlanta = new Array ()
            plantaTips.innerHTML += `<div class="swiper-slide">
                <p class="planta_tips_parrafo">${element.plant.nutritionalContribution}</p>   
            </div>`
            plantaSelecionada.innerHTML += `<div class="swiper-slide">
                <h2 class="planta_selecionada_titulo titulos-movil-700">${element.plant.name}</h2>
                <p class="planta_selecionada_parrafo">
                ${element.plant.generalInformation}
                </p>
            </div>` 


            /* if(element.germination==true){
                console.log("tenemos  uno")
            }
           */

            if(element.germination==true){
                pasosPlanta.push("germinacion")
            }
            if(element.irrigation==true){
                pasosPlanta.push("irrigacion")
            }
            if(element.transplanted==true){
                pasosPlanta.push("transplantado")
            }
            if(element.sown==true){
                pasosPlanta.push("sembrado")
            }
            if(element.harvest==true){
                pasosPlanta.push("​​cosecha")
            }
            

            graficoPlanta=""

            pasosPlanta.map((elemen)=>{
                graficoPlanta +=`<div class="planta_estado_selecionada_contenedor">
                <h3 class="planta_estado_selecionada_paso_fecha">26/09</h3>
                <div class="planta_estado_selecionada_decoracion">
                    <div class="planta_estado_selecionada_decoracion_contenedor_circulo">
                        <div class="planta_estado_selecionada_decoracion_circulo">

                        </div>
                    </div>
                    <div class="planta_estado_selecionada_decoracion_contenedor_linea">
                        <div class="planta_estado_selecionada_decoracion_linea">

                        </div>
                    </div>
                </div>
                <div class="planta_estado_selecionada_textos">
                    <h3 class="planta_estado_selecionada_textos_titulo">${elemen}</h3>
                    <p class="planta_estado_selecionada_textos_parrafo">Amet minim mollit non deserunt ullamco est.</p>
                </div>
            </div>
            ` 

            })
            
            plantaEstadoSelecionadaActual.innerHTML += `<div class="planta_estado_selecionada_paso swiper-slide">
                <h2 class="planta_estado_selecionada_titulo titulos-movil-700">${element.plant.name}</h2>
                ${graficoPlanta}
            </div>`
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
        let urlPlantasUsuario = "https://fathomless-taiga-12091.herokuapp.com/api/v1/Process/ProcessesByUser/"+idUsuario
       /*  console.log(urlPlantasUsuario) */
      
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
        console.log(data.data)
        template = ""
        plantas.forEach(element => {
            template +=  `<div id="plant${element['id']}" class="modal_agregar_plantacontenedor_planta">
                <img class="modal_agregar_planta_imagen" src="../images/admin/plantas/${element['id']}.png" alt="">
                <label class="modal_agregar_planta_texto">${element['name']}</label>
                <button class="modal_agregar_planta_escojida" type="button" value="${element['id']}">+</button>
            </div>`
        });

        modalAgregarPlantaContenedorPlantas.innerHTML = template

        let plantaParaAgregar = document.querySelectorAll('.modal_agregar_planta_escojida')
        plantaParaAgregar.forEach((element)=>{
            element.addEventListener("click", ()=>{
                console.log(`diste click en el ${element.value}`)
                element.parentNode.classList.add('nomostrar')
                agregarPlanta(urlAddPlanta,element.value)
                
            }) 
           
        })

         
        plantasConsultar( "https://fathomless-taiga-12091.herokuapp.com/api/v1/Process/ProcessesByUser/"+localStorage.getItem('userId'))

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


var swiper4 = new Swiper(".mySwiper4", {
    pagination: {
      el: ".planta_carusel-informativo_control_posicion",
      type: "fraction",
    },
    navigation: {
      nextEl: ".planta_carusel-informativo_control_siguiente",
      prevEl: ".planta_carusel-informativo_control_atras",
    },
});
