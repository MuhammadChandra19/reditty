import { getListing } from "@/lib/service"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

export default async function Page({ params }) {
  
  const { slug = ['r', 'popular', 'hot']} = params 
  const slugParams = slug.join('/')

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['getListing', slugParams],
    queryFn: () => getListing(slugParams)
  })

  return (
    <main className="container">
      <HydrationBoundary state={dehydrate(queryClient)}></HydrationBoundary>
    </main>
  )
}
