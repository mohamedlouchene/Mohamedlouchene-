document.getElementById("send").addEventListener("click", async () => {
  const input = document.getElementById("user-input").value.trim();
  if (!input) return;

  const chat = document.getElementById("chat");
  chat.innerHTML += `<div><strong>أنت:</strong> ${input}</div>`;
  document.getElementById("user-input").value = "جارٍ التفكير...";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    if (data.result) {
      chat.innerHTML += `<div><strong>محمد لوشان Ai:</strong> ${data.result}</div>`;
    } else {
      chat.innerHTML += `<div><strong>حدث خطأ:</strong> لم أتمكن من توليد إجابة.</div>`;
    }
  } catch (e) {
    chat.innerHTML += `<div><strong>خطأ في الاتصال بالخادم</strong></div>`;
  }

  document.getElementById("user-input").value = "";
});
