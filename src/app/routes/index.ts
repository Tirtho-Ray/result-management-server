import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routs';
import { UserRoutes } from '../modules/user/user.router';
import { DepartmentRouts } from '../modules/Department/department.route';
import { SemesterRouts } from '../modules/semester/semester.route';
import { SubjectRoutes } from '../modules/subject/subject.router';
import { StudentRoutes } from '../modules/student/student.route';
import { resultRouts } from '../modules/result/result.router';

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
  {
    path: '/subject',
    route:SubjectRoutes ,
  },
  {
    path: '/students',
    route:StudentRoutes ,
  },
  {
    path: '/result',
    route:resultRouts ,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));
export default router;



