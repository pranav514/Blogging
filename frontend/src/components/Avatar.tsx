
export function Avatar ({value , size} : any){
    return (
        <div className={`relative mt-2 mr-2 inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className="font-medium text-gray-600 dark:text-gray-300">{value}</span>
    </div>
    )
}