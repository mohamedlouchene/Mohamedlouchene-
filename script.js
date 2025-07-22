
const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  appendMessage("user", userMessage);
  userInput.value = "";

  appendMessage("bot", "يتم التفكير...");

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/openai/gpt-3.5-turbo",
        messages: [{ role: "system", content: "أجب كمساعد شبابي رسمي يساعد تلاميذ البيام في الجزائر، لا تذكر أنك ذكاء اصطناعي. لا تنتج صورًا أو أكواد." },
                  { role: "user", content: userMessage }]
      })
    });
    const data = await response.json();
    const botReply = data.choices[0].message.content;
    replaceLastBotMessage(botReply);
  } catch (error) {
    replaceLastBotMessage("حدث خطأ في الاتصال، حاول لاحقًا.");
  }
});

function appendMessage(sender, message) {
  const div = document.createElement("div");
  div.className = sender;
  div.innerText = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function replaceLastBotMessage(newMessage) {
  const botMessages = document.querySelectorAll(".bot");
  if (botMessages.length > 0) {
    botMessages[botMessages.length - 1].innerText = newMessage;
  }
}
