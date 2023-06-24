/* DECLARACIÓN DE ARRAYS Y OBJETOS */
const viandasDisponibles = [
  {
    id: "viandaUno",
    nombre: "Curry con Garbanzos",
    porciones: 5,
    precio: 16700,
    tipo: "Vegano, Vegetariano",
    img: "https://www.gourmet.cl/wp-content/uploads/2022/08/curry-de-garbanzos-ajustada-web-570x458.jpg",
    cantidad: 1,
  },
  {
    id: "viandaDos",
    nombre: "Pollo con Arroz",
    porciones: 4,
    precio: 13200,
    tipo: "Carne",
    img: "https://www.cocinacaserayfacil.net/wp-content/uploads/2018/06/Arroz-blanco-con-pollo-y-verduras.jpg",
    cantidad: 1,
  },
  {
    id: "viandaTres",
    nombre: "Milanesa con Pure",
    porciones: 4,
    precio: 18300,
    tipo: "Carne",
    img: "https://www.indega.com.py/primicia/wp-content/uploads/2022/04/pure-de-papa-con-pollo-broaster-large-qlJiPE4lyS.jpeg",
    cantidad: 1,
  },
  {
    id: "viandaCuatro",
    nombre: "Sandwich Vegano",
    porciones: 6,
    precio: 14900,
    tipo: "Vegano, Vegetariano",
    img: "https://img.cocinarico.es/2020-09/sandwich-vegano-1.jpg",
    cantidad: 1,
  },
  {
    id: "viandaCinco",
    nombre: "Bife con Ensalada",
    porciones: 4,
    precio: 1710,
    tipo: "Carne",
    img: "https://assets.unileversolutions.com/recipes-v2/35307.jpg",
    cantidad: 1,
  },
  {
    id: "viandaSeis",
    nombre: "Fideos con Tuco",
    porciones: 3,
    precio: 12400,
    tipo: "Vegetariano",
    img: "https://www.diariamenteali.com/medias/receta-de-spaghetti-a-los.cuatro-quesos-1900Wx500H?context=bWFzdGVyfHJvb3R8MTkwMTY3fGltYWdlL2pwZWd8aDM2L2gyYS85MDc0MjEzNzgxNTM0L3JlY2V0YS1kZS1zcGFnaGV0dGktYS1sb3MuY3VhdHJvLXF1ZXNvc18xOTAwV3g1MDBIfDIzYTk1NGU0MDNhOTAyOWIwZjRlYzNhY2YyMzhjNmMzY2VhOTUxNjU1YWZlNzVhNTlkOWZkNTUyNGRkOGYyYzg",
    cantidad: 1,
  },
];

/* DECLARACIÓN DE VARIABLES GLOBALES */
let totalPrecio = 0;

let carrito = [];
/* const carrito = JSON.parse(localStorage.getItem("carritoLocal")) || []; // Recupero carrito de LocalStorage o declaro vacío */

const carritoElemento = document.querySelector("#carritoActivo");
const totalPrecioElemento = document.querySelector("#carritoPrecio");

const inputSearch = document.querySelector("#buscadorIndex");
const buttonSearch = document.querySelector("#botonBuscador");
const returnSearch = document.querySelector("#resBuscador");

const filtroCarne = document.querySelector("#filtroCarne");
const filtroVeggie = document.querySelector("#filtroVegetariano");
const filtroVegan = document.querySelector("#filtroVegano");

let botonAddProducto = document.querySelectorAll(".add");
let botonDeleteCarrito = document.querySelectorAll(".delete__carrito");

const sectionForm = document.querySelector("#formCompra");

/* INCIALIZACIÓN POR FUNCIONES */

mostrarVidriera(viandasDisponibles);
refreshCarrito();

