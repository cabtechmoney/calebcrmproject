import { Request, Response, NextFunction } from 'express';
type ErrorLike = Error & {
    statusCode?: number;
    status?: string;
    code?: string;
    isOperational?: boolean;
};
export declare const errorMiddleware: (err: ErrorLike, req: Request, res: Response, _next: NextFunction) => void;
export {};
//# sourceMappingURL=error.middleware.d.ts.map