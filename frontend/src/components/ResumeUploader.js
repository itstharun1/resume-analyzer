import React, { useState } from 'react';
import axios from 'axios';
import API from '../api';

export default function ResumeUploader({ onResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please choose a PDF file');
    const form = new FormData();
    form.append('resume', file);
    try {
      setLoading(true);
      const res = await API.post('/api/resumes/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onResult(res.data.analysis);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-6 bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm"
    >
      {/* File Input */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <label className="text-sm font-medium text-gray-700 shrink-0">
          Select PDF
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm cursor-pointer file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm sm:text-base transition disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Upload & Analyze'}
        </button>
        <span className="text-xs sm:text-sm text-gray-500">
          Max 8 MB. PDF only.
        </span>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-sm text-gray-600 animate-pulse">Processing...</div>
      )}
    </form>
  );
}
