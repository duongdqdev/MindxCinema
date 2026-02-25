import { getCurrentUser, SignOut } from "../../js/services.js";

// Sử dụng
export const user = await getCurrentUser();

const Header = () => {
  const header = document.createElement("div");
  header.id = "header";
  header.className = "sticky-top";
  document.body.prepend(header);

  header.innerHTML = `
    <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
    crossorigin="anonymous"
  />
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
    crossorigin="anonymous"
  ></script>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
  />
    <link rel="stylesheet" href="/src/css/global.css" />
    <link rel="stylesheet" href="/src/css/auth.css"/>
  
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <a class="navbar-brand" href="/"><img class="d-inline-block align-middle" src="/src/assets/Netflix_2015_logo.png" height="40" width="150" alt="branch"/></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="d-flex align-items-center justify-content-between w-100">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">Trang chủ</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Phim mới</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Phim lẻ</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Phim bộ</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Phim chiếu rạp</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/src/pages/post.html">Post</a>
              </li>
            </ul>
            <div class="d-flex align-items-center">
              <form class="d-flex " role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Tìm kiếm phim..."
                  aria-label="Search"
                  id="search-input"
                />
                <button class="flex-shrink-0 btn btn-outline-success" type="submit">
                  Tìm kiếm
                </button>
              </form>
              <ul class="navbar-nav">
                <li class="nav-item d-flex">
                  ${
                    user
                      ? `<a href="/src/pages/setting.html" class="nav-link"><img class="rounded-circle border" width="40" height="40" src="${user.photoURL ?? "https://res.cloudinary.com/duw8obwvl/image/upload/v1769083438/avatar-trang-4_m7euox.jpg"}" alt="avatar"/></a>
                          <button id="logout-btn" class="btn btn-danger">logout</button>`
                      : '<a href="/src/pages/login.html" class="nav-link"><i class="bi bi-person-circle fs-4"></i></a>'
                  }
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>`;

  if (user) {
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        await SignOut();
      });
    }
  }

  const searchForm = header.querySelector("form");
  const searchInput = header.querySelector("#search-input");

  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `/src/pages/search.html?q=${query}`;
    }
  });
};

export { Header };
