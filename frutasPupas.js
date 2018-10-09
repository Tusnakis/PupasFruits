document.addEventListener('DOMContentLoaded', init);
function init(){

    let imgProd = document.getElementsByClassName('peque');
    let imgProdSelec = document.getElementById("ffac");
    let dni = document.getElementById("dni");
    let cantidad = document.getElementById("cantidad");
    let grabar = document.getElementById("grabar");

    for(let i = 0; i < imgProd.length; i++)
    {
        imgProd[i].addEventListener("dblclick", function(e){
            let prodActual = e.target;
            cambiarProd(prodActual);
        });
    }
    
    grabar.addEventListener("click",function(){
        compDni();
        compCant();
    });
    
    /*dni.addEventListener("blur",function(){
        compDni();
    });
    
    cantidad.addEventListener("blur",function(){
        compCant();
    });*/

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
        }
        else
        {
            dni.removeAttribute("style");;
        }
    }
    
    function compCant()
    {
        if(cantidad.value == "" || !/^([0-9])*$/.test(cantidad.value))
        {
            cantidad.style.backgroundColor = "#f97c7c";
        }
        else
        {
            cantidad.removeAttribute("style");; 
        }
    }

}