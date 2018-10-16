document.addEventListener('DOMContentLoaded', init);
function init(){

    let imgProd = document.getElementsByClassName('peque');
    let imgProdSelec = document.getElementById("ffac");
    let dni = document.getElementById("dni");
    let cantidad = document.getElementById("cantidad");
    let ref = document.getElementById("ref");
    let precio = document.getElementById("precio");
    let grabarCancelar = document.getElementsByClassName("mar_t_10");

    for(let i = 0; i < imgProd.length; i++)
    {
        imgProd[i].addEventListener("dblclick", function(e){
            let prodActual = e.target;
            cambiarProd(prodActual);
        });
    }

    for(let i = 0; i < grabarCancelar.length; i++)
    {
        grabarCancelar[i].addEventListener("click",function(e){
            let contBoton = e.target.textContent;
            if(contBoton === "Grabar")
            {
                crearLinea();
            }
            else
            {
                vaciarCampos();
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
    
    function crearLinea()
    {
        let dniOk = compDni();
        let cantOk = compCant();
        if(dniOk === true && cantOk === true && !precio.value === "")
        {
            vaciarCampos();
        }
        else
        {
            imgProdSelec.style.backgroundColor = "#f97c7c";
        }
    }

}