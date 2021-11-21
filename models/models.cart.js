
module.exports = class CartModel {
  constructor() {}
  getUserCart(cookies) {
        /**
         Retrieves list of products added to the cart by a user.

        GET /cart |

        Response

        Status: 200 OK

        [
            {
                "sku_id": 1,
                "count": 2
            },
            {
                "sku_id": 3,
                "count": 1
            },
            {
                "sku_id": 5,
                "count": 33
            },
            //...
        ]
         */

  }

  addToCart(cookies, { sku_id }) {
    /**

    Add to Cart
    Adds a product to the cart.

    POST /cart

    Body Parameters

    Parameter	Type	Description
    sku_id	int	ID for the product being added to the cart
    Response

    Status: 201 CREATED

     */

  }
}




