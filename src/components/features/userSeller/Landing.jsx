import Image from "next/image";
import Button from "@/components/ui/button";
import {useState} from "react";
import DetailsFromPopup from "@/components/features/userSeller/DetailsFromPopup";


// 2. Feature Card Component for "Why Sell on AVX" section
const FeatureCard = ({icon, title, description}) => {
    return (<div
            className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-8 flex flex-col hover:bg-white/[0.05] transition-colors duration-300">
            {/* Icon Container with a subtle tint of the primary blue color */}
            <div className="w-12 h-12 rounded-xl bg-fourth/10 flex items-center justify-center mb-6 text-fourth">
                {icon}
            </div>
            <h3 className="text-primary text-xl font-bold mb-3 leading-tight">
                {title}
            </h3>
            <p className="text-third text-sm leading-relaxed">
                {description}
            </p>
        </div>);
};

const FAQItem = ({question, answer}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (<div
            className=" border border-primary/40 rounded-xl mb-4 overflow-hidden transition-colors duration-300 hover:bg-white/[0.03]">
            <button
                className="w-full flex items-center justify-between p-6 lg:px-8 text-left focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-primary font-medium text-base lg:text-lg">{question}</span>
                <svg
                    className={`w-5 h-5 text-third flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7"/>
                </svg>
            </button>
            <div
                className={`px-6 lg:px-8 text-third text-sm lg:text-base transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}
            >
                {answer}
            </div>
        </div>);
};


