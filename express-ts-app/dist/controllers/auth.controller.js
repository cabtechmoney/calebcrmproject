"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = __importDefault(require("../utils/appError"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const supabase_1 = __importDefault(require("../lib/supabase"));
const omitPassword = ({ password: _password, ...user }) => {
    void _password;
    return user;
};
exports.login = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    const { data: user, error } = await (0, supabase_1.default)().from("users").select("*").eq("email", email).maybeSingle();
    if (error)
        throw error;
    if (!user) {
        return next(new appError_1.default("Invalid credentials.", 401));
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        return next(new appError_1.default("Invalid credentials.", 401));
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const userWithoutPassword = omitPassword(user);
    res.status(200).json({ token, user: userWithoutPassword });
});
exports.register = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { name, email, password } = req.body;
    const { data: existingUser, error: existingError } = await (0, supabase_1.default)().from("users").select("id").eq("email", email).maybeSingle();
    if (existingError)
        throw existingError;
    if (existingUser) {
        return next(new appError_1.default("User already exists.", 400));
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const { data: user, error } = await (0, supabase_1.default)().from("users").insert({ name, email, password: hashedPassword }).select().single();
    if (error)
        throw error;
    const userWithoutPassword = omitPassword(user);
    res.status(201).json(userWithoutPassword);
});
//# sourceMappingURL=auth.controller.js.map