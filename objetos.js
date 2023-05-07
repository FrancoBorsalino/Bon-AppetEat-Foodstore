//Declaracion de Variables globales
let cantidadViandas;
let totalPrecio = 0;
let totalProductos = 0;

// Declaración de objetos - productos e-commerce
function Vianda (nombre, precio, tipo, disponible) {
    this.nombre = nombre;
    this.precio = precio;
    this.tipo = tipo;
    this.disponible = true;
    this.consultar = function() {alert("Esta vianda de "+ this.nombre + " tiene un valor de " + this.precio + ". Tené en cuenta que es " + this.tipo + ".\n¡Se ha agregado a tu carrito correctamente!")}
}

const vianda1 = new Vianda("Curry de Garbanzos", 2000, "Vegano");
const vianda2 = new Vianda("Pollo con Arroz", 2100, "Con carne");
const vianda3 = new Vianda("Milanesa con Pure", 1800,"Con carne");
const vianda4 = new Vianda("Sandwich Vegetariano", 2500, "Vegetariano");
const vianda5 = new Vianda("Bife con Ensalada", 1650, "Con carne");
const vianda6 = new Vianda("Fideos con Tuco", 2650, "Vegetariano");

//Declaracion de información del usuario
let nombreUsuario = prompt("Bienvenido a la Foodstore de Bon AppetEat!\nIngrese su nombre");
while (nombreUsuario === "") {
    nombreUsuario = prompt("No se cargó ningun nombre. Por favor, ingrese su nombre.")
}
let direccionUsuario = prompt(`Hola ${nombreUsuario}! Por favor, compartinos una dirección de entrega`);
while (direccionUsuario === "") {
    direccionUsuario = prompt("No se cargo ninguna direccion. Por favor, ingrese una dirección de entrega.")
}
let mailUsuario = prompt(`Perfecto! Por ultimo, compartinos una dirección de mail`)
while (mailUsuario === "") {
    mailUsuario = prompt ("No se cargó ningún mail. Por favor, ingresa una cuenta de mail correcta.")
}
console.log(`Nombre ingresado: ${nombreUsuario}.\nDirección ingresada: ${direccionUsuario}.\nDirección de mail ingresado: ${mailUsuario}.`)
confirmacionUsuario();

//La primera funcion define la información del usuario
function confirmacionUsuario() {
    let confirmarDatos = prompt("Bienvenido " + nombreUsuario + "!\nEstaremos entregando tu mercadería a la dirección: " + direccionUsuario + "! Te contactaremos a la cuenta: " + mailUsuario + ".\nSon estos datos correctos?");
    if (confirmarDatos != ""){
        switch (confirmarDatos){
            case "SI":
            case "Si":
            case "si":
                cantidadProducto()
                break;
            case "NO":
            case "No":
            case "no":
                location.reload()
                break;
            default:
                alert("Por favor, ingresar una respuesta por si o no")
                confirmacionUsuario()
                break;
        }
    } else {
        alert("No ha ingresado ninguna respuesta.")
        confirmacionUsuario()
    }
}

function cantidadProducto() {
    let cantidadViandas = parseInt(prompt("Cuantas viandas desea comprar? (máximo 10 unidades por compra)"))
    if (cantidadViandas >= 1 && cantidadViandas <= 10) {
        console.log(`Cantidad de viandas a ordenar: ${cantidadViandas}`)
        alert(`Perfecto! A continuación, seleccionaremos ${cantidadViandas} viandas para que organices tus comidas!`)
        seleccionVianda()
    } else {
        alert("Por favor, seleccionar una cantidad de viandas del 1 al 10.");
        cantidadProducto();
    }
    function seleccionVianda() {
        for (let i = 1; i <= cantidadViandas; i++){
            let tipoVianda = parseInt(prompt("Qué vianda querés agregar a tu compra?\n1 - Curry de Garbanzos\n2 - Pollo con Arroz\n3 - Milanesa con Pure\n4 - Sandwich vegetariano\n5 - Bife con ensalada\n6 - Fideos con tuco"))
            if (i <= cantidadViandas) {
                switch (tipoVianda) {
                    case 1:
                        vianda1.consultar()
                        totalPrecio += vianda1.precio
                        totalProductos += 1
                        console.log(`Se ha sumado la vianda número ${i} y su valor es de: $` + vianda1.precio)
                        break;
                    case 2:
                        vianda2.consultar()
                        totalPrecio += vianda2.precio
                        totalProductos += 1
                        console.log(`Se ha sumado la vianda número ${i} y su valor es de: $` + vianda2.precio)
                        break;
                    case 3:
                        vianda3.consultar()
                        totalPrecio += vianda3.precio
                        totalProductos += 1
                        console.log(`Se ha sumado la vianda número ${i} y su valor es de: $` + vianda3.precio)
                        break;
                    case 4:
                        vianda4.consultar()
                        totalPrecio += vianda4.precio
                        totalProductos += 1
                        console.log(`Se ha sumado la vianda número ${i} y su valor es de: $` + vianda4.precio)
                        break;
                    case 5:
                        vianda5.consultar()
                        totalPrecio += vianda5.precio
                        totalProductos += 1
                        console.log(`Se ha sumado la vianda número ${i} y su valor es de: $` + vianda5.precio)
                        break;
                    case 6:
                        vianda6.consultar()
                        totalPrecio += vianda6.precio
                        totalProductos += 1
                        console.log(`Se ha sumado la vianda número ${i} y su valor es de: $` + vianda6.precio)
                        break;
                    default:
                        alert("Seleccionar entre las 6 opciones usando un valor del 1 al 6.")
                        i--
                        break;
                }
            }
        }
    }
    alert(`El valor total de tu compra es de $${totalPrecio}`);
    console.log(`El valor total de tu compra es de $${totalPrecio}`);
    cierreVenta()
}


//La tercera funcion tiene como fin confirmar la compra
function cierreVenta () {
    let ventaFinal = prompt(`${nombreUsuario} deseas comprar ${totalProductos} cantidad de viandas al precio total de $${totalPrecio} para ser enviadas (SIN CARGO!) a la dirección ${direccionUsuario}?\nPor favor, responder con Si o No`)
    if (ventaFinal !=""){
        switch (ventaFinal){
            case "SI":
            case "Si":
            case "si":
                alert("Perfecto! Nos estaremos contactando contigo a tu cuenta de mail para coordinar la entrega y el pago\nGracias por comprar en Bon AppetEat!")
                console.log("Perfecto! Nos estaremos contactando contigo a tu cuenta de mail para coordinar la entrega y el pago\nGracias por comprar en Bon AppetEat!")
                break;
            case "NO":
            case "No":
            case "no":
                alert("En ese caso, volvamos a elegir los productos que quieras llevarte!")
                totalPrecio *= 0
                totalProductos *= 0
                cantidadProducto()
                break;
            default:
                alert("Por favor, ingresar una respuesta por si o no")
                cierreVenta()
                break;
        }
    } else {
        alert("No ha ingresado ninguna respuesta.")
        cierreVenta();
    }
}
