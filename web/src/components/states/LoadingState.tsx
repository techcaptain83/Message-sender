export default function LoadingState({ message, minHeight }: { message: string, minHeight?: string }) {
    return (
        <div className={`w-full ${minHeight ? minHeight : "min-h-[30vh]"} bg-gray-50 rounded-lg mt-6 py-6 flex flex-col items-center justify-center gap-6`} >
            {/* loading spinner */}
            < div
                className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"
            />
            <h1 className='text-xl font-semibold text-gray-700'>{message}</h1>
        </div >
    )
}