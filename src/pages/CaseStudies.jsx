import { useEffect, useState } from 'react';
import CaseCard from '../components/CaseCard';

const CaseStudies = () => {
  const [cases, setCases] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/case_study_data.json`)
      .then(res => res.json())
      .then(data => setCases(data))
      .catch(err => console.error('Error loading cases:', err));
  }, []);

  // Placeholder cases for expansion
  const placeholderCases = [
    {
      id: 'case_6',
      title: 'Additional Case Study 6',
      function: 'placeholder_function_6',
      key_finding: 'Placeholder for future case study. Replace with actual data.',
      technical_details: {
        objective: 'To be added',
      },
    },
    {
      id: 'case_7',
      title: 'Additional Case Study 7',
      function: 'placeholder_function_7',
      key_finding: 'Placeholder for future case study. Replace with actual data.',
      technical_details: {
        objective: 'To be added',
      },
    },
    {
      id: 'case_8',
      title: 'Additional Case Study 8',
      function: 'placeholder_function_8',
      key_finding: 'Placeholder for future case study. Replace with actual data.',
      technical_details: {
        objective: 'To be added',
      },
    },
    {
      id: 'case_9',
      title: 'Additional Case Study 9',
      function: 'placeholder_function_9',
      key_finding: 'Placeholder for future case study. Replace with actual data.',
      technical_details: {
        objective: 'To be added',
      },
    },
    {
      id: 'case_10',
      title: 'Additional Case Study 10',
      function: 'placeholder_function_10',
      key_finding: 'Placeholder for future case study. Replace with actual data.',
      technical_details: {
        objective: 'To be added',
      },
    },
  ];

  if (!cases) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Case Studies</h1>
        <p className="text-lg text-gray-600">
          In-depth analysis of model behaviors, creative solutions, and common failure patterns
        </p>
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
          <div className="text-3xl mb-2">✅</div>
          <h3 className="text-lg font-semibold mb-2">Creative Correctness</h3>
          <p className="text-sm text-gray-700">
            Models achieving success through different but mathematically equivalent approaches
          </p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6">
          <div className="text-3xl mb-2">❌</div>
          <h3 className="text-lg font-semibold mb-2">Common Failures</h3>
          <p className="text-sm text-gray-700">
            Systematic errors even top models make on seemingly simple tasks
          </p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6">
          <div className="text-3xl mb-2">⚠️</div>
          <h3 className="text-lg font-semibold mb-2">Semantic Gaps</h3>
          <p className="text-sm text-gray-700">
            Missing domain-specific knowledge and engineering robustness
          </p>
        </div>
      </div>

      {/* Main Case Studies */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Case Studies</h2>
        <div className="space-y-6">
          {cases.case_studies.map((caseData, index) => (
            <CaseCard key={caseData.id} caseData={caseData} index={index} />
          ))}
        </div>
      </div>

      {/* Placeholder Cases */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Case Studies</h2>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                The following case studies are placeholders. Replace with actual case data by editing 
                <code className="mx-1 bg-yellow-100 px-1 rounded">case_study_data.json</code>
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {placeholderCases.map((caseData, index) => (
            <div key={caseData.id} className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-2xl font-bold text-gray-400">#{cases.case_studies.length + index + 1}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-600">{caseData.title}</h3>
                  <code className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                    {caseData.function}
                  </code>
                </div>
              </div>
              <p className="text-sm text-gray-500 italic">{caseData.key_finding}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Insights Summary */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6">Key Insights from Case Studies</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <span className="text-xl">🎯</span>
            <div>
              <h4 className="font-semibold mb-1">Multiple Valid Solutions</h4>
              <p className="text-sm text-gray-600">
                Models can achieve correctness through different mathematical formulations, 
                demonstrating flexibility in problem-solving approaches.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-xl">⚠️</span>
            <div>
              <h4 className="font-semibold mb-1">Textbook vs. Domain-Specific Knowledge</h4>
              <p className="text-sm text-gray-600">
                Models often default to common textbook definitions rather than understanding 
                task-specific implicit semantics.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-xl">🔧</span>
            <div>
              <h4 className="font-semibold mb-1">Engineering Robustness Gap</h4>
              <p className="text-sm text-gray-600">
                While models master core algorithms, they frequently miss crucial boundary conditions 
                and robustness considerations.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-xl">📄</span>
            <div>
              <h4 className="font-semibold mb-1">Context Quality Matters</h4>
              <p className="text-sm text-gray-600">
                Concise, method-focused context often yields better results than comprehensive 
                but noisy full-paper context.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;

