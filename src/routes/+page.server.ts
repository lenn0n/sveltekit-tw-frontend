import { routeGuard } from '$lib/routeGuard';

export const load = (data: any) => {
  routeGuard(data, false)
}