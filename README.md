# PageTurn
Pageturn: Your go-to destination for discovering, sharing, and discussing books. Explore diverse genres, and read reviews. Dive into a world of literature and ignite your passion for reading with Pageturn.

## Screenshots

| | |
|:-------------------------:|:-------------------------:|
| ![Landing / Home](07-Screenshots/image%20(18).png) | ![Book catalog](07-Screenshots/image%20(19).png) |
| *Landing / Home* | *Book catalog* |
| ![Book details](07-Screenshots/image%20(20).png) | ![Reviews & interactions](07-Screenshots/image%20(21).png) |
| *Book details* | *Reviews & interactions* |
| ![User experience](07-Screenshots/image%20(22).png) | ![Additional feature](07-Screenshots/image%20(23).png) |
| *User experience* | *Additional feature* |

---

# PAGETURN Capstone Project Checklist

## 1. Design
- [✅] Define the basic functionality and features of the application.
- [✅] Sketch or wireframe user interface layout.
- [✅] Plan database schema based on application requirements.

## 2. Backend Development
- [✅] Set up Node.js and Express.js for the backend server.
- [✅] Create and configure MongoDB for the database.
- [✅] Develop API endpoints for user authentication (e.g., registration, login) using JWT.
- [✅] Implement CRUD operations for managing users and books.
- [✅] Develop API endpoints for handling reviews, likes, comments, and search functionality.
- [✅] Implement error handling and validation for API requests.

## 3. Frontend Development
- [✅] Set up Angular for the frontend application.
- [✅] Design and develop user interfaces using Angular components, templates, and styles.
- [✅] Implement user authentication forms (e.g., registration form, login form).
- [✅] Create components for displaying user profiles, book details, reviews, and search results.
- [✅] Handle user interactions and navigation between pages/routes.

## 4. Integration
- [✅] Integrate frontend with backend API endpoints.
- [✅] Implement HTTP requests (e.g., GET, POST, PUT, DELETE) to communicate with the backend.
- [✅] Test API integration using tools like Postman or Insomnia.

## 5. Deployment
- [ ] Prepare the application for deployment to a hosting platform (e.g., Heroku, Firebase).
- [ ] Set up deployment pipelines for automatic deployment from version control (e.g., GitHub, GitLab).
- [ ] Deploy both backend and frontend applications to the hosting platform.

## 6. Learning and Improvement
- [ ] Continuously learn and explore new concepts, techniques, and best practices in MEAN stack development.
- [ ] Seek feedback from peers or mentors to improve code quality and project structure.
- [ ] Reflect on the development process and identify areas for improvement in future projects.



# Pageturn Backend API Checklist

## Authentication Endpoints:
- [✅] Register User: `POST /api/auth/register`
- [✅] Login User: `POST /api/auth/login`
- [✅] Logout User

## User Management Endpoints:
- [✅] Get User Profile: `GET /api/users/me`
- [✅] Update User Profile: `PUT /api/users/me`   			 
- [✅] Get User by Username: `GET /api/users/:username`  
- [✅] Delete User: `DELETE /api/users/me`    	
- [✅] Get all Users: `GET /api/users`		 
- [✅] Add Book to Currently Reading: `POST /api/users/:userId/currently-reading`
- [✅] Add Book to Want to Read: `POST /api/users/:userId/want-to-read`
- [✅] Add Book to Read: `POST /api/users/:userId/read`

## Book Management Endpoints:
- [✅] Get All Books: `GET /api/books`
- [✅] Get Book by ID: `GET /api/books/:id`
- [✅] Search Books: `GET /api/books/search` 			 	
- [✅] Add Book: `POST /api/books`				
- [✅] Update Book: `PUT /api/books/:id`
- [✅] Delete Book: `DELETE /api/books/:id` 			 
 
## Review Management Endpoints:
- [✅] Get Reviews for Book: `GET /api/books/:id/reviews`  
- [✅] Write Review for Book: `POST /api/books/:id/reviews` 		
- [✅] Get Review by ID: `GET /api/reviews/:id` 			
- [✅] Update Review: `PUT /api/reviews/:id`       
- [✅] Delete Review: `DELETE /api/reviews/:id`    

## Interaction Endpoints:
- [✅] Like Review: `POST /api/reviews/:id/like` 				
- [✅] Unlike Review: `POST /api/reviews/:id/unlike`
- [✅] Add Comment to Review: `POST /api/reviews/:id/comments`
