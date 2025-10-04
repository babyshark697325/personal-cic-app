import { SVGProps, forwardRef } from 'react';

interface FlowerIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

const FlowerIcon = forwardRef<SVGSVGElement, FlowerIconProps>(({ 
  className = '', 
  ...props 
}, ref) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-6 h-6 ${className}`.trim()}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 7.5A.75.75 0 009 9v1.5c0 .99.784 1.75 1.75 1.75h1.5a.75.75 0 010 1.5h-1.5A3.25 3.25 0 017.5 10.5V9a2.25 2.25 0 014.5 0v1.5a.75.75 0 01-1.5 0V9a.75.75 0 00-1.5 0zm6 0a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0V9a.75.75 0 00-1.5 0z"
        clipRule="evenodd"
      />
    </svg>
  );
});

FlowerIcon.displayName = 'FlowerIcon';

export default FlowerIcon;
