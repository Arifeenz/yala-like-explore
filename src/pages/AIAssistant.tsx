import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  ArrowLeft, 
  Bot, 
  User, 
  Upload, 
  MapPin, 
  Clock, 
  Star,
  Sparkles,
  Mic,
  MicOff
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content: "สวัสดีครับ! ผม YalaBot ผู้ช่วย AI ของคุณ 🤖\n\nผมสามารถช่วยคุณได้ในเรื่องต่างๆ เช่น:\n• อัปเดตข้อมูลสถานที่\n• เพิ่มสถานที่ใหม่\n• วิเคราะห์รีวิวและข้อเสนอแนะ\n• สร้างคำอธิบายที่น่าสนใจ\n• แนะนำการปรับปรุงธุรกิจ\n\nมีอะไรให้ผมช่วยไหมครับ?",
      timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions = [
    {
      id: 1,
      title: "อัปเดตข้อมูลร้านอาหาร",
      description: "แก้ไขเวลาเปิด-ปิด, เมนูใหม่",
      icon: "🍜",
      prompt: "ช่วยอัปเดตข้อมูลร้านอาหารใต้ต้นไผ่ของฉัน เวลาเปิด-ปิดเปลี่ยนเป็น 9:00-23:00 และมีเมนูใหม่เพิ่มเข้ามา"
    },
    {
      id: 2,
      title: "วิเคราะห์รีวิว",
      description: "ดูข้อเสนอแนะจากลูกค้า",
      icon: "⭐",
      prompt: "ช่วยวิเคราะห์รีวิวของสถานที่ของฉันและแนะนำการปรับปรุง"
    },
    {
      id: 3,
      title: "เพิ่มสถานที่ใหม่",
      description: "ลงทะเบียนสถานที่ท่องเที่ยว",
      icon: "📍",
      prompt: "ฉันต้องการเพิ่มสถานที่ใหม่ คือ วัดในชุมชนที่เพิ่งปรับปรุงใหม่"
    },
    {
      id: 4,
      title: "สร้างเนื้อหาโปรโมต",
      description: "เขียนคำอธิบายที่ดึงดูดใจ",
      icon: "✨",
      prompt: "ช่วยเขียนเนื้อหาโปรโมตร้านอาหารของฉันให้น่าสนใจและดึงดูดนักท่องเที่ยว"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "เข้าใจแล้วครับ! ให้ผมช่วยคุณอัปเดตข้อมูลนี้\n\n✅ เวลาเปิด-ปิดใหม่: 9:00-23:00\n✅ จะอัปเดตในระบบทันที\n\nต้องการให้ผมช่วยเพิ่มรายละเอียดอื่นๆ เช่น เมนูใหม่หรือโปรโมชั่นไหมครับ?",
        "ผมได้วิเคราะห์รีวิวของสถานที่คุณแล้ว:\n\n📊 คะแนนเฉลี่ย: 4.6/5\n👍 จุดเด่น: รสชาติดี, บรรยากาศดี\n⚠️ จุดที่ควรปรับปรุง: ที่จอดรถ, เวลารอ\n\n💡 คำแนะนำ:\n• เพิ่มที่จอดรถหรือประสานงานกับที่จอดใกล้เคียง\n• ปรับปรุงการบริการให้เร็วขึ้นในช่วงเวลาเร่งด่วน",
        "ยอดเยี่ยมครับ! วัดที่เพิ่งปรับปรุงใหม่เป็นสถานที่ที่น่าสนใจมาก\n\n📝 ข้อมูลที่ต้องการ:\n• ชื่อวัด\n• ที่อยู่\n• ประวัติสั้นๆ\n• จุดเด่นหลังการปรับปรุง\n• เวลาเปิดรับผู้เยี่ยมชม\n\nคุณสามารถบอกรายละเอียดเหล่านี้มาได้ครับ แล้วผมจะช่วยจัดทำข้อมูลให้สมบูรณ์",
        "ให้ผมช่วยสร้างเนื้อหาโปรโมตที่ดึงดูดใจให้กับร้านของคุณครับ!\n\n🌟 **ร้านอาหารใต้ต้นไผ่**\n*รสชาติแท้ใต้ บรรยากาศร่มรื่น*\n\n\"สัมผัสรสชาติอาหารใต้แท้ๆ ท่ามกลางบรรยากาศร่มรื่นใต้ต้นไผ่ ด้วยสูตรต้นตำรับที่สืบทอดมาแต่เดิม รสจัดจ้าน หอมเครื่องเทศ เหมาะสำหรับทั้งครอบครัวและนักท่องเที่ยวที่ต้องการสัมผัสรสชาติอันแท้จริงของยะลา\"\n\n📍 เปิดทุกวัน 9:00-23:00\n💰 ราคาเริ่มต้น 100 บาท\n🅿️ มีที่จอดรถ\n\nต้องการให้ปรับแต่งเนื้อหาเพิ่มเติมไหมครับ?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage = {
        id: messages.length + 2,
        type: "assistant",
        content: randomResponse,
        timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickAction = (prompt: string) => {
    setInputMessage(prompt);
    inputRef.current?.focus();
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input logic would go here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/profile" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับไปโปรไฟล์
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">YalaBot ผู้ช่วย AI</h1>
              <p className="text-muted-foreground">ผู้ช่วยอัจฉริยะสำหรับการจัดการสถานที่ท่องเที่ยว</p>
            </div>
            <div className="ml-auto">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                ออนไลน์
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  การทำงานด่วน
                </CardTitle>
                <CardDescription>คลิกเพื่อเริ่มการสนทนา</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action) => (
                  <Button
                    key={action.id}
                    variant="outline"
                    className="w-full p-4 h-auto text-left hover:bg-muted"
                    onClick={() => handleQuickAction(action.prompt)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-lg">{action.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{action.title}</div>
                        <div className="text-xs text-muted-foreground">{action.description}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-card mt-6">
              <CardHeader>
                <CardTitle>สถิติการใช้งาน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">คำถามวันนี้</span>
                  <Badge variant="secondary">12</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">สถานที่ที่อัปเดต</span>
                  <Badge variant="secondary">3</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">เวลาตอบสนองเฉลี่ย</span>
                  <Badge variant="secondary">2.3 วิ</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="shadow-card h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle>แชทกับ YalaBot</CardTitle>
                <CardDescription>ถามคำถามหรือขอความช่วยเหลือได้ตลอดเวลา</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <ScrollArea className="flex-1 px-6">
                  <div className="space-y-4 py-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === "user" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-gradient-to-br from-primary to-secondary text-white"
                        }`}>
                          {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>
                        
                        <div className={`flex-1 max-w-[80%] ${message.type === "user" ? "text-right" : ""}`}>
                          <div className={`inline-block p-3 rounded-lg ${
                            message.type === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}>
                            <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {message.timestamp}
                          </div>
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
                <div className="border-t px-6 py-4">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="พิมพ์คำถามหรือข้อความของคุณ..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleVoiceInput}
                      className={isListening ? "bg-red-100 text-red-600" : ""}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2 mt-2 text-xs text-muted-foreground">
                    <span>💡 เคล็ดลับ: ใช้คำสั่งเฉพาะ เช่น "อัปเดตข้อมูล", "วิเคราะห์รีวิว", "เพิ่มสถานที่"</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;