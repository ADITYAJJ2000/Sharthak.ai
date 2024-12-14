// References to DOM Elements
const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// Function to display messages in the chatbox
function displayMessage(message, sender) {
  const msgElement = document.createElement('div');
  msgElement.innerText = `${sender}: ${message}`;
  msgElement.style.padding = "10px";
  msgElement.style.margin = "5px";
  msgElement.style.borderRadius = "8px";

  if (sender === "AI") {
    msgElement.style.backgroundColor = "#e0f7fa";
    msgElement.style.textAlign = "left";
  } else {
    msgElement.style.backgroundColor = "#f1f1f1";
    msgElement.style.textAlign = "right";
  }

  chatBox.appendChild(msgElement);
  chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom
}

// Function to send user message to OpenAI API
async function sendMessage() {
  const userMessage = userInput.value.trim();

  if (userMessage) {
    // Display user's message
    displayMessage(userMessage, "You");

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_OPENAI_API_KEY'  // Replace with your OpenAI key
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userMessage }]
        })
      });

      const data = await response.json();

      const aiMessage = data.choices[0].message.content;
      displayMessage(aiMessage, "AI");

    } catch (error) {
      console.error("Failed to get response from OpenAI:", error);
      displayMessage("Error fetching response!", "AI");
    }
  }
}

// Event listener for the Send button
sendButton.addEventListener('click', sendMessage);

// Event listener to enable pressing Enter to send messages
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});
