import React, { useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "@/redux/store";


function Navbar() {
    const {user}=useSelector(store=>store.auth)
    console.log(user)
  return (
    <div className="shadow-md">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job
            <span className="bg-gradient-to-br from-orange-400 to-orange-800 text-transparent bg-clip-text">
              Finder
            </span>
          </h1>
        </div>
        <div>
          <ul className="flex  justify-between gap-9 items-center font-medium">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>
        </div>

        <div>
          {!user ? (
            <div className="flex justify-between items-center gap-3">
                <Link to="/signup"><Button variant="ghost">Signup</Button></Link>
                <Link to="/login">
                <Button className="bg-gradient-to-r from-sky-400 to-blue-700 text-white px-6">login</Button>
                </Link>
               
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 mr-6">
                <div className="flex justify-center items-start flex-wrap">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                </div>
                <h4 className="font-medium text-center my-2">Nil...</h4>
                <p className="text-md text-center my-2">
                  Lorem ipsum dolor sit amet.
                </p>

                <div className="flex flex-col">
                  <Button
                    variant="link"
                    className="hover:text-sky-600 font-medium hover:cursor-pointer"
                  >
                    <User2 />
                    View Profile
                  </Button>
                  <Button
                    variant="link"
                    className="hover:text-sky-600 font-medium hover:cursor-pointer"
                  >
                    <LogOut />
                    logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
