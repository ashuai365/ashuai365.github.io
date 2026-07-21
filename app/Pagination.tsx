"use client";

import { useEffect, useMemo, useState } from "react";

export function usePagination<T>(items: T[], pageSize = 10) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const visibleItems = useMemo(
    () => items.slice((page - 1) * pageSize, page * pageSize),
    [items, page, pageSize],
  );

  return { page, setPage, totalPages, visibleItems };
}

export default function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (page: number) => void }) {
  if (totalPages <= 1) return null;
  const go = (nextPage: number) => {
    onChange(nextPage);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  return <nav className="pagination" aria-label="列表分页">
    <button onClick={() => go(page - 1)} disabled={page === 1} aria-label="上一页">‹ 上一页</button>
    {Array.from({ length: totalPages }, (_, index) => index + 1).map(number =>
      <button key={number} className={number === page ? "current" : ""} onClick={() => go(number)} aria-current={number === page ? "page" : undefined}>{number}</button>
    )}
    <button onClick={() => go(page + 1)} disabled={page === totalPages} aria-label="下一页">下一页 ›</button>
  </nav>;
}
