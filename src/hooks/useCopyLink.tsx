import { useCallback, useEffect, useState } from 'react'

const useCopyLink = () => {
    const [host, setHost] = useState('')
    useEffect(() => {
        setHost(window.location.host)
    }, [])

    const copyLink = useCallback(
        async (uid: string, position: string) => {
            try {
                if (uid) {
                    const linkCopied = `${host}/sign-up/${uid}/${position}`
                    await navigator.clipboard.writeText(linkCopied)
                    return linkCopied
                }
            } catch (e) {
                //
            }
        },
        [host]
    )

    return { copyLink }
}

export default useCopyLink
