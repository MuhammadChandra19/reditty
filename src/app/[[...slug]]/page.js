import Listing from "./[components]/Listing"
import { Suspense } from "react"

export default function Page({ params }) {
  const { slug = ['r', 'popular', 'hot']} = params 
  const slugParams = slug.join('/')

  return (
    <main className="container">
      <Suspense fallback={<div>Waiting for magic....</div>}>
        <Listing pathName={slugParams}/>
      </Suspense>
    </main>
  )
}
