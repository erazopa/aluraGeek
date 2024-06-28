import { conexionApi } from "./conexionApi.js";

const lista = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function crearCard(name, price, image, id) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `<div class="image-container">
                        <img class="img-productos"
                            src="${image}"
                            alt="${name}">
                    </div>
                    <div class="card-container--info">
                        <p>${name}</p>
                        <div class="card-container--value">
                            <p>${price}</p>
                            <button class="delete-button" data-id="${id}">
                                <img class="delete-img" src="/access/basurita.png" alt="eliminar"> </button>
                        </div>
                    </div>`;

  lista.appendChild(card);
  return card;
}

const render = async () => {
  try {
    const listProduct = await conexionApi.productList();
    console.log(listProduct);
    listProduct.forEach((product) => {
      lista.appendChild(
        crearCard(product.name, product.price, product.image, product.id)
      );
    });
    //Llamado de la función despues de que genera todas las cartas
    generateDelete();
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
  const image = document.querySelector("[data-image]").value;

  conexionApi
    .createProducts(name, price, image)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

function generateDelete() {
  // Se usa querySelectorAll para seleccionar a todos los elementos que contengan la clase
  const btns = document.querySelectorAll(".delete-button");
  // Se recorren todos los btns que contengan la clase para poder asignarle el evento click
  btns.forEach((btn) => {
    // Asignamos el evento click
    btn &&
      btn.addEventListener("click", () => {
        // Obtenemos el valor del data-id
        const id = btn.dataset.id;
        // Consumimos el API con el id del producto
        conexionApi
          .deleteProducts(id)
          .then((res) => {
            if (res) {
              console.log("producto borrado exitosamente");
            }
          })
          .catch((err) => console.log("Error de red:", err));
      });
  });
}

render();
