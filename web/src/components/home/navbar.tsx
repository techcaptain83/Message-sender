import { showUpgradeToPremiumState } from '@/atoms';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import { FaCrown } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { Button } from '../Button';
import { Logo } from '../Logo';


export default function Navbar() {
    const { user } = useAuth();
    const [_, setShowUpgradeModal] = useRecoilState(showUpgradeToPremiumState);

    return (
        <div className='w-full fixed top-0  left-0  py-4 bg-gray-50 flex justify-between items-center  shadow px-8 h-[6.5vh]'>
            <div className='flex items-center gap-3'>
                <Link href={'/dashboard'}>
                    <Logo className="h-10" />
                </Link>

            </div>
            <div className='flex items-center gap-6'>
                <div className='flex gap-3 items-center '>
                    <div className='w-8 h-8 rounded-full flex items-center bg-blue-500 justify-center font-medium text-white text-xs uppercase '>
                        {/* @ts-ignore */}
                        {user?.firstName[0] + user?.lastName[0]}
                    </div>
                    <div className='text-xs'>
                        <p>balance</p>
                        <span className='font-semibold'>${user?.balance.toFixed(2)}</span>
                    </div>
                </div>
                {
                    user?.plan === "free" ?
                        <Button onClick={() => setShowUpgradeModal(true)} variant='solid' color='green'
                            className='rounded-md space-x-2 lg:text-base text-xs'>
                            {<>
                                <span>Upgrade Your account</span>
                                <FaCrown width={20} />
                            </>
                            }
                        </Button> :
                        user?.plan === "pro" &&
                        <div className='bg-blue-500 text-white p-1 rounded-md flex items-center gap-2 lg:text-sm text-xs' >
                            <span>Pro</span>
                            <FaCrown width={20} />
                        </div>}
                {
                    user?.plan === "enterprise" &&
                    <div className='bg-yellow-500 text-white p-2 rounded-md flex items-center gap-2 lg:text-base text-xs' >
                        <span>Enterprise</span>
                        <FaCrown width={20} />
                    </div>
                }
                {
                    user?.plan === "pro" && <Button onClick={() => setShowUpgradeModal(true)} variant='solid' color='green'
                        className='rounded-md space-x-2 lg:text-sm text-xs'>
                        {<>
                            <span>Upgrade to enterprise</span>
                            <FaCrown width={20} />
                        </>
                        }
                    </Button>
                }

            </div>
        </div>
    )
}
