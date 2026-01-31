import { useEffect, useState } from 'react'

export const useDebounce = (value: any, delay: number = 2000) => {
  const [loading, setLoading] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState<any>(value);
  const [TO, setTO] = useState<NodeJS.Timeout | null>(null)

  const debounce = () => {
    setDebouncedValue(value);
    setLoading(false);
  }

  useEffect(() => {
    if (TO) clearTimeout(TO)
    if (value) setLoading(true);
    setTO(setTimeout(() => debounce(), delay))
  }, [value])

  return { debouncedValue, loading };
}