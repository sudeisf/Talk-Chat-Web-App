
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowUpAZ } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
  percentage :string;
}

export default function SummaryCard({
  title,
  value,
  icon,
  color = "text-blue-600",
  percentage
  
}: SummaryCardProps) {
  return (
    <div className="flex flex-row border p-6 gap-4 bg-white rounded-md ">
      <div className={`p-2 rounded-full bg-gray-100 h-fit ${color}`}>
        {icon}
      </div>
      <div className="space-y-2">
        <p className="text-md font-sans text-gray-500">{title}</p>
       <div className="flex gap-2">
       <h3 className={`text-2xl font-semibold ${color}`}>{value}</h3>
       <div className={`flex ${color} bg-gray-50 w-20 rounded-full justify-center text-md font-medium items-center`}><ArrowUp className="w-4 h-4"/>{percentage} %</div>
       </div>
      </div> 
    </div>
  );
}
