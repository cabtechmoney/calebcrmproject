export declare function sendPasswordResetEmail(email: string, resetLink: string): Promise<{
    success: boolean;
    message: string;
} | {
    success: boolean;
    message?: undefined;
}>;
export declare function sendInvoiceEmail(email: string, invoiceUrl: string, invoiceNumber: string): Promise<{
    success: boolean;
    message: string;
} | {
    success: boolean;
    message?: undefined;
}>;
export declare function sendDeadlineReminder(email: string, projectName: string, deadline: string): Promise<{
    success: boolean;
    message: string;
} | {
    success: boolean;
    message?: undefined;
}>;
//# sourceMappingURL=email.d.ts.map