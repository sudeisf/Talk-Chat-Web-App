import GreetingCard from "@/components/learner/GreetingCard";
import SummaryCard from "@/components/learner/SummeryCards";
import { Bookmark, CheckCircle, Clock, MessageSquare } from "lucide-react";

export default function HelperDashboard (){

      return(
            <div className="w-full max-w-6xl mx-auto min-h-screen bg-white p-4">
            <GreetingCard btnName={"Start Helping"} name={"sudeis"}/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            <SummaryCard percentage="6.45" title="Questions Answerd" value={124} icon={<MessageSquare size={20} />} />
            <SummaryCard percentage="3.56" title="Sessions Joined" value={8} icon={<Bookmark size={20} />} color="text-purple-600" />
            <SummaryCard percentage="6.6" title="Avarage Response Time" value={97} icon={<CheckCircle size={20} />} color="text-green-600" />
            <SummaryCard percentage="6.45" title="Feedback Rating" value={27} icon={<Clock size={20} />} color="text-yellow-600" />
            </div>
      </div>
      )
}     