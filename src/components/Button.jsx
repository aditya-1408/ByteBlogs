function Button({
  children,
  type = "button",
  bgColor = "bg-slate-950",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-5 py-3 text-sm font-bold tracking-wide shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 ${bgColor} ${textColor} ${className}`}
      type={type}
      {...props}
    >
      <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{children}</span>
    </button>
  );
}

export default Button;
