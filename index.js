const app = require("/opt/render/project/src/app");
const config = require("/opt/render/project/src/utils/config");
const logger = require("/opt/render/project/src/utils/logger");

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
