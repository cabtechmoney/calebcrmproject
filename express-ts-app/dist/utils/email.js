"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetEmail = sendPasswordResetEmail;
exports.sendInvoiceEmail = sendInvoiceEmail;
exports.sendDeadlineReminder = sendDeadlineReminder;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;
let transporter = null;
function getTransporter() {
    if (!transporter) {
        transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPassword,
            },
        });
    }
    return transporter;
}
async function sendPasswordResetEmail(email, resetLink) {
    if (!emailUser || !emailPassword) {
        console.warn('Email service not configured');
        return { success: false, message: 'Email service not available' };
    }
    try {
        const transporter = getTransporter();
        await transporter.sendMail({
            from: emailUser,
            to: email,
            subject: 'Password Reset Request',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
        });
        return { success: true };
    }
    catch (error) {
        console.error('Email error:', error);
        return { success: false, message: 'Failed to send email' };
    }
}
async function sendInvoiceEmail(email, invoiceUrl, invoiceNumber) {
    if (!emailUser || !emailPassword) {
        console.warn('Email service not configured');
        return { success: false, message: 'Email service not available' };
    }
    try {
        const transporter = getTransporter();
        await transporter.sendMail({
            from: emailUser,
            to: email,
            subject: `Invoice ${invoiceNumber}`,
            html: `<p>Your invoice is ready. <a href="${invoiceUrl}">Download here</a></p>`,
        });
        return { success: true };
    }
    catch (error) {
        console.error('Email error:', error);
        return { success: false, message: 'Failed to send email' };
    }
}
async function sendDeadlineReminder(email, projectName, deadline) {
    if (!emailUser || !emailPassword) {
        console.warn('Email service not configured');
        return { success: false, message: 'Email service not available' };
    }
    try {
        const transporter = getTransporter();
        await transporter.sendMail({
            from: emailUser,
            to: email,
            subject: `Deadline Reminder: ${projectName}`,
            html: `<p>Reminder: Project <strong>${projectName}</strong> is due on <strong>${deadline}</strong></p>`,
        });
        return { success: true };
    }
    catch (error) {
        console.error('Email error:', error);
        return { success: false, message: 'Failed to send email' };
    }
}
//# sourceMappingURL=email.js.map