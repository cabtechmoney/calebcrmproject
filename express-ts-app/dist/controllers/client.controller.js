"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.createClient = exports.getClient = exports.getClients = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const appError_1 = __importDefault(require("../utils/appError"));
const supabase_1 = __importDefault(require("../lib/supabase"));
const table = "clients";
exports.getClients = (0, asyncHandler_1.default)(async (_req, res) => {
    const { data, error } = await (0, supabase_1.default)().from(table).select('*, projects(*)');
    if (error)
        throw error;
    res.status(200).json(data ?? []);
});
exports.getClient = (0, asyncHandler_1.default)(async (req, res, next) => {
    const id = String(req.params.id);
    const { data, error } = await (0, supabase_1.default)().from(table).select('*, projects(*)').eq('id', id).single();
    if (error) {
        if (error.code === 'PGRST116') {
            return next(new appError_1.default('Client not found.', 404));
        }
        throw error;
    }
    res.status(200).json(data);
});
exports.createClient = (0, asyncHandler_1.default)(async (req, res) => {
    const { data, error } = await (0, supabase_1.default)().from(table).insert(req.body).select().single();
    if (error)
        throw error;
    res.status(201).json(data);
});
exports.updateClient = (0, asyncHandler_1.default)(async (req, res) => {
    const id = String(req.params.id);
    const { data, error } = await (0, supabase_1.default)().from(table).update(req.body).eq("id", id).select().single();
    if (error)
        throw error;
    res.status(200).json(data);
});
exports.deleteClient = (0, asyncHandler_1.default)(async (req, res) => {
    const id = String(req.params.id);
    const { error } = await (0, supabase_1.default)().from(table).delete().eq("id", id);
    if (error)
        throw error;
    res.status(204).send();
});
//# sourceMappingURL=client.controller.js.map