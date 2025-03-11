// import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/api"; // Change to deployed backend URL

// export const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: { "Content-Type": "application/json" },
// });

// import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/api"; // Change to deployed backend URL

// export const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: { "Content-Type": "application/json" },
// });
const API_BASE_URL = "http://localhost:5000/api"; // Update with your backend URL

export async function fetchLiveEvents() {
  try {
    const response = await fetch(`${API_BASE_URL}/events`);
    if (!response.ok) throw new Error("Failed to fetch events");
    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export async function placeTrade(eventId, amount, choice) {
    try {
      const token = localStorage.getItem("token"); // Ensure user is authenticated
      const response = await fetch(`${API_BASE_URL}/trades`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId, amount, choice }),
      });
  
      if (!response.ok) throw new Error("Trade placement failed");
      return await response.json();
    } catch (error) {
      console.error("Error placing trade:", error);
      return null;
    }
  }
  

  export async function fetchAllTrades() {
    try {
      const token = localStorage.getItem("token"); // Ensure admin is authenticated
      const response = await fetch(`${API_BASE_URL}/admin/trades`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) throw new Error("Failed to fetch trades");
      return await response.json();
    } catch (error) {
      console.error("Error fetching trades:", error);
      return [];
    }
  }
  
  export async function updateTradeStatus(tradeId, status) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/admin/trades/${tradeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
  
      if (!response.ok) throw new Error("Failed to update trade status");
      return await response.json();
    } catch (error) {
      console.error("Error updating trade:", error);
      return null;
    }
  }
  