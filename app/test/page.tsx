"use client";

import React, { useState } from "react";
import axios from "axios";

const Page = () => {
  const [data, setData] = useState<string>(""); // dữ liệu trả về
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGet = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://113.164.94.153:8585/");
      setData(JSON.stringify(res.data, null, 2)); // stringify cho dễ nhìn
    } catch (err: any) {
      setError(err.message || "Lỗi khi fetch API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleGet}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        GET Data
      </button>

      {loading && <p className="mt-4">⏳ Đang tải...</p>}
      {error && <p className="mt-4 text-red-500">❌ {error}</p>}
      {data && (
        <pre className="mt-4 p-2 bg-gray-100 rounded text-sm overflow-x-auto">
          {data}
        </pre>
      )}
    </div>
  );
};

export default Page;
