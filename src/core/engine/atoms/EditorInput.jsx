export default function EditorInput({
  value,
  onChange,
  placeholder,
  bold = false,
  full = true,
  center = false,
  size = "md",
  error = false,
  errorMsg = null,
  maxLength,
  ...props
}) {
  const currentLen = typeof value === "string" ? value.length : 0;
  const charsLeft = maxLength ? maxLength - currentLen : null;
  const showWarning = !error && charsLeft !== null && charsLeft <= 10;

  return (
    <div className={`flex flex-col gap-1 ${full ? "w-full" : "w-auto"}`}>
      <input
        {...props}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`rounded-lg outline-none border bg-primary/5 text-primary
          focus:border-primary transition border-third/30
          w-full
          ${center ? "text-center" : "text-left"}
          ${bold ? "font-bold" : ""}
          ${size === "sm" ? "h-9 px-3 text-sm" : "h-11 px-4 text-base"}
        `}
      />
      {error && errorMsg && (
        <span className="text-[11px] text-red-400/80 font-medium ml-1">
          {errorMsg}
        </span>
      )}
      {showWarning && (
        <span className="text-[11px] text-fourth/60 font-medium ml-1">
          {charsLeft} characters left
        </span>
      )}
    </div>
  );
}
