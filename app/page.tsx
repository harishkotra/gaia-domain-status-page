'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, LoaderCircle } from 'lucide-react';

const GAIA_NODES = [
  'llama70b.gaia.domains',
  'llama8b.gaia.domains',
  'whisper.gaia.domains',
  'portrait.gaia.domains',
  'code.gaia.domains',
  'rustcoder.gaia.domains',
  'qwen7b.gaia.domains',
  'qwen72b.gaia.domains',
  'metamask.gaia.domains',
  'trees.gaia.domains',
  'mantle.gaia.domains'
];

const fetchNodeStatus = async (node: string): Promise<'up' | 'down'> => {
  try {
    const response = await fetch(`https://${node}/v1/info`, {
      method: 'POST'
    });

    if (!response.ok) throw new Error('Failed');

    const data = await response.json();
    if (data?.title === 'Not found' && data?.description === 'Domain is unavailable') {
      return 'down';
    }

    return 'up';
  } catch {
    return 'down';
  }
};

export default function NodeStatusPage() {
  const [status, setStatus] = useState<Record<string, 'up' | 'down'>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [lastChecked, setLastChecked] = useState<string>('');

  useEffect(() => {
    const checkStatuses = async () => {
      setLoading(true);
      const results: Record<string, 'up' | 'down'> = {};
      await Promise.all(
        GAIA_NODES.map(async (node) => {
          const result = await fetchNodeStatus(node);
          results[node] = result;
        })
      );
      setStatus(results);
      setLastChecked(new Date().toLocaleString());
      setLoading(false);
    };

    checkStatuses();

    const interval = setInterval(checkStatuses, 4 * 60 * 60 * 1000); // every 4 hours
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Gaia Domains Status</h1>

      <div className="text-center mb-4 text-sm text-gray-600">
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <LoaderCircle className="animate-spin" size={16} /> Checking domains statuses...
          </span>
        ) : (
          <span>Last checked: {lastChecked}</span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="text-left bg-gray-200 text-gray-700">
              <th className="p-4">Gaia Domain</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {GAIA_NODES.map((node) => (
              <tr key={node} className="border-b hover:bg-gray-50">
                <td className="p-4 text-sm font-medium text-blue-700 underline whitespace-nowrap">
                  <a href={`https://${node}`} target="_blank" rel="noopener noreferrer">
                    {node}
                  </a>
                </td>
                <td className="p-4">
                  {loading ? (
                    <Badge className="bg-gray-100 text-gray-500">
                      <LoaderCircle className="animate-spin inline mr-1" size={16} /> Loading
                    </Badge>
                  ) : status[node] === 'up' ? (
                    <Badge className="bg-green-100 text-green-700">
                      <CheckCircle className="inline mr-1" size={16} /> Up
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700">
                      <XCircle className="inline mr-1" size={16} /> Down
                    </Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}