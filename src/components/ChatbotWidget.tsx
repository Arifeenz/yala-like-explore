import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  Mic, 
  MicOff, 
  Volume2,
  MapPin,
  Clock,
  Star
} from "lucide-react";

interface Message {
  id: number;
  type: "user" | "assistant";
  content: string;
  timestamp: string;
  suggestions?: string[];
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content: "สวัสดีค่ะ! ฉันคือ YalaBot ผู้ช่วยของคุณ 🌟\n\nฉันสามารถช่วยคุณได้ในเรื่อง:\n• ข้อมูลสถานที่ท่องเที่ยวในยะลา\n• แนะนำร้านอาหารและที่พัก\n• วางแผนการเดินทาง\n• ข้อมูลวัฒนธรรมท้องถิ่น\n\nมีอะไรให้ช่วยไหมคะ?",
      timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      suggestions: ["แนะนำสถานที่ท่องเที่ยว", "ร้านอาหารอร่อย", "วางแผนเที่ยว 1 วัน", "ข้อมูลวัฒนธรรม"]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setUnreadCount(messages.filter(m => m.type === "assistant").length - 1);
    } else {
      setUnreadCount(0);
    }
  }, [isOpen, messages]);

  const mockResponses = {
    places: [
      "ที่ยะลามีสถานที่ท่องเที่ยวหลายแห่งน่าสนใจค่ะ:\n\n🕌 **มัสยิดกลางยะลา** - สถาปัตยกรรมสวยงาม เป็นศูนย์กลางทางจิตใจ\n🌊 **หาดสไตล์ใต้** - ชายหาดสวยงาม เหมาะพักผ่อน\n🌲 **อุทยานแห่งชาติ** - ธรรมชาติอุดมสมบูรณ์\n\nต้องการข้อมูลเพิ่มเติมสถานที่ไหนคะ?",
      "ยะลามีสถานที่ทางวัฒนธรรมที่น่าสนใจมากค่ะ:\n\n🏛️ **พิพิธภัณฑ์ยะลา** - เรียนรู้ประวัติศาสตร์ท้องถิ่น\n🎭 **ศูนย์วัฒนธรรม** - การแสดงดนตรีและนาฏศิลป์\n🕌 **มัสยิดเก่าแก่** - สถาปัตยกรรมล้านนา\n\nอยากทราบรายละเอียดที่ไหนเพิ่มเติมคะ?"
    ],
    food: [
      "ร้านอาหารแนะนำในยะลาค่ะ:\n\n🍜 **ร้านแม่กัน** - ข้าวยำใต้ต้นตำรับ คะแนน 4.8/5\n🥘 **ครัวบ้านใต้** - แกงส้มปลาช่อน รสชาติเด็ด\n🍛 **ข้าวแกงอิ่มท้อง** - ราคาประหยัด อร่อยแน่นอน\n\nต้องการข้อมูลเมนูหรือที่อยู่เพิ่มเติมไหมคะ?",
      "อาหารท้องถิ่นยะลาที่ต้องลองค่ะ:\n\n🌶️ **แกงส้มปลาช่อน** - รสเปรี้ยวเผ็ด ซดคู่ข้าวสวย\n🥗 **ยำใต้** - ปลาร้าผัดกับผักสด\n🍤 **ผัดไทยใต้** - มีรสชาติเฉพาะถิ่น\n\nอยากรู้ว่าหาซื้อได้ที่ไหนไหมคะ?"
    ],
    planning: [
      "แผนเที่ยวยะลา 1 วันค่ะ:\n\n🌅 **เช้า (8:00-11:00)**\n• เที่ยวมัสยิดกลางยะลา\n• ดื่มกาแฟที่ร้านดังใกล้เคียง\n\n☀️ **สาย (11:00-14:00)**\n• พิพิธภัณฑ์ยะลา\n• ทานข้าวเที่ยงที่ร้านแม่กัน\n\n🌆 **บ่าย (14:00-17:00)**\n• เดินตลาดท้องถิ่น\n• ชิมขนมไทยโบราณ\n\nต้องการปรับแผนตามความสนใจไหมคะ?",
      "แผนเที่ยวยะลา 2 วัน 1 คืนค่ะ:\n\n**วันที่ 1**\n🌄 เช้า: มัสยิดกลาง + ศูนย์วัฒนธรรม\n🍽️ เที่ยง: ร้านครัวบ้านใต้\n🌅 บ่าย: ตลาดท้องถิ่น + พักที่โรงแรมยะลา\n\n**วันที่ 2**\n🌊 เช้า: อุทยานแห่งชาติ\n🍜 เที่ยง: ข้าวแกงอิ่มท้อง\n🏛️ บ่าย: พิพิธภัณฑ์ + ซื้อของฝาก\n\nต้องการปรับแผนไหมคะ?"
    ],
    culture: [
      "วัฒนธรรมยะลามีเอกลักษณ์เฉพาะค่ะ:\n\n🎭 **ศิลปะการแสดง**\n• ลิเกใต้ - การแสดงพื้นบ้าน\n• รำวงใต้ - การรำแบบดั้งเดิม\n\n🏛️ **สถาปัตยกรรม**\n• มัสยิดสไตล์ล้านนา\n• บ้านไทยใต้แบบดั้งเดิม\n\n🍜 **อาหาร**\n• รสจัดจ้าน เผ็ดร้อน\n• ใช้เครื่องเทศท้องถิ่น\n\nอยากทราบเรื่องไหนเพิ่มเติมคะ?",
      "ประเพณีและเทศกาลยะลาค่ะ:\n\n🌙 **เทศกาลศาสนา**\n• วันรายอ - เทศกาลสำคัญของมุสลิม\n• ลอยกระทง - ประเพณีไทยพุทธ\n\n🎊 **งานประจำปี**\n• งานกาแฟยะลา - เดือนกุมภาพันธ์\n• เทศกาลอาหารใต้ - เดือนมีนาคม\n\nต้องการข้อมูลวันเวลาเพิ่มเติมไหมคะ?"
    ]
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response based on keywords
    setTimeout(() => {
      let response = "ขออภัยค่ะ ฉันไม่เข้าใจคำถามของคุณ กรุณาลองถามใหม่หรือเลือกจากคำแนะนำที่ให้ไว้ค่ะ";
      let suggestions: string[] = [];

      const input = inputMessage.toLowerCase();
      
      if (input.includes('สถานที่') || input.includes('ท่องเที่ยว') || input.includes('เที่ยว')) {
        response = mockResponses.places[Math.floor(Math.random() * mockResponses.places.length)];
        suggestions = ["ข้อมูลเพิ่มเติม", "แผนที่", "เวลาเปิด-ปิด"];
      } else if (input.includes('อาหาร') || input.includes('ร้าน') || input.includes('กิน')) {
        response = mockResponses.food[Math.floor(Math.random() * mockResponses.food.length)];
        suggestions = ["ดูเมนู", "จองโต๊ะ", "วิธีการเดินทาง"];
      } else if (input.includes('แผน') || input.includes('วาง') || input.includes('1 วัน') || input.includes('2 วัน')) {
        response = mockResponses.planning[Math.floor(Math.random() * mockResponses.planning.length)];
        suggestions = ["ปรับแผน", "เพิ่มสถานที่", "คำนวณค่าใช้จ่าย"];
      } else if (input.includes('วัฒนธรรม') || input.includes('ประเพณี') || input.includes('เทศกาล')) {
        response = mockResponses.culture[Math.floor(Math.random() * mockResponses.culture.length)];
        suggestions = ["ดูปฏิทินงาน", "ข้อมูลเพิ่มเติม", "การแต่งกาย"];
      }

      const assistantMessage: Message = {
        id: messages.length + 2,
        type: "assistant",
        content: response,
        timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        suggestions
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    inputRef.current?.focus();
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Start voice recognition
      setTimeout(() => {
        setInputMessage("สวัสดีค่ะ ช่วยแนะนำสถานที่ท่องเที่ยวหน่อยค่ะ");
        setIsListening(false);
      }, 2000);
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'th-TH';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="rounded-full h-14 w-14 shadow-glow hover:shadow-hover bg-primary hover:bg-primary-glow relative"
          >
            <MessageCircle className="h-6 w-6" />
            {unreadCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs">
                {unreadCount}
              </Badge>
            )}
          </Button>
        )}
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]">
          <Card className="h-full flex flex-col shadow-2xl border border-border/50 backdrop-blur-sm bg-card/95">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">YalaBot</CardTitle>
                  <p className="text-xs text-white/80">ผู้ช่วยท่องเที่ยวยะลา</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <ScrollArea className="flex-1 px-4 py-2">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-gradient-to-br from-primary to-secondary text-white"
                      }`}>
                        {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      
                      <div className={`flex-1 ${message.type === "user" ? "text-right" : ""}`}>
                        <div className={`inline-block p-3 rounded-lg max-w-[85%] ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground ml-auto"
                            : "bg-muted"
                        }`}>
                          <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                          {message.type === "assistant" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => speakMessage(message.content)}
                              className="mt-2 h-6 px-2 text-xs hover:bg-background/20"
                            >
                              <Volume2 className="h-3 w-3 mr-1" />
                              ฟัง
                            </Button>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {message.timestamp}
                        </div>
                        
                        {/* Suggestions */}
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="h-7 px-3 text-xs"
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="พิมพ์คำถามหรือใช้เสียง..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleVoiceInput}
                    className={`${isListening ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300" : ""}`}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  💡 ลองถาม: "แนะนำสถานที่ท่องเที่ยว" หรือ "ร้านอาหารอร่อย"
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;