import React from "react";
import { Container } from "@raketa-cms/raketa-cms";
import AdminFields from "./AdminFields";
import FormInput from "./FormInput";

const SubmitButton = ({ settings }) => {
  const { label, type, className } = settings;

  let buttonClass;

  if (type === "primary") buttonClass = "btn-primary";
  if (type === "secondary") buttonClass = "btn-secondary";
  if (type === "text") buttonClass = "btn-text";
  if (className) buttonClass = `${buttonClass} ${className}`;

  return (
    <div className="submit-row">
      <button type="submit" className={buttonClass}>
        {label}
      </button>
    </div>
  );
};

const FormRow = ({ fields }) => (
  <div className="form-row">
    {fields.map((field, idx) => (
      <div key={idx} className="form-item">
        <FormInput field={field.item} />
      </div>
    ))}
  </div>
);

const FormWidget = ({ formUrl, variant, list, button, containerSettings }) => {
  if (list.length === 0) {
    return <h1>Form Builder</h1>;
  }

  return (
    <Container settings={containerSettings}>
      <div className="form-widget">
        <div className="container">
          <div className="row">
            <div className={variant}>
              <form
                method="post"
                acceptCharset="utf-8"
                encType="multipart/form-data"
                action={formUrl}
              >
                {list.map((formRow, idx) => (
                  <FormRow key={idx} fields={formRow.fields} />
                ))}

                <SubmitButton settings={button} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

FormWidget.title = "Form Builder";
FormWidget.category = "Misc";
FormWidget.primaryField = "formUrl";
FormWidget.dialogSize = "large";
FormWidget.defaults = { ...AdminFields.defaults };
FormWidget.adminFields = AdminFields;

export default FormWidget;
