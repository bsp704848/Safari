import React from "react";
import defaultBackgroundImage from "../../assets/images/background.png";

export default function Hero({
  title,
  subtitle,
  image,
  backgroundImage,
}) {
  return (
    <section
      className="relative text-black min-h-[80vh] flex flex-col justify-center items-center text-center px-4"
      style={{
        backgroundImage: `url(${backgroundImage || defaultBackgroundImage})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0"></div>
      <div className="relative z-10 max-w-2xl w-full">
        <h1
          className="text-4xl md:text-6xl font-extrabold mb-6"
          style={{
            textShadow:
              `0.0625em 0.0625em 0 white,0.0875em 0.0875em 0 green`,
          }}
        >
          {title}
        </h1>
        <p className="text-lg md:text-xl mb-8">{subtitle}</p>
        {image && (
          <img
            src={image}
            alt="hero visual"
            className="mx-auto mb-8 rounded-lg max-h-80 object-contain"
          />
        )}
      </div>
    </section>
  );
}
