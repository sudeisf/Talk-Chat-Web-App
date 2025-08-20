"use client"

import { Archive, BookOpen, Star, User } from "lucide-react"
import { Button } from "../ui/button"



const tabs = [
      {
            "title" : "Active Sessions",
            "icon" : BookOpen,
            "count" : 3,
            "active" : true
      },
      {
            "title" : "All Sessions",
            "icon" : User,
            "count" : 5,
            "active" : false
      },
      {
            "title" : "Favorites",
            "icon" : Star,
            "count" : 0,
            "active" : false
      },
      {
            "title" : "Archived",
            "icon" : Archive,
            "count" : 0,
            "active" : false
      }
]


export default function ChatTabs(){


      return (
            <div className="flex flex-col gap-2 p-2 border-b ">
                  {
                        tabs.map((tab,index)=>{
                              const Icon = tab.icon;
                              return(
                                    <Button
                                    key={`tab-${index}`}
                                     className={`flex justify-between text-sm rounded-sm py-5 shadow-none drop-shadow-none' ${
                                          tab.active === true ? "bg-orange-500 text-white hover:bg-orange-500/90" : "bg-white text-gray-600 hover:bg-gray-100"
                                    }`}>
                                         <span className="flex items-center gap-2">
                                         <Icon className="w-6 h-6"/>
                                         {tab.title}
                                         </span>
                                         
                                          { tab.count > 0 &&
                                                 <span className={` text-xs w-6 h-6 flex items-center flex-col justify-center rounded-full ${
                                                      tab.active ? "bg-white text-black" : "bg-gray-200"
                                                }`}>
                                                 {tab.count}
                                                </span>
                                          }
                                         
                                    </Button>
                              )
})
                  }
            </div>
      )
}