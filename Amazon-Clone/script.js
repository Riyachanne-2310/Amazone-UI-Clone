// ── 1. CART COUNTER ──────────────────────────────────────────────
let cartCount = 0;

function updateCart() {
  const badge = document.getElementById("cart-badge");
  badge.textContent = cartCount;
  badge.style.display = cartCount > 0 ? "flex" : "none";
}

// ── 2. TOAST NOTIFICATION ────────────────────────────────────────
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// ── 3. ADD TO CART on each box ───────────────────────────────────
document.querySelectorAll(".box").forEach((box) => {
  const title = box.querySelector("h2").textContent;

  const btn = document.createElement("button");
  btn.textContent = "Add to Cart";
  btn.classList.add("add-to-cart-btn");

  btn.addEventListener("click", () => {
    cartCount++;
    updateCart();
    showToast(`"${title}" added to cart!`);
  });

  box.querySelector(".box-content").appendChild(btn);
});

// ── 4. WISHLIST HEART TOGGLE ─────────────────────────────────────
let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

document.querySelectorAll(".box").forEach((box) => {
  const title = box.querySelector("h2").textContent;

  const heart = document.createElement("i");
  heart.classList.add("fa-heart", "wishlist-heart");
  heart.classList.add(wishlist.includes(title) ? "fa-solid" : "fa-regular");

  heart.addEventListener("click", () => {
    if (wishlist.includes(title)) {
      wishlist = wishlist.filter((t) => t !== title);
      heart.classList.replace("fa-solid", "fa-regular");
      showToast(`Removed from wishlist`);
    } else {
      wishlist.push(title);
      heart.classList.replace("fa-regular", "fa-solid");
      showToast(`Added to wishlist!`);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  });

  box.querySelector(".box-content").appendChild(heart);
});

// ── 5. SEARCH FILTER ─────────────────────────────────────────────
document.querySelector(".search-input").addEventListener("input", function () {
  const query = this.value.toLowerCase().trim();
  document.querySelectorAll(".box").forEach((box) => {
    const title = box.querySelector("h2").textContent.toLowerCase();
    box.style.display = title.includes(query) ? "block" : "none";
  });
});

// ── 6. BACK TO TOP ───────────────────────────────────────────────
document.querySelector(".foot-panel1").style.cursor = "pointer";
document.querySelector(".foot-panel1").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ── 7. STICKY NAVBAR ─────────────────────────────────────────────
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("sticky", window.scrollY > 0);
});

// ── 8. DEAL OF THE DAY COUNTDOWN ─────────────────────────────────
function startCountdown() {
  const endTime = new Date();
  endTime.setHours(23, 59, 59, 0);

  const timerEl = document.getElementById("deal-timer");

  setInterval(() => {
    const now = new Date();
    const diff = endTime - now;
    if (diff <= 0) {
      timerEl.textContent = "Deal ended!";
      return;
    }
    const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    timerEl.textContent = `Deal ends in: ${h}:${m}:${s}`;
  }, 1000);
}

startCountdown();