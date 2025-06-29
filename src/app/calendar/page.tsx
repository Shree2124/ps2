/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { motion } from "framer-motion"
import { useDashboard } from "@/hooks/useDashboard"
import { ResponsiveHeader } from "@/components/layouts/ResponsiveHeader"
import { ResponsiveSidebar } from "@/components/layouts/ResponsiveSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Plus, Users, Video, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const eventsData = [
  {
    id: "1",
    title: "Sales Team Meeting",
    time: "09:00 AM",
    duration: "1 hour",
    type: "meeting",
    attendees: 8,
    location: "Conference Room A",
    color: "blue",
  },
  {
    id: "2",
    title: "Client Presentation",
    time: "11:30 AM",
    duration: "45 minutes",
    type: "presentation",
    attendees: 5,
    location: "Virtual",
    color: "green",
  },
  {
    id: "3",
    title: "Product Demo",
    time: "02:00 PM",
    duration: "30 minutes",
    type: "demo",
    attendees: 12,
    location: "Demo Room",
    color: "purple",
  },
  {
    id: "4",
    title: "Team Standup",
    time: "04:30 PM",
    duration: "15 minutes",
    type: "standup",
    attendees: 6,
    location: "Virtual",
    color: "orange",
  },
]

const upcomingEvents = [
  {
    id: "5",
    title: "Quarterly Review",
    date: "Tomorrow",
    time: "10:00 AM",
    attendees: ["Sarah J.", "Mike C.", "Emily D."],
  },
  {
    id: "6",
    title: "New Client Onboarding",
    date: "Jan 18",
    time: "02:00 PM",
    attendees: ["John D.", "Lisa B."],
  },
  {
    id: "7",
    title: "Product Launch Meeting",
    date: "Jan 20",
    time: "09:00 AM",
    attendees: ["Team Lead", "Marketing"],
  },
]

const getEventTypeColor = (type: string) => {
  switch (type) {
    case "meeting":
      return "bg-blue-500"
    case "presentation":
      return "bg-green-500"
    case "demo":
      return "bg-purple-500"
    case "standup":
      return "bg-orange-500"
    default:
      return "bg-gray-500"
  }
}

export default function CalendarPage() {
  const { user, userLoading } = useDashboard()
  const [currentDate, setCurrentDate] = useState(new Date())

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="bg-background min-h-screen">
      <ResponsiveSidebar />
      <div className="md:pl-64 lg:pl-72">
        <ResponsiveHeader
          user={user}
          userLoading={userLoading}
          currentPath="/calendar"
          title="Calendar"
          subtitle="Schedule and manage your events"
        />
        <main className="p-4 sm:p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 sm:space-y-6">
            {/* Calendar Stats */}
            <div className="gap-3 sm:gap-4 md:gap-6 grid grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Today's Events", value: "4", change: "+2", icon: Calendar, color: "blue" },
                { title: "This Week", value: "18", change: "+5", icon: Clock, color: "green" },
                { title: "Meetings", value: "12", change: "+3", icon: Users, color: "purple" },
                { title: "Virtual Events", value: "6", change: "+1", icon: Video, color: "orange" },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                      <CardTitle className="font-medium text-muted-foreground text-xs sm:text-sm">
                        {item.title}
                      </CardTitle>
                      <item.icon className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="font-bold text-lg sm:text-2xl">{item.value}</div>
                      <p className="font-medium text-green-600 text-xs">{item.change} from last week</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Calendar Header */}
            <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="font-bold text-2xl">{formatDate(currentDate)}</h2>
                <p className="text-muted-foreground">Manage your schedule and upcoming events</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button>
                  <Plus className="mr-2 w-4 h-4" />
                  New Event
                </Button>
              </div>
            </div>

            {/* Calendar Content */}
            <div className="gap-4 sm:gap-6 grid grid-cols-1 lg:grid-cols-3">
              {/* Today's Schedule */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Today&apos;s Schedule</CardTitle>
                      <CardDescription>Your events and meetings for today</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {eventsData.map((event, index) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="flex items-center space-x-4 hover:bg-muted/50 p-4 border rounded-lg transition-colors"
                          >
                            <div className={`w-3 h-12 rounded-full ${getEventTypeColor(event.type)}`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <h4 className="font-semibold text-sm truncate">{event.title}</h4>
                                <Badge variant="outline" className="ml-2">
                                  {event.type}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4 mt-1 text-muted-foreground text-xs">
                                <div className="flex items-center">
                                  <Clock className="mr-1 w-3 h-3" />
                                  {event.time} ({event.duration})
                                </div>
                                <div className="flex items-center">
                                  <Users className="mr-1 w-3 h-3" />
                                  {event.attendees} attendees
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="mr-1 w-3 h-3" />
                                  {event.location}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Upcoming Events */}
              <div className="lg:col-span-1">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Events</CardTitle>
                      <CardDescription>Next few days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingEvents.map((event, index) => (
                          <div key={event.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-sm">{event.title}</h4>
                            </div>
                            <div className="text-muted-foreground text-xs">
                              {event.date} at {event.time}
                            </div>
                            <div className="flex items-center space-x-1">
                              {event.attendees.slice(0, 3).map((attendee, i) => (
                                <Avatar key={i} className="w-6 h-6">
                                  <AvatarImage src={`/placeholder.svg?height=24&width=24`} />
                                  <AvatarFallback className="text-xs">
                                    {attendee
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              {event.attendees.length > 3 && (
                                <div className="flex justify-center items-center bg-muted rounded-full w-6 h-6 text-xs">
                                  +{event.attendees.length - 3}
                                </div>
                              )}
                            </div>
                            {index < upcomingEvents.length - 1 && <hr className="my-3" />}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
