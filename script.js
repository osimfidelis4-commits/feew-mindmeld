
    const members = ["Fidel", "Elisha", "Ella", "Wizzy", "Maureen", "Kingsley"];

const activities = [
    "pushed a major update to the group's GitHub repository.",
    "reviewed the latest homework submission on Data Structures.",
    "led a deep-dive session on Distributed Consensus.",
    "shared an external article on the future of AI.",
    "scheduled a new meeting for 'System Design Review'.",
    "requested feedback on their recent C++ code implementation.",
    "posted a challenging interview question in the chat.",
    "updated the **Resources** section with a new book link."
];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function addLogEntry() {
    const logList = document.getElementById('activity-log');
    
    // Get a random member and activity
    const randomMember = getRandomItem(members);
    const randomActivity = getRandomItem(activities);
    
    // Create the date string (e.g., Oct 17)
    const date = new Date();
    const dateString = `[${date.toLocaleString('en-US', { month: 'short', day: 'numeric' })}]`;
    
    // Create the new list item
    const newEntry = document.createElement('li');
    newEntry.innerHTML = `${dateString} **${randomMember}** ${randomActivity}`;
    
    // Add the new entry to the top of the list (prepend)
    logList.prepend(newEntry);
    
    // Remove the oldest entry if the list gets too long (optional)
    if (logList.children.length > 8) {
        logList.removeChild(logList.lastChild);
    }
    
    console.log("New log entry generated:", newEntry.innerText);
}

// Initial script to confirm load
document.addEventListener('DOMContentLoaded', () => {
    console.log("FEEW-MINDMELD Study Hub loaded and ready for collaboration!");
});
// Function to change the background color of the body when the button is clicked
document.getElementById("changeColorButton").addEventListener("click", function() {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F4F4F4", "#FFC300"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
});
let getById = id => document.getElementById(id);

let getByClass = cls => document.getElementsByClassName(cls);

const username = getById("username"),
      email = getById("Email"),
      password = getById("Password"),
      form = getById("form"),
      errorMsg = getByClass("error"),
      successIcon = getByClass("success-icon"),
      failureIcon = getByClass("failure-icon");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    validateField(username, 0, "Username cannot be blank");
    validateField(email, 1, "Email cannot be blank");
    validateField(password, 2, "Password cannot be blank");
});

let validateField = (el, index, message) => {
    if (el.value.trim() === '') {
        errorMsg[index].innerHTML = message;
        failureIcon[index].style.opacity = "1";
        successIcon[index].style.opacity = "0";
    } else {
        errorMsg[index].innerHTML = "";
        failureIcon[index].style.opacity = "0";
        successIcon[index].style.opacity = "1";
    }
};
// server.js
// Simple Node/Express backend for handling signups and serving the static site.
// Save as server.js, run: npm init -y && npm install express cors body-parser
// Start: node server.js

const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const cors = require('cors');

const app = express();
const DATA_FILE = path.join(__dirname, 'signups.json');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (your HTML/CSS/JS)
app.use(express.static(path.join(__dirname)));

// helper to append signup
async function saveSignup(entry) {
    try {
        let list = [];
        try {
            const raw = await fs.readFile(DATA_FILE, 'utf8');
            list = JSON.parse(raw || '[]');
        } catch (err) {
            // file may not exist; start with empty array
            list = [];
        }
        list.push(entry);
        await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), 'utf8');
    } catch (err) {
        console.error('Failed saving signup:', err);
        throw err;
    }
}

// API endpoint for form submissions
app.post('/api/signup', async (req, res) => {
    try {
        const { username, Email, Password } = req.body;

        // Basic validation
        if (!username || !Email || !Password) {
            return res.status(400).json({ ok: false, message: 'Missing required fields.' });
        }
        // sanitize minimal (trim)
        const entry = {
            username: String(username).trim(),
            email: String(Email).trim(),
            password: String(Password), // for production, DO NOT store plain passwords; hash them
            createdAt: new Date().toISOString()
        };

        await saveSignup(entry);

        return res.json({ ok: true, message: 'Signup saved.' });
    } catch (err) {
        return res.status(500).json({ ok: false, message: 'Server error.' });
    }
});

// optional health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));