def printProducts(products, prices, quantity):
    for i in range(len(products)):
        print(f"Product: {products[i]} | Price: {prices[i]} | Quantity: {quantity[i]}")


def calculateGiftAndShipping(wrapped,quantity):
    shipping = 0
    giftWrap = 0
    totalQuantity = sum(quantity)

    if wrapped:
        giftWrap = totalQuantity
    
    packages =  totalQuantity / 10
    shipping = packages * 5

    return {"shipping": shipping, "giftWrap": giftWrap}


def amountAfterDiscount(products, prices, quantity):
    totalQuantity = sum(quantity)
    totalPrice = sum(prices)

    bulkFive = 0
    bulkTen = 0
    flatTen = 0
    tieredFifty = 0

    for q,p in zip(quantity, prices):
        if q > 10:
            bulkFive += p * 0.05
        if totalQuantity > 30 and q > 15:
            tieredFifty += p * 0.5;
    
    if totalQuantity > 20:
        bulkTen = totalPrice * 0.1

    if totalPrice > 200:
        flatTen = 10

    maxDiscount = max(bulkFive, bulkTen, flatTen, tieredFifty)

    if maxDiscount == bulkFive:
        return {"name": "bulk_5_discount", "price": totalPrice-bulkFive}
    
    if maxDiscount == bulkTen:
        return {"name": "bulk_10_discount", "price": totalPrice-bulkTen}
    
    if maxDiscount == flatTen:
        return {"name": "flat_10_discount", "price": totalPrice-flatTen}
    
    if maxDiscount == tieredFifty:
        return {"name": "tiered_50_discount", "price": totalPrice-tieredFifty}

    return {"name": "no_discount", "price": totalPrice}


def userOutput(products, prices, quantity, wrapped):
    printProducts(products, prices, quantity)
    print(f"Subtotal: {sum(prices)}")
    discount = amountAfterDiscount(products, prices, quantity)
    print(f"Cost after applying {discount['name']}: {discount['price']}")
    shippingAndGift = calculateGiftAndShipping(wrapped,quantity)
    print(f"Shipping Fee: {shippingAndGift['shipping']} and Gift Wrap Fee: {shippingAndGift['giftWrap']}")
    total = discount['price'] + shippingAndGift['shipping'] + shippingAndGift['giftWrap']
    print(f"Total: {total}")


def userInput(n):
    products = []
    prices = []
    quantity = []

    for i in range(n):
        inp = input(f"Enter product {i+1} name: ")
        products.append(inp)

        inp = int(input(f"Enter product {i+1} price: "))
        prices.append(inp)

        inp = int(input(f"Enter product {i+1} quantity: "))
        quantity.append(inp)

    wrapped = input("Do you want gift wrap? (y/n): ").lower() == "y"
    userOutput(products, prices, quantity, wrapped)

n = int(input("Enter number of products: "))
userInput(n)