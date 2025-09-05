import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PastResumesTable({ onSelect }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const res = await axios.get('/api/resumes');
        setRows(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  if (loading) return <div className="text-center py-6">Loading...</div>;

  return (
    <div>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">File</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Email</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Uploaded</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {rows.map((r) => (
              <tr key={r._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">{r.fileName}</td>
                <td className="px-4 py-3">{r.analysis?.name || '—'}</td>
                <td className="px-4 py-3">{r.analysis?.email || '—'}</td>
                <td className="px-4 py-3">
                  {new Date(r.uploadedAt).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onSelect(r)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded transition"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden space-y-4">
        {rows.map((r) => (
          <div
            key={r._id}
            className="bg-white shadow rounded-lg p-4 space-y-2"
          >
            <p className="text-sm">
              <span className="font-medium">File:</span> {r.fileName}
            </p>
            <p className="text-sm">
              <span className="font-medium">Name:</span>{' '}
              {r.analysis?.name || '—'}
            </p>
            <p className="text-sm">
              <span className="font-medium">Email:</span>{' '}
              {r.analysis?.email || '—'}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(r.uploadedAt).toLocaleString()}
            </p>
            <button
              onClick={() => onSelect(r)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded w-full sm:w-auto transition"
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
