import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { CircleUser, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";

 

function Signup() {
  const navigate = useNavigate();
  const {loading}=useSelector(store=>store.auth)
  const dispatch=useDispatch()

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandeler =async(e) => {
    e.preventDefault();
    const formData = new FormData(); //formdata object
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }
     console.log(input)
     

     try {
      dispatch(setLoading(true))
       const response = await axios.post(
         `${USER_API_END_POINT}/register`, formData,
         {
           headers: { "Content-Type": "multipart/form-data" },
           withCredentials: true,
         }
       );
       console.log(response);
       if (response.data.success) {
         navigate("/login");
         toast.success(response.data.message);
       }
     } catch (error) {
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
          onSubmit={submitHandeler}
          className="w-1/3 border border-gray-200 p-4 my-10 shadow-lg rounded-lg"
        >
          <h1 className="font-bold text-xl mb-5 text-center mt-2">Sign Up</h1>

          <div className="flex items-center gap-2">
            <Label>Profile</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="cursor-pointer"
            />
          </div>

          <div className="py-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your name"
            />
          </div>

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
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter your Contact Number"
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
            <RadioGroup
              defaultValue="option-one"
              className="flex items-center gap-14"
            >
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
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
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col items-center gap-3 my-2">
            {loading ? (
              <Button 
              variant="secondary"
              className="px-12 my-2 hover:bg-gradient-to-tl from-violet-500 via-blue-500 to-violet-500 hover:text-white  border-violet-600"><Loader2
              className="h-4 w-4 mr-2 animate-spin" />Plese wait</Button>
            ) : (
              <Button
                type="submit"
                variant="secondary"
                className="px-12 my-2 hover:bg-gradient-to-tl from-violet-500 via-blue-500 to-violet-500 hover:text-white  border-violet-600"
              >
                Signup
              </Button>
            )}

            <p>
              <strong>Have An Account ? </strong>
              <Link to="/login" className="text-sky-400">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
