"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Car,
  Users,
  FileText,
  DollarSign,
  Settings,
  Phone,
  Mail,
  MapPin,
  Plus,
  Trash2,
  Eye,
  Shield,
  CheckCircle,
  Clock,
} from "lucide-react"

type UserRole = "guest" | "customer" | "staff" | "admin"
type UIState =
  | "company"
  | "auth"
  | "customer-home"
  | "car-registration"
  | "application-status"
  | "staff-dashboard"
  | "admin-dashboard"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

interface CoOwner {
  id: string
  name: string
  email: string
  phone: string
  licenseNumber: string
  ownershipPercent: number
}

interface CarApplication {
  id: string
  carModel: string
  totalPrice: string
  coOwners: CoOwner[]
  status: "pending" | "contract-sent" | "completed"
  createdAt: string
}

export default function CoreflowApp() {
  const [currentUI, setCurrentUI] = useState<UIState>("company")
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [carApplication, setCarApplication] = useState<CarApplication | null>(null)

  const renderCurrentUI = () => {
    switch (currentUI) {
      case "company":
        return <CompanyWebsite onNavigate={setCurrentUI} currentUser={currentUser} />
      case "auth":
        return <AuthPage onNavigate={setCurrentUI} onLogin={setCurrentUser} />
      case "customer-home":
        return <CustomerHome onNavigate={setCurrentUI} currentUser={currentUser} />
      case "car-registration":
        return <CarRegistration onNavigate={setCurrentUI} onSubmit={setCarApplication} />
      case "application-status":
        return <ApplicationStatus onNavigate={setCurrentUI} application={carApplication} />
      case "staff-dashboard":
        return <StaffDashboard onNavigate={setCurrentUI} />
      case "admin-dashboard":
        return <AdminDashboard onNavigate={setCurrentUI} />
      default:
        return <CompanyWebsite onNavigate={setCurrentUI} currentUser={currentUser} />
    }
  }

  return <div className="min-h-screen bg-background">{renderCurrentUI()}</div>
}

