"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProject = exports.getProjects = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const appError_1 = __importDefault(require("../utils/appError"));
const supabase_1 = __importDefault(require("../lib/supabase"));
const table = 'projects';
exports.getProjects = (0, asyncHandler_1.default)(async (_req, res) => {
    const supabase = (0, supabase_1.default)();
    if (!supabase)
        return res.status(200).json([]);
    const { data, error } = await supabase.from(table).select('*, client:clients(*)');
    if (error)
        throw error;
    res.status(200).json(data ?? []);
});
exports.getProject = (0, asyncHandler_1.default)(async (req, res, next) => {
    const supabase = (0, supabase_1.default)();
    if (!supabase)
        return next(new appError_1.default('Database not configured', 503));
    const id = String(req.params.id);
    const { data, error } = await supabase.from(table).select('*, client:clients(*)').eq('id', id).single();
    if (error) {
        if (error.code === 'PGRST116')
            return next(new appError_1.default('Project not found', 404));
        throw error;
    }
    res.status(200).json(data);
});
exports.createProject = (0, asyncHandler_1.default)(async (req, res) => {
    const supabase = (0, supabase_1.default)();
    if (!supabase)
        return res.status(503).json({ message: 'Database not configured' });
    const { data, error } = await supabase.from(table).insert(req.body).select().single();
    if (error)
        throw error;
    res.status(201).json(data);
});
exports.updateProject = (0, asyncHandler_1.default)(async (req, res) => {
    const supabase = (0, supabase_1.default)();
    if (!supabase)
        return res.status(503).json({ message: 'Database not configured' });
    const id = String(req.params.id);
    const { data, error } = await supabase.from(table).update(req.body).eq('id', id).select().single();
    if (error)
        throw error;
    res.status(200).json(data);
});
exports.deleteProject = (0, asyncHandler_1.default)(async (req, res) => {
    const supabase = (0, supabase_1.default)();
    if (!supabase)
        return res.status(503).json({ message: 'Database not configured' });
    const id = String(req.params.id);
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error)
        throw error;
    res.status(204).send();
});
//# sourceMappingURL=project.controller.js.map