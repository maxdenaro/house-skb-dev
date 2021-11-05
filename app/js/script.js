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
                <picture>
                <source srcset="${item.cover.mobile}" media="(max-width: 480px)">
                  <source srcset="${item.cover.mini}" media="(max-width: 700px)">
                  <source srcset="${item.cover.tablet}" media="(max-width: 768px)">
                  <img src="${item.cover.desktop}" alt="${item.title}" class="product__image">
                </picture>
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


const burger = document.querySelector('.burger');
const menu = document.querySelector('.header__nav');
const body = document.body;
const menuLinks = document.querySelectorAll('.nav__link');

burger.addEventListener('click', (e) => {
  e.currentTarget.classList.toggle('burger--active');
  menu.classList.toggle('header__nav--active');
  body.classList.toggle('stop-scroll');
});

menuLinks.forEach(el => {
  el.addEventListener('click', (e) => {
    burger.classList.remove('burger--active');
    menu.classList.remove('header__nav--active');
    body.classList.remove('stop-scroll');
  });
});
