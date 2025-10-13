import React, { useEffect } from "react";
import "./Header.css";

export default function Header({ children, className = "" }) {

    useEffect(() => {

        const handleScroll = () => {

            const scrollY = Math.min(window.scrollY, 60);
            const opacity1 = 0.8 - scrollY / 300;
            const opacity2 = 0.8 - scrollY / 120;
            const opacity3 = 0.8 - scrollY / 75;
            const blur = 5 - scrollY / 12;
            const shadowOpacity = 0.3 - scrollY / 200;

            document.documentElement.style.setProperty("--header-opacity1", opacity1);
            document.documentElement.style.setProperty("--header-opacity2", opacity2);
            document.documentElement.style.setProperty("--header-opacity3", opacity3);
            document.documentElement.style.setProperty("--header-blur", `${blur}px`);
            document.documentElement.style.setProperty("--header-shadow-opacity", shadowOpacity);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    return (
        <div className={`header-mn ${className}`}>
            {children}
        </div>
    );
}
