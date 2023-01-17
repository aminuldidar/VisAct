import React from "react";
//import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar shadow-lg bg-cyan-500 text-neutral-content mb-6">
      <div className="container mx-auto">
        <div className="flex px-2 mx-2">
          <a href="/" className="">
            <h3>
              VisAct
              <span className="text-sm">Look inside your data</span>
            </h3>
          </a>
        </div>
        {/*<div className="flex-1 px-2 mx-2 ">
          <div className="flex justify-end space-x-3">
            <a href="/" className="btn btn-ghost btn-sm rounded-btn p-2">
              GithubFinder
            </a>
            <a href="/about" className="btn btn-ghost btn-sm rounded-btn p-2">
              About Application
            </a>
          </div>
        </div> */}
      </div>
    </nav>
  );
}
