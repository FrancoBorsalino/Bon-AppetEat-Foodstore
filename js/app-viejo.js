/* SEGUNDA ENTREGA CORREGIDA */

let totalPrecio = 0;

function Viandas(nombre, porciones, categoria, precio, tipo) {
  this.nombre = nombre;
  this.porciones = porciones;
  this.categoria = categoria;
  this.precio = precio;
  this.tipo = tipo;
}

const curryGarbanzos = new Viandas(
  "Curry de Garbanzos",
  5,
  "Guisos y pastas",
  16700,
  "Vegano, Vegetariano"
);
const polloArroz = new Viandas(
  "Pollo con Arroz",
  4,
  "Minutas",
  13200,
  "Con carne"
);
const milaPure = new Viandas(
  "Milanesa con Pure",
  4,
  "Minutas",
  18300,
  "Con carne"
);
const sandVege = new Viandas(
  "Sandwich Vegano",
  6,
  "Sandwiches",
  14900,
  "Vegano, Vegetariano"
);
const bifeEnsalada = new Viandas(
  "Bife con Ensalada",
  4,
  "Minutas",
  1710,
  "Con carne"
);
const fideosTuco = new Viandas(
  "Fideos con Tuco",
  3,
  "Guisos y pastas",
  12400,
  "Vegetariano"
);

const viandasDisponibles = [
  curryGarbanzos,
  polloArroz,
  milaPure,
  sandVege,
  bifeEnsalada,
  fideosTuco,
];

