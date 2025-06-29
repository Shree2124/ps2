/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import { useDashboard } from "@/hooks/useDashboard"
import { ResponsiveHeader } from "@/components/layouts/ResponsiveHeader"
import { ResponsiveSidebar } from "@/components/layouts/ResponsiveSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Bell, Shield, Palette, Database, Key, Mail, Phone, Building, Save, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useTheme } from "@/contexts/ThemeContext"

export default function SettingsPage() {
  const { user, userLoading } = useDashboard()
  const { isDark, toggleTheme } = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  })

  return (
    <div className="bg-background min-h-screen">
      <ResponsiveSidebar />
      <div className="md:pl-64 lg:pl-72">
        <ResponsiveHeader
          user={user}
          userLoading={userLoading}
          currentPath="/settings"
          title="Settings"
          subtitle="Configure your dashboard preferences"
        />
        <main className="p-4 sm:p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 sm:space-y-6">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid grid-cols-2 lg:grid-cols-5 w-full">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  <span className="hidden sm:inline">Appearance</span>
                </TabsTrigger>
                <TabsTrigger value="integrations" className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  <span className="hidden sm:inline">Integrations</span>
                </TabsTrigger>
              </TabsList>

              {/* Profile Settings */}
              <TabsContent value="profile">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your personal information and profile details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                          <AvatarFallback className="text-lg">
                            {user?.name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <Button variant="outline">Change Avatar</Button>
                          <p className="mt-1 text-muted-foreground text-xs">JPG, PNG or GIF. Max size 2MB.</p>
                        </div>
                      </div>

                      <div className="gap-4 grid md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="Sarah" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Johnson" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2 transform" />
                          <Input id="email" type="email" className="pl-10" defaultValue="sarah.johnson@company.com" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2 transform" />
                          <Input id="phone" type="tel" className="pl-10" defaultValue="+1 (555) 123-4567" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <div className="relative">
                          <Building className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2 transform" />
                          <Input id="company" className="pl-10" defaultValue="SalesPro Analytics" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select defaultValue="sales-manager">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sales-manager">Sales Manager</SelectItem>
                            <SelectItem value="sales-rep">Sales Representative</SelectItem>
                            <SelectItem value="admin">Administrator</SelectItem>
                            <SelectItem value="analyst">Data Analyst</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button>
                        <Save className="mr-2 w-4 h-4" />
                        Save Changes
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Notifications Settings */}
              <TabsContent value="notifications">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Choose how you want to be notified about updates and activities</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="space-y-0.5">
                            <Label>Email Notifications</Label>
                            <p className="text-muted-foreground text-sm">Receive notifications via email</p>
                          </div>
                          <Switch
                            checked={notifications.email}
                            onCheckedChange={(checked: any) => setNotifications((prev) => ({ ...prev, email: checked }))}
                          />
                        </div>

                        <Separator />

                        <div className="flex justify-between items-center">
                          <div className="space-y-0.5">
                            <Label>Push Notifications</Label>
                            <p className="text-muted-foreground text-sm">Receive push notifications in your browser</p>
                          </div>
                          <Switch
                            checked={notifications.push}
                            onCheckedChange={(checked: any) => setNotifications((prev) => ({ ...prev, push: checked }))}
                          />
                        </div>

                        <Separator />

                        <div className="flex justify-between items-center">
                          <div className="space-y-0.5">
                            <Label>SMS Notifications</Label>
                            <p className="text-muted-foreground text-sm">Receive important updates via SMS</p>
                          </div>
                          <Switch
                            checked={notifications.sms}
                            onCheckedChange={(checked: any) => setNotifications((prev) => ({ ...prev, sms: checked }))}
                          />
                        </div>

                        <Separator />

                        <div className="flex justify-between items-center">
                          <div className="space-y-0.5">
                            <Label>Marketing Communications</Label>
                            <p className="text-muted-foreground text-sm">
                              Receive product updates and marketing emails
                            </p>
                          </div>
                          <Switch
                            checked={notifications.marketing}
                            onCheckedChange={(checked: any) => setNotifications((prev) => ({ ...prev, marketing: checked }))}
                          />
                        </div>
                      </div>

                      <Button>
                        <Save className="mr-2 w-4 h-4" />
                        Save Preferences
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>Manage your account security and authentication</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <div className="relative">
                            <Input
                              id="currentPassword"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter current password"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="top-1/2 right-2 absolute -translate-y-1/2 transform"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" placeholder="Enter new password" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="space-y-0.5">
                            <Label>Two-Factor Authentication</Label>
                            <p className="text-muted-foreground text-sm">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Button variant="outline">
                            <Key className="mr-2 w-4 h-4" />
                            Enable 2FA
                          </Button>
                        </div>
                      </div>

                      <Button>
                        <Save className="mr-2 w-4 h-4" />
                        Update Password
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Appearance Settings */}
              <TabsContent value="appearance">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Appearance Settings</CardTitle>
                      <CardDescription>Customize the look and feel of your dashboard</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="space-y-0.5">
                            <Label>Dark Mode</Label>
                            <p className="text-muted-foreground text-sm">Toggle between light and dark themes</p>
                          </div>
                          <Switch checked={isDark} onCheckedChange={toggleTheme} />
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <Label>Language</Label>
                          <Select defaultValue="en">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                              <SelectItem value="de">German</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Timezone</Label>
                          <Select defaultValue="utc-5">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                              <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                              <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                              <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Date Format</Label>
                          <Select defaultValue="mm-dd-yyyy">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                              <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                              <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button>
                        <Save className="mr-2 w-4 h-4" />
                        Save Preferences
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Integrations Settings */}
              <TabsContent value="integrations">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Integrations</CardTitle>
                      <CardDescription>Connect your dashboard with external services and tools</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        {[
                          { name: "Salesforce", description: "Sync your sales data", connected: true },
                          { name: "HubSpot", description: "Import contacts and deals", connected: false },
                          { name: "Slack", description: "Get notifications in Slack", connected: true },
                          { name: "Google Analytics", description: "Track website performance", connected: false },
                          { name: "Zapier", description: "Automate workflows", connected: false },
                        ].map((integration) => (
                          <div
                            key={integration.name}
                            className="flex justify-between items-center p-4 border rounded-lg"
                          >
                            <div className="space-y-1">
                              <h4 className="font-medium">{integration.name}</h4>
                              <p className="text-muted-foreground text-sm">{integration.description}</p>
                            </div>
                            <Button variant={integration.connected ? "destructive" : "default"}>
                              {integration.connected ? "Disconnect" : "Connect"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
