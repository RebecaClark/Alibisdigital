import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon, User, ServerIcon } from "lucide-react";
import { setupWebSocket } from "@/lib/websocket";

type Message = {
  sender: "system" | "server" | "user";
  content: string;
  timestamp: Date;
};

export default function WebSocketChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  // Initialize WebSocket connection
  useEffect(() => {
    const { socket, cleanup } = setupWebSocket({
      onOpen: () => {
        setIsConnected(true);
        addMessage("system", "WebSocket connection established.");
      },
      onMessage: (data) => {
        if (data && data.message) {
          addMessage("server", data.message);
        }
      },
      onClose: () => {
        setIsConnected(false);
        addMessage("system", "WebSocket connection closed.");
      },
      onError: () => {
        setIsConnected(false);
        addMessage("system", "WebSocket error occurred.");
      }
    });

    socketRef.current = socket;

    return cleanup;
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (sender: Message["sender"], content: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender, content, timestamp: new Date() }
    ]);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !socketRef.current || !isConnected) return;
    
    // Send message to WebSocket server
    socketRef.current.send(JSON.stringify({ message: newMessage }));
    
    // Add message to chat
    addMessage("user", newMessage);
    
    // Clear input
    setNewMessage("");
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow rounded-lg">
      <CardHeader className="p-6 border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          Real-time Updates
        </CardTitle>
        <CardDescription className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          WebSocket-powered real-time messaging.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4 h-48 overflow-y-auto bg-gray-50 dark:bg-gray-900 rounded-md p-3 scrollbar-hide">
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className="flex gap-2">
                <div className="flex-shrink-0">
                  {msg.sender === "system" && (
                    <div className="h-5 w-5 text-gray-400">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a1 1 0 01-2 0 8 8 0 0016 0 1 1 0 01-2 0 5.986 5.986 0 00-.416 2.916A5.001 5.001 0 0010 11z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  {msg.sender === "server" && <ServerIcon className="h-5 w-5 text-green-500" />}
                  {msg.sender === "user" && <User className="h-5 w-5 text-blue-500" />}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {msg.sender.charAt(0).toUpperCase() + msg.sender.slice(1)}:
                  </span>{" "}
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <form onSubmit={sendMessage} className="flex">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={!isConnected}
            className="rounded-r-none"
          />
          <Button 
            type="submit" 
            disabled={!isConnected} 
            className="rounded-l-none"
          >
            <SendIcon className="h-5 w-5" />
          </Button>
        </form>
        <div className="mt-4">
          <div className="flex items-center">
            <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
