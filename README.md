# GitHub API Project

This project is a full-stack web application that utilizes the GitHub API to fetch and display user and repository data. It's built with React on the frontend and Express on the backend, using security practices such as Helmet for improved HTTP security.

## Features

- **User Search**: Users can search for GitHub users by username.
- **User Details**: Displays selected user's profile picture, bio, and a summary of their repositories.
- **Repository Details**: For each repository, the app shows the last commit date, creation date, description, and the last five commits.

## Installation

To get this project running on your local machine, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jamesandrew2/Github-api-project.git
   cd github-api-project

2. **Install dependencies**
   npm install helmet
   Install server dependencies: npm install
   Install client dependencies:
   cd client
   npm install
   cd ..

3. **Verify and install missing dependencies:**
If you encounter any issues with missing modules like Helmet, ensure they are installed:
npm install helmet

4. **Running the application:**
Start the backend server:
node server.js

In a new terminal, start the React client:
cd client
npm start

## Usage

After starting the application, navigate to http://localhost:3000 in your browser to use the app. Enter a GitHub username in the search box and click on "Get User Data" and "Get Repository Data" to see the results.

## Testing

To run the tests set up for the application:
npm test
cd client 
npm test

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

MIT
