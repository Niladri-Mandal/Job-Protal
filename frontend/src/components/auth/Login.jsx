import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { CircleUser, Loader, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

function Login() {
  const navigate=useNavigate()
  const {loading}=useSelector(store=>store.auth)
  const dispatch=useDispatch()   // change it store
//  console.log(loading)
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handelSumitData = async(e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData(); //formdata object
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    try{
      dispatch(setLoading(true))
      const response = await axios.post(
        `${USER_API_END_POINT}/login`, formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.success) {
        navigate("/");
        dispatch(setUser(response.data.user))
        toast.success(response.data.message);
      }

    }catch(error){
      console.log(error);
      toast.error(error.response.data.message);
    }finally{
      dispatch(setLoading(false))
    }
  };
  return (
    <div>
      <div className="flex items-end justify-center max-w-7xl mx-auto">
        <form
          onSubmit={handelSumitData}
          className="w-1/3 border border-gray-200 p-4 my-10 shadow-lg rounded-lg"
        >
          <h1 className="font-bold text-xl mb-5 text-center mt-2">Login</h1>

          <div className="py-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your Email"
            />
          </div>

          <div className="py-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your Password"
            />
          </div>

          <div className="py-2 flex justify-center">
            <RadioGroup className="flex justify-between items-center gap-14">
              <h3 className="font-semibold">Role:</h3>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="student" className="cursor-pointer">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter" className="cursor-pointer">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col items-center gap-3 my-2">
            {loading ? (
              <Button className="px-12 my-2 hover:bg-gradient-to-tl from-violet-500 via-blue-500 to-violet-500 hover:text-white  border-violet-600"><Loader2  variant="secondary"
              className="h-4 w-4 mr-2 animate-spin" />Plese wait</Button>
            ) : (
              <Button
                type="submit"
                variant="secondary"
                className="px-12 my-2 hover:bg-gradient-to-tl from-violet-500 via-blue-500 to-violet-500 hover:text-white  border-violet-600"
              >
                Login
              </Button>
            )}

            <p>
              <strong>Dont't have an account ? </strong>
              <Link to="/signup" className="text-sky-400">
                Signup Here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
