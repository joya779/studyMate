# Study Assistant Backend API

AI study assistant backend service based on FastAPI, providing intelligent conversation functionality.

## 📁 Project Structure

```
studyMate_backend/
├── main.py              # Main application file
├── requirements.txt     # Python dependencies list
├── .env.example         # Environment variables example
├── .gitignore           # Git ignore file configuration
└── README.md            # Project documentation
```

## ✨ Main Features

1. **/api/chat Endpoint** - Receive user messages and return AI responses
2. **Pydantic Data Models** - Type-safe request and response definitions
3. **Async LLM Calls** - Efficiently call LLM API using httpx.AsyncClient
4. **CORS Support** - Allow frontend cross-origin access
5. **System Prompt Configuration** - Friendly AI study assistant role setup

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your LLM API configuration:

```env
LLM_API_KEY=your_llm_api_key_here
LLM_API_URL=https://api.openai.com/v1/chat/completions
LLM_MODEL=gpt-3.5-turbo
```

### 3. Start the Service

```bash
python main.py
```

The service will start at http://localhost:8000

## 📡 API Documentation

After starting the service, visit the following URLs to view interactive API documentation:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🔌 Endpoint Details

### POST /api/chat

**Request Example:**
```json
{
  "message": "What is Python?"
}
```

**Response Example:**
```json
{
  "reply": "Python is a simple, easy-to-learn yet powerful programming language... Would you like me to give you some practice questions?"
}
```

## 🛠️ Tech Stack

- **FastAPI** - Modern high-performance web framework
- **Pydantic** - Data validation and settings management
- **httpx** - Async HTTP client
- **uvicorn** - ASGI server
