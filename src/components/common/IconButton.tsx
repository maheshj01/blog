import Button from "./Button";

type IconButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  tooltipPlacement?: 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-start' | 'bottom' | 'bottom-end' | 'left-start' | 'left' | 'left-end';
};

const IconButton: React.FC<IconButtonProps> = ({ onClick, children, ariaLabel, className, tooltipPlacement, size }) => {

  return (
    <button
      onClick={onClick}
      className="text-lg cursor-pointer font-bold bg-transparent border-none py-2 px-6 rounded-lg hover:text-white transition-all duration-300">
      {children}
    </button>
  );
};

export default IconButton;