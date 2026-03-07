const StatCard = ({ title, value, icon, description, gradient }) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      {/* Gradient Background on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient || 'from-blue-500 to-indigo-600'} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{title}</p>
            <p className={`text-4xl font-black mb-2 bg-gradient-to-r ${gradient || 'from-blue-600 to-indigo-600'} bg-clip-text text-transparent`}>
              {value}
            </p>
            {description && (
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">{description}</p>
            )}
          </div>
          {icon && (
            <div className={`text-4xl opacity-20 group-hover:opacity-30 transition-opacity transform group-hover:scale-110`}>
              {icon}
            </div>
          )}
        </div>
        
        {/* Decorative Line */}
        <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${gradient || 'from-blue-500 to-indigo-600'} mt-3`}></div>
      </div>
    </div>
  );
};

export default StatCard;
