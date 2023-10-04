import axios from '@/axios.config'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function Payment() {
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        
    }, [router.query])

    return (
        <div>Payment</div>
    )
}