function Landing() {

    const [open, setOpen] = useState(false);


    const sellingSteps = [{
        num: 1,
        title: "Submit Basic Details",
        desc: "Start by providing your vehicle information"
    }, {num: 2, title: "Upload Vehicle Info", desc: "Add photos and detailed specifications"}, {
        num: 3,
        title: "Optional Inspection",
        desc: "Request AVX inspection for credibility"
    }, {num: 4, title: "Receive Inquiries", desc: "Connect with interested buyers"}, {
        num: 5,
        title: "Mark as Sold",
        desc: "Close the deal and update status"
    },];

    const whoCanSellItems = ["Individual vehicle owners", "First-time sellers", "Buyers selling their own car"];

    const requiredDocuments = [{
        title: "Aadhaar Card",
        status: "Required",
        isOptional: false,
        icon: (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="1.5"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 12h10M7 15h4"/>
            </svg>)
    }, {
        title: "PAN Card",
        status: "Required",
        isOptional: false,
        icon: (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>)
    }, {
        title: "Vehicle RC",
        status: "Required",
        isOptional: false,
        icon: (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 11h6m-6 4h6m-6 4h4"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>)
    }, {
        title: "Insurance",
        status: "Optional",
        isOptional: true,
        icon: (<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>)
    }];

    const faqs = [{
        question: "Can I edit listing later?",
        answer: "Yes, you can edit your listing details, upload new photos, and update your vehicle's price at any time from your seller dashboard."
    }, {
        question: "Is inspection mandatory?",
        answer: "While not mandatory, AVX inspection is highly recommended. Inspected vehicles receive a verified badge and typically attract significantly more buyer inquiries."
    }, {
        question: "How many vehicles can I list?",
        answer: "Individual sellers are currently permitted to list 1 active vehicle at a time to ensure marketplace quality."
    }, {
        question: "Can I relist after sale?",
        answer: "Once a vehicle is marked as sold, the listing is closed. You will need to create a new listing for any future vehicles you wish to sell."
    }, {
        question: "Do I need GST?",
        answer: "No, GST registration is not required for individuals selling their personal, used vehicles."
    }];

    return (<>
            <section className="flex mt-20 flex-col lg:flex-row w-full h-[84vh]  overflow-hidden">

                {/* Left Column: Content Area */}
                <div className="flex-1 flex flex-col justify-center ">
                    <h1 className="text-primary text-5xl lg:text-[4.5rem] font-bold leading-[1.1] tracking-tight mb-8">
                        Sell Your
                        Vehicle with
                        Verified
                        Buyers
                    </h1>

                    <p className="text-third text-base lg:text-lg mb-10 max-w-md leading-relaxed">
                        List your car on AVX and connect with serious
                        consultants and buyers through a structured
                        marketplace. <span className="text-primary font-semibold">No commission on sale.</span>
                    </p>

                    <div>
                        <Button variant="ghost" onClick={() => setOpen(true)}>
                            Start Selling
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7"/>
                            </svg>
                        </Button>
                    </div>
                </div>

                {/* Right Column: Image Area */}
                <div className="flex-1 w-full h-[50vh] lg:h-screen lg:py-6 lg:pr-6 pl-0">
                    <div
                        className="relative w-full h-full rounded-t-[2rem] lg:rounded-t-none lg:rounded-3xl overflow-hidden shadow-2xl bg-black">
                        <Image
                            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                            alt="Luxury Porsche car"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </section>

            <section className="w-full py-20 ">
                <h2 className="text-primary text-3xl lg:text-4xl font-bold text-center mb-16">
                    Why Sell on AVX
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    <FeatureCard
                        icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>}
                        title="Reach Verified Buyers"
                        description="Connect with serious buyers and consultants on our trusted platform"
                    />

                    <FeatureCard
                        icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>}
                        title="Track Real Inquiries"
                        description="Monitor all genuine buyer inquiries in real-time"
                    />

                    <FeatureCard
                        icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                        </svg>}
                        title="Optional Inspection"
                        description="Boost credibility with our professional inspection service"
                    />

                    <FeatureCard
                        icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                        </svg>}
                        title="Performance-Based Visibility"
                        description="Higher engagement for quality listings with transparency"
                    />
                </div>
            </section>
            {/* --- HOW SELLING WORKS SECTION --- */}
            <section className="w-full py-20 ">
                <h2 className="text-primary text-3xl lg:text-4xl font-bold text-center mb-20">
                    How Selling Works
                </h2>

                <div className="relative max-w-7xl mx-auto">
                    {/* Horizontal Connecting Line (Desktop Only) */}
                    <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-[1px] bg-white/[0.15] z-0"/>

                    <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-4 relative z-10">
                        {sellingSteps.map((step) => (
                            <div key={step.num} className="flex flex-col items-center text-center flex-1">
                                {/* Step Number Circle */}
                                <div
                                    className="w-14 h-14 rounded-full bg-fourth text-primary flex items-center justify-center text-xl font-bold mb-6 ring-8 ring-secondary relative">
                                    {step.num}
                                </div>

                                {/* Step Title & Description */}
                                <h4 className="text-primary font-semibold mb-3 text-lg px-2">
                                    {step.title}
                                </h4>
                                <p className="text-third text-sm leading-relaxed max-w-[220px]">
                                    {step.desc}
                                </p>
                            </div>))}
                    </div>
                </div>
            </section>
            {/* --- INCREASE BUYER CONFIDENCE SECTION --- */}
            <section className="w-full py-20 ">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left: Image */}
                    <div className="w-full lg:w-1/2">
                        <div
                            className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/[0.05] shadow-2xl bg-[#181818]">
                            <Image
                                src="https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg"
                                alt="Luxury Porsche car"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <h2 className="text-primary text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                            Increase Buyer<br/>Confidence
                        </h2>

                        <p className="text-third text-base lg:text-lg mb-8 leading-relaxed max-w-lg">
                            Vehicles with inspection transparency receive
                            higher inquiry engagement. You can request AVX
                            inspection to improve listing credibility and attract
                            more serious buyers to your vehicle.
                        </p>

                        <div className="flex items-center gap-4">
                            <svg className="w-6 h-6 text-fourth flex-shrink-0" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span className="text-primary font-medium text-base">
                Professional inspection report included
              </span>
                        </div>
                    </div>
                </div>
            </section>


            <section className="w-full py-20">
                <h2 className="text-primary text-3xl lg:text-4xl font-bold text-center mb-12">
                    Who Can Sell?
                </h2>

                <div
                    className="max-w-3xl mx-auto bg-[#181818] border border-white/[0.05] rounded-2xl p-8 lg:px-16 lg:py-12">

                    <ul className="flex flex-col gap-6 mb-10">
                        {whoCanSellItems.map((item, index) => (<li key={index} className="flex items-center gap-4">
                                <svg className="w-5 h-5 text-fourth flex-shrink-0" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span className="text-primary text-base lg:text-lg">
                  {item}
                </span>
                            </li>))}
                    </ul>

                    <hr className="border-t border-white/[0.05] mb-8"/>

                    <p className="text-center text-third text-sm lg:text-base">
                        <strong className="text-primary font-medium">Important note:</strong> Individual sellers can
                        list 1 active vehicle at a time.
                    </p>

                </div>
            </section>


            {/* --- DOCUMENTS REQUIRED SECTION --- */}
            <section className="w-full py-20">
                <div className="text-center mb-16">
                    <h2 className="text-primary text-3xl lg:text-4xl font-bold mb-4">
                        Documents Required
                    </h2>
                    <p className="text-third text-base lg:text-lg">
                        KYC helps improve listing authenticity
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {requiredDocuments.map((doc, index) => (<div
                            key={index}
                            className=" border border-primary/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/[0.05] transition-colors duration-300 min-h-[240px]"
                        >
                            {/* Icon Container */}
                            <div
                                className="w-16 h-16 rounded-full bg-fourth/10 flex items-center justify-center mb-6 text-fourth">
                                {doc.icon}
                            </div>

                            {/* Document Title */}
                            <h3 className="text-primary text-xl font-semibold mb-3">
                                {doc.title}
                            </h3>

                            {/* Status Badge/Text */}
                            <span
                                className={`text-sm font-medium ${doc.isOptional ? 'text-third' : 'text-fourth'}`}
                            >
                {doc.status}
              </span>
                        </div>))}
                </div>
            </section>

            <section className="w-full py-20 px-8 ">
                <h2 className="text-primary text-3xl lg:text-4xl font-bold text-center mb-12">
                    Frequently Asked Questions
                </h2>

                <div className="max-w-4xl mx-auto">
                    {faqs.map((faq, index) => (<FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                        />))}
                </div>
            </section>
            <DetailsFromPopup
                isOpen={open}
                onClose={() => setOpen(false)}
            />

        </>);
}

export default Landing;