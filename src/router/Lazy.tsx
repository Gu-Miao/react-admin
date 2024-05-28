import { Suspense, lazy } from 'react'
import Nprogress from './Nprogress'

function Lazy({ path }: { path: string }) {
  const Component = lazy(() => import(/* @vite-ignore */ `../views/${path}`))

  return (
    <Suspense fallback={<Nprogress />}>
      <Component />
    </Suspense>
  )
}

export default Lazy
