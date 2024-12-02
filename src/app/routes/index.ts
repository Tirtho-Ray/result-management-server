import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routs';
import { UserRoutes } from '../modules/user/user.router';
import { DepartmentRouts } from '../modules/Department/department.route';
import { SemesterRouts } from '../modules/semester/semester.route';




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
    path: '/departments',
    route:DepartmentRouts ,
  },
  {
    path: '/semesters',
    route:SemesterRouts ,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));
export default router;



