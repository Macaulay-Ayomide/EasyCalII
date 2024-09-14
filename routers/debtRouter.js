const express = require("express");
const validate = require("/opt/render/project/src/utils/validate");
const schema = require("/opt/render/project/src/schema/debtValidator");
const debtController = require("/opt/render/project/src/controllers/DebtControllers");
const debtrouter = express.Router();
const middleware = require("/opt/render/project/src/utils/middleware");

debtrouter.post(
  "/:id",
  middleware.verifyToken,
  validate(schema.mongodbSchema, "params"),
  validate(schema.updatedDebtSchema, "body"),
  debtController.updateDebt
);

debtrouter.post(
  "/",
  middleware.verifyToken,
  validate(schema.createDebtArraySchema, "body"),
  debtController.createDebt
);

debtrouter.delete(
  "/:id",
  middleware.verifyToken,
  validate(schema.mongodbSchema, "params"),
  debtController.deleteDebt
);

debtrouter.get("/", middleware.verifyToken, debtController.getDebt);

module.exports = debtrouter;
