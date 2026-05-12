import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref,
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-2 pl-1 text-sm font-bold text-slate-700"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full rounded-xl border border-slate-200/80 bg-white/90 px-4 py-3 text-slate-950 shadow-sm outline-none transition-all duration-300 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-950 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white placeholder:text-slate-400 hover:border-teal-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
