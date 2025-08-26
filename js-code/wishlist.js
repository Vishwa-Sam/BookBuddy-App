function loadFutureReads() {
  let container = document.querySelector('.book-container');
  let count = document.querySelector('.book-count');

  let futureReads = JSON.parse(localStorage.getItem('futureReads')) || [];
  futureReads = futureReads.filter((book) => book && book.title);
  count.textContent = futureReads.length;

  if (futureReads.length === 0) {
    container.innerHTML = '<p class="empty">No books in Wishlist yet.😕</p>';
    return;
  }

  let booksHtml = '';
  futureReads.forEach((book, index) => {
    booksHtml += `
      <div class="book-grid" data-category="${book.category || ''}">
        <img src="${book.image || ''}" alt="Book Cover">
        <h3>${book.title || ''}</h3>
        <p class="author">${book.author || ''}</p>
        <p class="price">&#8377; ${book.price ?? ''}</p>
        <button>Buy Now</button>
        <button class="remove" data-index="${index}">Remove Book</button>
      </div>
    `;
  });

  container.innerHTML = booksHtml;

  let remove = document.querySelectorAll('.remove');
  remove.forEach((button) => {
    button.addEventListener('click', () => {
      let index = button.getAttribute('data-index');
      futureReads.splice(index, 1);
      localStorage.setItem('futureReads', JSON.stringify(futureReads));
      loadFutureReads();
    });
  });
}

document.addEventListener('DOMContentLoaded', loadFutureReads);
