import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";
import toast from "react-hot-toast";

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const { search } = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(search);
        const token = params.get('token');

        if (token) {
            localStorage.setItem('jwt', token);

            navigate('/rides', { replace: true });
        } else {
            // no token in URL
            toast.error("Something went wrong! Please try again.")
            navigate('/login', { replace: true });
        }
    }, [search, navigate]);

    return <p>Processing login…</p>;
};

export default OAuth2RedirectHandler;