// UI1: Company Website
function CompanyWebsite({ onNavigate, currentUser }: { onNavigate: (ui: UIState) => void; currentUser: User | null }) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Car className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">EcoShare</h1>
            </div>
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <>
                  <span className="text-sm text-muted-foreground">Xin chào, {currentUser.name}</span>
                  {currentUser.role === "customer" && (
                    <Button onClick={() => onNavigate("car-registration")} className="bg-primary hover:bg-primary/90">
                      Đăng ký xe
                    </Button>
                  )}
                  {currentUser.role === "staff" && (
                    <Button onClick={() => onNavigate("staff-dashboard")} variant="outline">
                      Dashboard Staff
                    </Button>
                  )}
                  {currentUser.role === "admin" && (
                    <Button onClick={() => onNavigate("admin-dashboard")} variant="outline">
                      Dashboard Admin
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => onNavigate("auth")}>
                    Đăng nhập
                  </Button>
                  <Button onClick={() => onNavigate("auth")} className="bg-primary hover:bg-primary/90">
                    Đăng ký
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Chia sẻ xe điện thông minh
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Tham gia cùng nhóm đồng sở hữu xe điện. Tiết kiệm chi phí, bảo vệ môi trường, và trải nghiệm công nghệ vận
            chuyển hiện đại.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => onNavigate("auth")} className="bg-primary hover:bg-primary/90">
              Bắt đầu ngay
            </Button>
            <Button size="lg" variant="outline">
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Tại sao chọn EcoShare?</h2>
            <p className="text-lg text-muted-foreground">Giải pháp chia sẻ xe điện toàn diện</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Tiết kiệm chi phí</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Chia sẻ chi phí mua xe, bảo dưỡng và vận hành với các thành viên khác
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Pháp lý minh bạch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Hợp đồng điện tử rõ ràng, quyền lợi được bảo vệ hoàn toàn</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Car className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Xe điện hiện đại</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Đa dạng mẫu xe điện mới nhất từ các thương hiệu uy tín</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Car Models */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Các mẫu xe điện</h2>
            <p className="text-lg text-muted-foreground">Lựa chọn xe phù hợp với nhu cầu của bạn</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "VinFast VF5", price: "450 triệu", range: "285km", image: "/placeholder-v2glt.png" },
              { name: "VinFast VF6", price: "650 triệu", range: "423km", image: "/placeholder-e6nu8.png" },
              { name: "VinFast VF7", price: "850 triệu", range: "450km", image: "/placeholder-xpsjm.png" },
            ].map((car, index) => (
              <Card key={index} className="overflow-hidden">
                <img src={car.image || "/placeholder.svg"} alt={car.name} className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle>{car.name}</CardTitle>
                  <CardDescription>Tầm hoạt động: {car.range}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">{car.price}</span>
                    <Button size="sm" onClick={() => onNavigate("auth")}>
                      Đăng ký
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-6 w-6" />
                <span className="text-xl font-bold">EcoShare</span>
              </div>
              <p className="text-sm opacity-80">Nền tảng chia sẻ xe điện hàng đầu Việt Nam</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liên hệ</h4>
              <div className="space-y-2 text-sm opacity-80">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>1900 1234</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@ecoshare.vn</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Hà Nội, Việt Nam</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Dịch vụ</h4>
              <div className="space-y-2 text-sm opacity-80">
                <p>Chia sẻ xe điện</p>
                <p>Hợp đồng điện tử</p>
                <p>Bảo dưỡng xe</p>
                <p>Hỗ trợ 24/7</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Về chúng tôi</h4>
              <div className="space-y-2 text-sm opacity-80">
                <p>Giới thiệu</p>
                <p>Tin tức</p>
                <p>Tuyển dụng</p>
                <p>Điều khoản</p>
              </div>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-60">
            © 2024 EcoShare. Tất cả quyền được bảo lưu.
          </div>
        </div>
      </footer>
    </div>
  )
}

