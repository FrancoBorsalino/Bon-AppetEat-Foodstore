/* -------------------- DECLARACIÓN DE VARIABLES GLOBALES -------------------- */
let totalPrecio = 0;
let carrito = JSON.parse(localStorage.getItem("carritoLocal")) || []; // Recupero carrito de LocalStorage o declaro vacío

const carritoElemento = document.querySelector("#carritoActivo");
const totalPrecioElemento = document.querySelector("#carritoPrecio");

let viandasDisponibles = [];

const inputSearch = document.querySelector("#buscadorIndex");
const buttonSearch = document.querySelector("#botonBuscador");
const returnSearch = document.querySelector("#resBuscador");

const filtroCarne = document.querySelector("#filtroCarne");
const filtroVeggie = document.querySelector("#filtroVegetariano");
const filtroVegan = document.querySelector("#filtroVegano");

let botonAddProducto = document.querySelectorAll(".add");
let botonDViandaCarrito = document.querySelectorAll(".delete__carrito");
let botonMoreVianda = document.querySelectorAll(".more__vianda");
let botonLessVianda = document.querySelectorAll(".less__vianda");
const botonVaciarCarrito = document.querySelector("#carritoEmpty");
const botonForm = document.querySelector("#botonComprar");

const sectionForm = document.querySelector("#formCompra");
const form = document.querySelector("#form");
const inputName = document.querySelector("#inputName");
const inputEmail = document.querySelector("#inputEmail");
const respuesta = document.querySelector("#respuesta");

/* -------------------- INCIALIZACIÓN POR FUNCIONES -------------------- */

const loadJSON = async () => {
  const resp = await fetch("./viandas.json");
  const data = await resp.json();
  viandasDisponibles = data;
  mostrarVidriera(viandasDisponibles);
};

loadJSON();
refreshCarrito();

/* -------------------- FUNCIONAMIENTO DE VIDRIERA -------------------- */
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

/* -------------------- FUNCIONAMIENTO DE BUSCADOR -------------------- */
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
  resultados.length === 0 ||
  inputSearch.value === "" ||
  inputSearch.value.trim() === ""
    ? (returnSearch.innerHTML = `<h1 class="robotoSemibold">Disculpanos! No logramos encontrar ninguna vianda que tenga "${inputSearchTLC.toUpperCase()}". Intenta nuevamente con algún otro nombre!</h1>`)
    : ((document.querySelector(".cardsViandas").innerHTML = ""),
      mostrarVidriera(resultados));
  refreshBotonesAdd();
}

/* -------------------- FUNCIONAMIENTO DE FILTROS -------------------- */
filtroCarne.addEventListener("click", (event) => {
  event.preventDefault();
  let viandasFiltradas = viandasDisponibles.filter(
    (vianda) => vianda.tipo === "Carne"
  );
  document.querySelector(".cardsViandas").innerHTML = "";
  mostrarVidriera(viandasFiltradas);
  document.querySelectorAll(".add").forEach((button, i) => {
    button.addEventListener("click", () => {
      addViandaCarrito(viandasDisponibles[i]);
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
      addViandaCarrito(viandasDisponibles[i]);
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
      addViandaCarrito(viandasDisponibles[i]);
    });
  });
});

/* -------------------- FUNCIONAMIENTO DEL CARRITO -------------------- */

function toggleCarrito() {
  carrito.length === 0
    ? (carritoSection.classList.remove("activo"),
      carritoSection.classList.add("oculto"))
    : (carritoSection.classList.remove("oculto"),
      carritoSection.classList.add("activo"));
}

function refreshCarrito() {
  carritoElemento.innerHTML = "";
  totalPrecio = 0;
  carrito.forEach((producto) => {
    const viandaCarritoElemento = document.createElement("div");
    viandaCarritoElemento.classList.add("carrito__layout");
    viandaCarritoElemento.innerHTML = `
    <img src="${producto.img}">
    <div class="producto">
        <p class="robotoBold tituloCarrito"> ${producto.nombre}</p>
        <p class="robotoRegular">Cantidad de porciones: <b class="robotoSemibold">${
          producto.porciones * producto.cantidad
        }</b></p>
        <p class="robotoRegular">Precio por producto: <b>$${
          producto.precio
        }</b></p>
        <p class="robotoRegular">Tipo: ${producto.tipo}</p>
        </div>
        <div class="carrito__interactuar">
          <div class="botonera__carrito">
            <button type="button" class="less__vianda boton__cantidad" id="sub__${
              producto.id
            }"><strong>-</strong></button>
            <button type="button" class="delete__carrito botonDeduceCarrito" id="${
              producto.id
            }">Eliminar</button>
            <button type="button" class="more__vianda boton__cantidad" id="add__${
              producto.id
            }"><strong>+</strong></button>
          </div>
          <div class="total___carrito">
          <p><strong class="robotoBold">Cantidad: ${
            producto.cantidad
          }</strong></p>
          <em class ="robotoSemiBold">Subtotal: <strong class="robotoSemibold">$${
            producto.cantidad * producto.precio
          }</strong></em>
          </div>
        </div>
        `;
    carritoElemento.appendChild(viandaCarritoElemento);
    totalPrecio += producto.precio * producto.cantidad;
  });
  totalPrecioElemento.innerHTML = `<p class="robotoBold">El total de tu compra: <strong class="robotoSemibold">$${totalPrecio}</strong></p>`;
  refreshBotonesCarrito();
  toggleCarrito();
}

