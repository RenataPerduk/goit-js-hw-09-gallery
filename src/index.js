const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryListRef = document.querySelector('.js-gallery');
const modalImgRef = document.querySelector('.lightbox__image');
const modalRef = document.querySelector('.lightbox');
const buttonRef = document.querySelector('.lightbox__button');

const markup = galleryItems
  .map(
    ({ preview, original, description }, index) =>
      `<li class="gallery__item">
<a class="gallery__link" href=''>
<img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" data-index="${index}"/> </a> </li>`,
  )
  .join('');

galleryListRef.innerHTML = markup;

const onOpenModalClick = e => {
  e.preventDefault();

  updateAttr(e.target.dataset.source, e.target.alt, e.target.dataset.index);

  function updateAttr(src = '', alt = '', index = 0) {
    modalImgRef.src = src;
    modalImgRef.alt = alt;
    modalImgRef.dataset.index = index;

    modalRef.classList.add('is-open');
  }
};

const onKeyboardClick = e => {
  if (e.key === 'Escape') {
    modalRef.classList.remove('is-open');
  }
};

const onCloseModalClick = e => {
  if (e.target.localName !== 'img') {
    modalRef.classList.remove('is-open');

    updateAttr();
  }
};

galleryListRef.addEventListener('click', onOpenModalClick);
window.addEventListener('keyup', onKeyboardClick);
window.addEventListener('click', onCloseModalClick);

window.addEventListener('keydown', e => {
  if (e.code === 'ArrowLeft') {
    onArrowLeft();
  }
  if (e.code === 'ArrowRight') {
    onArrowRight();
  }
});

function onArrowLeft() {
  let index = +modalImgRef.dataset.index;
  if (index === 0) {
    newSrc(galleryItems.length - 1);
    return;
  }
  newSrc(index, -1);
}
function onArrowRight() {
  let index = +modalImgRef.dataset.index;
  if (index === galleryItems.length + 1) {
    newSrc(0);
    return;
  }
  newSrc(index, 1);
}

function newSrc(index, step = 0) {
  modalImgRef.dataset.index = `${index + step}`;
  modalImgRef.src = galleryItems[index + step].original;
}