"use client";

import { useEffect } from "react";

type TypeOfFormKey = "get_a_quotes" | "custom_form" | "get_a_quote";

interface HubspotFormProps {
  id: TypeOfFormKey;
}

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          portalId: string;
          formId: string;
          region?: string;
          target: string;
          onFormReady?: (form: HTMLFormElement) => void;
        }) => void;
      };
    };
  }
}

const HubspotForm = ({ id }: HubspotFormProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.onload = () => {
      if (typeof window !== "undefined" && window.hbspt) {
        window.hbspt.forms.create({
          portalId: "47003847",
          formId: "54eb7589-a2fb-492c-b0ed-619c54e098f1",
          region: "na1",
          target: `#${id}`,
          onFormReady: (form) => {
            console.log("Form is ready", form);
            // you could try:
            const labelElement = form.querySelector(
              "#label-type_of_form-54eb7589-a2fb-492c-b0ed-619c54e098f1"
            );
            if (labelElement) {
              (labelElement as HTMLElement).style.display = "none";
              const type: Record<TypeOfFormKey, string> = {
                get_a_quotes: "Get a Quote",
                get_a_quote: "Get a Quote",
                custom_form: "Request a demo",
              };
              const selectFeild = form.querySelector(
                "#type_of_form-54eb7589-a2fb-492c-b0ed-619c54e098f1"
              );
              if (selectFeild) {
                (selectFeild as HTMLSelectElement).value = type[id];
                (selectFeild as HTMLSelectElement).disabled = true;
              }
            }
          },
        });
      }
    };
    document.body.appendChild(script);
  }, [id]);

  return <div id={id}></div>;
};

export default HubspotForm;