function addViandaCarrito(e) {
  const viandaId = e.currentTarget.id;
  const viandaDeseada = viandasDisponibles.find(
    (vianda) => vianda.id === viandaId
  );
  carrito.some((vianda) => vianda.id === viandaId)
    ? (() => {
        const index = carrito.findIndex((vianda) => vianda.id === viandaId);
        carrito[index].cantidad++;
      })()
    : carrito.push(viandaDeseada);
  Toastify({
    text: `Se agregó al carrito: ${viandaDeseada.nombre}`,
    duration: 3500,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #e6572c, #e6572c)",
    },
  }).showToast();
  localStorage.setItem("carritoLocal", JSON.stringify(carrito));
  refreshCarrito();
}

function deleteViandaCarrito(e) {
  const viandaId = e.currentTarget.id;
  const index = carrito.findIndex((vianda) => vianda.id === viandaId);
  Toastify({
    text: `Se eliminaron del carrito: ${carrito[index].nombre}`,
    duration: 3500,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00645a, #00645a)",
    },
  }).showToast();
  carrito[index].cantidad = 1;
  carrito.splice(index, 1);
  localStorage.setItem("carritoLocal", JSON.stringify(carrito));
  refreshCarrito();
}

function moreViandaCarrito(e) {
  const viandaId = e.currentTarget.id.replace("add__", "");
  const index = carrito.findIndex((vianda) => vianda.id === viandaId);
  carrito[index].cantidad++;
  localStorage.setItem("carritoLocal", JSON.stringify(carrito));
  refreshCarrito();
}

function lessViandaCarrito(e) {
  const viandaId = e.currentTarget.id.replace("sub__", "");
  const index = carrito.findIndex((vianda) => vianda.id === viandaId);
  carrito[index].cantidad > 1
    ? carrito[index].cantidad--
    : carrito.splice(index, 1);
  localStorage.setItem("carritoLocal", JSON.stringify(carrito));
  refreshCarrito();
}

function vaciarCarrito() {
  Swal.fire({
    title: "¿Estas seguro de querer vaciar tu carrito?",
    text: "¡Tendrás que volver a armarlo si aceptas!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e6572c",
    cancelButtonColor: "#00645a",
    confirmButtonText: "Vaciar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = [];
      totalPrecio = 0;
      localStorage.setItem("carritoLocal", JSON.stringify(carrito));
      sectionForm.classList.remove("activo");
      sectionForm.classList.add("oculto");
      Swal.fire({
        icon: "success",
        title: "¡Se ha vaciado tu carrito!",
        confirmButtonColor: "#FF5733",
      });
      refreshCarrito();
    }
  });
}

function refreshBotonesAdd() {
  botonAddProducto = document.querySelectorAll(".add");
  botonAddProducto.forEach((button) => {
    button.addEventListener("click", addViandaCarrito);
  });
}

function refreshBotonesCarrito() {
  botonDViandaCarrito = document.querySelectorAll(".delete__carrito");
  botonDViandaCarrito.forEach((button) => {
    button.addEventListener("click", deleteViandaCarrito);
  });
  botonLessVianda = document.querySelectorAll(".less__vianda");
  botonLessVianda.forEach((button) => {
    button.addEventListener("click", lessViandaCarrito);
  });
  botonMoreVianda = document.querySelectorAll(".more__vianda");
  botonMoreVianda.forEach((button) => {
    button.addEventListener("click", moreViandaCarrito);
  });
  botonVaciarCarrito.addEventListener("click", vaciarCarrito);
  botonForm.addEventListener("click", toggleForm);
}

/* -------------------- FUNCIONAMIENTO DEL FORMULARIO -------------------- */

document.querySelector("#botonCerrarForm").addEventListener("click", () => {
  sectionForm.classList.remove("formActivo");
  sectionForm.classList.add("formOculto");
  inputEmail.value = "";
  inputName.value = "";
  document.querySelector("#respuesta").innerHTML = "";
});

function toggleForm() {
  carrito.length === 0
    ? (sectionForm.classList.remove("formActivo"),
      sectionForm.classList.add("formOculto"),
      (inputEmail.value = ""),
      (inputName.value = ""))
    : (sectionForm.classList.remove("formOculto"),
      sectionForm.classList.add("formActivo"));
  form.addEventListener("submit", infoUsuario);
}

function infoUsuario(e) {
  e.preventDefault();
  if (inputName.value === "" || inputEmail.value === "") {
    Toastify({
      text: "Asegurate de completar ambos campos para poder avanzar con tu compra!",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00645a, #00645a)",
      },
    }).showToast();
  } else {
    carrito = [];
    localStorage.setItem("carritoLocal", JSON.stringify(carrito));
    Swal.fire({
      imageUrl: "https://i.ibb.co/bmjmc5V/logo-Body-Index.png",
      imageHeight: 150,
      imageWidth: 245,
      title: `¡Gracias por confiar en nosotros ${inputName.value.toString()}!`,
      text: `Te estaremos contactando por mail a ${inputEmail.value.toString()} para finalizar la compra`,
      confirmButtonColor: "#FF5733",
    }).then((result) => {
      if (result.isConfirmed) {
        refreshCarrito();
        toggleForm();
      }
    });
  }
}
