import { useEffect } from 'react'
import nprogress from 'accessible-nprogress'

function Nprogress() {
  // @ts-ignore
  useEffect(() => {
    nprogress.start()

    return () => nprogress.done()
  })
  return null
}

export default Nprogress
