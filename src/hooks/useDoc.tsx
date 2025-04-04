import { db } from '@/configs/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const useDoc = (path: string) => {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    getDoc(doc(db, path)).then((d) => {
      setData({
        ...d.data(),
        id: d.id,
      })
    })
  }, [path])

  return data
}

export default useDoc
