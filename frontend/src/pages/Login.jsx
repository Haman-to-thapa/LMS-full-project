import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"

const Login = () => {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" })
  const [signup, setSignup] = useState({ name: "", email: "", password: "" })

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;

    if (type === "signup") {
      setSignup({ ...signup, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const hanleRegistration = (type) => {
    const inputData = type === "signup" ? signup : loginInput;
    console.log(inputData)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#ccc]">
      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">SignUp</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>
                  Create a new account and click signup when you're done
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    onChange={(e) => changeInputHandler(e, "signup")}
                    name="name"
                    value={signup.name}
                    text="text" placeholder="Enter Your Name" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Email</Label>
                  <Input
                    onChange={(e) => changeInputHandler(e, "signup")}
                    name="email"
                    value={signup.email}
                    autoComplete="username"
                    type="email" placeholder="Enter Your Email" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Password</Label>
                  <Input
                    onChange={(e) => changeInputHandler(e, "signup")}
                    name="password"
                    value={signup.password}
                    type="password"
                    placeholder="Enter Your Password"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => hanleRegistration('signup')}
                >Signup</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Email</Label>
                  <Input
                    onChange={(e) => changeInputHandler(e, "login")}
                    name="email"
                    value={loginInput.email}
                    type="email"
                    placeholder='Enter Your Email'

                    required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Password</Label>
                  <Input
                    onChange={(e) => changeInputHandler(e, "login")}
                    value={loginInput.password}
                    name="password"
                    autoComplete="current-password "
                    type="password" placeholder="Enter 
                    Your Password" required />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => hanleRegistration("login")}
                >Login</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>

  )
}

export default Login;