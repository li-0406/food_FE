import React from "react";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div>
      <Link to="/" className="logo fixed left-5 top-2 w-[32px] lg:w-[40px]">
        <img src="~/assets/logo.png" alt="logo" class="pic-auto" />
      </Link>
    </div>
  );
}
