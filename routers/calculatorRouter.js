const express = require("express");
const validate = require("/opt/render/project/src/utils/validate");
const schema = require("/opt/render/project/src/schema/calculatorValidator");
const calculatorController = require("/opt/render/project/src/controllers/calculatorControlers");
const debtrouter = express.Router();
const middleware = require("/opt/render/project/src/utils/middleware");

debtrouter.get(
  "/average",
  middleware.verifyToken,
  calculatorController.average
);

debtrouter.post(
  "/balance",
  validate(schema.balanceSchema, "body"),
  middleware.verifyToken,
  calculatorController.balance
);

debtrouter.post(
  "/monPayment",
  validate(schema.monPaymentSchema, "body"),
  middleware.verifyToken,
  calculatorController.monthly_payment
);

debtrouter.post(
  "/repayment",
  validate(schema.repaymentSchema, "body"),
  middleware.verifyToken,
  calculatorController.repayment
);

module.exports = debtrouter;
