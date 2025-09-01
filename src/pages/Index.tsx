import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { icon: 'MessageCircle', label: 'Новый чат', active: true },
    { icon: 'Search', label: 'Поиск в чатах', active: false },
    { icon: 'Library', label: 'Библиотека', active: false },
    { icon: 'Settings', label: 'Настройки', active: false },
    { icon: 'User', label: 'Профиль', active: false }
  ];

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: inputValue,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: 'Спасибо за ваш вопрос! Я интеллектуальный помощник и готов помочь вам с любыми вопросами.',
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#1f1f1f] flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-[#171717] border-r border-gray-700">
        <div className="p-4">
          <h1 className="text-xl font-bold text-white mb-6">ChatBot</h1>
          <Button 
            className="w-full bg-[#0084ff] hover:bg-[#0066cc] text-white mb-4"
            onClick={() => setMessages([])}
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Новый чат
          </Button>
        </div>
        
        <Separator className="bg-gray-700" />
        
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant={item.active ? "secondary" : "ghost"}
                className={`w-full justify-start text-left ${
                  item.active 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon name={item.icon as any} size={16} className="mr-3" />
                {item.label}
              </Button>
            ))}
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-700">
          <div className="text-xs text-gray-500 mb-2">Последние чаты</div>
          <div className="space-y-2">
            <div className="text-sm text-gray-400 cursor-pointer hover:text-white truncate">
              Подходит ли рюкзак Kaka...
            </div>
            <div className="text-sm text-gray-400 cursor-pointer hover:text-white truncate">
              Травяной пылесос в Ленинграде
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-64 bg-[#171717] border-gray-700 p-0">
          <div className="p-4">
            <h1 className="text-xl font-bold text-white mb-6">ChatBot</h1>
            <Button 
              className="w-full bg-[#0084ff] hover:bg-[#0066cc] text-white mb-4"
              onClick={() => {
                setMessages([]);
                setIsSidebarOpen(false);
              }}
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Новый чат
            </Button>
          </div>
          
          <Separator className="bg-gray-700" />
          
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  variant={item.active ? "secondary" : "ghost"}
                  className={`w-full justify-start text-left ${
                    item.active 
                      ? 'bg-gray-700 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Icon name={item.icon as any} size={16} className="mr-3" />
                  {item.label}
                </Button>
              ))}
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#1f1f1f] border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden mr-2 text-gray-400 hover:text-white"
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <Icon name="Menu" size={20} />
                  </Button>
                </SheetTrigger>
              </Sheet>
              <h2 className="text-lg font-semibold text-white">ChatGPT 5 Thinking</h2>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Icon name="MoreHorizontal" size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-auto p-4">
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">Чем я могу помочь?</h3>
                <p className="text-gray-400 mb-8">
                  Я интеллектуальный помощник, готовый ответить на ваши вопросы и помочь решить задачи.
                </p>
                <div className="grid grid-cols-1 gap-3">
                  <Button 
                    variant="outline" 
                    className="bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 p-4 h-auto text-left justify-start"
                    onClick={() => setInputValue('Как работает машинное обучение?')}
                  >
                    <Icon name="Brain" size={16} className="mr-3 text-[#0084ff]" />
                    <span>Как работает машинное обучение?</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 p-4 h-auto text-left justify-start"
                    onClick={() => setInputValue('Помоги написать код на Python')}
                  >
                    <Icon name="Code" size={16} className="mr-3 text-[#0084ff]" />
                    <span>Помоги написать код на Python</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 p-4 h-auto text-left justify-start"
                    onClick={() => setInputValue('Объясни квантовую физику простыми словами')}
                  >
                    <Icon name="Atom" size={16} className="mr-3 text-[#0084ff]" />
                    <span>Объясни квантовую физику простыми словами</span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <Card className={`max-w-[80%] p-4 ${
                    message.sender === 'user' 
                      ? 'bg-[#0084ff] text-white' 
                      : 'bg-gray-800 border-gray-700 text-white'
                  }`}>
                    <div className="flex items-start space-x-3">
                      {message.sender === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-[#0084ff] flex items-center justify-center flex-shrink-0">
                          <Icon name="Bot" size={16} className="text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <div className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                      {message.sender === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                          <Icon name="User" size={16} className="text-white" />
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-[#1f1f1f] border-t border-gray-700 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Спросите что-нибудь..."
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 pr-12 min-h-[44px] resize-none"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8 bg-[#0084ff] hover:bg-[#0066cc] disabled:bg-gray-700"
                >
                  <Icon name="Send" size={16} />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Icon name="Mic" size={20} />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Интеллектуальный помощник может делать ошибки. Проверяйте важную информацию.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;