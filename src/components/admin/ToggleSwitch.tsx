"use client";

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export default function ToggleSwitch({
  enabled,
  onChange,
  label,
  disabled = false,
}: ToggleSwitchProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      {label && (
        <span className="text-sm font-medium text-brand-chocolate">
          {label}
        </span>
      )}
      <div
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? "bg-brand-mint" : "bg-gray-300"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </div>
    </label>
  );
}
