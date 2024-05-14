import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [reposData, setReposData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch user data from GitHub
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${username}`);
      if (!response.ok) throw new Error('User not found');
      const data = await response.json();
      setUserData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setUserData(null);
      setReposData(null);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch repository data from GitHub
  const fetchReposData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${username}/repos`);
      if (!response.ok) throw new Error('Repositories not found');
      const data = await response.json();
      console.log("Repository data:", data); // Debug to check the structure

      const reposWithCommitMessages = await Promise.all(data.map(async repo => {
        const commitsResponse = await fetch(repo.commits_url.replace('{/sha}', ''));
        const commitsData = await commitsResponse.json();
        return {
          ...repo,
          lastFiveCommits: commitsData.slice(0, 5).map(commit => 
            commit.commit ? commit.commit.message : 'No commit message'
          )
        };
      }));

      setReposData(reposWithCommitMessages);
      setError(null);
    } catch (err) {
      setError(err.message);
      setReposData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <button onClick={fetchUserData}>Get User Data</button>
      <button onClick={fetchReposData}>Get Repository Data</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {userData && (
        <div className="user-data">
          <img
            src={userData.avatar_url}
            alt={`${userData.login}'s avatar`}
            style={{ width: '100px', borderRadius: '50%' }}
          />
          <h2>{userData.name}</h2>
          <p>{userData.bio}</p>
        </div>
      )}
      {reposData && (
        <div className="repos-data">
          {reposData.map((repo, index) => (
            <div key={index} className="repo">
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
              <p>Last Updated: {new Date(repo.updated_at).toLocaleDateString()}</p>
              <p>Commits:</p>
              <ul>
                {repo.lastFiveCommits.map((commit, idx) => (
                  <li key={idx}>{commit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
