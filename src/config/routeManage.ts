import express from 'express';
import { UserRoutes } from '../routes/userRoutes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    }
];

moduleRoutes.forEach(routes => router.use(routes.path, routes.route));

export default router;
