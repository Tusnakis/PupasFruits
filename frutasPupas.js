document.addEventListener('DOMContentLoaded', init);
function init(){

    let imgProd = document.getElementsByClassName("peque");
    let imgProdSelec = document.getElementById("ffac");
    let dni = document.getElementById("dni");
    let cantidad = document.getElementById("cantidad");
    let ref = document.getElementById("ref");
    let precio = document.getElementById("precio");
    let grabarCancelar = document.getElementsByClassName("mar_t_10");
    let lineas = document.getElementById("lineas");
    let campos = document.getElementsByTagName("th");
    let total = document.getElementsByClassName("total a_derecha");
    let numTotal = 0;
    let contLineas = 1;

    for(let i = 0; i < imgProd.length; i++)
    {
        imgProd[i].addEventListener("dblclick", function(e){
            let prodActual = e.target;
            cambiarProd(prodActual);
        });
    }

    for(let i = 0; i < grabarCancelar.length; i++)
    {
        grabarCancelar[i].addEventListener("click", function(e){
            let contBoton = e.target.textContent;
            if(contBoton === "Grabar")
            {
                let camposOk = comprobarCampos();
                if(camposOk == true)
                {
                    crearLinea();
                    vaciarCampos();
                }
            }
            else if(contBoton === "Cancelar")
            {
                vaciarCampos();
            }
            else if(contBoton === "Almacenar tabla")
            {
                localStorage.setItem("tabla",lineas.innerHTML);
            }
        });
    }
    
    function selecProd(prodActual)
    {
        var clnImgProd = prodActual.cloneNode(true);
        imgProdSelec.appendChild(clnImgProd);
        var ref = prodActual.parentNode.childNodes[3].childNodes[1].textContent.substr(5);
        document.getElementById("ref").value = ref;
        var precio = parseInt(prodActual.parentNode.childNodes[3].childNodes[3].textContent.substr(8).replace("€ Kg",""));
        document.getElementById("precio").value = precio;
    }

    function cambiarProd(prodActual)
    {
        if(imgProdSelec.hasChildNodes() === true)
        {
            imgProdSelec.removeChild(imgProdSelec.firstChild);
            selecProd(prodActual);
        } 
        else
        {
            selecProd(prodActual);
        }
    }

    function compDni()
    {
        let letras = "TRWAGMYFPDXBNJZSQVHLCKE";
        let numDni = dni.value.substr(0,dni.value.length-1);
        let letraDni = dni.value.substr(dni.value.length-1,1).toUpperCase();
        if(dni.value == "" || letras.charAt(numDni % 23) !== letraDni)
        {
            dni.style.backgroundColor = "#f97c7c";
            return false;
        }
        else
        {
            dni.removeAttribute("style");
            return true;
        }
    }

    function compCant()
    {
        if(cantidad.value == "" || !/^([0-9])*$/.test(cantidad.value))
        {
            cantidad.style.backgroundColor = "#f97c7c";
            return false;
        }
        else
        {
            cantidad.removeAttribute("style");
            return true;
        }
    }

    function vaciarCampos()
    {
        if(imgProdSelec.hasChildNodes() === true)
        {
            imgProdSelec.removeChild(imgProdSelec.firstChild);
        }

        dni.value = "";
        dni.removeAttribute("style");
        cantidad.value = "";
        cantidad.removeAttribute("style");
        ref.value = "ref";
        precio.value = "000.00";
        imgProdSelec.removeAttribute("style");
    }

    function comprobarCampos()
    {
        let dniOk = compDni();
        let cantOk = compCant();
        if(dniOk === true && cantOk === true && precio.value != "")
        {
            return true;
        }
        else
        {
            imgProdSelec.style.backgroundColor = "#f97c7c";
            return false;
        }
    }

    function crearLinea()
    {
        lineas.children[2].appendChild(document.createElement("tr"));
        let linea = lineas.children[2].children[contLineas];
        let aDerecha = document.createAttribute("class");
        let aDerecha1 = document.createAttribute("class");
        aDerecha.value = "a_derecha";
        aDerecha1.value = "a_derecha";
        let sTotalAderecha = document.createAttribute("class");
        sTotalAderecha.value = "s_total_a_derecha";
        let boton = document.createAttribute("class");
        boton.value = "boton";

        for(let i = 0;i < campos.length; i++)
        {
            linea.appendChild(document.createElement("td"));
        }

        linea.children[0].appendChild(document.createTextNode(dni.value));
        linea.children[1].appendChild(document.createTextNode(ref.value));
        linea.children[2].setAttributeNode(aDerecha);
        linea.children[2].appendChild(document.createTextNode(precio.value));
        linea.children[3].setAttributeNode(aDerecha1);
        linea.children[3].appendChild(document.createTextNode(cantidad.value));
        linea.children[4].setAttributeNode(sTotalAderecha);
        linea.children[4].appendChild(document.createTextNode(cantidad.value*precio.value));
        let btn = document.createElement("button");
        let textoBorrar = document.createTextNode("borrar");
        btn.appendChild(textoBorrar);
        btn.setAttributeNode(boton);
        btn.addEventListener("click",borrarLinea);
        linea.children[5].appendChild(btn);
        numTotal += cantidad.value*precio.value;
        total[0].innerText = numTotal;
        contLineas++;
    }
    
    function borrarLinea(e)
    {
        let borraElegido = e.target;
        lineas.children[2].removeChild(borraElegido.parentElement.parentElement);
        contLineas--;
        numTotal -= borraElegido.parentNode.parentNode.childNodes[4].innerText;
        total[0].innerText = numTotal;
    }

}