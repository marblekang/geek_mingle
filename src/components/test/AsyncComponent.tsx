"use client";

import { useEffect, useState } from "react";

const AsyncComponent = () => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // 2초 후에 데이터 설정
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setData("Async Data Loaded");
    };
    fetchData();
  }, []);

  if (!data) {
    throw new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return <div>{data}</div>;
};

export default AsyncComponent;
