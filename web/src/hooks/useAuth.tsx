/* eslint-disable react-hooks/exhaustive-deps */
import axios from '@/axios.config';
import { IAuthUser } from '@/types';
import { UIDHASH } from '@/utils/constants';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from "react-hot-toast";


interface IAuth {
    initialLoading: boolean
    user: IAuthUser | null
    setUser: React.Dispatch<React.SetStateAction<IAuthUser | null>>
    signIn: (email: string, serialNumber: string) => Promise<void>
    logout: () => Promise<void>
    loading: boolean
    reloadProfile: () => Promise<void>
}


const AuthContext = createContext<IAuth>({
    user: null,
    setUser: () => { },
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
            return;
        }
        const checkUser = async () => {
            await axios.get('/auth/me').then((res) => {
                switch (res.status) {
                    case 200:
                        setUser(res.data.user);
                        localStorage.setItem(UIDHASH, JSON.stringify(res.data.user));
                        (router.pathname === "/login" || router.pathname === "/" || router.pathname === "/register") && router.push("/dashboard");
                        break;
                    default:
                        setUser(null);
                        (!["/login", "/register", "/"].includes(router.pathname)) && router.push("/login");
                        break;
                }
            }).catch((err) => {
                setUser(null);
                (!["/login", "/register", "/"].includes(router.pathname)) && router.push("/login");
            }).finally(() => {
                setInitialLoading(false);
            })
        }
        checkUser();
    }, []);

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
                console.log(data.user.isAdmin)
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
        user, setUser, signIn, loading, logout, initialLoading, reloadProfile
    }), [user, loading, initialLoading])

    return (<AuthContext.Provider value={memoedValue}>
        {children}
    </AuthContext.Provider>);
}

export default function useAuth() {
    return useContext(AuthContext);
}