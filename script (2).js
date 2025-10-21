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
