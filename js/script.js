const inputValue = (id) => {
    const input = document.getElementById(id);
    const value = input.value;
    input.value = '';
    return value;
}

const addProduct = () => {
    const product_name = inputValue("product-name");
    const product_quantity = inputValue("product-quantity");

    if (!isNaN(product_name) || isNaN(product_quantity)) {
        console.warn("Wrong product name or quantity.")
        return;
    }

    // console.log(`product_name`, product_name, `product_quantity`, product_quantity);
    setProductInLocalStorage(product_name, product_quantity);
    displayLocalStorageProducts();
}

const getLocalStorageData = () => {
    const products = localStorage.getItem('all_products');
    const parseProducts = JSON.parse(products);
    return parseProducts;
}

const setProductInLocalStorage = (name, quantity) => {
    // console.log(name, quantity);
    let products = getLocalStorageData();

    if (!products) {
        products = {};
    }

    if (products[name]) {
        products[name] = parseInt(products[name]) + parseInt(quantity);
    }
    else {
        products[name] = quantity;
    }

    localStorage.setItem('all_products', JSON.stringify(products))
    displayLocalStorageProducts();
}

const displayLocalStorageProducts = () => {
    const products = getLocalStorageData();

    const allProductsContainer = document.getElementById('all-products');
    allProductsContainer.innerHTML = "";

    for (const product in products) {
        // console.table(product, products[product]);

        const name = product;
        const quantity = products[product];
        const div = document.createElement('div');
        div.innerHTML = `
        <span class="fs-2">${name}</span>
        <span class=" fs-2 ms-2">Quantity- ${quantity}</span>
        `;
        allProductsContainer.appendChild(div);
    }
}

displayLocalStorageProducts(); 