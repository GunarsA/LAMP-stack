if (window.location.pathname === "/add-product") {
  const typeSelector = document.querySelector("#productType");
  typeSelector.addEventListener("change", (e) => {
    const discField = document.querySelector("#discDescription");
    const bookField = document.querySelector("#bookDescription");
    const furnitureField = document.querySelector("#furnitureDescription");

    discField.classList.add("d-none");
    bookField.classList.add("d-none");
    furnitureField.classList.add("d-none");

    document.querySelectorAll("#descriptions input").forEach((element) => {
      element.removeAttribute("required");
    });

    switch (e.target.value) {
      case "DVD":
        discField.classList.remove("d-none");
        discField.querySelectorAll("input").forEach((element) => {
          element.setAttribute("required", "");
        });
        break;
      case "Book":
        bookField.classList.remove("d-none");
        bookField.querySelectorAll("input").forEach((element) => {
          element.setAttribute("required", "");
        });
        break;
      case "Furniture":
        furnitureField.classList.remove("d-none");
        const temp = furnitureField.querySelectorAll("input");
        temp.forEach((element) => {
          element.setAttribute("required", "");
        });
        break;
    }
  });
}

(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });

  const inputs = document.querySelectorAll("[required]");

  // Loop over them and prevent submission
  Array.from(inputs).forEach((input) => {
    console.log(input);
    input.addEventListener(
      "focusout",
      (event) => {
        input.parentElement.classList.add("was-validated");
      },
      false
    );
  });

  const sku = document.querySelector("#sku");
  sku.addEventListener("focusout", (event) => {
    const spinner = document.querySelector("#spinner");
    spinner.classList.remove("d-none");
    fetch("/read-product?sku=" + event.target.value)
      .then((response) => response.json())
      .then((json) => {
        setTimeout(() => {
          spinner.classList.add("d-none");
          if (json.exists === "true") {
            event.target.setCustomValidity("already exists");
          } else {
            event.target.setCustomValidity("");
          }
        }, 300);
      });
    event.target.addEventListener("input", (event) => {
      const spinner = document.querySelector("#spinner");
      spinner.classList.remove("d-none");
      fetch("/read-product?sku=" + event.target.value)
        .then((response) => response.json())
        .then((json) => {
          setTimeout(() => {
            spinner.classList.add("d-none");
            if (json.exists === "true") {
              event.target.setCustomValidity("already exists");
            } else {
              event.target.setCustomValidity("");
            }
          }, 300);
        });
    });
  });
})();
