const CaseCard = ({ caseData, index }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl font-bold text-primary">#{index + 1}</div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{caseData.title}</h3>
            <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
              {caseData.function}
            </code>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="bg-blue-50 border-l-4 border-primary p-4 rounded">
          <p className="text-sm font-medium text-gray-800">{caseData.key_finding}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Technical Details:</h4>
          
          {caseData.technical_details.objective && (
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-700">Objective: </span>
              <span className="text-sm text-gray-600">{caseData.technical_details.objective}</span>
            </div>
          )}

          {caseData.technical_details.model_errors && (
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-700">Model Errors:</span>
              <ul className="mt-2 space-y-2">
                {Object.entries(caseData.technical_details.model_errors).map(([model, error]) => (
                  <li key={model} className="text-sm text-gray-600 ml-4">
                    <span className="font-medium text-red-600">{model}:</span> {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {caseData.technical_details.GPT5_approach && (
            <div className="mb-3">
              <span className="text-sm font-medium text-green-600">GPT-5 Approach: </span>
              <span className="text-sm text-gray-600">{caseData.technical_details.GPT5_approach}</span>
            </div>
          )}

          {caseData.technical_details.DeepSeekR1_approach && (
            <div className="mb-3">
              <span className="text-sm font-medium text-blue-600">DeepSeek-R1 Approach: </span>
              <span className="text-sm text-gray-600">{caseData.technical_details.DeepSeekR1_approach}</span>
            </div>
          )}

          {caseData.technical_details.result && (
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-700">Result: </span>
              <span className="text-sm text-gray-600">{caseData.technical_details.result}</span>
            </div>
          )}

          {caseData.technical_details.required_logic && (
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-700">Required Logic: </span>
              <span className="text-sm text-gray-600">{caseData.technical_details.required_logic}</span>
            </div>
          )}

          {caseData.technical_details.llm_error && (
            <div className="mb-3">
              <span className="text-sm font-medium text-red-600">LLM Error: </span>
              <span className="text-sm text-gray-600">{caseData.technical_details.llm_error}</span>
            </div>
          )}

          {caseData.technical_details.missing_semantics && (
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-700">Missing Semantics:</span>
              <ul className="mt-2 space-y-2">
                {caseData.technical_details.missing_semantics.map((semantic, idx) => (
                  <li key={idx} className="text-sm text-gray-600 ml-4">• {semantic}</li>
                ))}
              </ul>
            </div>
          )}

          {caseData.technical_details.full_paper_performance && (
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-700">Full Paper: </span>
              <span className="text-sm text-gray-600">{caseData.technical_details.full_paper_performance}</span>
            </div>
          )}

          {caseData.technical_details.reduced_context_drift && (
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-700">Reduced Context: </span>
              <span className="text-sm text-gray-600">{caseData.technical_details.reduced_context_drift}</span>
            </div>
          )}

          {caseData.technical_details.source_paper && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <span className="text-xs text-gray-500">Source: {caseData.technical_details.source_paper}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseCard;

