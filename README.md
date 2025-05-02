# MERN Booking App

A simple MERN stack-based booking application where users can manage their profile, create, edit, and view rental places, as well as make bookings. This app includes user authentication, a responsive layout, and an easy-to-navigate interface.

## Features

- **User Authentication**:

  - Login and Register system to allow users to sign up, log in, and manage their account.

- **Homepage (Guest View)**:

  - View available places that users have listed for rent.

- **Place Details**:

  - View detailed information about a place on the show page.

- **Account Management**:

  - Profile page where users can manage their account info.
  - Bookings page that shows a list of the user's bookings with options to edit or delete bookings.

- **Accommodation Management**:

  - A page for managing the places the user has listed, including options to add, edit, or delete places.

- **Booking System**:

  - Users can book available places, and bookings are managed within the app.

- **Responsive Design**:

  - Fully responsive UI to ensure a seamless experience on mobile and desktop.

- **Image Slideshow**:

  - Uses Swiper for a smooth, responsive image carousel.

- **Logout**:

  - Users can log out of their account.

## Technologies Used

### Frontend:

- **React**: The core library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for building custom designs.
- **Shadcn/UI**: A design system used to create UI components with a consistent look and feel.
- **Zod**: Schema validation library used with React Hook Form for handling form validations.
- **React Query**: For data fetching and state management.
- **Lucide React**: For implementing icons in the UI.
- **React-Hook-Toast**: For showing toast notifications.
- **Redux Toolkit**: For managing global application state.
- **Swiper**: To display images in a smooth carousel.
- **React Router DOM**: For routing and navigation within the app.
- **Axios**: For making HTTP requests to the backend.
- **React Spinners**: For showing loading indicators.

### Backend:

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing user and place data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Passport.js**: Authentication middleware for handling user logins.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Bcrypt**: For securely hashing user passwords.
- **Zod**: Used for schema validation on the backend.

## Folder Structure

### Frontend:

```
src/
├── components/          # Shared components like buttons, inputs, etc.
├── features/            # Feature-based architecture for different sections (e.g., home, account)
│   ├── auth/
│   ├── home/
│   ├── account/
│   └── not-found/
├── layouts/             # Layout components like MainLayout and AccountLayout
├── constants/           # Constants like route paths
├── services/            # Services for API calls
├── styles/              # Global styles and Tailwind config
└── App.tsx              # Main entry point for routing
```

### Backend:

```
backend/
├── node_modules/
├── src/
│   ├── config/
│   ├── middlewares/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── strategies/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.types.ts
│   │   │   └── auth.validations.ts
│   │   ├── booking/
│   │   │   ├── booking.controller.ts
│   │   │   ├── booking.routes.ts
│   │   │   ├── booking.service.ts
│   │   │   ├── booking.types.ts
│   │   │   └── booking.validation.ts
│   │   ├── places/
│   │   │   ├── place.controller.ts
│   │   │   ├── place.model.ts
│   │   │   ├── place.routes.ts
│   │   │   ├── place.service.ts
│   │   │   ├── place.types.ts
│   │   │   └── place.validations.ts
│   │   └── user/
│   │       ├── user.model.ts
│   │       └── user.service.ts
│   ├── routes/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
├── .env
```

## Installation & Setup

### Frontend

1. Clone the repository:

   ```bash
   git clone https://github.com/Bilalben23/booking-app.git
   cd mern-booking-app/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`.

### Backend

1. Clone the repository:

   ```bash
   git clone https://github.com/Bilalben23/booking-app.git
   cd booking-app/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (create a `.env` file in the root directory and define the necessary variables):

   - `PORT`: Port to run the server on (default: 5000)
   - `MONGO_URI`: MongoDB connection string
   - `JWT_SECRET`: Secret key for signing JWT tokens

4. Run the development server:

   ```bash
   npm run dev
   ```

   The backend will be available at `http://localhost:5000`.

## Running Both Servers

For development purposes, you can run both the frontend and backend servers concurrently. You can use tools like `concurrently` to run both servers in one terminal.

```bash
npm install concurrently --save-dev
```

In your `package.json` scripts, add:

```json
"dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
"dev:frontend": "cd frontend && npm run dev",
"dev:backend": "cd backend && npm run dev"
```

Now, run the following command:

```bash
npm run dev
```

Both the frontend and backend will run simultaneously.

## Routes

### Frontend Routes

- **`/`**: Home page (public)
- **`/account`**: Account dashboard (protected)
- **`/account/bookings`**: User bookings (protected)
- **`/account/places`**: User's listed places (protected)
- **`/account/places/new`**: Create a new place (protected)
- **`/places/show/:placeId`**: Show details of a place
- **`/places/edit/:placeId`**: Edit a place (protected)
- **`/callback`**: OAuth callback (public)

### Backend Routes

- **`POST /api/auth/register`**: Register a new user
- **`POST /api/auth/login`**: Log in a user
- **`POST /api/auth/logout`**: Log out a user
- **`GET /api/places`**: Get all available places
- **`GET /api/places/:placeId`**: Get details of a place
- **`POST /api/places`**: Create a new place (protected)
- **`PUT /api/places/:placeId`**: Edit a place (protected)
- **`DELETE /api/places/:placeId`**: Delete a place (protected)
- **`POST /api/bookings`**: Book a place (protected)
- **`GET /api/bookings`**: Get all bookings for the logged-in user (protected)
- **`DELETE /api/bookings/:bookingId`**: Delete a booking (protected)

## Contributing

Feel free to fork this project and make contributions. If you find any bugs or have suggestions for improvements, please open an issue or create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
