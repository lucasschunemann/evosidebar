// scripts.js

document.addEventListener("DOMContentLoaded", function () {
  const menuContainer = document.querySelector(".menu-container");
  const menu = document.querySelector(".menu#menu");
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  const closeBtn = document.querySelector(".close-btn");

  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("show");
    menuToggle.classList.toggle("active");
    if (sidebar.classList.contains("show")) {
      sidebar.style.left = "0";
    } else {
      sidebar.style.left = window.innerWidth <= 768 ? "-100%" : "-280px";
    }
  });

  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("show");
    sidebar.style.left = "-100%";
  });

  function createMenuItem(item) {
    const menuItem = document.createElement("li");
    menuItem.classList.add("menu-item");

    menuItem.addEventListener("click", function (event) {
      event.stopPropagation();
      if (item.children && item.children.length > 0) {
        toggleSubmenu(item.id + "-submenu", menuItem);
      } else if (item.data && item.data.TEC_ProgramaCodigo) {
        loadContent(item.data.TEC_ProgramaCodigo + ".html");
        if (window.innerWidth <= 768) {
          // Fecha o menu ao clicar em um item no celular
          sidebar.classList.remove("show");
          sidebar.style.left = "-100%";
        }
      }
    });

    if (item.children && item.children.length > 0) {
      const icon = document.createElement("i");
      icon.className = "fas fa-folder icon";
      menuItem.appendChild(icon);
    }

    const text = document.createElement("span");
    text.className = "menu-text";
    text.textContent = item.text;
    menuItem.appendChild(text);

    if (!item.children || item.children.length === 0) {
      const favoriteButton = document.createElement("button");
      favoriteButton.classList.add("favorite-button");
      favoriteButton.innerHTML = '<i class="fas fa-star"></i>';
      favoriteButton.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleFavorite(item);
      });
      menuItem.appendChild(favoriteButton);
    }

    if (item.children && item.children.length > 0) {
      const submenu = document.createElement("ul");
      submenu.classList.add("submenu");
      submenu.id = item.id + "-submenu";

      item.children.forEach((subitem) => {
        const submenuItem = createMenuItem(subitem);
        submenuItem.classList.add("submenu-item");
        submenu.appendChild(submenuItem);
      });

      menuItem.appendChild(submenu);
    }

    return menuItem;
  }

  function loadMenuData() {
    fetch("data/menus.json")
      .then((response) => response.json())
      .then((data) => {
        data.Nos.forEach((item) => {
          const menuItem = createMenuItem(item);
          menu.appendChild(menuItem);
        });
      })
      .catch((error) =>
        console.error("Erro ao carregar os dados do menu:", error)
      );
  }

  loadMenuData();
});

function toggleSubmenu(submenuId, menuItem) {
  const submenu = document.getElementById(submenuId);
  submenu.classList.toggle("show");
  menuItem.classList.toggle("menu-item-open");

  submenu.querySelectorAll(".submenu-item").forEach((subItem) => {
    subItem.classList.toggle("submenu-item-open");
  });
}

function loadContent(url) {
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content").innerHTML = html;
    })
    .catch((error) => console.error("Erro ao carregar o conteúdo:", error));
}

// Adicionar aos favoritos
function toggleFavorite(item) {
  // Log para retorno
  console.log("Favorito toggled para:", item.text);
}
