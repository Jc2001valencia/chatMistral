document.getElementById('send-button').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;

    addMessage(userInput, 'user');

    const response = await fetch('http://localhost:3000/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: userInput })
    }).then(res => res.json());

    addMessage(response.generated_text, 'bot');
    document.getElementById('user-input').value = '';
});

function addMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const message = document.createElement('div');
    message.className = sender === 'user' ? 'text-right' : 'text-left';
    message.innerHTML = `<p class="inline-block bg-${sender === 'user' ? 'blue' : 'gray'}-200 p-2 rounded-lg m-2">${text}</p>`;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}
