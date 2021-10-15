const catalogList = document.querySelector('.catalog-list');
const catalogBtns = document.querySelectorAll('.catalog-tabs__btn');

const normalPrice = (str) => {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const loadCatalog = (country) => {
  catalogList.innerHTML = '';

  fetch('data/data.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {

      for (item of data) {
        if (item.country == country) {
          console.log(item)
          catalogList.innerHTML += `

            <li class="catalog__item">
              <article class="product">
                <img src="${item.cover}" alt="${item.title}" class="product__image">
                <div class="product__content">
                  <span class="product__author">${item.author}</span>
                  <h3 class="product__title">${item.title}</h3>
                  <span class="product__props">${item.props}</span>
                  <div class="product__price">${normalPrice(item.price)} руб</div>
                  <button class="btn-reset btn btn--stroke product__btn">В корзину</button>
                </div>
              </article>
            </li>

          `;
        }
      }
    });
};

loadCatalog('France');

catalogBtns.forEach(el => {
  el.addEventListener('click', (e) => {
    const country = e.currentTarget.dataset.country;

    catalogBtns.forEach(el => { el.classList.remove('catalog-tabs__btn--active'); });

    e.currentTarget.classList.add('catalog-tabs__btn--active');

    loadCatalog(country);
  });
});
