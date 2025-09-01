import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

type SavedChat = {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
};

type UserProfile = {
  name: string;
  email: string;
  avatar: string;
  plan: 'free' | 'pro' | 'premium';
  usage: {
    messages: number;
    limit: number;
  };
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('chat');
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('ru');
  
  const [userProfile] = useState<UserProfile>({
    name: 'Александр Иванов',
    email: 'alex.ivanov@example.com',
    avatar: 'АИ',
    plan: 'pro',
    usage: {
      messages: 1247,
      limit: 2000
    }
  });
  
  const [savedChats] = useState<SavedChat[]>([
    {
      id: '1',
      title: 'Подходит ли рюкзак Kaka для путешествий?',
      lastMessage: 'Да, этот рюкзак отлично подходит для путешествий благодаря...',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      messageCount: 12
    },
    {
      id: '2',
      title: 'Травяной пылесос в Ленинграде',
      lastMessage: 'В Санкт-Петербурге есть несколько магазинов, где можно купить...',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      messageCount: 8
    },
    {
      id: '3',
      title: 'Рецепт борща с капустой',
      lastMessage: 'Для приготовления борща вам понадобится: свекла, капуста...',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      messageCount: 15
    },
    {
      id: '4',
      title: 'Программирование на Python',
      lastMessage: 'Python - отличный язык для начинающих программистов...',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      messageCount: 23
    }
  ]);

  const menuItems = [
    { icon: 'MessageCircle', label: 'Новый чат', section: 'chat' },
    { icon: 'Search', label: 'Поиск в чатах', section: 'search' },
    { icon: 'Library', label: 'Библиотека', section: 'library' },
    { icon: 'Settings', label: 'Настройки', section: 'settings' },
    { icon: 'User', label: 'Профиль', section: 'profile' }
  ];
  
  const handleMenuClick = (section: string) => {
    setCurrentSection(section);
    setIsSidebarOpen(false);
  };

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
  
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (hours < 1) return 'Только что';
    if (hours < 24) return `${hours} ч. назад`;
    if (days === 1) return 'Вчера';
    return `${days} дн. назад`;
  };
  
  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'free': return 'bg-gray-500';
      case 'pro': return 'bg-blue-500';
      case 'premium': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };
  
  const renderSearchSection = () => (
    <div className="flex-1 p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Поиск в чатах</h2>
        <div className="relative mb-6">
          <Input
            placeholder="Найти чат или сообщение..."
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 pl-10"
          />
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="space-y-3">
          {savedChats.slice(0, 3).map((chat) => (
            <Card key={chat.id} className="bg-gray-800 border-gray-700 p-4 hover:bg-gray-750 cursor-pointer transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-white mb-2">{chat.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{chat.lastMessage}</p>
                </div>
                <div className="text-xs text-gray-500 ml-4">
                  {formatTimeAgo(chat.timestamp)}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
  
  const renderLibrarySection = () => (
    <div className="flex-1 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Библиотека чатов</h2>
          <Button variant="outline" className="bg-gray-800 border-gray-600 text-gray-200">
            <Icon name="Plus" size={16} className="mr-2" />
            Новая папка
          </Button>
        </div>
        <div className="grid gap-4">
          {savedChats.map((chat) => (
            <Card key={chat.id} className="bg-gray-800 border-gray-700 p-4 hover:bg-gray-750 cursor-pointer transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Icon name="MessageCircle" size={16} className="text-blue-400 mr-2" />
                    <h3 className="font-medium text-white">{chat.title}</h3>
                    <Badge variant="secondary" className="ml-2 bg-gray-700 text-gray-300">
                      {chat.messageCount} сообщений
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-2">{chat.lastMessage}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatTimeAgo(chat.timestamp)}</span>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <Icon name="Edit" size={12} />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <Icon name="Share" size={12} />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-red-400">
                        <Icon name="Trash" size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
  
  const renderSettingsSection = () => (
    <div className="flex-1 p-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Настройки</h2>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="general" className="text-gray-300">Общие</TabsTrigger>
            <TabsTrigger value="appearance" className="text-gray-300">Внешний вид</TabsTrigger>
            <TabsTrigger value="privacy" className="text-gray-300">Приватность</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6 space-y-6">
            <Card className="bg-gray-800 border-gray-700 p-6">
              <h3 className="font-semibold text-white mb-4">Язык и регион</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Язык интерфейса</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="ru" className="text-white">Русский</SelectItem>
                      <SelectItem value="en" className="text-white">English</SelectItem>
                      <SelectItem value="es" className="text-white">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Уведомления</Label>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="mt-6 space-y-6">
            <Card className="bg-gray-800 border-gray-700 p-6">
              <h3 className="font-semibold text-white mb-4">Тема оформления</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Темная тема</Label>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Размер шрифта</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="small" className="text-white">Маленький</SelectItem>
                      <SelectItem value="medium" className="text-white">Средний</SelectItem>
                      <SelectItem value="large" className="text-white">Большой</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy" className="mt-6 space-y-6">
            <Card className="bg-gray-800 border-gray-700 p-6">
              <h3 className="font-semibold text-white mb-4">Данные и приватность</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Сохранять историю чатов</Label>
                    <p className="text-sm text-gray-500">Чаты будут сохраняться локально</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Использовать для обучения</Label>
                    <p className="text-sm text-gray-500">Помогать улучшать модель</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
  
  const renderProfileSection = () => (
    <div className="flex-1 p-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Профиль</h2>
        
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700 p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-blue-600 text-white text-lg">
                  {userProfile.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">{userProfile.name}</h3>
                <p className="text-gray-400">{userProfile.email}</p>
                <div className="flex items-center mt-2">
                  <Badge className={`${getPlanBadgeColor(userProfile.plan)} text-white mr-2`}>
                    {userProfile.plan.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-gray-400">план</span>
                </div>
              </div>
              <Button variant="outline" className="bg-gray-700 border-gray-600 text-gray-200">
                <Icon name="Edit" size={16} className="mr-2" />
                Изменить
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-white mb-2">Использование</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Сообщения</span>
                    <span className="text-white">{userProfile.usage.messages} / {userProfile.usage.limit}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(userProfile.usage.messages / userProfile.usage.limit) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-2">Статистика</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Всего чатов</span>
                    <span className="text-white">{savedChats.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">С нами с</span>
                    <span className="text-white">Янв 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 p-6">
            <h3 className="font-semibold text-white mb-4">Управление аккаунтом</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-gray-700 border-gray-600 text-gray-200">
                <Icon name="Key" size={16} className="mr-3" />
                Изменить пароль
              </Button>
              <Button variant="outline" className="w-full justify-start bg-gray-700 border-gray-600 text-gray-200">
                <Icon name="Download" size={16} className="mr-3" />
                Экспорт данных
              </Button>
              <Button variant="outline" className="w-full justify-start bg-gray-700 border-gray-600 text-red-400 hover:text-red-300">
                <Icon name="Trash" size={16} className="mr-3" />
                Удалить аккаунт
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1f1f1f] flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-[#171717] border-r border-gray-700">
        <div className="p-4">
          <h1 className="text-xl font-bold text-white mb-6">ChatBot</h1>
          <Button 
            className="w-full bg-[#0084ff] hover:bg-[#0066cc] text-white mb-4"
            onClick={() => {
              setMessages([]);
              setCurrentSection('chat');
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
                variant={currentSection === item.section ? "secondary" : "ghost"}
                className={`w-full justify-start text-left ${
                  currentSection === item.section 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
                onClick={() => handleMenuClick(item.section)}
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
                setCurrentSection('chat');
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
                  variant={currentSection === item.section ? "secondary" : "ghost"}
                  className={`w-full justify-start text-left ${
                    currentSection === item.section 
                      ? 'bg-gray-700 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                  onClick={() => handleMenuClick(item.section)}
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

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {currentSection === 'search' && renderSearchSection()}
          {currentSection === 'library' && renderLibrarySection()}
          {currentSection === 'settings' && renderSettingsSection()}
          {currentSection === 'profile' && renderProfileSection()}
          
          {currentSection === 'chat' && (
            <div className="p-4 h-full flex flex-col">
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
          )}
        </div>

        {/* Input Area - только для чата */}
        {currentSection === 'chat' && (
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
        )}
      </div>
    </div>
  );
};

export default Index;