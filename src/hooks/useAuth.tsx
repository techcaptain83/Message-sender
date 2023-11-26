/* eslint-disable react-hooks/exhaustive-deps */
import axios from '@/axios.config';
import { showVerifyEmailModalAtom } from '@/store/atoms';
import { IAuthUser } from '@/types';
import { UIDHASH } from '@/utils/constants';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from "react-hot-toast";
import { useRecoilState } from 'recoil';


interface IAuth {
    initialLoading: boolean
    user: IAuthUser | null
    updateUser: (user: IAuthUser) => void;
    setUser: React.Dispatch<React.SetStateAction<IAuthUser | null>>
    signIn: (email: string, serialNumber: string) => Promise<void>
    logout: () => Promise<void>
    loading: boolean
    reloadProfile: (userId: string, redirect?: boolean) => Promise<void>
}


const AuthContext = createContext<IAuth>({
    user: null,
    setUser: () => { },
    signIn: async () => { },
    logout: async () => { },
    updateUser: () => { },
    reloadProfile: async () => { },
    loading: false,
    initialLoading: true,

})
interface AuthProviderProps {
    children: React.ReactNode
}

//this is my custom hook that will be used to authenticate the user
export function AuthProvider({ children }: AuthProviderProps) {
    const router = useRouter();
    const [show, setShowVerifyEmail] = useRecoilState(showVerifyEmailModalAtom);

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<IAuthUser | null>(null);

    const [initialLoading, setInitialLoading] = useState(true);

    const verifyCurrentUser = async (userId: string) => {

        try {
            const { data } = await axios.get(`/auth/me/${userId}`);
            if (data.user as IAuthUser) {
                updateUser(data.user);
                if (!data.user.verified && !data.user?.isAdmin) {
                    setShowVerifyEmail(true);
                }
            }
        } catch (error) {
            console.log(error);
            logout();
        }
    }

    useEffect(() => {
        const user = localStorage.getItem(UIDHASH);
        if (router.pathname === "/payment") {
            setInitialLoading(false);
            return;
        }
        if (user) {
            const parsedUser = JSON.parse(user) as IAuthUser;
            setUser(parsedUser);
            if (router.pathname === "/login" || router.pathname === "/" || router.pathname === "/register") {
                if (parsedUser.isAdmin) {
                    router.push("/admin");
                } else {
                    router.push("/dashboard");
                }
            }
            setTimeout(() => {
                setInitialLoading(false);
            }, 200);
            verifyCurrentUser(parsedUser._id);
        } else {
            if (['/', '/login', '/register'].indexOf(router.pathname) === -1) {
                router.push("/login");
            }
            setTimeout(() => {
                setInitialLoading(false);
            }, 200);
        }
    }, []);

    /**
     * 
     * @param userId the id of the user
     * @param redirect whether you want to redirect or not
     */
    const reloadProfile = async (userId: string, redirect?: boolean) => {
        try {
            const { data } = await axios.get(`/auth/me/${userId}`);
            if (data.user) {
                updateUser(data.user);
                if (redirect) {
                    router.push("/dashboard");
                }
            }
        } catch (error) {
            console.log(error);
            logout();
        }
    }


    // login
    const signIn = async (email: string, password: string) => {
        setLoading(true);
        await axios.post('/auth/login', {
            email, password,
            hasPreviouslyLoggedIn: localStorage.getItem("hasPreviouslyLoggedIn") === "true"
        }).then(({ data }) => {
            if (data.user) {
                toast.success("You've been logged in successfully!");
                localStorage.setItem(UIDHASH, JSON.stringify(data.user));
                localStorage.setItem("hasPreviouslyLoggedIn", "true");
                setUser(data.user);
                data.user.isAdmin ? router.push("/admin") : router.push("/dashboard");
            }
        }).catch(({ response }) => {
            if (response?.data?.hasPreviouslyLoggedIn) {
                toast.error("You can only use one device per account!")
                return;
            }
            switch (response?.status) {
                case 400:
                    toast.error("Invalid credentials! ")
                    break;
                default:
                    break;
            }
        });
        setLoading(false);
    }

    const updateUser = (user: IAuthUser) => {
        setUser(user);
        localStorage.setItem(UIDHASH, JSON.stringify(user));
    }

    // logout
    const logout = async () => {
        setLoading(true);
        localStorage.removeItem(UIDHASH);
        router.push("/login");
        setTimeout(() => {
            setLoading(false);
        }, 100);
        router.pathname === "/login" && setUser(null)
    }


    //useMemo to increase performance
    const memoedValue = useMemo(() => ({
        user, setUser, signIn, loading, logout, initialLoading, reloadProfile, updateUser
    }), [user, loading, initialLoading])

    return (<AuthContext.Provider value={memoedValue}>
        {children}
    </AuthContext.Provider>);
}

export default function useAuth() {
    return useContext(AuthContext);
}