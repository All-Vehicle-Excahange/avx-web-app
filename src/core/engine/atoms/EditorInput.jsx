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
  minLength,
  ...props
}) {
  const currentLen = typeof value === "string" ? value.length : 0;

  // Max logic
  const charsLeft = maxLength ? maxLength - currentLen : null;
  const isAtMax = charsLeft !== null && charsLeft <= 0;
  const showMaxWarning = !isAtMax && charsLeft !== null && charsLeft <= 10;

  // Min logic
  const isBelowMin = minLength && currentLen > 0 && currentLen < minLength;

  return (
    <div className={`flex flex-col gap-1 ${full ? "w-full" : "w-auto"}`}>
      <input
        {...props}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`rounded-lg outline-none border bg-primary/5 text-primary
          focus:border-primary transition
          w-full
          ${error ? "border-red-500 focus:border-red-500" : "border-third/30"}
          ${center ? "text-center" : "text-left"}
          ${bold ? "font-bold" : ""}
          ${size === "sm" ? "h-9 px-3 text-sm" : "h-11 px-4 text-base"}
        `}
      />
      <div className="flex items-center justify-between min-h-[16px]">
        {/* Left: messages in priority order */}
        {(error && errorMsg) ? (
          <span className="text-[11px] text-red-500 font-medium ml-1">{errorMsg}</span>
        ) : isAtMax ? (
          <span className="text-[11px] text-red-400 font-medium ml-1">
            Maximum character limit reached
          </span>
        ) : isBelowMin ? (
          <span className="text-[11px] text-blue-400 font-medium ml-1">
            Minimum {minLength} characters required
          </span>
        ) : showMaxWarning ? (
          <span className="text-[11px] text-yellow-400/80 font-medium ml-1">
            {charsLeft} character{charsLeft === 1 ? "" : "s"} left
          </span>
        ) : (
          <span />
        )}

        {/* Right: counter */}
        {maxLength && (
          <span className={`text-[11px] font-medium mr-1 ${isAtMax ? "text-red-400" : "text-third/40"}`}>
            {currentLen}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
