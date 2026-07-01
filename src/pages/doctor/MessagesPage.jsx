import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, MessageSquare, Plus, Paperclip, MoreVertical, Phone, Video } from "lucide-react";

export default function MessagesPage() {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Patient",
      avatar: "",
      unread: 2,
      lastMessage: "Thank you doctor, I will start the medication today.",
      time: "10:30 AM",
      messages: [
        { id: 1, sender: "doctor", text: "Hello John, your test results are ready.", time: "09:00 AM" },
        { id: 2, sender: "doctor", text: "Everything looks normal, but we should keep an eye on your cholesterol.", time: "09:01 AM" },
        { id: 3, sender: "patient", text: "That's a relief! Do I need to change my diet?", time: "09:15 AM" },
        { id: 4, sender: "doctor", text: "Yes, I've sent a diet plan to your documents. Also prescribed mild statins.", time: "09:30 AM" },
        { id: 5, sender: "patient", text: "Thank you doctor, I will start the medication today.", time: "10:30 AM" }
      ]
    },
    {
      id: 2,
      name: "Dr. Sarah Smith",
      role: "Cardiologist",
      avatar: "",
      unread: 0,
      lastMessage: "Can you send over the ECG for PT-045?",
      time: "Yesterday",
      messages: [
        { id: 1, sender: "patient", text: "Can you send over the ECG for PT-045?", time: "Yesterday" }
      ]
    },
    {
      id: 3,
      name: "Nurse Station 2",
      role: "Internal Staff",
      avatar: "",
      unread: 1,
      lastMessage: "Patient in bed 4 requires your attention.",
      time: "Yesterday",
      messages: [
        { id: 1, sender: "patient", text: "Patient in bed 4 requires your attention.", time: "Yesterday" }
      ]
    }
  ]);

  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeChat.id) {
        const newMsg = {
          id: Date.now(),
          sender: "doctor",
          text: newMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        const updatedConv = {
          ...conv,
          lastMessage: newMessage,
          time: "Just now",
          messages: [...conv.messages, newMsg]
        };
        setActiveChat(updatedConv);
        return updatedConv;
      }
      return conv;
    });

    setConversations(updatedConversations);
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-teal-600" /> Messages
          </h1>
          <p className="text-sm text-slate-500">Communicate with patients and staff.</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="h-4 w-4 mr-2" /> New Message
        </Button>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden min-h-0 bg-white rounded-xl shadow-sm border border-slate-200">
        
        {/* Sidebar */}
        <div className="w-1/3 shrink-0 flex flex-col border-r border-slate-200">
          <div className="p-4 border-b border-slate-200 space-y-4 bg-slate-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search messages..." 
                className="pl-9 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200 cursor-pointer">All</Badge>
              <Badge variant="outline" className="text-slate-600 cursor-pointer">Patients</Badge>
              <Badge variant="outline" className="text-slate-600 cursor-pointer">Staff</Badge>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredConversations.map(conv => (
              <div 
                key={conv.id} 
                className={`p-4 border-b border-slate-100 cursor-pointer transition-colors flex gap-3 ${activeChat.id === conv.id ? 'bg-teal-50/50' : 'hover:bg-slate-50'}`}
                onClick={() => {
                  setActiveChat(conv);
                  if (conv.unread > 0) {
                    setConversations(conversations.map(c => c.id === conv.id ? { ...c, unread: 0 } : c));
                  }
                }}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarFallback className="bg-teal-100 text-teal-700 font-bold">{conv.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {conv.unread > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-semibold text-slate-900 truncate">{conv.name}</h4>
                    <span className="text-xs text-slate-500 shrink-0 ml-2">{conv.time}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className={`text-sm truncate ${conv.unread > 0 ? 'font-semibold text-slate-800' : 'text-slate-500'}`}>
                      {conv.lastMessage}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-[10px] mt-2 bg-slate-50">{conv.role}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat Header */}
          <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-teal-100 text-teal-700 font-bold">{activeChat.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-slate-900">{activeChat.name}</h3>
                <p className="text-xs text-slate-500">{activeChat.role}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-slate-500"><Phone className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="text-slate-500"><Video className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="text-slate-500"><MoreVertical className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {activeChat.messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'doctor' ? 'items-end' : 'items-start'}`}>
                <div 
                  className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                    msg.sender === 'doctor' 
                      ? 'bg-teal-600 text-white rounded-tr-sm' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1.5 mx-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-200 bg-white shrink-0">
            <div className="flex items-end gap-2 bg-slate-50 rounded-xl border border-slate-200 p-2 focus-within:ring-1 focus-within:ring-teal-500 focus-within:border-teal-500 transition-all">
              <Button variant="ghost" size="icon" className="text-slate-500 shrink-0 h-9 w-9 rounded-full">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Textarea 
                className="flex-1 min-h-[40px] max-h-32 border-0 bg-transparent focus-visible:ring-0 resize-none py-2 px-1 text-sm custom-scrollbar shadow-none"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <Button 
                size="icon" 
                className="bg-teal-600 hover:bg-teal-700 shrink-0 h-9 w-9 rounded-full"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-2">Press Enter to send, Shift+Enter for new line</p>
          </div>
        </div>

      </div>
    </div>
  );
}
