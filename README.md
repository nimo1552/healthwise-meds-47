# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/ea2fa76b-52c1-40eb-86ac-fa2eb4ec1889

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ea2fa76b-52c1-40eb-86ac-fa2eb4ec1889) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ea2fa76b-52c1-40eb-86ac-fa2eb4ec1889) and click on Share -> Publish.

## Local Storage Usage

This application utilizes `localStorage` for client-side data persistence to simulate features that would typically rely on a backend database in a production environment. This approach is for demonstration and development convenience.

The following `localStorage` keys are used:

*   **`pharmacy-products`**:
    *   Stores an array of product objects.
    *   Each product object contains details such as `id`, `name`, `image`, `price`, `oldPrice`, `discount`, `rating`, `isPrescriptionRequired`, `description`, `category`, `isBestseller`, `stock`, and `createdAt`. (Corresponds to the `Product` interface defined in `src/contexts/ProductContext.tsx`).
*   **`nimocare-cart`**:
    *   Stores an array of cart item objects.
    *   Each cart item object includes the full `product` object (as defined above) and the `quantity` of that product in the cart. (Managed by `src/contexts/CartContext.tsx`).
*   **`nimocare-orders`**:
    *   Stores an array of completed order detail objects.
    *   Each order object includes details like `orderId`, `date`, `total`, `paymentMethod`, an array of `items` (each item being a product with quantity), `shippingAddress`, `estimatedDelivery`, `subtotal`, `shipping`, `tax`, and `discount`. (Corresponds to the `OrderDetails` interface defined in `src/pages/OrderConfirmation.tsx`).
*   **`vite-react-theme`**:
    *   Stores the user's selected theme preference for the application (e.g., "light", "dark", "system"). This is typically managed by a theme provider component.

**Note:** In a production application, sensitive data and transactional information (like products, orders, and user-specific cart data) would be managed and stored securely on a backend server and database, not solely in client-side `localStorage`.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
