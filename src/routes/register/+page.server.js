export const actions = {
    default: async ({request}) => {
        // Get form data
        const form = await request.formData();

        // Get username and password from form
        const username = form.get('username');
        const password = form.get('password');


    }
}