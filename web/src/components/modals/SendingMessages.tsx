
export default function SendingMessages() {
    return (
        <div className='fixed top-3 left-0 w-full justify-center flex items-center '>
            <div className='flex items-center gap-4 shadow-xl px-4 py-3 rounded-md bg-gray-50 border-2 border-blue-200'>
                <p className="font-semibold text-sm">Sending messages ...</p>
                <div
                    className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"
                />
            </div>
        </div>
    )
}
