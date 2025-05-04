const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 5000;

// Utility function to shuffle posts
function shuffleArray(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

// ✅ Route to get 30 random posts along with user info
app.get("/api/random-posts", async (req, res) => {
    try {
        const [postsRes, usersRes] = await Promise.all([
            axios.get("https://jsonplaceholder.typicode.com/posts"),
            axios.get("https://jsonplaceholder.typicode.com/users")
        ]);

        const shuffledPosts = shuffleArray(postsRes.data).slice(0, 30);

        const combined = shuffledPosts.map(post => {
            const user = usersRes.data.find(u => u.id === post.userId);
            return { post, user };
        });

        res.json(combined);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});

// ✅ Corrected route to fetch comments by postId
app.get("/api/comments/:postId", async (req, res) => {
    try {
        const { postId } = req.params;
        const commentsRes = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        res.json(commentsRes.data);
    } catch (err) {
        console.error("Error fetching comments:", err);
        res.status(500).json({ error: "Failed to fetch comments" });
    }
});

// ✅ Fixed null-safety in search logic
app.get("/api/search-users", async (req, res) => {
    try {
        const query = req.query.q?.toLowerCase() || "";
        const usersRes = await axios.get("https://jsonplaceholder.typicode.com/users");
        const users = usersRes.data;

        const filteredUsers = users.filter(user => {
            return (
                user.name?.toLowerCase().includes(query) ||
                user.username?.toLowerCase().includes(query) ||
                user.company?.name?.toLowerCase().includes(query) ||
                user.address?.city?.toLowerCase().includes(query)
            );
        });

        res.json(filteredUsers);
    } catch (err) {
        console.error("Error searching users:", err);
        res.status(500).json({ error: "Failed to search users" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
