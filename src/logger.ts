import log4js from "log4js";

log4js.configure({
  "appenders":
  {
    "console":
    {
      "type": "console",
      "level": "debug",
      "layout":
      {
        "type": "pattern",
        "pattern": "[%d{ISO8601}] %[[%p]%] - %m"
      }
    },
    "logfile":
    {
      "type": "file",
      "level": "debug",
      "filename": "typescript-event-processor.log",
      "pattern": "-yyyy-MM-dd",
      "layout":
      {
        "type": "pattern",
        "pattern": "[%d{DATE}] [%p] - %m"
      },
      "maxLogSize": 1024,
      "backups": 3
    }
  },
  "categories":
  {
    "default":
    {
      "appenders": ["logfile", "console"],
      "level": "debug"
    }
  }
});

const logger = log4js.getLogger("typescript-event-processor");

export default logger;