//Declaracion de Variables globales
let cantidadViandas;
let totalPrecio = 0;
let totalProductos = 0;
const precioViandaUno = 2000;
const precioViandaDos = 2100;
const precioViandaTres = 1800;
const precioViandaCuatro = 2500;
const precioViandaCinco = 1650;
const precioViandaSeis = 2650;

//Declaracion de información del usuario
let nombreUsuario = prompt(
  "Bienvenido a la Foodstore de Bon AppetEat!\nIngrese su nombre"
);
while (nombreUsuario === "") {
  nombreUsuario = prompt(
    "No se cargó ningun nombre. Por favor, ingrese su nombre."
  );
}
let direccionUsuario = prompt(
  `Hola ${nombreUsuario}! Por favor, compartinos una dirección de entrega`
);
while (direccionUsuario === "") {
  direccionUsuario = prompt(
    "No se cargo ninguna direccion. Por favor, ingrese una dirección de entrega."
  );
}
console.log(
  `Nombre ingresado: ${nombreUsuario}.\nDirección ingresada: ${direccionUsuario}.`
);
confirmacionUsuario();

//La primera funcion define la información del usuario
function confirmacionUsuario() {
  let confirmarDatos = prompt(
    "Bienvenido " +
      nombreUsuario +
      "!\nEstaremos entregando tu mercadería a la dirección: " +
      direccionUsuario +
      "!\nSon estos datos correctos?"
  );
  if (confirmarDatos != "") {
    switch (confirmarDatos) {
      case "SI":
      case "Si":
      case "si":
        cantidadProducto();
        break;
      case "NO":
      case "No":
      case "no":
        location.reload();
        break;
      default:
        alert("Por favor, ingresar una respuesta por si o no");
        confirmacionUsuario();
        break;
    }
  } else {
    alert("No ha ingresado ninguna respuesta.");
    confirmacionUsuario();
  }
}

//La segunda funcion tiene como fin definir los productos que compra
function cantidadProducto() {
  let cantidadViandas = parseInt(
    prompt("Cuantas viandas desea comprar? (máximo 10 unidades por compra)")
  );
  if (cantidadViandas >= 1 && cantidadViandas <= 10) {
    console.log(`Cantidad de viandas a ordenar: ${cantidadViandas}`);
    alert(
      `Perfecto! A continuación, seleccionaremos ${cantidadViandas} viandas para que organices tus comidas!`
    );
    seleccionVianda();
  } else {
    alert("Por favor, seleccionar una cantidad de viandas del 1 al 10.");
    cantidadProducto();
  }
  function seleccionVianda() {
    for (let i = 1; i <= cantidadViandas; i++) {
      let tipoVianda = parseInt(
        prompt(
          "Qué vianda querés agregar a tu compra?\n1 - Curry de Garbanzos\n2 - Pollo con Arroz\n3 - Milanesa con Pure\n4 - Sandwich vegetariano\n5 - Bife con ensalada\n6 - Fideos con tuco"
        )
      );
      if (i <= cantidadViandas) {
        switch (tipoVianda) {
          case 1:
            totalPrecio += precioViandaUno;
            totalProductos += 1;
            console.log(`Valor de vianda numero ${i} es: $` + precioViandaUno);
            break;
          case 2:
            totalPrecio += precioViandaDos;
            totalProductos += 1;
            console.log(`Valor de vianda numero ${i} es: $` + precioViandaDos);
            break;
          case 3:
            totalPrecio += precioViandaTres;
            totalProductos += 1;
            console.log(`Valor de vianda numero ${i} es: $` + precioViandaTres);
            break;
          case 4:
            totalPrecio += precioViandaCuatro;
            totalProductos += 1;
            console.log(
              `Valor de vianda numero ${i} es: $` + precioViandaCuatro
            );
            break;
          case 5:
            totalPrecio += precioViandaCinco;
            totalProductos += 1;
            console.log(
              `Valor de vianda numero ${i} es: $` + precioViandaCinco
            );
            break;
          case 6:
            totalPrecio += precioViandaSeis;
            totalProductos += 1;
            console.log(`Valor de vianda numero ${i} es: $` + precioViandaSeis);
            break;
          default:
            alert(
              "Seleccionar entre las 6 opciones usando un valor del 1 al 6."
            );
            i--;
            break;
        }
      }
    }
  }
  alert(`El valor total de tu compra es de $${totalPrecio}`);
  console.log(`El valor total de tu compra es de $${totalPrecio}`);
  cierreVenta();
}

//La tercera funcion tiene como fin confirmar la compra
function cierreVenta() {
  let ventaFinal = prompt(
    `${nombreUsuario} deseas comprar ${totalProductos} cantidad de viandas al precio total de $${totalPrecio} para ser enviadas (SIN CARGO!) a la dirección ${direccionUsuario}?\nPor favor, responder con Si o No`
  );
  if (ventaFinal != "") {
    switch (ventaFinal) {
      case "SI":
      case "Si":
      case "si":
        alert(
          "Perfecto! Nos estaremos contactando contigo para coordinar la entrega y el pago\nGracias por comprar en Bon AppetEat!"
        );
        console.log(
          "Perfecto! Nos estaremos contactando contigo para coordinar la entrega y el pago\nGracias por comprar en Bon AppetEat!"
        );
        break;
      case "NO":
      case "No":
      case "no":
        alert(
          "En ese caso, volvamos a elegir los productos que quieras llevarte!"
        );
        totalPrecio *= 0;
        totalProductos *= 0;
        cantidadProducto();
        break;
      default:
        alert("Por favor, ingresar una respuesta por si o no");
        cierreVenta();
        break;
    }
  } else {
    alert("No ha ingresado ninguna respuesta.");
    cierreVenta();
  }
}
