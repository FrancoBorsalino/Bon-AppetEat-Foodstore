// Declaración de variables globales, objetos y arrays sobre viandas e-commerce
let totalPrecio = 0;

const carrito = JSON.parse(localStorage.getItem("carritoLocal")) || [];
const carritoElemento = document.querySelector("#carritoActivo");
const totalPrecioElemento = document.querySelector("#carritoPrecio");

const inputSearch = document.getElementById("buscadorIndex");
const buttonSearch = document.getElementById("botonBuscador");
const returnSearch = document.getElementById("resBuscador");

const form = document.querySelector("#form");
const inputName = document.querySelector("#inputName");
const inputEmail = document.querySelector("#inputEmail");
const respuesta = document.querySelector("#respuesta");

/* Constructor de Array + productos de mi e-commerce */
function Viandas(id, nombre, porciones, categoria, precio, tipo, img) {
  this.id = id;
  this.nombre = nombre;
  this.porciones = porciones;
  this.categoria = categoria;
  this.precio = precio;
  this.tipo = tipo;
  this.img = img;
}

const curryGarbanzos = new Viandas(
  1,
  "Curry de Garbanzos",
  5,
  "Guisos y pastas",
  16700,
  "Vegano, Vegetariano",
  "https://www.gourmet.cl/wp-content/uploads/2022/08/curry-de-garbanzos-ajustada-web-570x458.jpg"
);
const polloArroz = new Viandas(
  2,
  "Pollo con Arroz",
  4,
  "Minutas",
  13200,
  "Con carne",
  "https://www.cocinacaserayfacil.net/wp-content/uploads/2018/06/Arroz-blanco-con-pollo-y-verduras.jpg"
);
const milaPure = new Viandas(
  3,
  "Milanesa con Pure",
  4,
  "Minutas",
  18300,
  "Con carne",
  "https://www.indega.com.py/primicia/wp-content/uploads/2022/04/pure-de-papa-con-pollo-broaster-large-qlJiPE4lyS.jpeg"
);
const sandVege = new Viandas(
  4,
  "Sandwich Vegano",
  6,
  "Sandwiches",
  14900,
  "Vegano, Vegetariano",
  "https://img.cocinarico.es/2020-09/sandwich-vegano-1.jpg"
);
const bifeEnsalada = new Viandas(
  5,
  "Bife con Ensalada",
  4,
  "Minutas",
  1710,
  "Con carne",
  "https://assets.unileversolutions.com/recipes-v2/35307.jpg"
);
const fideosCuatroQuesos = new Viandas(
  6,
  "Fideos Cuatro Quesos",
  3,
  "Guisos y pastas",
  12400,
  "Vegetariano",
  "https://www.diariamenteali.com/medias/receta-de-spaghetti-a-los.cuatro-quesos-1900Wx500H?context=bWFzdGVyfHJvb3R8MTkwMTY3fGltYWdlL2pwZWd8aDM2L2gyYS85MDc0MjEzNzgxNTM0L3JlY2V0YS1kZS1zcGFnaGV0dGktYS1sb3MuY3VhdHJvLXF1ZXNvc18xOTAwV3g1MDBIfDIzYTk1NGU0MDNhOTAyOWIwZjRlYzNhY2YyMzhjNmMzY2VhOTUxNjU1YWZlNzVhNTlkOWZkNTUyNGRkOGYyYzg"
);

const viandasDisponibles = [
  curryGarbanzos,
  polloArroz,
  milaPure,
  sandVege,
  bifeEnsalada,
  fideosCuatroQuesos,
];

refreshCarrito();

/* Declaración de cards de viandas según arrays */

for (let vianda of viandasDisponibles) {
  let elemento = document.createElement("div");
  elemento.innerHTML = `
        <div class="card-body"> 
          <img class="card-img-top" src="${vianda.img}">
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
          <img class="card-img-top" src="${vianda.img}">
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

/* Push de un elemento al carrito */
document.querySelectorAll(".add").forEach((button, index) => {
  button.addEventListener("click", () => {
    addVianda(viandasDisponibles[index]);
  });
});

function addVianda(item) {
  carrito.push(item);
  localStorage.setItem("carritoLocal", JSON.stringify(carrito));
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
  localStorage.setItem("carritoLocal", JSON.stringify(carrito));
});

/* Borrar un elemento del carrito*/
function deleteCarrito(index) {
  const item = carrito[index];
  totalPrecio -= item.precio;
  carrito.splice(index, 1);
  localStorage.setItem("carritoLocal", JSON.stringify(carrito));
  refreshCarrito();
}

/* Funcionamiento formulario */
form.addEventListener("submit", infoUsuario);

function infoUsuario(e) {
  e.preventDefault();
  if (inputName.value === "" || inputEmail === "") {
    let respuestaNo = document.createElement("div");
    respuestaNo.innerHTML = `<h5>Asegurate de completar ambos campos para poder avanzar con tu compra!</h5>`;
    document.querySelector("#respuesta").innerHTML = "";
    document.querySelector("#respuesta").appendChild(respuestaNo);
  } else {
    let respuestaSi = document.createElement("div");
    respuestaSi.innerHTML = `<h5>Gracias por elegirnos!</h5>
    <p>Hemos enviado nuestra información de contacto para avanzar con la compra. Muchas gracias!</p>`;
    document.querySelector("#respuesta").innerHTML = "";
    document.querySelector("#respuesta").appendChild(respuestaSi);
  }
}

/* filtros que no se me ocurrió como aplicarlo en el HTML, pero que dejo el código de cómo funcionaria */

let filterPrecio = viandasDisponibles.filter((item) => item.precio >= 15000);
let filterVeggie = viandasDisponibles.filter(
  (item) => item.tipo === "Vegetariano" || item.tipo === "Vegano, Vegetariano"
);
let filterVegan = viandasDisponibles.filter((item) => item.tipo === "Vegano");
let filterMeat = viandasDisponibles.filter((item) => item.tipo === "Con Carne");
