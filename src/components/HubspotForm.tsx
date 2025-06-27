// components/HubspotForm.js
"use client";

import { useEffect } from "react";

interface HubspotFormProps {
  id: string;
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
        });
      }
    };
    document.body.appendChild(script);
  }, [id]);

  return <div id={id}></div>;
};

export default HubspotForm;
