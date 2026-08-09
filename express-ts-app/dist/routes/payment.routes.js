"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
const router = (0, express_1.Router)();
router.get("/", payment_controller_1.getPayments);
router.post("/", payment_controller_1.createPayment);
router.put("/:id", payment_controller_1.updatePayment);
router.delete("/:id", payment_controller_1.deletePayment);
exports.default = router;
//# sourceMappingURL=payment.routes.js.map