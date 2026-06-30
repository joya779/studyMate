import { useState, useRef, useEffect } from 'react'
import { Button, Input, SafeArea } from 'antd-mobile'
import { SendOutline } from 'antd-mobile-icons'
import './App.css'

type MessageType = 'ai' | 'user'

interface Message {
  type: MessageType
  content: string
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { type: 'ai', content: '你好！我是StudyMate，有什么可以帮助你的吗？' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = { type: 'user', content: inputValue.trim() }
    setMessages(prev => [...prev, userMessage])
    const content = inputValue.trim()
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      })

      let aiMessage: Message
      if (response.ok) {
        const data = await response.json()
        aiMessage = { type: 'ai', content: data.message || '我收到了你的消息' }
      } else {
        aiMessage = { type: 'ai', content: '抱歉，暂时无法连接到服务器' }
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      const aiMessage: Message = { type: 'ai', content: '抱歉，发生了网络错误' }
      setMessages(prev => [...prev, aiMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <div className="app-container">
      <SafeArea position="top" />
      <header className="header">
        <h1 className="title">StudyMate</h1>
      </header>

      <main className="message-list">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-item ${msg.type === 'user' ? 'user-message' : 'ai-message'}`}
          >
            <div className="bubble">{msg.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message-item ai-message">
            <div className="bubble">正在回复...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="input-area">
        <Input
          className="message-input"
          placeholder="输入消息..."
          value={inputValue}
          onChange={val => setInputValue(val)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <Button
          className="send-button"
          color="primary"
          fill="solid"
          onClick={sendMessage}
          disabled={!inputValue.trim() || isLoading}
        >
          <SendOutline />
        </Button>
      </footer>
      <SafeArea position="bottom" />
    </div>
  )
}

export default App
