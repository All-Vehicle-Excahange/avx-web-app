function InputField({
  label,
  placeholder,
  required,
  type = "text",
  variant = "default",
}) {
  const baseStyle =
    "w-full rounded-lg outline-none placeholder:text-gray-400 transition";

  const sizeVariants = {
    default: "h-11 px-4",
    colored: "h-10 px-3",
    search: "h-8 px-3",
  };

  const styleVariants = {
    default:
      "border border-secondary/60 bg-white text-black focus:border-third focus:ring-1 focus:ring-third",
    colored:
      "border border-primary bg-primary/10 text-primary placeholder:text-primary/50 focus:border-primary focus:ring-1 focus:ring-primary",
    search:
      "border border-secondary/60 bg-white text-text-black focus:border-primary/50 focus:ring-1 focus:ring-primary/50",
  };

  return (
    <div>
      {label && (
        <label className="text-sm font-semibold text-text-black mb-1.5 ml-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        className={`${baseStyle} ${sizeVariants[variant]} ${styleVariants[variant]}`}
      />
    </div>
  );
}

export default InputField;
