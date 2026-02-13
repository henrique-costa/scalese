"use client";

interface FormInputProps {
  label: string;
  name: string;
  type?: "text" | "number" | "url" | "email";
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  step?: string;
  min?: number;
}

export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  step,
  min,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-medium text-brand-chocolate">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) =>
          onChange(type === "number" ? Number(e.target.value) : e.target.value)
        }
        placeholder={placeholder}
        required={required}
        step={step}
        min={min}
        className={`px-4 py-3 border-2 rounded-xl font-body transition-colors ${
          error
            ? "border-red-500 focus:border-red-600"
            : "border-brand-cream focus:border-brand-rose"
        } focus:outline-none`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
