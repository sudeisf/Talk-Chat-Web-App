"use client"

import { useState, useRef } from "react"
import { User, Edit, Camera, MapPin, Mail, Phone, BookOpen, Target, Clock, Search, Bookmark, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"

interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  coverImage?: string
  bio: string
  location: string
  phone: string
  joinDate: string
  level: number
  experience: number
  totalQuestions: number
  correctAnswers: number
  studyStreak: number
  achievements: number
  subjects: string[]
  badges: Badge[]
  username?: string
  role?: string
  sessionsJoined?: number
  ongoingSessions?: number
  bookmarksSaved?: number
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  earnedDate: string
}

const mockUserProfile: UserProfile = {
  id: "1",
  name: "Sudeis Fedlu",
  email: "sudiesfed@gmail.com",
  avatar: "https://github.com/shadcn.png",
  bio: "Passionate learner focused on mastering programming and technology. Always eager to explore new concepts and improve my skills.",
  location: "Addis Ababa, Ethiopia",
  phone: "+251 912 345 678",
  joinDate: "January 2024",
  level: 8,
  experience: 1250,
  totalQuestions: 156,
  correctAnswers: 142,
  studyStreak: 7,
  achievements: 12,
  subjects: ["JavaScript", "React", "Python", "Data Structures", "Algorithms"],
  badges: [
    {
      id: "1",
      name: "First Steps",
      description: "Completed your first question",
      icon: "🎯",
      color: "bg-blue-100 text-blue-800",
      earnedDate: "Jan 15, 2024"
    },
    {
      id: "2",
      name: "Streak Master",
      description: "Maintained a 7-day study streak",
      icon: "🔥",
      color: "bg-orange-100 text-orange-800",
      earnedDate: "Feb 3, 2024"
    },
    {
      id: "3",
      name: "Perfect Score",
      description: "Answered 10 questions correctly in a row",
      icon: "⭐",
      color: "bg-yellow-100 text-yellow-800",
      earnedDate: "Feb 10, 2024"
    },
    {
      id: "4",
      name: "JavaScript Expert",
      description: "Completed 50 JavaScript questions",
      icon: "💻",
      color: "bg-green-100 text-green-800",
      earnedDate: "Mar 5, 2024"
    }
  ],
  username: "sudeisfed",
  role: "Fullstack Learner",
  sessionsJoined: 24,
  ongoingSessions: 3,
  bookmarksSaved: 18
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(mockUserProfile)
  const [customSubject, setCustomSubject] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const avatarFileInputRef = useRef<HTMLInputElement>(null)
  const coverFileInputRef = useRef<HTMLInputElement>(null)
  const [showSubjectsModal, setShowSubjectsModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(profile.subjects)

  const accuracy = Math.round((profile.correctAnswers / profile.totalQuestions) * 100)
  const nextLevelExp = 1500
  const progressToNextLevel = Math.round((profile.experience / nextLevelExp) * 100)

 
  const addSubject = (subject: string) => {
    if (subject && !selectedSubjects.includes(subject)) {
      setSelectedSubjects([...selectedSubjects, subject])
    }
  }

  const removeSubject = (subject: string) => {
    setSelectedSubjects(selectedSubjects.filter(s => s !== subject))
  }

  const addCustomSubject = () => {
    if (customSubject.trim() && !selectedSubjects.includes(customSubject.trim())) {
      addSubject(customSubject.trim())
      setCustomSubject("")
    }
  }

  const saveSubjects = () => {
    setProfile(prev => ({ ...prev, subjects: selectedSubjects }))
    setShowSubjectsModal(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addCustomSubject()
    }
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Invalid File", {
          description: "Please upload a valid image file (PNG, JPEG, etc.).",
        })
        return
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("File Too Large", {
          description: "Image size should be less than 5MB.",
        })
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile({ ...profile, avatar: e.target?.result as string })
        toast.success("Avatar updated successfully.")
      }
      reader.onerror = () => {
        toast.error("Error", {
          description: "Failed to upload avatar. Please try again.",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Invalid File", {
          description: "Please upload a valid image file (PNG, JPEG, etc.).",
        })
        return
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error("File Too Large", {
          description: "Cover image size should be less than 10MB.",
        })
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile({ ...profile, coverImage: e.target?.result as string })
        toast.success("Cover image updated successfully.")
      }
      reader.onerror = () => {
        toast.error("Error", {
          description: "Failed to upload cover image. Please try again.",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeCoverImage = () => {
    setProfile({ ...profile, coverImage: undefined })
    toast.success("Cover image removed successfully.")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Section */}
      <div className="relative w-full h-[300px] overflow-hidden">
        {/* Cover Image or Gradient Background */}
        <div className="absolute inset-0">
          {profile.coverImage ? (
            <img
              src={profile.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
              onError={() => {
                setProfile({ ...profile, coverImage: undefined })
                toast.error("Error", {
                  description: "Failed to load cover image. Reverting to default background.",
                })
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-black/20">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
                <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white/10 rounded-full"></div>
              </div>
            </div>
          )}
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Cover Popover Button */}
        <div className="absolute top-4 right-4 z-20">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                id="cover-options"
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm p-2"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-md shadow-lg">
              <div className="flex flex-col gap-1">
                <Button
                  id="add-or-change-cover"
                  variant="ghost"
                  size="sm"
                  onClick={() => coverFileInputRef.current?.click()}
                  className="justify-start text-gray-900 hover:bg-gray-100"
                >
                  {profile.coverImage ? "Change Cover" : "Add Cover"}
                </Button>
                {profile.coverImage && (
                  <Button
                    id="remove-cover"
                    variant="ghost"
                    size="sm"
                    onClick={removeCoverImage}
                    className="justify-start text-red-600 hover:bg-red-50"
                  >
                    Remove Cover
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Header */}
        <div className="relative z-10 container mx-auto px-6 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Profile</h1>
              <p className="text-white/90">Manage your account and view your progress</p>
            </div>
          </div>
        </div>

        {/* Hidden file input for cover image */}
        <input
          type="file"
          ref={coverFileInputRef}
          onChange={handleCoverUpload}
          accept="image/png,image/jpeg,image/gif"
          className="hidden"
        />
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-6 -mt-24 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg rounded-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <Avatar className="h-32 w-32 ring-4 ring-white shadow-lg">
                      <AvatarImage src={profile.avatar} alt={profile.name} className="object-cover" />
                      <AvatarFallback className="text-3xl">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        id="edit-avatar"
                        size="sm"
                        variant="outline"
                        onClick={() => avatarFileInputRef.current?.click()}
                        className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full p-0 bg-white shadow-md hover:bg-gray-50"
                      >
                        <Camera className="h-5 w-5" />
                      </Button>
                    )}
                  </div>

                  <input
                    type="file"
                    ref={avatarFileInputRef}
                    onChange={handleAvatarUpload}
                    accept="image/png,image/jpeg,image/gif"
                    className="hidden"
                  />
                  
                  <div className="flex items-center gap-2 mb-3">
                    {isEditing ? (
                      <Input
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="text-2xl font-bold text-center border-0 bg-transparent focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                        <Button
                          id="edit-profile"
                          size="sm"
                          variant="ghost"
                          onClick={() => setIsEditing(true)}
                          className="p-1 h-8 w-8"
                        >
                          <Edit className="h-4 w-4 text-gray-500" />
                        </Button>
                      </>
                    )}
                  </div>

                  <div className="mb-3">
                    {isEditing ? (
                      <Input
                        value={profile.username || '@sudeisfed'}
                        onChange={(e) => setProfile({...profile, username: e.target.value})}
                        className="text-gray-500 text-center border-0 bg-transparent focus:ring-2 focus:ring-blue-500"
                        placeholder="@username"
                      />
                    ) : (
                      <p className="text-gray-500 font-medium">@{profile.username || 'sudeisfed'}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    {isEditing ? (
                      <Input
                        value={profile.role || 'Fullstack Learner'}
                        onChange={(e) => setProfile({...profile, role: e.target.value})}
                        className="text-blue-600 font-medium text-center border-0 bg-transparent focus:ring-2 focus:ring-blue-500"
                        placeholder="Your role or expertise"
                      />
                    ) : (
                      <p className="text-blue-600 font-medium">{profile.role || 'Fullstack Learner'}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    {isEditing ? (
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        className="w-full text-gray-600 text-sm text-center border-0 bg-transparent focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={3}
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <p className="text-gray-600 text-sm leading-relaxed">{profile.bio}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-500 text-sm">
                      Member since {profile.joinDate}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-6">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                      Level {profile.level}
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                      {profile.studyStreak} day streak
                    </Badge>
                  </div>

                  <div className="w-full space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {isEditing ? (
                        <Input
                          value={profile.location}
                          onChange={(e) => setProfile({...profile, location: e.target.value})}
                          className="text-gray-600 border-0 bg-transparent focus:ring-2 focus:ring-blue-500 p-0"
                        />
                      ) : (
                        <span className="text-gray-600">{profile.location}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {isEditing ? (
                        <Input
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="text-gray-600 border-0 bg-transparent focus:ring-2 focus:ring-blue-500 p-0"
                        />
                      ) : (
                        <span className="text-gray-600">{profile.email}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      {isEditing ? (
                        <Input
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          className="text-gray-600 border-0 bg-transparent focus:ring-2 focus:ring-blue-500 p-0"
                        />
                      ) : (
                        <span className="text-gray-600">{profile.phone}</span>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <Button 
                      id="save-changes"
                      onClick={() => setIsEditing(false)}
                      className="mt-6 w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Save Changes
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats and Progress */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg rounded-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Level Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Level {profile.level}</span>
                    <span className="text-sm text-gray-500">{profile.experience} / {nextLevelExp} XP</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progressToNextLevel}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {nextLevelExp - profile.experience} XP needed for next level
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="shadow-lg border-0 rounded-xl bg-white/95 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center">
                    <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
                    <h3 className="text-2xl font-bold text-gray-900">{profile.totalQuestions}</h3>
                    <p className="text-sm text-gray-600">Questions Asked</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg border-0 rounded-xl bg-white/95 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center">
                    <User className="h-8 w-8 text-green-600 mb-2" />
                    <h3 className="text-2xl font-bold text-gray-900">{profile.sessionsJoined || 24}</h3>
                    <p className="text-sm text-gray-600">Sessions Joined</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg border-0 rounded-xl bg-white/95 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center">
                    <Clock className="h-8 w-8 text-orange-600 mb-2" />
                    <h3 className="text-2xl font-bold text-gray-900">{profile.ongoingSessions || 3}</h3>
                    <p className="text-sm text-gray-600">Ongoing Sessions</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg border-0 rounded-xl bg-white/95 backdrop-blur-sm hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center">
                    <Bookmark className="h-8 w-8 text-purple-600 mb-2" />
                    <h3 className="text-2xl font-bold text-gray-900">{profile.bookmarksSaved || 18}</h3>
                    <p className="text-sm text-gray-600">Bookmarks Saved</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}