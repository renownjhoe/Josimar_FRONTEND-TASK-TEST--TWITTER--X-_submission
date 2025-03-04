const Loader = ({ className }) => (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <div className="w-3 h-3 rounded-full animate-pulse bg-current"></div>
      <div className="w-3 h-3 rounded-full animate-pulse bg-current delay-100"></div>
      <div className="w-3 h-3 rounded-full animate-pulse bg-current delay-200"></div>
    </div>
  );
  
  export default Loader;