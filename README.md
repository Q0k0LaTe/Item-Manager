# Item Manager Application

A full-stack web application for managing inventory items with CRUD operations and real-time updates.

## Features

- Create, Read, Update, and Delete items
- Real-time search and filtering
- Sort items by name or price
- Responsive design
- Currency conversion support
- Dark mode support
- MongoDB integration
- RESTful API

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Template Engine**: EJS
- **API**: RESTful API with full CRUD operations
- **Authentication**: Express Session
- **Security**: Helmet middleware
- **Other Tools**: Axios, Morgan, Compression

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/item-manager.git
cd item-manager
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory and add your environment variables:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
SESSION_SECRET=your_session_secret
```

4. Run the application:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get single item
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
- `GET /api/currency-rates` - Get currency conversion rates

## Project Structure

```
project-directory/
├── app/
│   ├── config/
│   │   └── db.js             // MongoDB connection
│   ├── controllers/
│   │   └── itemController.js // CRUD operations
│   ├── middleware/
│   │   └── errorHandler.js   // Error handling
│   ├── models/
│   │   └── itemModel.js      // Mongoose model
│   └── routes/
│       └── itemRoutes.js     // API routes
├── public/
│   ├── css/
│   │   └── styles.css       
│   └── js/
│       └── main.js          
├── views/
│   ├── partials/
│   │   ├── header.ejs       
│   │   └── footer.ejs       
│   ├── home.ejs            
│   ├── error.ejs           
│   └── layout.ejs          
└── app.mjs                 
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
