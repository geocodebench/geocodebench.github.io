const Footer = () => {
  const base = import.meta.env.BASE_URL;
  const institutions = [
    { name: 'AIR, Tsinghua University', logo: `${base}logos/air-thu.png` },
    { name: 'Qiuzhen College, Tsinghua University', logo: `${base}logos/qiuzhen-thu.png` },
    { name: 'BAAI', logo: `${base}logos/baai.png`, imgClassName: 'h-10 sm:h-12' },
    { name: 'Peking University', logo: `${base}logos/pku.png` },
    { name: 'Nanjing University', logo: `${base}logos/nju.png` },
    { name: 'University of Toronto', logo: `${base}logos/uoft.png` },
  ];

  return (
    <footer className="bg-white mt-auto border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Collaborating Institutions</h3>
          <div className="overflow-x-auto">
            <div className="flex flex-nowrap justify-center items-center gap-6 min-w-max mx-auto px-2">
            {institutions.map((inst) => (
              <div key={inst.name} className="flex items-center">
                <img
                  src={inst.logo}
                  alt={`${inst.name} logo`}
                  title={inst.name}
                  className={`${inst.imgClassName ?? 'h-9 sm:h-10'} w-auto object-contain`}
                />
              </div>
            ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
          <p>© 2026 GeoCodeBench Team. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

