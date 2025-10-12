import { TotalSessionsChart } from "@/components/learner/Barcharts";
import GreetingCard from "@/components/learner/GreetingCard";
import SummaryCard from "@/components/learner/SummeryCards";
import { ContributionHeatmap } from "@/components/ui/contribution -heatmap";
import { Bookmark, CheckCircle, Clock, MessageSquare } from "lucide-react";

export default function HelperDashboard (){

      return(
            <div className="w-full max-w-7xl mx-auto min-h-screen bg-white p-4">
            <GreetingCard btnName={"Start Helping"} name={"sudeis"}/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            <SummaryCard percentage="6.45" title="Questions Answerd" value={124} icon={<MessageSquare size={20} />} />
            <SummaryCard percentage="3.56" title="Sessions Joined" value={8} icon={<Bookmark size={20} />} color="text-purple-600" />
            <SummaryCard percentage="6.6" title="Avarage Response Time" value={97} icon={<CheckCircle size={20} />} color="text-green-600" />
            <SummaryCard percentage="6.45" title="Feedback Rating" value={27} icon={<Clock size={20} />} color="text-yellow-600" />
            </div>

            <div className="flex w-full">
            <TotalSessionsChart/>
                  <div className="rounded-lg w-full  bg-card p-6">
                        <div className="mb-4">
                              <h2 className="text-xl font-semibold text-[#03624C]  mb-1">Sudeis</h2>
                              <p className="text-sm text-muted-foreground">Daily contribution activity over the years</p>
                        </div>

                  <ContributionHeatmap userId="user123" />

                  <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Less</span>
                        <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#ebedf0" }} />
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#9be9a8" }} />
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#40c463" }} />
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#30a14e" }} />
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#216e39" }} />
                        </div>
                        <span>More</span>
                  </div>
                  <div className="mt-2 text-md text-muted-foreground">
                        Tip: Select a year to filter the heat map. Hover a day to see the exact contribution count.
                  </div>
                  </div>
            </div>

      </div>
      )
}     