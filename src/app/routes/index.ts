import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routs';
import { UserRoutes } from '../modules/user/user.router';
import { StudentRoutes } from '../modules/student/student.router';



const router = Router();

const modulesRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/',
    route: StudentRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));
export default router;



