import { bookData } from './books.js';

function displayBooks() {
  let booksHtml = '';

  bookData.forEach((book) => {
    booksHtml += `
      <div class="book-grid" data-category="${book.dataCategory}">
      <img src="${book.image}" alt="Book Cover class="description">
      <h3>${book.title}</h3>
      <p class="author">${book.author}</p>
      <p class="price">&#8377; ${book.price}</p>
      <button>Buy Now</button>
      <button class="wishlist" data-title="${book.title}" data-author="${book.author}" data-image="${book.image}" data-price="${book.price}"
      data-category="${book.dataCategory}">Future-Reads</button>
      <button class="intro"  data-title="${book.title}" data-author="${book.author}" data-description="${book.dataDescription}">Short Intro</button>
      </div>
      `;
  });

  let container = document.querySelector('.container');
  container.innerHTML = booksHtml;

  let booksList = document.querySelectorAll('.wishlist');
  booksList.forEach((button) => {
    button.addEventListener('click', () => {
      const { title, author, image, price, category } = button.dataset;

      let futureReads = JSON.parse(localStorage.getItem('futureReads')) || [];

      const alreadyInWishlist = futureReads.some(
        (bookItem) => bookItem.title === title
      );

      if (alreadyInWishlist) {
        alert(`${title} is already in Future Reads!`);
      } else {
        futureReads.push({
          title,
          author,
          image,
          price: Number(price),
          category,
        });

        localStorage.setItem('futureReads', JSON.stringify(futureReads));
        alert(`${title} added to Future Reads!`);
        updateCount();
      }
    });
  });
}

function updateCount() {
  let mainCount = document.querySelector('.book-count');
  let futureReads = JSON.parse(localStorage.getItem('futureReads')) || [];
  mainCount.textContent = futureReads.length;
}

function showPopup(triggerSelector, overlaySelector, boxSelector) {
  let overlay = document.querySelector(overlaySelector);
  let box = document.querySelector(boxSelector);
  let title = box.querySelector('h3');
  let author = box.querySelector('h4');
  let para = box.querySelector('p');
  let closeBtn = box.querySelector('.close');

  document.querySelectorAll(triggerSelector).forEach((item) => {
    item.addEventListener('click', () => {
      title.textContent = item.getAttribute('data-title') || '';

      if (author) {
        author.textContent = item.getAttribute('data-author') || '';
      }

      para.textContent = item.getAttribute('data-description') || '';

      overlay.style.display = 'flex';
      box.style.display = 'block';
    });
  });

  closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    box.style.display = 'none';
  });
}

function sortBooks() {
  let bookinfo = document.querySelectorAll('.book-grid');
  let sort = document.querySelectorAll('.sort button');

  sort.forEach((button) => {
    button.addEventListener('click', function () {
      let selectedCategory = this.getAttribute('data-category');

      bookinfo.forEach((book) => {
        let bookCategory = book.getAttribute('data-category');

        if (selectedCategory == 'all' || bookCategory == selectedCategory) {
          book.style.display = 'block';
        } else {
          book.style.display = 'none';
        }
      });
    });
  });
}

function searchBooks() {
  let input = document.querySelector('.search-bar').value.toLowerCase();
  let books = document.querySelectorAll('.book-grid');
  let noResults = document.getElementById('noResults');

  let found = false;

  books.forEach((book) => {
    let title = book.querySelector('h3').textContent.toLowerCase();
    let author = book.querySelector('.author').textContent.toLowerCase();

    if (title.includes(input) || author.includes(input)) {
      book.style.display = 'block';
      found = true;
    } else {
      book.style.display = 'none';
    }
  });
  noResults.classList.toggle('hidden', found);
}

let searchBar = document.querySelector('.search-bar');

document.addEventListener('DOMContentLoaded', () => {
  displayBooks();
  showPopup('.intro', '.popup-overlay', '.popup-box');
  showPopup('.info', '.pop-overlay', '.pop-box');
  sortBooks();
  searchBar.addEventListener('input', searchBooks);
  searchBooks();
  updateCount();
});
