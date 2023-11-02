import { useQuery } from '@tanstack/react-query';

import getCatFact from '../../api/catFactAPI.ts';
import { catFact } from '../../types/catFactTypes.ts';

export default function CatFact() {
  const { data, error, isLoading, isError } = useQuery<catFact, Error>(
    { queryKey: ['catFact'], queryFn: getCatFact, staleTime: 600000, cacheTime: 600000 }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.fact}
    </div>
  );
}