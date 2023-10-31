# Conversify Chat App

Conversify is a modern and feature-rich chat application that allows users to engage in real-time conversations, create and manage chat groups, and seamlessly connect with other users. With Conversify, you can enjoy a smooth and interactive chat experience with an intuitive user interface.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Run Locally](#run-locally)
- [Dependencies](#dependencies)

## Features

Some key features of the project are :

- **User Registration and Login**
  - Users can create accounts and log in securely.
- **One-on-One Chat**
  - Start private conversations with other users.
- **Group Chats**
  - Create and manage group chats to bring multiple users together.
- **User Search**
  - Find and connect with other users by searching for their usernames.

## Screenshots

### Chat with other users

![Desktop View Screenshot](/client/public/readme/1.png)

### Realtime chat

![Desktop View Screenshot](/client/public/readme/2.gif)

### Get your own unique avatars

![Desktop View Screenshot](/client/public/readme/3.gif)

## Run Locally

To run this project locally, follow these steps:

1. Clone the repository to your local machine:

```bash
  git clone https://github.com/neerajjoshi-github/conversify.git
```

2. Go to the project directory

```bash
  cd conversify
```

3. Then go to server directory

```bash
  cd server
```

4. Install server dependencies:

```bash
  npm install
```

5. Configure Environment Variables:
   Create a `.env` file in the root directory and add your environment variables:

```bash
  MONGODB_CONNECTION_URL=
  PORT=
  JWT_SECRET=
```

6. Run the server:

```bash
 npm run dev
```

7. Then open new terminal and go to client directory

```bash
 cd client
```

8. Install client dependencies:

```bash
 npm install
```

9. Install client dependencies:

```bash
 npm install
```

10. Configure Environment Variables:
    Create a `.env.loacl` file in the root directory and add your environment variables:

```bash
  // For cloudinary api
  NEXT_PUBLIC_CLOUD_NAME=
  NEXT_PUBLIC_UPLOAD_PRESET=
  // If left empty "http://localhost:8080/api/" will be used
  NEXT_PUBLIC_SERVER_BASE_URL=
```

11. Run the client server

```bash
 npm run dev
```

12. Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the app.

# Technologies Used

Conversify is built using a combination of frontend and backend technologies:

## Frontend

- [Next.js](https://nextjs.org/) - A popular React framework for building fast and efficient web applications.
- [Socket.io](https://socket.io/) - Real-time communication for web applications.
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management library for React applications.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for designing modern web applications.
- [DiceBear](https://www.dicebear.com/) - A avatar generating library

## Backend

- [Node.js](https://nodejs.org/) - A JavaScript runtime environment for building server-side applications.
- [Express.js](https://expressjs.com/) - A popular web application framework for Node.js.
- [MongoDB](https://www.mongodb.com/) - A NoSQL database for storing application data.
- [Mongoose](https://mongoosejs.com/) - An elegant MongoDB object modeling for Node.js.
- [Socket.io](https://socket.io/) - Real-time communication for web applications.

For a full list of dependencies, refer to the `package.json` file.

## Feel free to explore the project and make any necessary modifications according to your specific use case.If thier any issue with the project please let me know.

# Happy coding! 😊