/* FUNCIONAMIENTO DE VIDRIERA */
function mostrarVidriera(arrayViandas) {
  arrayViandas.forEach((vianda) => {
    const cardVidriera = document.createElement("div");
    cardVidriera.innerHTML = `
        <div class="card-body"> 
          <img class="card-img-top" src="${vianda.img}">
            <p class="card-title robotoBold">${vianda.nombre}</p>
            <p class="card-text robotoRegular">Cantidad de porciones: ${vianda.porciones}</p>
            <p class="card-text robotoRegular">Valor: $${vianda.precio}</p>
            <p class="card-text robotoSemiBold">Tipo de vianda: ${vianda.tipo}</p>
            <button id="${vianda.id}" class="add botonAddCarrito">Agregar al carrito <img src="./imgs/carritoLogoBlanco.png"
                alt="Agregar al carrito"></button>
        </div>
    `;
    document.querySelector(".cardsViandas").append(cardVidriera);
  });
  refreshBotonesAdd();
}

/* FUNCIONAMIENTO DE BUSCADOR */
buttonSearch.addEventListener("click", (event) => {
  event.preventDefault();
  buscarPorTexto(inputSearch);
});

document.querySelector("#botonClear").addEventListener("click", () => {
  document.querySelector(".cardsViandas").innerHTML = "";
  mostrarVidriera(viandasDisponibles);
});

function buscarPorTexto(input) {
  const inputSearchTLC = input.value.toLowerCase();
  const resultados = viandasDisponibles.filter((vianda) => {
    const viandaNombre = vianda.nombre.toLowerCase();
    const regex = new RegExp(inputSearchTLC, "i");
    return regex.test(viandaNombre);
  });

  if (
    resultados.length === 0 ||
    inputSearch.value === "" ||
    inputSearch.value.trim() === ""
  ) {
    returnSearch.innerHTML = `<h1 class="robotoSemibold">Disculpanos! No logramos encontrar ninguna vianda que tenga "${inputSearchTLC.toUpperCase()}". Intenta nuevamente con algún otro nombre!</h1>`;
  } else {
    document.querySelector(".cardsViandas").innerHTML = "";
    returnSearch.innerHTML = resultados
      .map((vianda) => {
        return `<div>
            <div class="card-body">
          <img class="card-img-top" src="${vianda.img}">
                <p class="card-title robotoBold">${vianda.nombre}</p>
                <p class="card-text robotoRegular">Cantidad de porciones: ${vianda.porciones}</p>
                <p class="card-text robotoRegular">Valor: $${vianda.precio}</p>
                <p class="card-text robotoSemiBold">Tipo de vianda: ${vianda.tipo}</p>
                <button id="${vianda.id}" class="add botonAddCarrito">Agregar al carrito <img src="./imgs/carritoLogoBlanco.png"
                    alt="Agregar al carrito"></button>
            </div>
        </div>
        `;
      })
      .join("");
  }
  refreshBotonesAdd();
}

/* FUNCIONAMIENTO DE FILTROS */
filtroCarne.addEventListener("click", (event) => {
  event.preventDefault();
  let viandasFiltradas = viandasDisponibles.filter(
    (vianda) => vianda.tipo === "Carne"
  );
  document.querySelector(".cardsViandas").innerHTML = "";
  mostrarVidriera(viandasFiltradas);
  document.querySelectorAll(".add").forEach((button, i) => {
    button.addEventListener("click", () => {
      addVianda(viandasDisponibles[i]);
    });
  });
});

filtroVeggie.addEventListener("click", (event) => {
  event.preventDefault();
  let viandasFiltradas = viandasDisponibles.filter(
    (vianda) =>
      vianda.tipo === "Vegetariano" || vianda.tipo === "Vegano, Vegetariano"
  );
  document.querySelector(".cardsViandas").innerHTML = "";
  mostrarVidriera(viandasFiltradas);
  document.querySelectorAll(".add").forEach((button, i) => {
    button.addEventListener("click", () => {
      addVianda(viandasDisponibles[i]);
    });
  });
});

filtroVegan.addEventListener("click", (event) => {
  event.preventDefault();
  let viandasFiltradas = viandasDisponibles.filter(
    (vianda) => vianda.tipo === "Vegano, Vegetariano"
  );
  document.querySelector(".cardsViandas").innerHTML = "";
  mostrarVidriera(viandasFiltradas);
  document.querySelectorAll(".add").forEach((button, i) => {
    button.addEventListener("click", () => {
      addVianda(viandasDisponibles[i]);
    });
  });
});

