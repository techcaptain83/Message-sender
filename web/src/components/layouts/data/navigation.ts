import { ILink } from "@/types";
import { ArrowPathRoundedSquareIcon, PhoneArrowDownLeftIcon } from "@heroicons/react/20/solid";

const { HomeIcon, UserGroupIcon, CheckIcon, PhoneIcon, PlusIcon } = require("@heroicons/react/24/outline");

export const adminNavigation: ILink[] = [
    { name: 'Overview', href: '/a', icon: HomeIcon },
    { name: 'Users', href: '/a/users', icon: UserGroupIcon },
    { name: "Number Requests", href: '/a/orders', icon: ArrowPathRoundedSquareIcon },
    { name: "Call History", href: "/a/call-history", icon: PhoneArrowDownLeftIcon },
    { name: "Ongoing Calls", href: '/a/active-calls', icon: PhoneIcon }
]

export const clientNavigation: ILink[] = [
    { name: 'Overview', href: '/c', icon: HomeIcon },
    { name: "Your Numbers", href: "/c/numbers", icon: PhoneIcon },
    { name: "Your orders", href: "/c/orders", icon: CheckIcon },
    { name: "Order a number", href: "/c/order-number", icon: PlusIcon },
]
