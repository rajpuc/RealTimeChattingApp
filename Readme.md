# ChatVerse Documentation

## Description
ChatVerse is a real-time chat application with user authentication, private messaging, and group chats, built using modern web technologies.

**Live link:** [ChatVerse](https://chatverse-nmaf.onrender.com/)  
**API Documentation:** [Postman Docs](https://documenter.getpostman.com/view/25228046/2sB2cSgP6o)

## Technologies Used
- **Frontend**: React, Tailwind CSS, react-router-dom, Zustand, react-hot-toast, dayjs, lucide-react
- **Backend**: Express, Node.js, MongoDB, express-validator, jsonwebtoken, bcrypt, cloudinary
- **Real-time Communication**: Socket.io

## Features
1. **Form Validation**: Proper validation on both frontend and backend.
2. **Authentication & Authorization**: Secure login with JWT authentication.
3. **Global State Management**: Managed efficiently using Zustand.
4. **Fully Responsive Design**: Works across all devices.
5. **Dark Mode Support**: User-friendly interface with dark mode.
6. **Real-time User Status**: Displays online/offline status of users.
7. **Protected Routes**:
   - Users cannot access protected pages without logging in.
   - API endpoints require authentication.
8. **Comprehensive Error Handling**:
   - Server-side and client-side error management.
9. **User Search**: Search functionality to find users quickly.
10. **One-on-One Chat**:
    - Real-time messaging between two users.
    - Can send one image per message.
11. **Group Chat**:
    - Create groups with a minimum of 3 users.
    - Real-time messaging via Socket.io.
    - Can send one image per message.

## Environment Variables (`.env` file setup)
```plaintext
MONGODB_URI=...
PORT=5001
JWT_SECRET=...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

NODE_ENV=development
```

## Build and Run
**To build the app:**
```sh
npm run build
```

**To start the app:**
```sh
npm start
```

