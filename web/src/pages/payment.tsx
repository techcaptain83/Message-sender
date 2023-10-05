import { decryptText } from '@/utils';
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function Payment() {
    const router = useRouter();

    useEffect(() => {
        const { success, uid, reason, plan, dep_id } = router.query;
        console.log(success, uid, reason, plan, dep_id);

    }, [router.query])
    return (
        <>
            <Head>
                <title>Chatmaid - Payment</title>
            </Head>
            <main className='w-full h-screen flex items-center justify-center'>

            </main>
        </>
    )
}
