"use client";

interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
}

export default function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  rows = 4,
}: FormTextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-medium text-brand-chocolate">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`px-4 py-3 border-2 rounded-xl font-body transition-colors resize-none ${
          error
            ? "border-red-500 focus:border-red-600"
            : "border-brand-cream focus:border-brand-rose"
        } focus:outline-none`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
