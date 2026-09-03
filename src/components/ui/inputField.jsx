import { X } from "lucide-react";

function InputField({
  label,
  placeholder,
  required,
  type = "text",
  variant = "default",
  onChange,
  value,
  readOnly,
  disabled,
  icon: Icon,
  className = "",
  clearable = false,
  onClear,
  ...props
}) {
  const baseStyle =
    "w-full rounded-lg outline-none placeholder:text-gray-400 transition bg-transparent";

  const sizeVariants = {
    default: `h-11 ${Icon ? "pl-10" : "pl-4"} ${clearable ? "pr-10" : "pr-4"}`,
    colored: `h-10 ${Icon ? "pl-9" : "pl-3"} ${clearable ? "pr-9" : "pr-3"}`,
    search: `h-8 ${Icon ? "pl-9" : "pl-3"} ${clearable ? "pr-9" : "pr-3"}`,
  };

  const isReadOnlyOrDisabled = readOnly || disabled;

  const styleVariants = {
    default:
      `border border-secondary/60 text-secondary focus:border-third focus:ring-1 focus:ring-inset focus:ring-third ${isReadOnlyOrDisabled ? "" : ""
      }`,
    colored:
      `border border-primary/20 text-primary placeholder:text-primary/40 focus:border-primary/40 focus:ring-1 focus:ring-inset focus:ring-primary/40 ${isReadOnlyOrDisabled ? "" : ""
      }`,
    search:
      `border border-secondary/60 text-secondary focus:border-primary/50 focus:ring-1 focus:ring-inset focus:ring-primary/50 ${isReadOnlyOrDisabled ? "" : ""
      }`,
  };

  const iconColorVariants = {
    default: "text-gray-400 peer-focus:text-third",
    colored: "text-primary/40 peer-focus:text-primary/40",
    search: "text-gray-400 peer-focus:text-primary/50",
  };

  return (
    <div className="w-full relative">
      {label && (
        <label className="text-sm font-semibold text-primary mb-1.5 ml-1 block">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative flex items-center w-full">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          disabled={disabled}
          className={`peer ${baseStyle} ${sizeVariants[variant] || sizeVariants.default} ${styleVariants[variant] || styleVariants.default
            } ${isReadOnlyOrDisabled
              ? "opacity-60 cursor-not-allowed select-none bg-black/5"
              : ""
            } ${className}`}
          {...props}
        />
        {Icon && (
          <span
            className={`absolute left-3 pointer-events-none transition-colors ${iconColorVariants[variant] || iconColorVariants.default
              }`}
          >
            <Icon size={18} />
          </span>
        )}
        {clearable && value && !isReadOnlyOrDisabled && (
          <button
            type="button"
            className={`absolute right-3 transition cursor-pointer hover:text-white ${iconColorVariants[variant] || iconColorVariants.default
              }`}
            onClick={(e) => {
              e.preventDefault();
              if (onClear) {
                onClear();
              } else if (onChange) {
                onChange({ target: { value: "" } });
              }
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export default InputField;
