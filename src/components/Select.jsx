import { forwardRef, useId } from "react";

function Select({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="inline-block mb-2 pl-1 text-sm font-bold text-slate-700"
        >
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`w-full rounded-xl border border-slate-200/80 bg-white/90 px-4 py-3 text-slate-950 shadow-sm outline-none transition-all duration-300 hover:border-teal-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