//Declaracion de información del usuario
let nombreUsuario = prompt(
  "Bienvenido a la Foodstore de Bon AppetEat!\nIngrese su nombre"
);
while (nombreUsuario === "" || nombreUsuario === " ") {
  nombreUsuario = prompt(
    "No se cargó ningun nombre. Por favor, ingrese su nombre."
  );
}
let direccionUsuario = prompt(
  `Hola ${nombreUsuario}! Por favor, compartinos una dirección de entrega`
);
while (direccionUsuario === "" || direccionUsuario === " ") {
  direccionUsuario = prompt(
    "No se cargo ninguna direccion. Por favor, ingrese una dirección de entrega."
  );
}
let emailUsuario = prompt(
  `Gracias ${nombreUsuario}! Por último, te pedimos una direccion de e-mail para coordinar la entrega.`
);
while (emailUsuario === "" || emailUsuario === " ")
  console.log(
    `Nombre ingresado: ${nombreUsuario}.\nDirección ingresada: ${direccionUsuario}.\nDirección de e-mail: ${emailUsuario}.`
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

/* SEGUNDA ENTREGA - ANTES DE LA CORRECCIÓN */

/* Declaración de cards de viandas según arrays */

for (let vianda of viandasDisponibles) {
  let elemento = document.createElement("div");
  elemento.innerHTML = `
        <div class="card-body"> 
            <p class="card-title robotoBold">${vianda.nombre}</p>
            <p class="card-text robotoRegular">Cantidad de porciones: ${vianda.porciones}</p>
            <p class="card-text robotoRegular">Categoría: ${vianda.categoria}</p>
            <p class="card-text robotoRegular">Valor: $${vianda.precio}</p>
            <p class="card-text robotoSemiBold">Tipo de vianda: ${vianda.tipo}</p>
            <button id="botonAddCarrito" class="add">Agregar al carrito <img src="./imgs/carritoLogoBlanco.png"
                alt="Agregar al carrito"></button>
        </div>
    
    `;

  document.querySelector(".cardsViandas").appendChild(elemento);
}

/* Funcionamiento del buscador */

const inputSearch = document.getElementById("buscadorIndex");
const buttonSearch = document.getElementById("botonBuscador");
const returnSearch = document.getElementById("resBuscador");

buttonSearch.addEventListener("click", function (event) {
  event.preventDefault();
  const inputSearchTolowercase = inputSearch.value.toLowerCase();
  const resultados = [];
  for (let i = 0; i < viandasDisponibles.length; i++) {
    const vianda = viandasDisponibles[i];
    const info = Object.values(vianda);
    for (let j = 0; j < info.length; j++) {
      const infox = info[j].toString().toLowerCase();
      if (infox.indexOf(inputSearchTolowercase) !== -1) {
        resultados.push(vianda);
        break;
      }
    }
  }
  if (
    resultados.length === 0 ||
    inputSearch.value === "" ||
    inputSearch.value === " "
  ) {
    returnSearch.innerHTML = `Disculpanos! No logramos encontrar ninguna vianda que tenga "${inputSearchTolowercase}". Intenta nuevamente con alguna otra palabra clave!`;
  } else {
    returnSearch.innerHTML = "";
    for (let i = 0; i < resultados.length; i++) {
      const vianda = resultados[i];
      const cardVianda = `
            <div class="card-body"> 
                <p class="card-title robotoBold">${vianda.nombre}</p>
                <p class="card-text robotoRegular">Cantidad de porciones: ${vianda.porciones}</p>
                <p class="card-text robotoRegular">Categoría: ${vianda.categoria}</p>
                <p class="card-text robotoRegular">Valor: $${vianda.precio}</p>
                <p class="card-text robotoSemiBold">Tipo de vianda: ${vianda.tipo}</p>
                <button id="botonAddCarrito" class="add">Agregar al carrito <img src="./imgs/carritoLogoBlanco.png"
                    alt="Agregar al carrito"></button>
            </div>
        </div>
        `;
      returnSearch.innerHTML += cardVianda;

      document.querySelector(".cardsViandas").innerHTML = "";
      document.querySelector(".cardsViandas").appendChild(returnSearch);
    }

    /* IMPORTANTE! Antes no tenía esto, y lo tuve que volver a declarar para que pueda agregar al carrito desde los resultados de la búsqueda. Capaz queda repetitivo o algo hice mal, pero fue la única manera que encontre. Mi razonamiento es que si asigno esta funcion por fuera, en realidad el evento se ejecuta ANTES de lo que el DOM genera el botón del resultado de la búsqueda. Por eso lo terminé asignando aqui tambien */
    /* Lo otro que me queda resolver, es que no se están asignando correctamente los elementos cuando los sumo en el carrito. Me imagino que tiene que ver con que no está correspondiendo el index con el listado del array de resultado de la busqueda. Pero no me dio ni la cabeza ni el tiempo para encontrarle una solución para esta entrega :( */
    document.querySelectorAll(".add").forEach((button, index) => {
      button.addEventListener("click", () => {
        addVianda(viandasDisponibles[index]);
      });
    });
  }
});

/* Declaración del carrito + metodos */
const carrito = [];

const carritoElemento = document.querySelector("#carritoActivo");
const totalPrecioElemento = document.querySelector("#carritoPrecio");

/* Push de un elemento al carrito */
document.querySelectorAll(".add").forEach((button, index) => {
  button.addEventListener("click", () => {
    addVianda(viandasDisponibles[index]);
  });
});

function addVianda(item) {
  carrito.push(item);
  refreshCarrito();
}

function refreshCarrito() {
  carritoElemento.innerHTML = "";
  totalPrecio = 0;
  carrito.forEach((item) => {
    const viandaCarritoElemento = document.createElement("div");
    viandaCarritoElemento.classList.add("producto");
    viandaCarritoElemento.innerHTML = `
        <h3> ${item.nombre}</h3>
        <p>Cantidad de porciones: ${item.porciones} gr.</p>
        <p>Precio: $ ${item.precio}</p>
        <p>Tipo: ${item.tipo}</p>
        <button type="button" class="delete__carrito btn btn-dark">Quitar del carrito</button>
        `;
    carritoElemento.appendChild(viandaCarritoElemento);
    totalPrecio += item.precio;
  });
  totalPrecioElemento.innerHTML = `Hasta ahora, acumulás un total de $${totalPrecio} en viandas!`;
  document.querySelectorAll(".delete__carrito").forEach((button, index) => {
    button.addEventListener("click", () => {
      deleteCarrito(index);
    });
  });
}

/* Vaciado del carrito */

document.getElementById("carritoEmpty").addEventListener("click", function () {
  carrito.splice(0, carrito.length);
  document.getElementById("carritoActivo").innerHTML = "";
  document.getElementById("carritoPrecio").innerHTML = "";
});

/* Borrar un elemento del carrito*/
function deleteCarrito(index) {
  const item = carrito[index];
  totalPrecio -= item.precio;
  carrito.splice(index, 1);
  refreshCarrito();
}

/* filtros que no se me ocurrió como aplicarlo en el HTML, pero que dejo el código de cómo funcionaria */
/* Ver la posibilidad de agregar botones que se activen y desactiven? o algun desplegable? No se bien como hacer eso en java */

/* let filterPrecio = viandasDisponibles.filter ((item)=> item.precio >= 15000);
let filterVeggie = viandasDisponibles.filter ((item)=> item.tipo === "Vegetariano" || item.tipo === "Vegano, Vegetariano");
let filterVegan = viandasDisponibles.filter ((item)=> item.tipo === "Vegano");
let filterMeat = viandasDisponibles.filter ((item)=> item.tipo === "Con Carne"); */
