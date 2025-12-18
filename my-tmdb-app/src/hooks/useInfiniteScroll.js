import { useEffect, useRef } from "react";

export function useInfiniteScroll({
  fetchNextPage,
  hasNextPage,
  isFetching,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!hasNextPage || isFetching) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    const element = ref.current;
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [fetchNextPage, hasNextPage, isFetching]);

  return ref;
}
