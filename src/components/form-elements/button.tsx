type ButtonProps = {
  children: React.ReactNode,
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  // verde | vermelho | laranja | azul
  variant?: 'success' | 'error' | 'warning' | 'info';
};

const buttonClassesVariants = {
  success: 'bg-green-500 hover:bg-green-600 focus:ring-green-500',
  error: 'bg-red-500 hover:bg-red-600 focus:ring-red-500',
  warning: 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-500',
  info: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500',
};

function Button({
  children,
  onClick,
  type = 'button',
  variant = 'info'
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 ml-2 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 ${buttonClassesVariants[variant]}`}
    >
      { children }
    </button>
  );
}

export default Button;
