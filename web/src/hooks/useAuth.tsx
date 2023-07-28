/* eslint-disable react-hooks/exhaustive-deps */
import { IAuthUser } from '@/types';
import { UIDHASH } from '@/utils/constants';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from "react-hot-toast";
import axios from '../../axios.config';


interface IAuth {
    initialLoading: boolean
    user: IAuthUser | null
    signIn: (email: string, serialNumber: string) => Promise<void>
    logout: () => Promise<void>
    loading: boolean
    reloadProfile: () => Promise<void>
}


const AuthContext = createContext<IAuth>({
    user: null,
    signIn: async () => { },
    logout: async () => { },
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

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<IAuthUser | null>(null);

    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem(UIDHASH);
        if (user) {
            setUser(JSON.parse(user));
            router.pathname === "/login" && router.push("/");
            setTimeout(() => {
                setInitialLoading(false);
            }, 200);
            return;
        }
        const checkUser = async () => {
            await axios.get('/auth/me').then((res) => {
                switch (res.status) {
                    case 200:
                        setUser(res.data.user);
                        localStorage.setItem(UIDHASH, JSON.stringify(res.data.user));
                        router.pathname === "/login" && router.push("/");
                        break;
                    default:
                        setUser(null);
                        router.push("/login");
                        break;
                }
            }).catch((err) => {
                setUser(null);
                router.push("/login");
            }).finally(() => {
                setInitialLoading(false);
            })
        }
        checkUser();
    }, [])

    const reloadProfile = async () => {
        await axios.get('/auth/me').then((res) => {
            switch (res.status) {
                case 200:
                    setUser(res.data.user);
                    localStorage.setItem(UIDHASH, JSON.stringify(res.data.user));
                    break;
                default:
                    setUser(null)
                    break;
            }
        }).catch(({ response }) => {
            // console.log("err", response);
            setUser(null);
        });
    }


    // login
    const signIn = async (email: string, serialNumber: string) => {
        setLoading(true);
        await axios.post('/auth/login', {
            email, serialNumber: parseInt(serialNumber),
            hasPreviouslyLoggedIn: localStorage.getItem("hasPreviouslyLoggedIn") === "true"
        }).then(({ data }) => {
            if (data.user) {
                toast.success("You've been logged in successfully!");
                localStorage.setItem(UIDHASH, JSON.stringify(data.user));
                localStorage.setItem("hasPreviouslyLoggedIn", "true");
                setUser(data.user);
                router.push("/");
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
        user, signIn, loading, logout, initialLoading, reloadProfile
    }), [user, loading, initialLoading])

    return (<AuthContext.Provider value={memoedValue}>
        {children}
    </AuthContext.Provider>);
}

export default function useAuth() {
    return useContext(AuthContext);
}