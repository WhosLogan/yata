export const load = ({locals}) => {
    return {
        user: {
            username: locals.user.username,
        }
    }
}