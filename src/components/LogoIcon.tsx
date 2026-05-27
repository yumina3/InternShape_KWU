import React from "react";
// Mengimport gambar langsung dari folder assets
import logoImg from "../../assets/logo_InternShape.png";

interface LogoIconProps {
  className?: string;
}

export function LogoIcon({ className = "h-8 w-8" }: LogoIconProps) {
  return (
    <img
      src={logoImg}
      alt="InternShape Logo"
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}