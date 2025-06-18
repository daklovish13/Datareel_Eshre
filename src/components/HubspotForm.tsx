// components/HubspotForm.js
"use client";

import { useEffect } from "react";

const HubspotForm = ({id}:any) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.onload = () => {
      if (window?.hbspt) {
        window?.hbspt.forms.create({
          portalId: "47003847",
          formId: "54eb7589-a2fb-492c-b0ed-619c54e098f1",
          region: "na1",
          target: `#${id}`,
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return <div id={id}></div>;
};

export default HubspotForm;
