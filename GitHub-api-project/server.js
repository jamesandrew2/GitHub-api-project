const express = require('express'); // Import Express
const axios = require('axios'); // Import Axios for making HTTP requests
const cors = require('cors');  // Import CORS
const helmet = require('helmet'); // Import Helmet for security

const app = express(); // Create an Express application
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Use Helmet to secure the app by setting various HTTP headers
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 5000; // Set the default port or use environment variable

// Route to fetch GitHub user data
app.get('/api/users/:username', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.github.com/users/${req.params.username}`);
        res.json(data);
    } catch (error) {
        res.status(error.response.status).json({ message: "Failed to fetch user data", details: error.message });
    }
});

// Route to fetch GitHub user repositories, including the last 5 commits of each repo
app.get('/api/users/:username/repos', async (req, res) => {
    try {
        const userRepos = await axios.get(`https://api.github.com/users/${req.params.username}/repos`);
        const reposData = await Promise.all(userRepos.data.map(async (repo) => {
            const commits = await axios.get(repo.commits_url.replace('{/sha}', '?per_page=5'));
            return {...repo, lastFiveCommits: commits.data.map(commit => commit.commit.message)};
        }));
        res.json(reposData);
    } catch (error) {
        res.status(error.response.status).json({ message: "Failed to fetch repository data", details: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
