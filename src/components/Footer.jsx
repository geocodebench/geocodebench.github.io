const Footer = () => {
  const bibtex = `@article{geocodebench2025,
  title={GeoCodeBench: Benchmarking PhD-Level Coding in 3D Geometric Computer Vision},
  author={Your Team},
  journal={arXiv preprint},
  year={2025}
}`;

  const institutions = [
    { name: 'AIR Tsinghua', logo: '🎓' },
    { name: 'BAAI', logo: '🤖' },
    { name: 'Peking University', logo: '🏛️' },
    { name: 'Nanjing University', logo: '🎯' },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Citation Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Citation</h3>
            <pre className="bg-gray-800 p-4 rounded-lg text-xs overflow-x-auto">
              {bibtex}
            </pre>
          </div>

          {/* Institutions Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Collaborating Institutions</h3>
            <div className="grid grid-cols-2 gap-4">
              {institutions.map((inst) => (
                <div key={inst.name} className="flex items-center space-x-2">
                  <span className="text-2xl">{inst.logo}</span>
                  <span className="text-sm">{inst.name}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Links</h3>
              <div className="flex space-x-4">
                <a href="https://github.com" className="text-blue-400 hover:text-blue-300">
                  GitHub
                </a>
                <a href="https://arxiv.org" className="text-blue-400 hover:text-blue-300">
                  Paper
                </a>
                <a href="https://huggingface.co" className="text-blue-400 hover:text-blue-300">
                  Dataset
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© 2025 GeoCodeBench. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

