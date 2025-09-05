import React from 'react';

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-1">
        {title}
      </h3>
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">{children}</div>
    </div>
  );
}

export default function ResumeDetails({ analysis }) {
  if (!analysis) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {analysis.name || 'No Name'}
        </h2>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          {analysis.email || ''}
          {analysis.phone ? ' | ' + analysis.phone : ''}
        </p>
        {analysis.linkedin_url && (
          <a
            href={analysis.linkedin_url}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 text-sm hover:underline"
          >
            {analysis.linkedin_url}
          </a>
        )}
      </div>

      {/* Summary */}
      <Section title="Summary">
        <p className="text-gray-700 leading-relaxed">
          {analysis.summary || '—'}
        </p>
      </Section>

      {/* Rating & Improvements */}
      <Section title="Rating & Improvements">
        <p className="text-sm sm:text-base">
          <span className="font-semibold">Rating:</span>{' '}
          <span className="text-indigo-700 font-bold">
            {analysis.resume_rating ?? 'N/A'}
          </span>
        </p>
        <div className="mt-3">
          <p className="font-semibold text-sm sm:text-base">Improvement Areas:</p>
          <p className="mt-1 text-gray-700">{analysis.improvement_areas || '—'}</p>
        </div>
      </Section>

      {/* Skills */}
      <Section title="Skills">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800">Technical</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {(analysis.technical_skills || []).map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs sm:text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Soft</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {(analysis.soft_skills || []).map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Work Experience */}
      <Section title="Work Experience">
        {(analysis.work_experience || []).length > 0 ? (
          (analysis.work_experience || []).map((w, i) => (
            <div key={i} className="mb-4">
              <div className="font-medium text-gray-900">
                {w.role} — {w.company}
              </div>
              <div className="text-sm text-gray-500">{w.duration}</div>
              <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-700">
                {(w.description || []).map((d, idx) => (
                  <li key={idx}>{d}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No work experience listed.</p>
        )}
      </Section>

      {/* Education */}
      <Section title="Education">
        {(analysis.education || []).length > 0 ? (
          (analysis.education || []).map((e, i) => (
            <div key={i} className="mb-3">
              <div className="font-medium text-gray-900">
                {e.degree} — {e.institution}
              </div>
              <div className="text-sm text-gray-500">{e.graduation_year}</div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No education details available.</p>
        )}
      </Section>

      {/* Upskill Suggestions */}
      <Section title="Upskill Suggestions">
        {(analysis.upskill_suggestions || []).length > 0 ? (
          <ul className="list-disc ml-5 space-y-1 text-gray-700">
            {analysis.upskill_suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No suggestions available.</p>
        )}
      </Section>
    </div>
  );
}
