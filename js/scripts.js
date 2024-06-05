document.addEventListener("DOMContentLoaded", function () {
  const menuContainer = document.querySelector(".menu-container");
  const menu = document.querySelector(".menu");
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    if (sidebar.classList.contains("hidden")) {
      sidebar.style.left = "-280px";
      menuToggle.style.left = "20px";
    } else {
      sidebar.style.left = "0";
      menuToggle.style.left = "300px";
    }
  });

  function createMenuItem(item) {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");

    const icon = document.createElement("i");
    if (item.icon) {
      icon.className = item.icon;
    }

    const text = document.createElement("span");
    text.className = "menu-text";
    text.textContent = item.text;

    menuItem.appendChild(icon);
    menuItem.appendChild(text);

    if (item.children && item.children.length > 0) {
      const submenu = document.createElement("div");
      submenu.classList.add("submenu");

      item.children.forEach((subitem) => {
        const submenuItem = createMenuItem(subitem);
        submenu.appendChild(submenuItem);
      });

      menuItem.appendChild(submenu);
      menuItem.addEventListener("click", function (event) {
        event.stopPropagation();
        submenu.classList.toggle("show");
      });
    } else {
      menuItem.addEventListener("click", function (event) {
        event.stopPropagation();
        if (item.data && item.data.TEC_ProgramaCodigo) {
          loadContent(item.data.TEC_ProgramaCodigo + ".html");
        }
      });
    }

    return menuItem;
  }

  function loadMenuData() {
    fetch("data/menus.json")
      .then((response) => response.json())
      .then((data) => {
        menuContainer.style.opacity = "1";

        data.Nos.forEach((item) => {
          const menuItem = createMenuItem(item);
          menu.appendChild(menuItem);
        });
      })
      .catch((error) =>
        console.error("Erro ao carregar os dados do menu:", error)
      );
  }

  function loadContent(url) {
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("content").innerHTML = html;
      })
      .catch((error) => console.error("Erro ao carregar o conteúdo:", error));
  }

  loadMenuData();
});
