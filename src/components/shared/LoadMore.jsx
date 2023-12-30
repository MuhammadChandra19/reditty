'use client';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Spinner } from '../ui/spinner';

/**
 * @typedef {{
 *  onLoadData: (param: String) => Promise<{ data: T, after: String }>;
 *  paramKey: String;
 *  renderChild: (data: T) => JSX.Element
 *  url: String
 * }} TLoadMore
 *
 * @template T
 */

/**
 * @template T
 * @param {TLoadMore<T>} props - Props for the LoadMore component.
 * @returns {JSX.Element} JSX representing the LoadMore component.
 *
 */
export const LoadMore = ({ onLoadData, renderChild, paramKey, url }) => {
  const { ref, inView } = useInView();
  const [data, setData] = useState([]);
  const [param, setParam] = useState(null);

  const computedParam = useMemo(
    () => (param === null ? paramKey : param),
    [param, paramKey],
  );

  useEffect(() => {
    if (inView) {
      const delay = 500;
      const timeout = setTimeout(() => {
        onLoadData(`${url}?after=${computedParam}`).then(
          ({ data: res = [], after }) => {
            setData([...data, ...res]);
            setParam(after);
          },
        );
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [inView]);

  return (
    <>
      {renderChild(data)}
      <div ref={ref} className="text-center">
        <Spinner />
      </div>
    </>
  );
};
