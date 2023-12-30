import {redirect} from "@sveltejs/kit";

export const load = ({cookies}) => {
    cookies.delete('auth', {
        path: '/'
    })
    throw redirect(303, '/')
}