const Footer = () => {
  const base = import.meta.env.BASE_URL;
  const institutions = [
    { name: 'AIR, Tsinghua University', logo: `${base}logos/air-thu.png` },
    { name: 'Qiuzhen College, Tsinghua University', logo: `${base}logos/qiuzhen-thu.png` },
    { name: 'BAAI', logo: `${base}logos/baai.png`, imgClassName: 'h-14 sm:h-16' },
    { name: 'Peking University', logo: `${base}logos/pku.png` },
    { name: 'Nanjing University', logo: `${base}logos/nju.png` },
    { name: 'University of Toronto', logo: `${base}logos/uoft.png` },
  ];

  return (
    <footer className="bg-white mt-auto border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Collaborating Institutions</h3>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
            {institutions.map((inst) => (
              <div key={inst.name} className="flex items-center">
                <img
                  src={inst.logo}
                  alt={`${inst.name} logo`}
                  title={inst.name}
                  className={`${inst.imgClassName ?? 'h-12 sm:h-14'} w-auto object-contain`}
                />
              </div>
            ))}
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

