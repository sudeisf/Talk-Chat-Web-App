"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bookmark, BookOpen, Briefcase, Camera, Clock, Edit, Pen, Star, Stars, Target, Trash, User } from "lucide-react"
import { use, useRef, useState } from "react"




const userInfo = {
  name: "Sudeis Fedlu",
  email: "sudeisfed@gmail.com",
  avatar: "https://github.com/shadcn.png",
  bio: "Passionate learner focused on mastering programming and technology. Always eager to explore new concepts and improve my skills.",
  location: "Addis Ababa, Ethiopia",
  role: "Software engineer",
  username: "sudeisfed",
  phone: "+251 912 345 678",
  coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80",
  skills : [
    "React" , "Typescript","python" ,"ML" ,"Tailwindcss" , "NodeJs"  ],
    sessionsJoined: 24,
    ongoingSessions: 3,
    bookmarksSaved: 18,
    totalQuestions : 30,
    level: 8,
    experience: 1250, 
    correctAnswers : 200
}



export default function ProfilePage() {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const accuracy = Math.round((userInfo.correctAnswers / userInfo.totalQuestions) * 100)
  const nextLevelExp = 1500;
  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const progressToNextLevel = Math.round((userInfo.experience / nextLevelExp) * 100)
  return (
    <div className=" max-w-6xl mx-auto p-4 mb-4 ">
      {/* cover image section */}
      <div className="relative h-[200px]  ">
          <div className="w-full h-full ">
            
            {coverImage ? (
              <div className="relative">
                <img
                src={coverImage}
                alt="cover image"
                className="object-cover w-full h-full absolute inset-0"
                style={{ objectFit: "cover" }}
              />
              <Button className="absolute top-4 right-4">
                <Edit className="w-4 h-4 text-white" />
              </Button>
              <Button className="absolute top-4 right-4 bg-red-500 hover:bg-red-600">
                <Trash className="w-4 h-4 text-white" />
              </Button>
              </div>

            ) : (
              <div className="w-full h-full rounded-t-md bg-gradient-to-r from-orange-500 via-red-400 to-orange-400">
                <div className="relative">
                  <Button className="absolute top-4 right-4 bg-white hover:bg-gray-100 rounded-full w-10 h-10">
                    <Edit className="w-4 h-4 text-black" />
                  </Button>
                </div>
              </div>
            )}
            
          </div>

            {/* profile Card */}
            <div className="  rounded-lg px-4 py-6 w-full border-b ">
            <div className="absolute bottom-0  top-22 z-10 left-10 ">
              <Avatar className="w-[150px] h-[150px] border-8 border-white">
                <AvatarImage src={userInfo.avatar} />
                <AvatarFallback>
                  {userInfo.name.charAt(0)}
                </AvatarFallback>
              </Avatar> 
              <Button
                id="edit-avatar"
                size="sm"
                variant="outline"
                onClick={() => avatarFileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full p-0 bg-white shadow-md hover:bg-gray-50"
                    >
                <Camera className="h-5 w-5" />
                </Button>
            </div>

          <div className="flex justify-between">
             <div className="pt-5  space-y-2">
               <h1 className="text-2xl font-pt font-bold">{userInfo.name}</h1>
               <p className="text-md text-gray-500">{userInfo.role}</p>
               <p className="text-md text-gray-500">{userInfo.location}</p>
               <div>
                <h1 className="text-md py-2 font-medium flex items-center gap-2 text-gray-700">Bio <Pen className="w-4 h-4"/></h1>
               <p className="text-md text-gray-500 max-w-md leading-relaxed">{userInfo.bio}</p>
               </div>
              <div className="flex gap-2">
              <Button  className="bg-gradient-to-r text-md font-pt bg-orange-500 p-5  rounded-full mt-2 shadow-xs ">
                   Edit Profile
               </Button>
               <Button variant={"outline"} className="border-orange-500 border p-5 text-md text-orange-500 rounded-full mt-2 shadow-xs ">
                   Settings
               </Button>
              </div>
              </div>
            <div className="flex flex-col gap-2 justify-between">
            <div className="flex flex-col items-end gap-2"> 
              <h1 className="font-pt text-md flex text-gray-500 gap-2 w-fit">Current role <Briefcase className="w-4 h-4"/></h1>
              <h2 className="rounded-full bg-gray-100 text-sm p-2 font-pt capitalize font-medium px-2">{userInfo.role}</h2>
            </div>
            <div className=" flex flex-col items-end gap-2">
              <h1 className="capitalize flex gap-2 items-center text-gray-500">skills <Star className="w-4 h-4"/></h1>
              <div className="flex flex-wrap gap-2 items-">
                  {userInfo.skills.map((skill,index)=>(
                    <div key={index} >
                      <p className="bg-gray-100 p-2 text-sm w-fit rounded-full font-pt font-medium">{skill}</p>
                    </div>
                  ))}
              </div>
            </div>
            </div>
            </div>
            </div>
            {/* Stats and Progress */}
          <div className="lg:col-span-2 space-y-6 mt-4">
            <Card className="shadow-none rounded-xl border-0 bg-white/95 p-2 ">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  Level Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-md font-medium text-gray-600">Level {userInfo.level}</span>
                    <span className="text-md text-gray-500">{userInfo.experience} / {nextLevelExp} XP</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-orange-400 to-red-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progressToNextLevel}%` }}
                    ></div>
                  </div>
                  <p className="text-md text-gray-500">
                    {nextLevelExp - userInfo.experience} XP needed for next level
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t p-4">
              <Card className="shadow-xs border rounded-xl bg-white/95 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center">
                    <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
                    <h3 className="text-2xl font-bold text-gray-900">{userInfo.totalQuestions}</h3>
                    <p className="text-sm text-gray-600">Questions Asked</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-xs border rounded-xl bg-white/95 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center">
                    <User className="h-8 w-8 text-green-600 mb-2" />
                    <h3 className="text-2xl font-bold text-gray-900">{userInfo.sessionsJoined || 24}</h3>
                    <p className="text-sm text-gray-600">Sessions Joined</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-xs border rounded-xl bg-white/95 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center">
                    <Clock className="h-8 w-8 text-orange-600 mb-2" />
                    <h3 className="text-2xl font-bold text-gray-900">{userInfo.ongoingSessions || 3}</h3>
                    <p className="text-sm text-gray-600">Ongoing Sessions</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-xs border rounded-xl bg-white/95 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center">
                    <Bookmark className="h-8 w-8 text-purple-600 mb-2" />
                    <h3 className="text-2xl font-bold text-gray-900">{userInfo.bookmarksSaved || 18}</h3>
                    <p className="text-sm text-gray-600">Bookmarks Saved</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          </div>
      </div>
  )
}