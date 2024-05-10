import { useState } from 'react'

/**
 * Use boolean value
 * @param initialValue Initial value, ture or false
 */
export default function useBoolean(initialValue: boolean): [boolean, (value: any) => void] {
  const [bool, setBool] = useState(initialValue)

  function setter(value: any) {
    setBool(value !== undefined ? !!value : !bool)
  }

  return [bool, setter]
}
