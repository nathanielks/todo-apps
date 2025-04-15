import { type DeepNew, type FactoryOpts, newTestInstance } from "joist-orm";
import { type EntityManager, User } from "../entities.js";

export function newUser(em: EntityManager, opts: FactoryOpts<User> = {}): DeepNew<User> {
  return newTestInstance(em, User, opts, {});
}
