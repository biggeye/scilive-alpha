import { useEffect } from 'react'
import { supabase } from '@/utils/supabase/legacy'
import { useRouter } from 'next/router'

const Logout = () => {
    const router = useRouter()
    useEffect(() => {
       const logout = async () => {

       await supabase.auth.signOut()
        Router.push('/legacy');
       } 
       logout();
    }, []);

    return <p> Logging out </p>;
}

export default Logout;