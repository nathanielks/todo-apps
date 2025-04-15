import { UserCodegen } from "./entities.js";

import { userConfig as config } from "./entities.js";

export class User extends UserCodegen {}

// remove once you have actual rules/hooks
config.placeholder();