/* FUNCIONAMIENTO DEL CARRITO */ // Para compra total usar reduce()?

function toggleCarrito() {
  if (carrito.length === 0) {
    carritoSection.classList.remove("activo");
    carritoSection.classList.add("oculto");
  } else {
    carritoSection.classList.remove("oculto");
    carritoSection.classList.add("activo");
  }
}

/* AGREGAR SUBTOTAL SOBRE BOTON EN CARRITO y tambien sumarle un +1 o -1 */
function refreshCarrito() {
  carritoElemento.innerHTML = "";
  totalPrecio = 0;
  carrito.forEach((producto) => {
    const viandaCarritoElemento = document.createElement("div");
    viandaCarritoElemento.classList.add("carrito__layout");
    viandaCarritoElemento.innerHTML = `
    <img src="${producto.img}">
    <div class="producto">
        <p class="robotoBold"> ${producto.nombre}</p>
        <p class="robotoRegular">Cantidad de porciones: ${producto.porciones}</p>
        <p class="robotoRegular">Precio por producto: $ ${producto.precio}</p>
        <p class="robotoRegular">Tipo: ${producto.tipo}</p>
        <p class="robotoBold">Cantidad: ${producto.cantidad}
        </div>
              <button type="button" class="delete__carrito botonDeduceCarrito" id="${producto.id}">Quitar del carrito</button>
        `;
    carritoElemento.appendChild(viandaCarritoElemento);
    totalPrecio += producto.precio;
  });
  totalPrecioElemento.innerHTML = `<p class="robotoBold">Hasta ahora, acumulás un total de $${totalPrecio} en viandas!</p>`;
  refreshBotonDelete();
  toggleCarrito();
}

function addVianda(e) {
  const viandaId = e.currentTarget.id;
  const viandaDeseada = viandasDisponibles.find(
    (vianda) => vianda.id === viandaId
  );
  if (carrito.some((vianda) => vianda.id === viandaId)) {
    const index = carrito.findIndex((vianda) => vianda.id === viandaId);
    carrito[index].cantidad++;
  } else {
    carrito.push(viandaDeseada);
  }
  localStorage.setItem("carritoLocal", JSON.stringify(carrito));

  refreshCarrito();
}

function deleteCarrito(e) {
  const viandaId = e.currentTarget.id;
  const index = carrito.findIndex((vianda) => vianda.id === viandaId);
  carrito[index].cantidad = 1;
  carrito.splice(index, 1);
  console.log(carrito);
  localStorage.setItem("carritoLocal", JSON.stringify(carrito));
  refreshCarrito();
}

/* AGREGARLE UNA ALERTA DE QUE SE VACIÓ EL CARRITO */
document.querySelector("#carritoEmpty").addEventListener("click", () => {
  carrito = [];
  totalPrecio = 0;
  localStorage.setItem("carritoLocal", JSON.stringify(carrito));
  sectionForm.classList.remove("activo");
  sectionForm.classList.add("oculto");
  refreshCarrito();
  toggleCarrito();
});

function refreshBotonesAdd() {
  botonAddProducto = document.querySelectorAll(".add");
  botonAddProducto.forEach((button) => {
    button.addEventListener("click", addVianda);
  });
}

function refreshBotonDelete() {
  botonDeleteCarrito = document.querySelectorAll(".delete__carrito");
  botonDeleteCarrito.forEach((button) => {
    button.addEventListener("click", deleteCarrito);
  });
}

/* function deleteCarrito(index) {
  const viandaBorrada = carrito[i];
  totalPrecio -= viandaBorrada.precio;
  carrito.splice(index, 1);
  localStorage.setItem("carritoLocal", JSON.stringify(carrito));
  refreshCarrito();
} */

/* FUNCIONAMIENTO DEL FORMULARIO */

document.querySelector("#botonComprar").addEventListener("click", () => {
  sectionForm.classList.remove("oculto");
  sectionForm.classList.add("activo");
});