// UI2: Authentication Page
function AuthPage({ onNavigate, onLogin }: { onNavigate: (ui: UIState) => void; onLogin: (user: User) => void }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Handle staff login
    if (formData.email === "staff1" && formData.password === "123123") {
      onLogin({ id: "staff1", name: "Nhân viên A", email: "staff1@ecoshare.vn", role: "staff" })
      onNavigate("staff-dashboard")
      return
    }

    // Handle admin login
    if (formData.email === "admin1" && formData.password === "12341234") {
      onLogin({ id: "admin1", name: "Quản trị viên", email: "admin1@ecoshare.vn", role: "admin" })
      onNavigate("admin-dashboard")
      return
    }

    // For regular users, validate email format
    if (!formData.email.includes("@")) {
      alert("Vui lòng nhập email hợp lệ cho tài khoản khách hàng")
      return
    }

    // Handle customer registration/login
    const user: User = {
      id: "customer1",
      name: formData.name || "Khách hàng",
      email: formData.email,
      role: "customer",
    }
    onLogin(user)
    onNavigate("customer-home")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">EcoShare</span>
          </div>
          <CardTitle>{isLogin ? "Đăng nhập" : "Đăng ký tài khoản"}</CardTitle>
          <CardDescription>{isLogin ? "Chào mừng bạn quay trở lại" : "Tạo tài khoản để bắt đầu"}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Họ và tên</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nhập họ và tên"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">Email / Tên đăng nhập</Label>
              <Input
                id="email"
                type="text"
                placeholder="Email hoặc tên đăng nhập"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">Staff: staff1/123123 | Admin: admin1/12341234</p>
            </div>

            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Nhập số điện thoại"
                    required={!isLogin}
                  />
                </div>

                <div>
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Nhập địa chỉ"
                    required={!isLogin}
                  />
                </div>
              </>
            )}

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              {isLogin ? "Đăng nhập" : "Đăng ký"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-sm text-primary hover:underline">
              {isLogin ? "Chưa có tài khoản? Đăng ký ngay" : "Đã có tài khoản? Đăng nhập"}
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => onNavigate("company")}
              className="text-sm text-muted-foreground hover:underline"
            >
              ← Quay về trang chủ
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// UI3: Customer Home (after login)
function CustomerHome({ onNavigate, currentUser }: { onNavigate: (ui: UIState) => void; currentUser: User | null }) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Car className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">EcoShare</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Xin chào, {currentUser?.name}</span>
              <Button onClick={() => onNavigate("car-registration")} className="bg-primary hover:bg-primary/90">
                Đăng ký xe mới
              </Button>
              <Button variant="outline" onClick={() => onNavigate("application-status")}>
                Đơn của tôi
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard của tôi</h2>
          <p className="text-muted-foreground">Quản lý các đơn đăng ký và xe của bạn</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate("car-registration")}
          >
            <CardHeader className="text-center">
              <Plus className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>Đăng ký xe mới</CardTitle>
              <CardDescription>Tạo nhóm đồng sở hữu xe điện</CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate("application-status")}
          >
            <CardHeader className="text-center">
              <FileText className="h-12 w-12 text-accent mx-auto mb-2" />
              <CardTitle>Đơn của tôi</CardTitle>
              <CardDescription>Theo dõi trạng thái đơn đăng ký</CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-chart-3 mx-auto mb-2" />
              <CardTitle>Nhóm của tôi</CardTitle>
              <CardDescription>Quản lý các nhóm đã tham gia</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Đơn đăng ký gần đây</CardTitle>
            <CardDescription>Theo dõi tiến độ các đơn đăng ký của bạn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">VinFast VF6 - Nhóm 4 người</p>
                  <p className="text-sm text-muted-foreground">Đăng ký ngày 15/12/2024</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Chờ hợp đồng</Badge>
                  <Button size="sm" variant="outline">
                    Xem chi tiết
                  </Button>
                </div>
              </div>

              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Chưa có đơn đăng ký nào khác</p>
                <Button className="mt-4 bg-primary hover:bg-primary/90" onClick={() => onNavigate("car-registration")}>
                  Đăng ký xe ngay
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// UI4: Car Registration Form
function CarRegistration({
  onNavigate,
  onSubmit,
}: { onNavigate: (ui: UIState) => void; onSubmit: (app: CarApplication) => void }) {
  const [selectedCar, setSelectedCar] = useState("")
  const [ownershipPercent, setOwnershipPercent] = useState(25)
  const [coOwners, setCoOwners] = useState<CoOwner[]>([])
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    licenseNumber: "",
  })

  const carModels = [
    { id: "vf5", name: "VinFast VF5", price: "450.000.000", range: "285km" },
    { id: "vf6", name: "VinFast VF6", price: "650.000.000", range: "423km" },
    { id: "vf7", name: "VinFast VF7", price: "850.000.000", range: "450km" },
  ]

  const addCoOwner = () => {
    const newCoOwner: CoOwner = {
      id: Date.now().toString(),
      name: "",
      email: "",
      phone: "",
      licenseNumber: "",
      ownershipPercent: 25,
    }
    setCoOwners([...coOwners, newCoOwner])
  }

  const removeCoOwner = (id: string) => {
    setCoOwners(coOwners.filter((owner) => owner.id !== id))
  }

  const updateCoOwner = (id: string, field: keyof CoOwner, value: string | number) => {
    setCoOwners(coOwners.map((owner) => (owner.id === id ? { ...owner, [field]: value } : owner)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const selectedCarModel = carModels.find((car) => car.id === selectedCar)

    const application: CarApplication = {
      id: Date.now().toString(),
      carModel: selectedCarModel?.name || "",
      totalPrice: selectedCarModel?.price || "",
      coOwners: [
        {
          id: "main",
          name: personalInfo.name,
          email: personalInfo.email,
          phone: personalInfo.phone,
          licenseNumber: personalInfo.licenseNumber,
          ownershipPercent: ownershipPercent,
        },
        ...coOwners,
      ],
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    onSubmit(application)
    onNavigate("application-status")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Car className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Đăng ký xe điện</h1>
            </div>
            <Button variant="outline" onClick={() => onNavigate("customer-home")}>
              ← Quay lại
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
              <CardDescription>Nhập thông tin cá nhân của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Họ và tên *</Label>
                  <Input
                    id="name"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="license">Số giấy phép lái xe *</Label>
                  <Input
                    id="license"
                    value={personalInfo.licenseNumber}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, licenseNumber: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Địa chỉ *</Label>
                <Textarea
                  id="address"
                  value={personalInfo.address}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="ownership">Tỷ lệ sở hữu (%)</Label>
                <Input
                  id="ownership"
                  type="number"
                  min="1"
                  max="100"
                  value={ownershipPercent}
                  onChange={(e) => setOwnershipPercent(Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Car Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Chọn xe điện</CardTitle>
              <CardDescription>Lựa chọn mẫu xe phù hợp với nhóm của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {carModels.map((car) => (
                  <div
                    key={car.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedCar === car.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedCar(car.id)}
                  >
                    <img
                      src={`/abstract-geometric-shapes.png?height=150&width=200&query=${car.name} electric car`}
                      alt={car.name}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <h3 className="font-semibold">{car.name}</h3>
                    <p className="text-sm text-muted-foreground">Tầm hoạt động: {car.range}</p>
                    <p className="text-lg font-bold text-primary mt-2">{car.price}đ</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Co-owners */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Đồng sở hữu</CardTitle>
                <CardDescription>Thêm thông tin các thành viên khác trong nhóm</CardDescription>
              </div>
              <Button type="button" onClick={addCoOwner} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Thêm đồng sở hữu
              </Button>
            </CardHeader>
            <CardContent>
              {coOwners.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Chưa có đồng sở hữu nào</p>
                  <p className="text-sm">Nhấn "Thêm đồng sở hữu" để thêm thành viên</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {coOwners.map((coOwner, index) => (
                    <div key={coOwner.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Đồng sở hữu #{index + 1}</h4>
                        <Button type="button" variant="outline" size="sm" onClick={() => removeCoOwner(coOwner.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Họ và tên</Label>
                          <Input
                            value={coOwner.name}
                            onChange={(e) => updateCoOwner(coOwner.id, "name", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input
                            type="email"
                            value={coOwner.email}
                            onChange={(e) => updateCoOwner(coOwner.id, "email", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label>Số điện thoại</Label>
                          <Input
                            value={coOwner.phone}
                            onChange={(e) => updateCoOwner(coOwner.id, "phone", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label>Số giấy phép lái xe</Label>
                          <Input
                            value={coOwner.licenseNumber}
                            onChange={(e) => updateCoOwner(coOwner.id, "licenseNumber", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label>Tỷ lệ sở hữu (%)</Label>
                          <Input
                            type="number"
                            min="1"
                            max="100"
                            value={coOwner.ownershipPercent}
                            onChange={(e) => updateCoOwner(coOwner.id, "ownershipPercent", Number(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => onNavigate("customer-home")}>
              Hủy
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={!selectedCar}>
              Gửi đơn đăng ký
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// UI5: Application Status
function ApplicationStatus({
  onNavigate,
  application,
}: { onNavigate: (ui: UIState) => void; application: CarApplication | null }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Car className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Trạng thái đơn đăng ký</h1>
            </div>
            <Button variant="outline" onClick={() => onNavigate("customer-home")}>
              ← Quay lại
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {application ? (
          <div className="space-y-6">
            {/* Application Overview */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Đơn đăng ký #{application.id}</CardTitle>
                    <CardDescription>
                      Đăng ký ngày {new Date(application.createdAt).toLocaleDateString("vi-VN")}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">
                    <Clock className="h-4 w-4 mr-1" />
                    Đang xử lý
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Thông tin xe</h4>
                    <p className="text-sm text-muted-foreground">Mẫu xe: {application.carModel}</p>
                    <p className="text-sm text-muted-foreground">Giá trị: {application.totalPrice}đ</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Nhóm đồng sở hữu</h4>
                    <p className="text-sm text-muted-foreground">Số thành viên: {application.coOwners.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Tiến độ xử lý</CardTitle>
                <CardDescription>Theo dõi các bước xử lý đơn đăng ký</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Đơn đăng ký đã được gửi</p>
                      <p className="text-sm text-muted-foreground">Hoàn thành</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-accent" />
                    <div>
                      <p className="font-medium">Staff đang xem xét</p>
                      <p className="text-sm text-muted-foreground">Đang xử lý</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-5 w-5 rounded-full border-2 border-muted" />
                    <div>
                      <p className="font-medium text-muted-foreground">Tạo hợp đồng điện tử</p>
                      <p className="text-sm text-muted-foreground">Chờ xử lý</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-5 w-5 rounded-full border-2 border-muted" />
                    <div>
                      <p className="font-medium text-muted-foreground">Gửi hợp đồng qua email</p>
                      <p className="text-sm text-muted-foreground">Chờ xử lý</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-5 w-5 rounded-full border-2 border-muted" />
                    <div>
                      <p className="font-medium text-muted-foreground">Hoàn thành đăng ký</p>
                      <p className="text-sm text-muted-foreground">Chờ xử lý</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Co-owners Status */}
            <Card>
              <CardHeader>
                <CardTitle>Trạng thái đồng sở hữu</CardTitle>
                <CardDescription>Thông tin và trạng thái e-contract của các thành viên</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {application.coOwners.map((coOwner, index) => (
                    <div key={coOwner.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{coOwner.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {coOwner.email} • {coOwner.ownershipPercent}% sở hữu
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          <Mail className="h-3 w-3 mr-1" />
                          Chờ gửi e-contract
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => onNavigate("car-registration")}>
                Đăng ký xe khác
              </Button>
              <Button className="bg-primary hover:bg-primary/90">Liên hệ hỗ trợ</Button>
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium mb-2">Chưa có đơn đăng ký nào</h3>
              <p className="text-muted-foreground mb-6">
                Bạn chưa có đơn đăng ký xe nào. Hãy tạo đơn đăng ký đầu tiên.
              </p>
              <Button onClick={() => onNavigate("car-registration")} className="bg-primary hover:bg-primary/90">
                Đăng ký xe ngay
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

// UI6: Staff Dashboard
function StaffDashboard({ onNavigate }: { onNavigate: (ui: UIState) => void }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Car className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Staff Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">Nhân viên vận hành</Badge>
              <Button variant="outline" onClick={() => onNavigate("company")}>
                Trang chủ
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đơn đăng ký</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Chờ xử lý</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nhóm quản lý</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Nhóm hoạt động</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Xe bàn giao</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Hôm nay</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Yêu cầu dịch vụ</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Chờ xử lý</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="applications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="applications">Đơn đăng ký</TabsTrigger>
            <TabsTrigger value="groups">Quản lý nhóm</TabsTrigger>
            <TabsTrigger value="vehicles">Lịch sử xe</TabsTrigger>
            <TabsTrigger value="services">Dịch vụ</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Đơn đăng ký chờ xử lý</CardTitle>
                <CardDescription>Xem xét và tạo hợp đồng điện tử</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "DK001",
                      customer: "Nguyễn Văn A",
                      car: "VinFast VF6",
                      members: 4,
                      amount: "650M",
                      status: "Mới",
                    },
                    {
                      id: "DK002",
                      customer: "Trần Thị B",
                      car: "VinFast VF5",
                      members: 3,
                      amount: "450M",
                      status: "Đang xử lý",
                    },
                    {
                      id: "DK003",
                      customer: "Lê Văn C",
                      car: "VinFast VF7",
                      members: 5,
                      amount: "850M",
                      status: "Chờ thanh toán",
                    },
                  ].map((app, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">
                          {app.id} - {app.customer}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {app.car} • {app.members} thành viên • {app.amount}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            app.status === "Mới" ? "secondary" : app.status === "Đang xử lý" ? "default" : "outline"
                          }
                        >
                          {app.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Xem
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Xử lý
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="groups" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Các nhóm đang quản lý</CardTitle>
                <CardDescription>Theo dõi hoạt động và tài chính các nhóm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Nhóm VF6 #001", members: 4, car: "VinFast VF6", revenue: "15M", status: "Hoạt động" },
                    { name: "Nhóm VF5 #002", members: 3, car: "VinFast VF5", revenue: "12M", status: "Hoạt động" },
                    { name: "Nhóm VF7 #003", members: 5, car: "VinFast VF7", revenue: "20M", status: "Mới tạo" },
                  ].map((group, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{group.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {group.car} • {group.members} thành viên
                          </p>
                        </div>
                        <Badge variant={group.status === "Hoạt động" ? "default" : "secondary"}>{group.status}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Doanh thu: {group.revenue}</span>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline">
                            Chi tiết
                          </Button>
                          <Button size="sm" variant="outline">
                            Tài chính
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vehicles" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử sử dụng xe</CardTitle>
                <CardDescription>Theo dõi tình trạng và lịch sử các xe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      plate: "30A-123.45",
                      model: "VinFast VF6",
                      group: "Nhóm VF6 #001",
                      km: "15,420",
                      status: "Đang sử dụng",
                      user: "Nguyễn Văn A",
                    },
                    {
                      plate: "30B-678.90",
                      model: "VinFast VF5",
                      group: "Nhóm VF5 #002",
                      km: "8,750",
                      status: "Sẵn sàng",
                      user: "-",
                    },
                    {
                      plate: "30C-111.22",
                      model: "VinFast VF7",
                      group: "Nhóm VF7 #003",
                      km: "2,100",
                      status: "Bảo dưỡng",
                      user: "-",
                    },
                  ].map((vehicle, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">
                          {vehicle.plate} - {vehicle.model}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {vehicle.group} • {vehicle.km} km •{" "}
                          {vehicle.user !== "-" ? `Đang dùng: ${vehicle.user}` : "Không sử dụng"}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            vehicle.status === "Đang sử dụng"
                              ? "default"
                              : vehicle.status === "Sẵn sàng"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {vehicle.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Chi tiết
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Yêu cầu dịch vụ xe</CardTitle>
                <CardDescription>Quản lý bảo dưỡng và sửa chữa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "DV001",
                      group: "Nhóm VF6 #001",
                      service: "Bảo dưỡng định kỳ",
                      cost: "2M",
                      status: "Chờ duyệt",
                    },
                    {
                      id: "DV002",
                      group: "Nhóm VF5 #002",
                      service: "Thay lốp xe",
                      cost: "5M",
                      status: "Đang thực hiện",
                    },
                    { id: "DV003", group: "Nhóm VF7 #003", service: "Kiểm tra pin", cost: "1M", status: "Hoàn thành" },
                  ].map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">
                          {service.id} - {service.group}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {service.service} • Chi phí: {service.cost}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            service.status === "Hoàn thành"
                              ? "default"
                              : service.status === "Đang thực hiện"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {service.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Xử lý
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// UI7: Admin Dashboard
function AdminDashboard({ onNavigate }: { onNavigate: (ui: UIState) => void }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Car className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">Quản trị viên hệ thống</Badge>
              <Button variant="outline" onClick={() => onNavigate("company")}>
                Trang chủ
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.5 tỷ</div>
              <p className="text-xs text-muted-foreground">Tháng này</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hợp đồng</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">Đang hiệu lực</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nhóm hoạt động</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">Nhóm</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Xe quản lý</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">Chiếc xe</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="staff" className="space-y-4">
          <TabsList>
            <TabsTrigger value="staff">Quản lý nhân viên</TabsTrigger>
            <TabsTrigger value="contracts">Hợp đồng</TabsTrigger>
            <TabsTrigger value="analytics">Phân tích</TabsTrigger>
            <TabsTrigger value="showroom">Showroom</TabsTrigger>
          </TabsList>

          <TabsContent value="staff" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hoạt động nhân viên</CardTitle>
                <CardDescription>Theo dõi các thao tác của nhân viên</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { staff: "Nhân viên A", action: "Xử lý đơn DK001", time: "10:30", status: "Hoàn thành" },
                    { staff: "Nhân viên B", action: "Tạo hợp đồng HD002", time: "11:15", status: "Đang xử lý" },
                    { staff: "Nhân viên C", action: "Bàn giao xe 30A-123.45", time: "14:20", status: "Hoàn thành" },
                    { staff: "Nhân viên A", action: "Xử lý yêu cầu DV001", time: "15:45", status: "Chờ duyệt" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{activity.staff}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.action} • {activity.time}
                        </p>
                      </div>
                      <Badge
                        variant={
                          activity.status === "Hoàn thành"
                            ? "default"
                            : activity.status === "Đang xử lý"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quản lý hợp đồng pháp lý</CardTitle>
                <CardDescription>Theo dõi tất cả hợp đồng trong hệ thống</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "HD001",
                      group: "Nhóm VF6 #001",
                      members: 4,
                      value: "650M",
                      signed: "4/4",
                      status: "Hiệu lực",
                    },
                    {
                      id: "HD002",
                      group: "Nhóm VF5 #002",
                      members: 3,
                      value: "450M",
                      signed: "3/3",
                      status: "Hiệu lực",
                    },
                    { id: "HD003", group: "Nhóm VF7 #003", members: 5, value: "850M", signed: "3/5", status: "Chờ ký" },
                  ].map((contract, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">
                          {contract.id} - {contract.group}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {contract.members} thành viên • Giá trị: {contract.value} • Đã ký: {contract.signed}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={contract.status === "Hiệu lực" ? "default" : "secondary"}>
                          {contract.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Chi tiết
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Phân tích doanh thu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Tổng doanh thu</span>
                      <span className="font-bold text-primary">2.500.000.000đ</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Chi phí vận hành</span>
                      <span className="font-medium text-destructive">450.000.000đ</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lợi nhuận ròng</span>
                      <span className="font-bold text-accent">2.050.000.000đ</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top nhóm theo doanh thu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Nhóm VF7 #003", revenue: "120M" },
                      { name: "Nhóm VF6 #001", revenue: "100M" },
                      { name: "Nhóm VF5 #002", revenue: "85M" },
                    ].map((group, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">
                          {index + 1}. {group.name}
                        </span>
                        <span className="font-medium">{group.revenue}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="showroom" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Kết nối Showroom</CardTitle>
                <CardDescription>Quản lý giao dịch với các showroom đối tác</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "SR001",
                      showroom: "VinFast Hà Nội",
                      car: "VinFast VF6",
                      group: "Nhóm VF6 #001",
                      amount: "650M",
                      status: "Hoàn thành",
                    },
                    {
                      id: "SR002",
                      showroom: "VinFast HCM",
                      car: "VinFast VF5",
                      group: "Nhóm VF5 #002",
                      amount: "450M",
                      status: "Đang xử lý",
                    },
                    {
                      id: "SR003",
                      showroom: "VinFast Đà Nẵng",
                      car: "VinFast VF7",
                      group: "Nhóm VF7 #003",
                      amount: "850M",
                      status: "Chờ thanh toán",
                    },
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">
                          {transaction.id} - {transaction.showroom}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.car} → {transaction.group} • {transaction.amount}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            transaction.status === "Hoàn thành"
                              ? "default"
                              : transaction.status === "Đang xử lý"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {transaction.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Chi tiết
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
