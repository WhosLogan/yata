import {fail, redirect} from "@sveltejs/kit";
import {Login} from "$lib/server/auth/login.js";

export const actions = {
    default: async ({request, cookies}) => {
        // Get form data
        const form = await request.formData();

        // Get username and password from form
        const username = form.get('username');
        const password = form.get('password');

        // Attempt to log in with the specified credentials
        const res = await Login(username, password);

        // Check if the login attempt was successful
        if (!res.success) {
            return fail(400, {
                error: res.error
            })
        }

        // Set the auth header to the jwt string
        cookies.set("auth", res.token, {
            path: '/',
            sameSite: 'strict'
        });

        // Redirect the user to the dashboard
        return redirect(303, "/dashboard");
    }
}