import {redirect} from "@sveltejs/kit";

export const load = ({cookies}) => {
    // Delete the auth cookie
    cookies.delete('auth', {
        path: '/'
    })

    // Redirect to the homepage
    throw redirect(303, '/')
}