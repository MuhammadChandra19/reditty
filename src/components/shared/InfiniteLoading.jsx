"use client"
import { useEffect, useState } from "react"
import CardSkeleton from "../cards/CardSkeleton"
import { useInView } from "react-intersection-observer"

/**
 * @param {{ onIntersected: () => Promise<void> }} param0 
 * @returns 
 */
function InfiniteLoading({ 
  onIntersected,
}) {
  const [isLoading, setLoading] = useState(false)
  const { ref, inView } = useInView();

  useEffect(() => {
    if(inView) {
      setLoading(true)

      const delay = 500

      const timeoutId = setTimeout(async () => {
        try {
          await onIntersected()
        } catch(e) {
          console.error(e)
        } finally {
          setLoading(false)
        }
       
      }, delay)

      return () => clearTimeout(timeoutId);
    }

    
  }, [inView, onIntersected])

  return (
    <div ref={ref} className="text-center">
      {
        inView && isLoading && <CardSkeleton total={5}/>
      }
    </div>
  )
}

export default InfiniteLoading
