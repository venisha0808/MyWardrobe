function addFavorite(button) {
    let card = button.parentElement;
    let name = card.querySelector("h3").innerText;

    button.innerHTML = "♥ Favorited";
    card.classList.add("favorite");

    let clothes = JSON.parse(localStorage.getItem("clothes")) || [];

    clothes.forEach(function(clothing) {
        if (clothing.name === name) {
            clothing.favorite = true;
        }
    });

    localStorage.setItem("clothes", JSON.stringify(clothes));
}
function addClothing() {
    let name = document.getElementById("clothingName").value;
    let category = document.getElementById("clothingCategory").value;

    if (name === "" || category === "") {
        alert("Please fill in both fields.");
        return;
    }

    let clothes = JSON.parse(localStorage.getItem("clothes")) || [];

    let clothing = {
    name: name,
    category: category,
    favorite: false
};

    clothes.push(clothing);

    localStorage.setItem("clothes", JSON.stringify(clothes));

    createClothingCard(clothing);

    document.getElementById("clothingName").value = "";
    document.getElementById("clothingCategory").value = "";
}
function getClothingImage(name, category) {
    name = name.toLowerCase();
    category = category.toLowerCase();

    if (name.includes("dress")) {
        if (name.includes("purple")) {
            return "https://images.unsplash.com/photo-1651047557884-49a4eb205f1a";
        }

        return "https://images.unsplash.com/photo-1595777457583-95e059d581b8";
    }

    if (name.includes("jeans") || name.includes("pants")) {
        return "https://images.unsplash.com/photo-1542272604-787c3835535d";
    }

    if (name.includes("shirt") || name.includes("t-shirt") || name.includes("top")) {
        return "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab";
    }

    if (category.includes("party")) {
        return "https://images.unsplash.com/photo-1595777457583-95e059d581b8";
    }

    if (category.includes("formal")) {
        return "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab";
    }

    return "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab";
}
function createClothingCard(clothing) {
    let container = document.getElementById("clothesContainer");

    let newCard = document.createElement("div");
newCard.className = "clothing-card";

if (clothing.favorite) {
    newCard.classList.add("favorite");
}
    newCard.innerHTML = `
        <img class="clothing-image" src="${getClothingImage(clothing.name, clothing.category)}" alt="${clothing.name}">
        <h3>${clothing.name}</h3>
        <p>${clothing.category}</p>
        <button onclick="addFavorite(this)">
    ${clothing.favorite ? "♥ Favorited" : "♡ Favorite"}
</button>
        <button onclick="deleteClothing(this)">🗑️ Delete</button>
    `;

    container.prepend(newCard);
}

function loadClothes() {
    let clothes = JSON.parse(localStorage.getItem("clothes")) || [];

    clothes.forEach(function(clothing) {
        createClothingCard(clothing);
    });
}

function deleteClothing(button) {
    let card = button.parentElement;
    let name = card.querySelector("h3").innerText;

    card.remove();

    let clothes = JSON.parse(localStorage.getItem("clothes")) || [];

    clothes = clothes.filter(function(clothing) {
        return clothing.name !== name;
    });

    localStorage.setItem("clothes", JSON.stringify(clothes));
}

loadClothes();
function filterClothes(category) {
    let cards = document.querySelectorAll(".clothing-card");

    cards.forEach(function(card) {
        let cardCategory = card.querySelector("p").innerText;

        if (category === "All" || cardCategory === category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}
function showFavorites() {
    let cards = document.querySelectorAll(".clothing-card");

    cards.forEach(function(card) {
        if (card.classList.contains("favorite")) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}