"use client";

import { useState } from "react";
import Banner from "@/components/ui/const/Banner";
import SupportFlowModal from "./SupportFlowModal";

export default function HelpBanner() {
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <>
      <div className="w-full   3xl:max-w-full mx-auto ">
        <div className="w-full h-[250px] md:h-80 overflow-hidden bg-cover bg-center rounded-lg relative bg-fourth">
          <Banner
            title="Still have questions?"
            description="Our inspection support team is available to walk you through any step of the process."
            buttonText="Contact Support"
            onClick={() => setSupportOpen(true)}
          />
        </div>
      </div>
      {supportOpen && <SupportFlowModal onClose={() => setSupportOpen(false)} />}
    </>
  );
}
