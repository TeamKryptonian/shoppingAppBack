# Run commands

- npm install
- npm run dev

# Routes

Running on `localhost:9000`

## Authorization Routes

- `/api/auth/signup`
- `/api/auth/signin`
- `/api/auth/signout`

---

## User and Admin Routes

- `/api/noauth/products` - anybody can see the products
- `/api/products` - products with authorization
- `/api/test/user` - user page
- `/api/test/seller` - seller dashboard
- `/api/test/admin` - admin dashboard
- `/api/seller/addProduct` - add products (only seller)
- `/api/seller/removeProduct/:id` - remove products (only seller)
- `/api/seller/updateItem/:id` - update product (only seller)
- `/api/product/:id` - product page (individual product page)
- `/api/test/user/addToCart/:id/:quantity` - add products to cart
- `/api/test/admin/deleteUser/:name` - delete users (only admin)

# Database

- Database Name : Shopping Service

# Roles

- User

  - can see products
  - add items to cart
  - remove item cart

- Seller

  - add products
  - remove products
  - update products

- Admin
  - delete user
