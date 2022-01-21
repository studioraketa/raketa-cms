import React from "react";

const Button = ({ settings, className }) => {
  const { id, label, link, target, type, follow_link } = settings;

  let buttonClass;

  if (type === "primary") buttonClass = "btn-primary";
  if (type === "secondary") buttonClass = "btn-secondary";
  if (type === "text") buttonClass = "btn-text";
  if (className) buttonClass = `${buttonClass} ${className}`;

  return (
    <a
      href={link}
      className={buttonClass}
      id={id ? id : ""}
      target={target}
      rel={follow_link === "no-follow" ? "nofollow" : ""}
    >
      {label}
    </a>
  );
};

export default Button;
