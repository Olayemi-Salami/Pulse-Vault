import { useState } from "react";
import Login from "../components/Dashboard/Login";
import Chatbot from "../components/Bot/Chatbot";
import { Button } from "../components/ui/button";
import { MessageCircle, X } from "lucide-react";

const Dashboard = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    return (
        <div>
            <Login />
            <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
                {isChatbotOpen && (
                    <div className="mb-2">
                        <Chatbot />
                    </div>
                )}
                <Button
                    onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                    className="rounded-full w-16 h-16 flex items-center justify-center"
                >
                    {isChatbotOpen ? <X size={24} /> : <MessageCircle size={24} />}
                </Button>
            </div>
        </div>
    );
};

export default Dashboard;