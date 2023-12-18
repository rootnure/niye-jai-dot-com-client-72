# NiyeJai Dot Com (Client Side)

- Parcel Management App (**an online platform where people
  can Book Parcel To Deliver, Admin Can Assign Delivery Person, and Delivery Person
  Delivers the Parcel**) using the MERN stack.

## Live Link: [Click Here](https://niye-jai.web.app/)

## Server Side Code: [Click Here](https://github.com/rootnure/niye-jai-dot-com-server-72)

## Features

- React Confetti Explosion Package to celebrate successful payment
- Authorization & Authentication added using firebase and jwt
- Routes added and protected based on role (used conditional rendering based on role)
- User can add, edit, cancel booking and pay for that booking
- Delivery Men can mark delivered or cancel booking (Confirmation Notification will show before that using Sweet Alert)
- Admin can make a user delivery men or admin, assign delivery men and view all bookings, rider and users
- JWT used with LocalStorage for authentication
- [IMGBB](https://imgbb.com/) used to upload and store images

## Technologies Used (Packages / Libraries)

### Main

- [React with Vite](https://vitejs.dev/guide/)
- [React Router DOM](https://reactrouter.com/en/main)

### Design

- [TailwindCSS](https://tailwindcss.com/)
- [daisyUI](https://daisyui.com/)

### Authentication

- [firebase](https://console.firebase.google.com/)
- [jsonwebtoken (jwt)](https://www.npmjs.com/package/jsonwebtoken)

### Fetching / api handling

- [TanStack Query](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/)

### Handle Meta Data

- [react-helmet-async](https://www.npmjs.com/package/react-helmet-async)

### Alert and Notify

- [sweetalert2](https://sweetalert2.github.io/)
- [react-toastify](https://www.npmjs.com/package/react-toastify)

### Animation

- [aos](https://www.npmjs.com/package/aos)
- [swiper](https://swiperjs.com/demos)
- [react-countup](https://www.npmjs.com/package/react-countup)
- [react-confetti](https://www.npmjs.com/package/react-confetti)

### Form Handler

- [React Hook Form](https://react-hook-form.com/)

### Time Management

- [Moment](https://momentjs.com/)

### Icons and Symbols

- [react-icons](https://www.npmjs.com/package/react-icons)

### Prop Validation

- [prop-types](https://www.npmjs.com/package/prop-types)

### Payment Method

- [Stripe](https://stripe.com/)

### Other

- [react-rating](https://www.npmjs.com/package/react-rating)

## Run Project Locally

- Clone This Project: `git clone https://github.com/rootnure/niye-jai-dot-com-client-72.git`
- Change Directory: `cd niye-jai-dot-com-client-72`
- Install Packages: `npm install`
- Run Project: `npm run dev`
- **_Note:_** Don&apos;t forgot to add `.env.local` file to the project root folder with proper credentials [follow the ```demo.env``` file]
- **_Note2:_** Follow Server Side [README.md](https://github.com/rootnure/niye-jai-dot-com-server-72/blob/main/README.md) file too if needed

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
