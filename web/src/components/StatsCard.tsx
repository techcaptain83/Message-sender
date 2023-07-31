import React from 'react'
import Loader from './Loader';


interface Props {
    name: string;
    Icon: any,
    value?: string | number
}
export default function StatsCard({ name, Icon, value }: Props) {
    return (
        <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="truncate text-sm font-medium text-gray-500">{name}</dt>
                            <dd>
                                <div className="text-lg font-medium text-gray-900">{typeof value !== "undefined" ? value : <Loader />}</div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}
