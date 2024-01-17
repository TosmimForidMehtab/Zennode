import readline from "readline-sync";
function printProduct(products, prices, quantity) {
    for (let i = 0; i < products.length; i++) {
        console.log(
            `Product: ${products[i]} | Price: ${prices[i]} | Quantity: ${quantity[i]}`
        );
    }
}

function calculateGiftAndShipping(wrapped, quantity) {
    let shipping = 0,
        giftWrap = 0;
    let totalQuantity = calculateTotalQuantity(quantity);
    if (wrapped) {
        giftWrap = totalQuantity;
    }
    let packages = totalQuantity / 10;
    shipping = packages * 5;
    return { shipping, giftWrap };
}

function calculateTotalPrice(prices) {
    return prices.reduce((a, b) => a + b, 0);
}

function calculateTotalQuantity(quantity) {
    return quantity.reduce((a, b) => a + b, 0);
}

function amountAfterDiscount(products, prices, quantity) {
    const totalQuantity = calculateTotalQuantity(quantity);
    const totalPrice = calculateTotalPrice(prices);
    let bulkfive = 0;
    let bulkten = 0;
    let tieredfifty = 0;
    let flatten = 0;

    quantity.map((q, i) => {
        if (q > 10) {
            bulkfive += prices[i] * 0.05;
        }
        if (totalQuantity > 30 && q > 15) {
            tieredfifty += prices[i] * 0.5;
        }
    });

    if (totalQuantity > 20) {
        bulkten = totalPrice * 0.1;
    }

    if (totalPrice > 200) {
        flatten = 10;
    }

    if (bulkfive > bulkten && bulkfive > flatten && bulkfive > tieredfifty) {
        return { name: "bulk_5_discount", price: totalPrice - bulkfive };
    } else if (
        bulkten > bulkfive &&
        bulkten > flatten &&
        bulkten > tieredfifty
    ) {
        return { name: "bulk_10_discount", price: totalPrice - bulkten };
    } else if (
        flatten > bulkfive &&
        flatten > bulkten &&
        flatten > tieredfifty
    ) {
        return { name: "flat_10_discount", price: totalPrice - flatten };
    } else if (
        tieredfifty > bulkfive &&
        tieredfifty > bulkten &&
        tieredfifty > flatten
    ) {
        return { name: "tiered_50_discount", price: totalPrice - tieredfifty };
    }
    return { name: "no_discount", price: totalPrice };
}

function userOutput(products, prices, quantity, wrapped) {
    printProduct(products, prices, quantity);
    console.log(`Subtotal: ${calculateTotalPrice(prices)}`);
    const { name, price } = amountAfterDiscount(products, prices, quantity);
    console.log(`Cost after applying ${name} is ${price}`);
    const { shipping, giftWrap } = calculateGiftAndShipping(wrapped, quantity);
    console.log(`Shipping Fee: ${shipping} and Gift Wrap Fee: ${giftWrap}`);
    console.log(`Total: ${price + shipping + giftWrap}`);
}

function userInput(n) {
    let products = [];
    let prices = [];
    let quantity = [];

    for (let i = 0; i < n; i++) {
        // Take product name as input
        let inp = readline.question(`Enter product ${i + 1} name: `);
        products.push(inp);

        // Take product price as input
        inp = readline.questionInt(`Enter product ${i + 1} price: `);
        prices.push(inp);

        // Take product quantity as input
        inp = readline.questionInt(`Enter product ${i + 1} quantity: `);
        quantity.push(inp);
    }
    let wrapped = readline.keyInYN("Do you want to wrap as gift? (y/n): ");
    userOutput(products, prices, quantity, wrapped);
}

let n = readline.questionInt("Enter a number of products: ");
userInput(n);
