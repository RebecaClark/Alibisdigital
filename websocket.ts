type WebSocketHandlers = {
  onOpen?: () => void;
  onMessage?: (data: any) => void;
  onClose?: () => void;
  onError?: () => void;
};

export function setupWebSocket(handlers: WebSocketHandlers) {
  // Determine the correct protocol based on the page's protocol
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const wsUrl = `${protocol}//${window.location.host}/ws`;
  
  // Create a new WebSocket
  const socket = new WebSocket(wsUrl);
  
  // Set up event handlers
  socket.onopen = () => {
    console.log("WebSocket connection established");
    if (handlers.onOpen) handlers.onOpen();
  };
  
  socket.onmessage = (event) => {
    console.log("WebSocket message received:", event.data);
    try {
      const data = JSON.parse(event.data);
      if (handlers.onMessage) handlers.onMessage(data);
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  };
  
  socket.onclose = () => {
    console.log("WebSocket connection closed");
    if (handlers.onClose) handlers.onClose();
  };
  
  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
    if (handlers.onError) handlers.onError();
  };
  
  // Return the socket and a cleanup function
  return {
    socket,
    cleanup: () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    }
  };
}
