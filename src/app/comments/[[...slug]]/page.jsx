import CardSkeleton from "@/components/cards/CardSkeleton"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import Thread from "./[components]/Thread"

/**
 * @typedef { Object } TParams
 * @property { { slug: String[] } } params
 * @param { TParams } param
 * @returns 
 */
export default function Page({ params }) {
  const { slug } = params

  if(slug.length < 5) {
    redirect('/')
  }

  const slugParams = slug.join('/')
  return (
    <main className="container max-w-6xl p-10 bg-slate-300">
      <Suspense fallback={<CardSkeleton />}>
        <Thread pathName={slugParams}/>
      </Suspense>
    </main>
  )
}
