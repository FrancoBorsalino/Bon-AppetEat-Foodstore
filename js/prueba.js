let totalPrecio = 0;

const carritoCompra = [];

const viandasDisponibles = [
  {
    id: 1,
    nombre: "Curry con Garbanzos",
    porciones: 5,
    categoria: "Guisos y pastas",
    precio: 16700,
    tipo: "vegano, vegetariano",
  },
  {
    id: 2,
    nombre: "Pollo con Arroz",
    porciones: 4,
    categoria: "Minutas",
    precio: 13200,
    tipo: "carne",
  },
  {
    id: 3,
    nombre: "Milanesa con Pure",
    porciones: 4,
    categoria: "Minutas",
    precio: 18300,
    tipo: "carne",
  },
  {
    id: 4,
    nombre: "Sandwich Vegano",
    porciones: 6,
    categoria: "Sandwiches",
    precio: 14900,
    tipo: "vegano, vegetariano",
  },
  {
    id: 5,
    nombre: "Bife con Ensalada",
    porciones: 4,
    categoria: "Minutas",
    precio: 1710,
    tipo: "carne",
  },
  {
    id: 6,
    nombre: "Fideos con Tuco",
    porciones: 3,
    categoria: "Guisos y pastas",
    precio: 12400,
    tipo: "vegetariano",
  },
];

function agregarAlCarrito() {
  const addVerificar = prompt(
    "Desea agregar alguna vianda al carrito?\nResponda con si o no."
  );
  if (addVerificar != "") {
    switch (addVerificar) {
      case "No":
      case "NO":
      case "no":
        alert("Entendido! en ese caso volveremos al menu de viandas.");
        navegadorCompra();
        break;
      case "Si":
      case "SI":
      case "si":
        const addId = Number(
          prompt(
            "Genial! En ese caso escriba el NRO de Vianda que quiera agregar al carrito.\nSi lo desconoce recuerde que puede ver nuestro listado, utilizar nuestro buscado o filtros!"
          )
        );
        const resultados = [];
        for (let i = 0; i < viandasDisponibles.length; i++) {
          const vianda = viandasDisponibles[i];
          const info = Object.values(vianda);
          for (let j = 0; j < info.length; j++) {
            const infoDos = info[j];
            if (infoDos === addId) {
              resultados.push(vianda);
            }
          }
        }
        if (resultados.length === 0 || addId === "" || addId === " ") {
          alert(
            `Disculpanos! No logramos encontrar ninguna vianda que coincida con el NRO ${addId}. Intenta nuevamente con alguna otra palabra clave!`
          );
          agregarAlCarrito();
        } else {
          console.log("Hemos agregado la siguiente vianda a tu carrito:");
          for (let i = 0; i < resultados.length; i++) {
            const coincidencia = resultados[i];
            carritoCompra.push(coincidencia);
            totalPrecio += coincidencia.precio;
            console.log(
              `Vianda nro. ${coincidencia.id} - ${coincidencia.nombre}: Rinde ${coincidencia.porciones} porciones, con un valor de $${coincidencia.precio}.`
            );
            console.log(
              "El valor total de tu cuenta hasta ahora es de: $" + totalPrecio
            );
            alert("Hemos agregado la vianda al carrito!");
            const deshacer = prompt(
              "Querés deshacer haber agregado esta vianda al carrito?\nResponde con si o no."
            );
            if (deshacer != "") {
              switch (deshacer) {
                case "No":
                case "NO":
                case "no":
                  alert("Entendido!");
                  agregarAlCarrito();
                  break;
                case "Si":
                case "SI":
                case "si":
                  carritoCompra.shift();
                  totalPrecio -= coincidencia.precio;
                  console.log(
                    "El valor total de tu cuenta hasta ahora es de: $" +
                      totalPrecio
                  );
                  alert("Se ha borrado este item!");
                  agregarAlCarrito();
                  break;
                default:
                  alert("Por favor, ingresar una respuesta por si o no");
                  deshacerAdd();
                  break;
              }
            }
          }
        }
        break;
      default:
        alert("Por favor, ingresar una respuesta por si o no");
        agregarAlCarrito();
        break;
    }
  } else {
    alert("No ha ingresado ninguna respuesta.");
    agregarAlCarrito();
  }
}

agregarAlCarrito();
