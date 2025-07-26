import { useState, useRef, useEffect } from "react";

type Message = {
  text: string;
  sender: "user" | "bot";
  url?: string;
};

const ChatWidget = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setVisible(!visible);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://primary-production-782d.up.railway.app/webhook/chatbot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        }
      );

      const json = await response.json();
      console.log("Response from chatbot:", json);
      // Expecting response like:
      // [
      //   {
      //     "output": {
      //       "response": "Hello! How can I assist you today?",
      //       "url": ""
      //     }
      //   }
      // ]

      const output = json.output;

      console.log("Parsed output:", output);
      if (!output?.response) {
        throw new Error("Invalid response structure");
      }

      const botMessage: Message = {
        text: output.response,
        sender: "bot",
        url: output.url || undefined,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          text: "Terjadi kesalahan jaringan atau format data salah.",
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Bubble Button */}
      <button
        onClick={toggleChat}
        className="bg-green-600 text-white rounded-full p-4 shadow-md hover:bg-green-700 transition"
      >
        💬
      </button>

      {visible && (
        <div className="bg-white shadow-lg border border-gray-200 rounded-xl w-80 h-96 mt-2 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 text-black">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`text-sm p-2 rounded-md max-w-[70%] ${
                  msg.sender === "user"
                    ? "bg-green-100 text-right ml-auto"
                    : "bg-gray-100 text-left mr-auto"
                }`}
              >
                <span className="text-black">{msg.text}</span>
                {msg.url && (
                  <div className="mt-1">
                    <a
                      href={msg.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 underline text-xs"
                    >
                      Kunjungi tautan
                    </a>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t px-3 py-2">
            <input
              type="text"
              placeholder="Tulis pesan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-green-500 text-black"
            />
            {loading && (
              <p className="text-xs mt-1 text-black">
                Mengetik...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
