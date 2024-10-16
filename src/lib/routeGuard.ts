import { redirect } from '@sveltejs/kit';

interface DataInterface {
  cookies: {
    get: Function
  }
}

export const routeGuard = (data: DataInterface, guarded: boolean) => {
    // if (!data.cookies.get('token') && guarded) {
    //   redirect(302, '/');
    // }
    // if (data.cookies.get('token') && !guarded) {
    //   redirect(302, '/story');
    // }
}