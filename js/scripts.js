document.addEventListener("DOMContentLoaded", function () {
  const menuContainer = document.querySelector(".menu-container");
  const menu = document.querySelector(".menu#menu");
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    sidebar.style.left = sidebar.classList.contains("hidden") ? "-280px" : "0";
    menuToggle.style.left = sidebar.classList.contains("hidden")
      ? "20px"
      : "300px";
  });

  function createMenuItem(item) {
    const menuItem = document.createElement("li");
    menuItem.classList.add("menu-item");
    menuItem.addEventListener("click", function (event) {
      event.stopPropagation();
      if (item.children && item.children.length > 0) {
        closeOtherSubmenus(item.id + "-submenu");
        toggleSubmenu(item.id + "-submenu");
      } else if (item.data && item.data.TEC_ProgramaCodigo) {
        loadContent(item.data.TEC_ProgramaCodigo + ".html");
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

function closeOtherSubmenus(exceptId) {
  const allSubmenus = document.querySelectorAll(".submenu");
  allSubmenus.forEach((submenu) => {
    if (submenu.id !== exceptId && submenu.classList.contains("show")) {
      submenu.classList.remove("show");
    }
  });
}

function toggleSubmenu(submenuId) {
  const submenu = document.getElementById(submenuId);
  submenu.classList.toggle("show");
}

function loadContent(url) {
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content").innerHTML = html;
    })
    .catch((error) => console.error("Erro ao carregar o conteúdo:", error));
}
