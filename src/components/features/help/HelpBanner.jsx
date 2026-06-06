import { useState } from "react";
import Banner from "@/components/ui/const/Banner";
import SupportFlowModal from "./SupportFlowModal";

export default function HelpBanner() {
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-fourth">
        <div className="w-full h-[250px] max-w-[1480px] md:h-80 overflow-hidden flex items-center justify-center relative mx-auto px-2 sm:px-8 lg:px-4">
          <Banner
            title="Still have questions?"
            description="Our inspection support team is available to walk you through any step of the process."
            buttonText="Contact Support"
            onClick={() => setSupportOpen(true)}
          />
        </div>
      </div>
      {supportOpen && (
        <SupportFlowModal onClose={() => setSupportOpen(false)} />
      )}
    </>
  );
}
