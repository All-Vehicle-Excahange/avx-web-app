export default function EditorInput({
  value,
  onChange,
  placeholder,
  bold = false,
  full = true,
  center = false,
  size = "md",
}) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`rounded-lg outline-none border border-third/30 bg-secondary text-primary
        focus:border-primary transition
        ${full ? "w-full" : "w-auto"}
        ${center ? "text-center" : "text-left"}
        ${bold ? "font-bold" : ""}
        ${size === "sm" ? "h-9 px-3 text-sm" : "h-11 px-4 text-base"}
      `}
    />
  );
}
