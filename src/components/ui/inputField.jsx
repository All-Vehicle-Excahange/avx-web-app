function InputField({ label, placeholder, required, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-semibold text-text-black mb-1.5 ml-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="
          w-full h-11 px-4 rounded-lg border border-secondary/60 bg-white text-text-black
          outline-none placeholder:text-gray-400
          focus:border-third focus:ring-1 focus:ring-third transition
        "
      />
    </div>
  );
}

export default InputField;
