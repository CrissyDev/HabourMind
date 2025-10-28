import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

if (!API_KEY) {
  console.error('REACT_APP_GEMINI_API_KEY is not set in environment variables');
  throw new Error('Gemini API key is required. Please set REACT_APP_GEMINI_API_KEY in your .env file');
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Get the Gemini model
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// System prompt for HarborMind AI
const SYSTEM_PROMPT = `You are HarborMind AI, an intelligent logistics assistant specialized in optimizing transportation routes for trucks and cargo in Kenya, particularly around Mombasa Port. 

Your expertise includes:
- Real-time traffic analysis and route optimization
- Weather condition assessment for safe transportation
- Fuel-efficient route planning
- Cargo-specific routing recommendations
- Port logistics and clearance optimization
- Road condition awareness in Kenya

IMPORTANT FORMATTING REQUIREMENTS:
- Always format your responses using proper markdown syntax
- Use headers (###, ####) for sections
- Use bullet points (*) for lists
- Use **bold** for emphasis on important information
- Use horizontal rules (---) to separate major sections
- Structure responses professionally with clear sections
- Include specific landmarks, road numbers (A109, A2, etc.), and detailed routing information
- Always provide comprehensive, well-organized responses that are easy to read and follow

Always provide practical, actionable recommendations with specific route details, estimated travel times, and fuel savings when possible.`;

// Generate trip recommendations
export async function generateTripRecommendations(tripData) {
  try {
    const { currentLocation, destination, cargoWeight, cargoType } = tripData;
    
    const prompt = `${SYSTEM_PROMPT}

Please analyze this trip request and provide optimal route recommendations:

**Cargo Details:**
- Current Location: ${currentLocation}
- Destination: ${destination}
- Cargo Weight: ${cargoWeight} tons
- Cargo Type: ${cargoType}

Please provide a comprehensive analysis formatted exactly like this structure:

### **Optimal Route Recommendation: [Current Location] to [Destination]**

**Cargo Details:**
* **Current Location:** ${currentLocation}
* **Destination:** ${destination}
* **Cargo Weight:** ${cargoWeight} tons
* **Cargo Type:** ${cargoType}

---

#### 1. Optimal Departure Time
* **Recommendation:** [Specific time range]
* **Reasoning:**
  * [Traffic analysis]
  * [Route efficiency factors]
  * [Daylight considerations]

#### 2. Best Route to Avoid Traffic and Bad Weather
* **Primary Route:** [Detailed route with road numbers]
* **Weather Assessment:** [Weather considerations for the cargo type]

#### 3. Estimated Fuel Savings
* **Estimated Savings:** [Percentage] compared to alternative routes
* **Reasoning:** [Detailed explanation of savings factors]

#### 4. Potential Delays or Warnings
* [List of potential issues and checkpoints]
* [Cargo-specific warnings]
* [Road condition alerts]

#### 5. Specific Route Details with Landmarks
**Phase 1:** [Starting location to major highway]
**Phase 2:** [Highway travel with major stops]
**Phase 3:** [Final approach to destination]

---

Provide specific Kenyan road numbers (A109, A2, etc.), landmarks, weighbridges, and detailed turn-by-turn directions.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating trip recommendations:', error);
    throw new Error('Failed to generate recommendations. Please try again.');
  }
}

// Chat with context
export class GeminiChat {
  constructor() {
    this.chatHistory = [];
    this.chat = null;
    this.initializeChat();
  }

  initializeChat() {
    this.chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [{ text: "### Welcome to HarborMind AI! 🚛\n\nHello! I'm **HarborMind AI**, your intelligent logistics assistant. I'm here to help you with:\n\n* **Route optimization** and traffic analysis\n* **Weather conditions** and safety assessments  \n* **Fuel efficiency** recommendations\n* **Port logistics** and clearance guidance\n* **Real-time insights** for Kenyan transportation\n\nI specialize in **Mombasa Port operations** and transportation throughout Kenya. How can I assist you today?" }],
        },
      ],
    });
  }

  async sendMessage(message) {
    try {
      const result = await this.chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();
      
      // Store in chat history for context
      this.chatHistory.push(
        { role: 'user', content: message },
        { role: 'assistant', content: text }
      );
      
      return text;
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw new Error('Failed to send message. Please try again.');
    }
  }

  clearChat() {
    this.chatHistory = [];
    this.initializeChat();
  }

  getChatHistory() {
    return this.chatHistory;
  }
}

// Export a singleton instance for the chat
export const geminiChat = new GeminiChat();
