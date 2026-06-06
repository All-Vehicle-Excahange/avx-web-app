import React from "react";

const SleekInput = ({
  label,
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  readOnly,
  error,
  required,
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-1.5 w-full">
      {label && (
        <span className="text-xs font-semibold uppercase tracking-wider text-third/80 ml-1">
          {label} {required && <span className="text-rose-500">*</span>}
        </span>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-third/60 group-focus-within:text-primary transition-colors duration-200">
            <Icon size={18} strokeWidth={1.5} />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          className={`w-full h-11 bg-white/2 border rounded-xl outline-none transition-all duration-300 text-primary text-sm placeholder:text-third/35
            ${Icon ? "pl-11 pr-4" : "px-4"}
            ${
              readOnly
                ? "border-white/3 cursor-default bg-transparent text-third/65"
                : "border-white/8 hover:border-white/20 focus:border-primary focus:bg-white/4 focus:shadow-[0_0_15px_rgba(255,254,247,0.03)]"
            }
            ${error ? "border-rose-500/50 focus:border-rose-500" : ""}
          `}
          {...props}
        />
      </div>
      {error && (
        <span className="text-rose-500 text-[10px] ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default SleekInput;
