"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.updatePayment = exports.createPayment = exports.getPayments = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const supabase_1 = __importDefault(require("../lib/supabase"));
const table = 'payments';
exports.getPayments = (0, asyncHandler_1.default)(async (_req, res) => {
    const supabase = (0, supabase_1.default)();
    if (!supabase)
        return res.status(200).json([]);
    const { data, error } = await supabase.from(table).select('*');
    if (error)
        throw error;
    res.status(200).json(data ?? []);
});
exports.createPayment = (0, asyncHandler_1.default)(async (req, res) => {
    const supabase = (0, supabase_1.default)();
    if (!supabase)
        return res.status(503).json({ message: 'Database not configured' });
    const { data, error } = await supabase.from(table).insert(req.body).select().single();
    if (error)
        throw error;
    res.status(201).json(data);
});
exports.updatePayment = (0, asyncHandler_1.default)(async (req, res) => {
    const supabase = (0, supabase_1.default)();
    if (!supabase)
        return res.status(503).json({ message: 'Database not configured' });
    const id = String(req.params.id);
    const { data, error } = await supabase.from(table).update(req.body).eq('id', id).select().single();
    if (error)
        throw error;
    res.status(200).json(data);
});
exports.deletePayment = (0, asyncHandler_1.default)(async (req, res) => {
    const supabase = (0, supabase_1.default)();
    if (!supabase)
        return res.status(503).json({ message: 'Database not configured' });
    const id = String(req.params.id);
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error)
        throw error;
    res.status(204).send();
});
//# sourceMappingURL=payment.controller.js.map