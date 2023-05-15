/* Declaración de variables globales, objetos y arrays */
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
    tipo: "con carne",
  },
  {
    id: 3,
    nombre: "Milanesa con Pure",
    porciones: 4,
    categoria: "Minutas",
    precio: 18300,
    tipo: "con carne",
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
    tipo: "con carne",
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

/* Inputs de Usuario para declarar variables de información de usuario */
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

/* Declaracion de funcion para confirmar la información de usuario */
function confirmacionUsuario() {
  let confirmarDatos = prompt(
    "Bienvenido " +
      nombreUsuario +
      "!\nEstaremos entregando tu mercadería a la dirección: " +
      direccionUsuario +
      ", y te contactaremos al e-mail: " +
      emailUsuario +
      ".\nSon estos datos correctos?"
  );
  if (confirmarDatos != "") {
    switch (confirmarDatos) {
      case "SI":
      case "Si":
      case "si":
        navegadorApp();
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

/* SECCION NAVEGACION - Funcion condicional para presentarle al usuario la navegación de la app */
function navegadorApp() {
  let opcionNav = Number(
    prompt(
      "Bienvenido a Bon Appeteat! Seleccione una de las opciones para acceder al menu:\n1 - Comprar Viandas\n2 - Ver mi carrito\n3 - Modificar mis datos"
    )
  );
  if (opcionNav != "") {
    switch (opcionNav) {
      case 1:
        navegadorCompra();
        break;
      case 2:
        alert("Esto te lleva a la seccion CARRITO");
        break;
      case 3:
        let confirmReload = prompt(
          "Modificar los datos requiere comenzar nuevamente con la compra.\nEstá seguro que quiere hacerlo? Responda con si o no."
        );
        if (confirmReload != "") {
          switch (confirmReload) {
            case "Si":
            case "SI":
            case "si":
              location.reload();
              break;
            case "No":
            case "NO":
            case "no":
              navegadorApp();
              break;
            default:
              alert("No es una respuesta correcta.");
              navegadorApp();
              break;
          }
        }
        break;
      default:
        alert("Por favor, ingresa el número de alguna de las opciones!");
        navegadorApp();
        break;
    }
  } else {
    alert("No ha ingresado ninguna respuesta.");
    navegadorApp();
  }
}

/* SECCION COMPRA - Funciones y metodos para la tienda de Viandas */
function navegadorCompra() {
  let compraNav = Number(
    prompt(
      "MENU COMPRAR VIANDAS\nA continuación, selecciona la opción de lo que quieras hacer:\n1 - Ver viandas disponibles\n2 - Buscar viandas\n3 - Filtrar viandas\n4 - Ver mi carrito\n5 - Volver al menú principal"
    )
  );
  if (compraNav != "") {
    switch (compraNav) {
      case 1:
        mostrarViandas();
        break;
      case 2:
        buscarPorTexto();
        break;
      case 3:
        alert("Aca tengo que armar un FILTRADOR de viandas con opciones");
        break;
      case 4:
        alert("Aca tengo que llevar al CARRITO");
        break;
      case 5:
        navegadorApp();
        break;
      default:
        alert("Por favor, ingresa el número de alguna de las opciones!");
        navegadorCompra();
        break;
    }
  }
}

// Mostrar la tienda virtual (1)
// Acá tengo que mostrar en la consola los productos que están disponibles. Para eso tengo que llamar la info del Array y armar un listado ordenado
function mostrarViandas() {
  // Metodo muy simple de mostrar viandas llamando con un forEach cada elemento del Array e interpretandolo en un console.log
  console.log("Estas son las viandas disponibles:\n");
  viandasDisponibles.forEach((vianda, indice) => {
    console.log(
      `Vianda nro. ${vianda.id} - ${vianda.nombre}: Rinde ${vianda.porciones} porciones, con un valor de $${vianda.precio}. Tené en cuenta que esta vianda es para dieta tipo ${vianda.tipo}.`
    );
  });
  alert("Las viandas se han mostrado en la consola!");
  /* LLEVAR A AGREGAR A CARRITO */
}

// Buscador (2)
// DEARMAR BIEN EL BUSCADOR PARA VER CÓMO ESTÁ FUNCIONANDO
function buscarPorTexto() {
  const inputBusqueda = prompt("Escriba una palabra que desee buscar:"); //Input de usuario para la busqueda
  const inputBusquedaTLC = inputBusqueda.toLowerCase(); // Modifico esta variable a lower case
  const resultados = []; // Declaro un array "resultados" donde voy a pushear lo que coincida
  // Le indico que haga un bucle por cada uno de los elementos de mi Array de viandas en donde:
  for (let i = 0; i < viandasDisponibles.length; i++) {
    const vianda = viandasDisponibles[i]; // Declaro "vianda" como objeto (con todos sus valores) correspondiente al indice del ciclo
    const info = Object.values(vianda); // Declaro "info" como un Array conformado por los valores de dicho objeto
    // Luego le indico que haga un bucle por cada valor dentro del nuevo Array en donde:
    for (let j = 0; j < info.length; j++) {
      const infoDos = info[j].toString().toLowerCase(); // Declaro "infoDos" donde cada ciclo será cada uno de los valores que convertí en Array en "info". Lo convierto a string y lower case para poder comparar con el prompt
      // Declaro un condicional if en donde planteo que si el prompt buscado, existe dentro de los valores de "infoDos", ejecute:
      if (infoDos.indexOf(inputBusquedaTLC) !== -1) {
        resultados.push(vianda); // En caso de que en alguno de los datos de "infoDos" haya coincidencia, lo pusheo al array de resultados
      }
    }
  }
  if (
    // Condicional si no encuentra resultado, o se carga vacía la busqueda
    resultados.length === 0 ||
    inputBusqueda === "" ||
    inputBusqueda === " "
  ) {
    alert(
      `Disculpanos! No logramos encontrar ninguna vianda que contenga "${inputBusqueda}". Intenta nuevamente con alguna otra palabra clave!`
    );
    buscarPorTexto(); // Volvemos a ejecutar
  } else {
    // Condicional else, donde genero un bucle por cada resultado que haya coincidido
    console.log("Estos fueron los resultados que hemos encontrado:");
    for (let i = 0; i < resultados.length; i++) {
      const coincidencia = resultados[i]; // Declaro "coincidencia" como objeto (con todos sus valores) correspondientes al indice del ciclo
      console.log(
        // Llamo a la consola para mostrar los resultados
        `Vianda nro. ${coincidencia.id} - ${coincidencia.nombre}: Rinde ${coincidencia.porciones} porciones, con un valor de $${coincidencia.precio}. Tené en cuenta que esta vianda es para dieta tipo ${coincidencia.tipo}.`
      );
    }
    alert("Los resultados se han mostrado en la consola!");
    /* LLEVAR A AGREGAR A CARRITO */
  }
}

// Filtros (3)

// Sumar al carrito (futuro boton)

/* SECCION CARRITO - Funciones y metodos para visualizar y modificar el carrito */

// Mostrar carrito

// Borrar elementos

// Vaciar carrito

// Finalizar compra
