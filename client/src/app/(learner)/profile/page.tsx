"use client"

import { useState } from "react"
import { User, Edit, Camera, Calendar, MapPin, Mail, Phone, BookOpen, Target, Trophy, Clock, Star, Plus, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
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
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  earnedDate: string
}

const availableTechnologies = [
  "JavaScript", "React", "Vue.js", "Angular", "Node.js", "Python", "Java", "C++", "C#", "PHP",
  "Ruby", "Go", "Rust", "Swift", "Kotlin", "TypeScript", "Dart", "Flutter", "React Native",
  "Next.js", "Nuxt.js", "Express.js", "Django", "Flask", "Spring Boot", "Laravel", "ASP.NET",
  "MongoDB", "PostgreSQL", "MySQL", "Redis", "GraphQL", "REST API", "Docker", "Kubernetes",
  "AWS", "Azure", "Google Cloud", "Firebase", "Data Structures", "Algorithms", "Machine Learning",
  "Artificial Intelligence", "Data Science", "DevOps", "CI/CD", "Git", "Linux", "Blockchain",
  "Web3", "Cybersecurity", "UI/UX Design", "Figma", "Adobe XD", "Sketch", "HTML", "CSS", "SASS",
  "Bootstrap", "Tailwind CSS", "Material-UI", "Ant Design", "Chakra UI", "Redux", "Zustand",
  "MobX", "Jest", "Cypress", "Selenium", "JUnit", "PyTest", "Mocha", "Chai", "ESLint", "Prettier"
]

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
  ]
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [showSubjectsModal, setShowSubjectsModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [customSubject, setCustomSubject] = useState("")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(profile.subjects)

  const accuracy = Math.round((profile.correctAnswers / profile.totalQuestions) * 100)
  const nextLevelExp = 1500
  const progressToNextLevel = Math.round((profile.experience / nextLevelExp) * 100)

  const filteredTechnologies = availableTechnologies.filter(tech =>
    tech.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedSubjects.includes(tech)
  )

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

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Manage your account and view your progress</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)}>
          <Edit className="h-4 w-4 mr-2" />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="shadow-xs rounded-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="text-2xl">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-1">{profile.name}</h2>
                <p className="text-gray-600 mb-3">{profile.email}</p>
                
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Level {profile.level}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {profile.studyStreak} day streak
                  </Badge>
                </div>

                <p className="text-gray-600 text-sm mb-4">{profile.bio}</p>

                <div className="w-full space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Joined {profile.joinDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Level Progress */}
          <Card className="shadow-xs rounded-sm">
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
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressToNextLevel}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">
                  {nextLevelExp - profile.experience} XP needed for next level
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="shadow-xs rounded-sm">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{profile.totalQuestions}</div>
                <p className="text-xs text-gray-600">Questions Answered</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-xs rounded-sm">

              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{accuracy}%</div>
                <p className="text-xs text-gray-600">Accuracy Rate</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-xs rounded-sm">

              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{profile.studyStreak}</div>
                <p className="text-xs text-gray-600">Day Streak</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-xs rounded-sm">

              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{profile.achievements}</div>
                <p className="text-xs text-gray-600">Achievements</p>
              </CardContent>
            </Card>
          </div>

          {/* Subjects */}
          <Card className="shadow-xs rounded-sm">

            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Subjects</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowSubjectsModal(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  More Tags
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {profile.subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-gradient-to-r from-orange-50 to-orange-50 text-orange-500 border border-orange-200 hover:from-orange-100 hover:to-red-100 transition-all duration-200 cursor-pointer"
                  >
                    <span className="mr-1"></span>
                    {subject}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="shadow-xs rounded-sm">

            <CardHeader>
              <CardTitle>Badges & Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.badges.map((badge) => (
                  <div key={badge.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="text-2xl">{badge.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{badge.name}</h4>
                      <p className="text-sm text-gray-600">{badge.description}</p>
                      <p className="text-xs text-gray-500 mt-1">Earned {badge.earnedDate}</p>
                    </div>
                    <Badge className={badge.color}>Earned</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Subjects Modal */}
      {showSubjectsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Manage Subjects</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSubjectsModal(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Selected Subjects */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Your Subjects</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSubjects.map((subject, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-700 border border-blue-200"
                    >
                      <span className="mr-1">📚</span>
                      {subject}
                      <button
                        onClick={() => removeSubject(subject)}
                        className="ml-2 hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Add Custom Subject */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Add Custom Subject</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter custom subject..."
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Button onClick={addCustomSubject} disabled={!customSubject.trim()}>
                    Add
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Available Technologies */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Available Technologies</h3>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search technologies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {filteredTechnologies.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => addSubject(tech)}
                      className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">💻</span>
                        <span className="font-medium text-gray-900">{tech}</span>
                        <Plus className="h-4 w-4 text-gray-400 ml-auto" />
                      </div>
                    </button>
                  ))}
                  {filteredTechnologies.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No technologies found</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedSubjects(profile.subjects)
                  setShowSubjectsModal(false)
                }}
              >
                Cancel
              </Button>
              <Button onClick={saveSubjects}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
