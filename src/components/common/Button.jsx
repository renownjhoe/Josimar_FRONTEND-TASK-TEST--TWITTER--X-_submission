// src/components/common/Button.jsx
const Button = ({ children, className, ...props }) => (
    <button
      className={`flex items-center justify-center px-6 py-4 font-medium rounded-xl transition-all
        bg-white border-2 border-blue-100 hover:border-blue-200
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
  
  export default Button;