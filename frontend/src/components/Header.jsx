import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="container mx-auto px-6">
        <div className="flex justify-center items-center h-16">
          {/* Logo + Name (Centered) */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Alex Logo" className="w-10 h-auto" />
            <span className="text-xl font-semibold text-neutral-900">Alex</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
