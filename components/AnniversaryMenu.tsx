import React, { memo } from "react";
import FlowingMenu from "./FlowingMenu";

const menuItems = [
  {
    text: "Thailand",
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
  },
  {
    text: "Turkey",
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
  },
  {
    text: "Serbia",
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
  },
  {
    text: "Bosnia",
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
  },
];

const AnniversaryMenu = () => {
  return (
    <div className="relative h-[400px] w-full shrink-0">
      <FlowingMenu
        items={menuItems}
        speed={20}
        textColor="#fdf2f2"
        bgColor="transparent"
        marqueeBgColor="#f43f5e"
        marqueeTextColor="#ffffff"
        borderColor="rgba(255, 255, 255, 0.1)"
      />
    </div>
  );
};

// React.memo ile sarmallayarak gereksiz yeniden çizimleri önlüyoruz
export default memo(AnniversaryMenu);
