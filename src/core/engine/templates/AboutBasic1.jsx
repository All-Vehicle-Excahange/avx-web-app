import React from "react";
import RichTextEditor from "../atoms/RichTextEditor";
import { Star, Zap, Shield, Award } from "lucide-react";

function AboutBasic1({ data, isEditing, onUpdate }) {
  if (!data) return null;

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  const updateArrayItem = (arrayName, index, field, value) => {
    const newArray = [...data[arrayName]];
    newArray[index][field] = value;
    updateField(arrayName, newArray);
  };

  if (isEditing) {
    return (
      <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 text-white max-w-4xl mx-auto space-y-10">
        {/* 1. Header Section */}
        <div className="space-y-4 border-b border-gray-800 pb-8">
          <h3 className="text-xl font-bold text-blue-400 mb-4">1. Header</h3>

          <input
            className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white font-bold focus:border-blue-500 outline-none"
            value={data.headline}
            onChange={(e) => updateField("headline", e.target.value)}
            placeholder="Headline"
          />

          {/* UPDATED: Changed to RichTextEditor */}
          <RichTextEditor
            label="Sub-headline"
            value={data.subHeadline}
            onChange={(val) => updateField("subHeadline", val)}
          />
        </div>

        {/* 2. Stats Section */}
        <div className="space-y-4 border-b border-gray-800 pb-8">
          <h3 className="text-xl font-bold text-blue-400 mb-4">2. Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            {data.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-gray-800 p-3 rounded border border-gray-700 flex flex-col gap-2"
              >
                <input
                  className="bg-gray-900 border border-gray-700 rounded p-2 text-center font-bold text-white focus:border-blue-500 outline-none"
                  value={stat.number}
                  onChange={(e) =>
                    updateArrayItem("stats", i, "number", e.target.value)
                  }
                  placeholder="Number (e.g. 200+)"
                />
                <input
                  className="bg-gray-900 border border-gray-700 rounded p-2 text-center text-sm text-gray-300 focus:border-blue-500 outline-none"
                  value={stat.label}
                  onChange={(e) =>
                    updateArrayItem("stats", i, "label", e.target.value)
                  }
                  placeholder="Label"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 3. Mission & Vision Section */}
        <div className="space-y-4 border-b border-gray-800 pb-8">
          <h3 className="text-xl font-bold text-blue-400 mb-4">
            3. Mission & Vision
          </h3>

          {/* Mission */}
          <div className="bg-gray-800 p-4 rounded border border-gray-700 space-y-3">
            <input
              className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white font-bold focus:border-blue-500 outline-none"
              value={data.missionTitle}
              onChange={(e) => updateField("missionTitle", e.target.value)}
              placeholder="Mission Title"
            />
            <RichTextEditor
              value={data.missionDescription}
              onChange={(val) => updateField("missionDescription", val)}
            />
          </div>

          {/* Vision */}
          <div className="bg-gray-800 p-4 rounded border border-gray-700 space-y-3 mt-4">
            <input
              className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-white font-bold focus:border-blue-500 outline-none"
              value={data.visionTitle}
              onChange={(e) => updateField("visionTitle", e.target.value)}
              placeholder="Vision Title"
            />
            <RichTextEditor
              value={data.visionDescription}
              onChange={(val) => updateField("visionDescription", val)}
            />
          </div>
        </div>

        {/* 4. Services Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-blue-400 mb-4">4. Services</h3>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white font-bold text-center focus:border-blue-500 outline-none"
            value={data.servicesTitle}
            onChange={(e) => updateField("servicesTitle", e.target.value)}
            placeholder="Services Section Title"
          />
          <textarea
            className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-gray-300 text-center focus:border-blue-500 outline-none resize-none"
            rows={2}
            value={data.servicesSubtitle}
            onChange={(e) => updateField("servicesSubtitle", e.target.value)}
            placeholder="Services Section Subtitle"
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            {data.services.map((service, i) => (
              <div
                key={i}
                className="bg-gray-800 p-3 rounded border border-gray-700 space-y-2"
              >
                <input
                  className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-center text-2xl focus:border-blue-500 outline-none"
                  value={service.icon}
                  onChange={(e) =>
                    updateArrayItem("services", i, "icon", e.target.value)
                  }
                  placeholder="Icon Character"
                />
                <input
                  className="w-full bg-gray-900 border border-gray-700 rounded p-2 font-bold text-white focus:border-blue-500 outline-none"
                  value={service.title}
                  onChange={(e) =>
                    updateArrayItem("services", i, "title", e.target.value)
                  }
                  placeholder="Service Title"
                />
                <textarea
                  className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-sm text-gray-300 focus:border-blue-500 outline-none resize-none"
                  rows={3}
                  value={service.description}
                  onChange={(e) =>
                    updateArrayItem(
                      "services",
                      i,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Service Description"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white font-sans py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}

        {/* 1. Full Width Headline */}
        <div className="mb-12 flex justify-center">
          <h1 className="max-w-4xl text-center text-4xl md:text-6xl font-bold uppercase leading-tight">
            {data.headline}
          </h1>
        </div>

        {/* 2. Split Stats + Content */}
        <div className="mb-28 grid lg:grid-cols-2 gap-16 items-stretch">
          {/* LEFT – Stats */}

          <div className="grid grid-cols-2 gap-8 p-12 text-center h-full">
            {data.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-[#1a1a1a] rounded-3xl p-8 flex flex-col justify-between
                 border border-blue-400/30 hover:border-blue-400
                 transition-all duration-300"
              >
                {/* Top Icons */}
                {/* <div className="flex justify-between items-center mb-6 text-blue-400">
                  <Star size={20} />
                </div> */}

                {/* Center Number */}
                <h2 className="text-xl md:text-4xl font-extrabold">
                  {stat.number}
                </h2>

                {/* Label */}
                <p className="text-gray-400 text-sm uppercase tracking-widest mt-4">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="   rounded-3xl p-12 h-full flex flex-col justify-center space-y-6">
            <div
              className="prose prose-invert prose-xl text-xl text-gray-200"
              dangerouslySetInnerHTML={{ __html: data.subHeadline }}
            />
          </div>
        </div>

        {/* Services */}
        <div className="text-center ">
          <h2 className="text-3xl font-bold mb-4">{data.servicesTitle}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            {data.servicesSubtitle}
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {data.services.map((service, i) => (
              <div
                key={i}
                className="bg-[#1a1a1a] p-6 rounded-2xl text-left relative group hover:bg-[#252525] transition-colors duration-300 border border-blue-400"
              >
                <div className="text-5xl text-gray-400 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mt-28 grid md:grid-cols-2 gap-10">
          {/* Mission */}
          <div
            className="bg-[#1a1a1a] p-12 rounded-3xl border border-blue-400
                  transition-all duration-500 hover:shadow-blue-500/30 hover:shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-6 text-blue-400">
              {data.missionTitle}
            </h3>
            <div
              className="prose prose-invert text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.missionDescription }}
            />
          </div>

          {/* Vision */}
          <div
            className="bg-[#1a1a1a] p-12 rounded-3xl border border-blue-400
                  transition-all duration-500 hover:shadow-blue-500/30 hover:shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-6 text-blue-400">
              {data.visionTitle}
            </h3>
            <div
              className="prose prose-invert text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.visionDescription }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutBasic1;
