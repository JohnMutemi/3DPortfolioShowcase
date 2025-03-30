import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/ui/icons";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Define the form schema for sending messages
const formSchema = z.object({
  content: z.string().min(1, "Message cannot be empty"),
  mode: z.string().default("default"),
});

type FormValues = z.infer<typeof formSchema>;

// Message type
interface Message {
  id: number;
  sessionId: string;
  content: string;
  isBot: number;
  mode: string;
  createdAt: string;
  metadata?: any;
}

// Chat mode type
interface ChatMode {
  id: number;
  name: string;
  description: string;
  persona: string;
  icon: string;
  accentColor: string;
  isDefault: number;
  createdAt: string;
}

const ChatPage = () => {
  // Generate a unique session ID for this chat if not already in storage
  const [sessionId, setSessionId] = useState<string>(() => {
    const storedSessionId = localStorage.getItem("chatSessionId");
    if (storedSessionId) return storedSessionId;
    
    const newSessionId = uuidv4();
    localStorage.setItem("chatSessionId", newSessionId);
    return newSessionId;
  });
  
  const [selectedMode, setSelectedMode] = useState<string>("default");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Form setup for sending messages
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      mode: selectedMode
    }
  });
  
  // Effect to update selected mode when it changes
  const updateModeFromResponse = (data: { modes: ChatMode[] }) => {
    if (data.modes && data.modes.length > 0) {
      const defaultMode = data.modes.find((mode: ChatMode) => mode.isDefault === 1) || data.modes[0];
      setSelectedMode(defaultMode.name);
      form.setValue("mode", defaultMode.name);
    }
  };
  
  // Fetch chat modes
  const { 
    data: modesData,
    isLoading: isLoadingModes
  } = useQuery({
    queryKey: ["/api/chat/modes"],
    queryFn: async () => {
      const result = await apiRequest<{ modes: ChatMode[] }>("/api/chat/modes");
      return result.data;
    }
  });
  
  // Set default mode when data is loaded
  useEffect(() => {
    if (modesData) {
      updateModeFromResponse(modesData);
    }
  }, [modesData]);
  
  // Fetch messages for the current session
  const {
    data: messagesData,
    isLoading: isLoadingMessages,
    isError: isMessagesError,
    refetch: refetchMessages
  } = useQuery({
    queryKey: ["/api/chat/messages", sessionId],
    queryFn: async () => {
      const result = await apiRequest<{ messages: Message[] }>(`/api/chat/messages/${sessionId}`);
      return result.data;
    },
    enabled: !!sessionId
  });
  
  // Mutation for sending messages
  const sendMessageMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const result = await apiRequest<any>("/api/chat/messages", {
        method: "POST",
        body: JSON.stringify({
          sessionId,
          content: data.content,
          isBot: 0,
          mode: data.mode,
          metadata: {
            timestamp: new Date().toISOString()
          }
        }),
      });
      return result.data;
    },
    onSuccess: () => {
      // Reset form and refetch messages
      form.reset({ content: "", mode: selectedMode });
      queryClient.invalidateQueries({ queryKey: ["/api/chat/messages", sessionId] });
      refetchMessages();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error("Error sending message:", error);
    }
  });
  
  // Handle form submission
  const onSubmit = (data: FormValues) => {
    sendMessageMutation.mutate(data);
  };
  
  // Handle mode change
  const handleModeChange = (value: string) => {
    setSelectedMode(value);
    form.setValue("mode", value);
  };
  
  // Scroll to bottom of messages when new ones arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesData]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-6">
          <Link href="/" className="text-blue-500 hover:underline flex items-center">
            <Icons.arrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Chat modes sidebar */}
          <div className="md:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Conversation Modes</CardTitle>
                <CardDescription>
                  Choose a persona to chat with
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingModes ? (
                  <div className="flex justify-center p-4">
                    <Icons.spinner className="h-6 w-6 animate-spin" />
                  </div>
                ) : (
                  <Tabs 
                    defaultValue={selectedMode} 
                    orientation="vertical"
                    className="w-full"
                    onValueChange={handleModeChange}
                  >
                    <TabsList className="grid grid-cols-1 w-full">
                      {modesData?.modes.map((mode: ChatMode) => (
                        <TabsTrigger 
                          key={mode.id} 
                          value={mode.name}
                          className="justify-start text-left"
                        >
                          <div className={`mr-2 h-6 w-6 rounded-full bg-${mode.accentColor}-500 flex items-center justify-center`}>
                            <span className="text-white text-xs">
                              {mode.icon}
                            </span>
                          </div>
                          {mode.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {modesData?.modes.map((mode: ChatMode) => (
                      <TabsContent 
                        key={mode.id} 
                        value={mode.name}
                        className="mt-4 space-y-4"
                      >
                        <p className="text-sm">{mode.description}</p>
                        <p className="text-sm italic">"{mode.persona}"</p>
                      </TabsContent>
                    ))}
                  </Tabs>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Chat messages and input */}
          <div className="md:col-span-9">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>Chat with John's AI</CardTitle>
                <CardDescription>
                  Ask me anything about my work, skills, or projects
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-[500px] pr-4">
                  {isLoadingMessages ? (
                    <div className="flex justify-center items-center h-full">
                      <Icons.spinner className="h-8 w-8 animate-spin" />
                    </div>
                  ) : isMessagesError ? (
                    <div className="text-center text-red-500 py-8">
                      Failed to load messages. Please try again.
                    </div>
                  ) : messagesData?.messages.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      No messages yet. Start a conversation!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messagesData?.messages.map((message: Message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${
                            message.isBot ? "justify-start" : "justify-end"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] p-4 rounded-lg ${
                              message.isBot
                                ? "bg-muted"
                                : "bg-primary text-primary-foreground"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            <p className="text-xs mt-1 opacity-70">
                              {new Date(message.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
              
              <CardFooter>
                <form 
                  onSubmit={form.handleSubmit(onSubmit)} 
                  className="w-full space-y-2"
                >
                  <input
                    type="hidden"
                    {...form.register("mode")}
                    value={selectedMode}
                  />
                  
                  <div className="flex items-end space-x-2">
                    <div className="flex-1">
                      <Textarea
                        placeholder="Type your message..."
                        className="resize-none min-h-[80px]"
                        {...form.register("content")}
                      />
                      {form.formState.errors.content && (
                        <p className="text-red-500 text-xs mt-1">
                          {form.formState.errors.content.message}
                        </p>
                      )}
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={sendMessageMutation.isPending}
                      size="icon"
                      className="h-10 w-10"
                    >
                      {sendMessageMutation.isPending ? (
                        <Icons.spinner className="h-4 w-4 animate-spin" />
                      ) : (
                        <Icons.send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </form>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ChatPage;