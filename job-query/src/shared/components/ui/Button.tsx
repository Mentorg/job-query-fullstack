type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  hasError?: string[];
};

function Button({ onClick, className, children, hasError }: ButtonProps) {
  return (
    <button
      aria-label={children?.toString()}
      disabled={children === "Publish Now" && hasError && hasError.length > 0}
      onClick={onClick}
      className={`${className} ${children === "Publish Now" && hasError && hasError?.length > 0 ? "bg-slate-300" : "bg-slate-primary"}`}
    >
      {children}
    </button>
  );
}

export default Button;
