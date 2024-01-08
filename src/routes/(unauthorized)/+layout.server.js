import {redirect} from "@sveltejs/kit";

export const load = ({cookies}) => {
    if (cookies.get("auth")) {
        throw redirect(303, '/dashboard');
    }
}