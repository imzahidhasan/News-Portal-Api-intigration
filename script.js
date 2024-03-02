const getById = (id) => {
  const element = document.getElementById(id);
  return element;
};

const getCategory = async () => {
  const URL = "https://openapi.programming-hero.com/api/news/categories";
  const res = await fetch(URL);
  const {
    data: { news_category },
  } = await res.json();
  news_category.forEach((category) => {
    const btn = document.createElement("button");
    btn.classList = "btn btn-ghost text-xl";
    btn.innerText = `${category.category_name}`;
    getById("categoryBtnContainer").appendChild(btn);
    btn.addEventListener("click", async () => {
      loadingScreen(true);
      const url = `https://openapi.programming-hero.com/api/news/category/${category.category_id}`;
      const res = await fetch(url);
      const { data } = await res.json();
      if (data.length === 0) {
        getById("warningDiv").classList.remove("hidden");
      } else getById("warningDiv").classList.add("hidden");
      loadingScreen(false);
      showData(data);
    });
  });
};
getCategory();

const showData = (data) => {
  getById("newsContainer").innerText = "";
  data.forEach((news) => {
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="card lg:card-side bg-base-100 shadow-xl my-2">
                <figure><img src="${news?.thumbnail_url}" alt="Album" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${news?.title}</h2>
                    <p>${news?.details.slice(0, 300)}</p>
                </div>
            </div>
            `;
    getById("newsContainer").appendChild(div);
  });
};
const getData = async () => {
  loadingScreen(true);
  const URL = `https://openapi.programming-hero.com/api/news/category/08`;
  const res = await fetch(URL);
  const { data } = await res.json();
  loadingScreen(false);
  showData(data);
};
getData();

function loadingScreen(isDataLoaded) {
  if (isDataLoaded) {
    getById("loadingScreen").classList.remove("hidden");
  } else {
    getById("loadingScreen").classList.add("hidden");
  }
}
