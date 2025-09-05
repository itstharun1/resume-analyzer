import React, { useState } from 'react';
import ResumeUploader from './ResumeUploader';
import PastResumesTable from './PastResumesTable';
import ResumeDetails from './ResumeDetails';

export default function App() {
  const [tab, setTab] = useState('analyze');
  const [latestAnalysis, setLatestAnalysis] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Resume Analyzer
          </h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            AI-powered resume feedback to help you improve and upskill.
          </p>
        </header>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-center gap-2 mb-6">
            <button
              onClick={() => setTab('analyze')}
              className={`px-4 py-2 rounded-lg text-sm sm:text-base transition ${
                tab === 'analyze'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Analyze
            </button>
            <button
              onClick={() => setTab('history')}
              className={`px-4 py-2 rounded-lg text-sm sm:text-base transition ${
                tab === 'history'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              History
            </button>
          </div>

          {/* Analyze Tab */}
          {tab === 'analyze' && (
            <>
              <ResumeUploader onResult={(a) => setLatestAnalysis(a)} />
              {latestAnalysis && (
                <div className="mt-6">
                  <ResumeDetails analysis={latestAnalysis} />
                </div>
              )}
            </>
          )}

          {/* History Tab */}
          {tab === 'history' && (
            <PastResumesTable onSelect={(r) => setSelectedResume(r)} />
          )}
        </div>

        {/* Modal for Resume Details */}
        {selectedResume && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Resume Details
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-800 transition"
                  onClick={() => setSelectedResume(null)}
                >
                  ✕
                </button>
              </div>
              <ResumeDetails analysis={selectedResume.analysis} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
