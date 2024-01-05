import {fail, redirect} from "@sveltejs/kit";
import {Register} from "$lib/server/auth/register.js";

export const actions = {
    default: async ({request, cookies}) => {
        // Get form data
        const form = await request.formData();

        // Get username and password from form
        const username = form.get('username');
        const password = form.get('password');

        // Attempt to register with the credentials
        const res = await Register(username, password);

        // Validate success of the registration
        if (!res.success) {
            return fail(400, {
                error: res.error
            })
        }

        // Set the auth cookie to the jwt
        cookies.set("auth", res.token, {
            path: '/',
            sameSite: 'strict'
        });

        // Redirect to the dashboard
        throw redirect(303, "/dashboard");
    }
}