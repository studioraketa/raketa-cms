import React from "react";
import { Container, ButtonSettings } from "@raketa-cms/raketa-cms";
import Button from "../frontend/Button";

const Widget = ({ button_1, button_2, title, containerSettings }) => (
  <Container settings={containerSettings}>
    <div className="hero">
      <div className="container">
        <h2 className="title">{title}</h2>
        <div className="button-wrapper">
          {button_1.label && <Button settings={button_1} />}
          {button_2.label && <Button settings={button_2} />}
        </div>
      </div>
    </div>
  </Container>
);

const Config = {
  title: "Hero",
  category: "General",
  primaryField: "title",
};

const Defaults = {
  align: "text-center",
  title: "Title",
  button_1: ButtonSettings.defaults,
  button_2: ButtonSettings.defaults,
  containerSettings: {},
};

const Admin = {
  title: { type: "text", placeholder: "Enter something...", hint: "3 words" },
  button_1: { type: "button" },
  button_2: { type: "button" },
};

export { Widget, Config, Admin, Defaults };
