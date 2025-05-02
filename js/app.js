const BASE_URL = "https://dummyjson.com/";

function hideLoading() {
  document.querySelector(".loading").style.display = "none";
}

function showSkeletons(count = 15) {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement("div");
    skeleton.className = "skeleton";
    container.appendChild(skeleton);
  }
}

function renderProductData(data) {
  const container = document.querySelector(".container");
  const fragment = document.createDocumentFragment();
  container.innerHTML = "";

  data.forEach((item) => {
    const totalReviews = item.reviews?.length || 0;
    const avgRating = totalReviews
      ? (
          item.reviews.reduce((sum, review) => sum + review.rating, 0) /
          totalReviews
        ).toFixed(1)
      : "No reviews";

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.thumbnail}" alt="${item.title}" />
      <div class="card-body">
        <h3>${item.title}</h3>
        <p><strong>Price:</strong> $${item.price}</p>
        <p><strong>Rating:</strong> ${item.rating} (${avgRating} avg)</p>
        <p><strong>Stock:</strong> ${item.stock}</p>
        <p><strong>Brand:</strong> ${item.brand}</p>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Reviews:</strong> ${totalReviews}</p>
        <a class="btn" href="#">Buy Now</a>
      </div>
    `;
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}


function fetchData(endpoint) {
  showSkeletons(); 
  fetch(`${BASE_URL}${endpoint}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error");
      }
      return res.json();
    })
    .then((data) => {
      hideLoading(); 
      renderProductData(data.products); 
    })
    .catch((err) => {
      hideLoading();
      console.log(err);
    });
}

window.addEventListener("load", () => {
  fetchData("products");
});
