import {
  BaseEntity,
  type Changes,
  cleanStringValue,
  ConfigApi,
  type DeepPartialOrNull,
  type EntityMetadata,
  failNoIdYet,
  type Flavor,
  getField,
  isLoaded,
  type JsonPayload,
  type Lens,
  type Loaded,
  type LoadHint,
  loadLens,
  newChangesProxy,
  newRequiredRule,
  type OptsOf,
  type OrderBy,
  type PartialOrNull,
  setField,
  setOpts,
  type TaggedId,
  toIdOf,
  toJSON,
  type ToJsonHint,
  updatePartial,
  type ValueFilter,
  type ValueGraphQLFilter,
} from "joist-orm";
import { type Entity, EntityManager, newUser, User, userMeta } from "../entities.js";

export type UserId = Flavor<string, "User">;

export interface UserFields {
  id: { kind: "primitive"; type: string; unique: true; nullable: never };
  email: { kind: "primitive"; type: string; unique: false; nullable: never; derived: false };
  password: { kind: "primitive"; type: string; unique: false; nullable: never; derived: false };
  createdAt: { kind: "primitive"; type: Date; unique: false; nullable: never; derived: true };
  updatedAt: { kind: "primitive"; type: Date; unique: false; nullable: never; derived: true };
}

export interface UserOpts {
  email: string;
  password: string;
}

export interface UserIdsOpts {
}

export interface UserFilter {
  id?: ValueFilter<UserId, never> | null;
  email?: ValueFilter<string, never>;
  password?: ValueFilter<string, never>;
  createdAt?: ValueFilter<Date, never>;
  updatedAt?: ValueFilter<Date, never>;
}

export interface UserGraphQLFilter {
  id?: ValueGraphQLFilter<UserId>;
  email?: ValueGraphQLFilter<string>;
  password?: ValueGraphQLFilter<string>;
  createdAt?: ValueGraphQLFilter<Date>;
  updatedAt?: ValueGraphQLFilter<Date>;
}

export interface UserOrder {
  id?: OrderBy;
  email?: OrderBy;
  password?: OrderBy;
  createdAt?: OrderBy;
  updatedAt?: OrderBy;
}

export interface UserFactoryExtras {
}

export const userConfig = new ConfigApi<User, {}>();

userConfig.addRule(newRequiredRule("email"));
userConfig.addRule(newRequiredRule("password"));
userConfig.addRule(newRequiredRule("createdAt"));
userConfig.addRule(newRequiredRule("updatedAt"));

declare module "joist-orm" {
  interface TypeMap {
    User: {
      entityType: User;
      filterType: UserFilter;
      gqlFilterType: UserGraphQLFilter;
      orderType: UserOrder;
      optsType: UserOpts;
      fieldsType: UserFields;
      optIdsType: UserIdsOpts;
      factoryExtrasType: UserFactoryExtras;
      factoryOptsType: Parameters<typeof newUser>[1];
    };
  }
}

export abstract class UserCodegen extends BaseEntity<EntityManager, string> implements Entity {
  static readonly tagName = "u";
  static readonly metadata: EntityMetadata<User>;

  declare readonly __type: { 0: "User" };

  constructor(em: EntityManager, opts: UserOpts) {
    super(em, opts);
    setOpts(this as any as User, opts, { calledFromConstructor: true });
  }

  get id(): UserId {
    return this.idMaybe || failNoIdYet("User");
  }

  get idMaybe(): UserId | undefined {
    return toIdOf(userMeta, this.idTaggedMaybe);
  }

  get idTagged(): TaggedId {
    return this.idTaggedMaybe || failNoIdYet("User");
  }

  get idTaggedMaybe(): TaggedId | undefined {
    return getField(this, "id");
  }

  get email(): string {
    return getField(this, "email");
  }

  set email(email: string) {
    setField(this, "email", cleanStringValue(email));
  }

  get password(): string {
    return getField(this, "password");
  }

  set password(password: string) {
    setField(this, "password", cleanStringValue(password));
  }

  get createdAt(): Date {
    return getField(this, "createdAt");
  }

  get updatedAt(): Date {
    return getField(this, "updatedAt");
  }

  /**
   * Partial update taking any subset of the entities fields.
   *
   * Unlike `set`, null is used as a marker to mean "unset this field", and undefined
   * is left as untouched.
   *
   * Collections are exhaustively set to the new values, however,
   * {@link https://joist-orm.io/docs/features/partial-update-apis#incremental-collection-updates | Incremental collection updates} are supported.
   *
   * @example
   * ```
   * entity.setPartial({
   *   firstName: 'foo' // updated
   *   lastName: undefined // do nothing
   *   age: null // unset, (i.e. set it as undefined)
   * });
   * ```
   * @see {@link https://joist-orm.io/docs/features/partial-update-apis | Partial Update APIs} on the Joist docs
   */
  set(opts: Partial<UserOpts>): void {
    setOpts(this as any as User, opts);
  }

  /**
   * Partial update taking any subset of the entities fields.
   *
   * Unlike `set`, null is used as a marker to mean "unset this field", and undefined
   * is left as untouched.
   *
   * Collections are exhaustively set to the new values, however,
   * {@link https://joist-orm.io/docs/features/partial-update-apis#incremental-collection-updates | Incremental collection updates} are supported.
   *
   * @example
   * ```
   * entity.setPartial({
   *   firstName: 'foo' // updated
   *   lastName: undefined // do nothing
   *   age: null // unset, (i.e. set it as undefined)
   * });
   * ```
   * @see {@link https://joist-orm.io/docs/features/partial-update-apis | Partial Update APIs} on the Joist docs
   */
  setPartial(opts: PartialOrNull<UserOpts>): void {
    setOpts(this as any as User, opts as OptsOf<User>, { partial: true });
  }

  /**
   * Partial update taking any nested subset of the entities fields.
   *
   * Unlike `set`, null is used as a marker to mean "unset this field", and undefined
   * is left as untouched.
   *
   * Collections are exhaustively set to the new values, however,
   * {@link https://joist-orm.io/docs/features/partial-update-apis#incremental-collection-updates | Incremental collection updates} are supported.
   *
   * @example
   * ```
   * entity.setDeepPartial({
   *   firstName: 'foo' // updated
   *   lastName: undefined // do nothing
   *   age: null // unset, (i.e. set it as undefined)
   *   books: [{ title: "b1" }], // create a child book
   * });
   * ```
   * @see {@link https://joist-orm.io/docs/features/partial-update-apis | Partial Update APIs} on the Joist docs
   */
  setDeepPartial(opts: DeepPartialOrNull<User>): Promise<void> {
    return updatePartial(this as any as User, opts);
  }

  /**
   * Details the field changes of the entity within the current unit of work.
   *
   * @see {@link https://joist-orm.io/docs/features/changed-fields | Changed Fields} on the Joist docs
   */
  get changes(): Changes<User> {
    return newChangesProxy(this) as any;
  }

  /**
   * Traverse from this entity using a lens, and load the result.
   *
   * @see {@link https://joist-orm.io/docs/advanced/lenses | Lens Traversal} on the Joist docs
   */
  load<U, V>(fn: (lens: Lens<User>) => Lens<U, V>, opts: { sql?: boolean } = {}): Promise<V> {
    return loadLens(this as any as User, fn, opts);
  }

  /**
   * Hydrate this entity using a load hint
   *
   * @see {@link https://joist-orm.io/docs/features/loading-entities#1-object-graph-navigation | Loading entities} on the Joist docs
   */
  populate<const H extends LoadHint<User>>(hint: H): Promise<Loaded<User, H>>;
  populate<const H extends LoadHint<User>>(opts: { hint: H; forceReload?: boolean }): Promise<Loaded<User, H>>;
  populate<const H extends LoadHint<User>, V>(hint: H, fn: (u: Loaded<User, H>) => V): Promise<V>;
  populate<const H extends LoadHint<User>, V>(
    opts: { hint: H; forceReload?: boolean },
    fn: (u: Loaded<User, H>) => V,
  ): Promise<V>;
  populate<const H extends LoadHint<User>, V>(
    hintOrOpts: any,
    fn?: (u: Loaded<User, H>) => V,
  ): Promise<Loaded<User, H> | V> {
    return this.em.populate(this as any as User, hintOrOpts, fn);
  }

  /**
   * Given a load hint, checks if it is loaded within the unit of work.
   *
   * Type Guarded via Loaded<>
   */
  isLoaded<const H extends LoadHint<User>>(hint: H): this is Loaded<User, H> {
    return isLoaded(this as any as User, hint);
  }

  /**
   * Build a type-safe, loadable and relation aware POJO from this entity, given a hint.
   *
   * Note: As the hint might load, this returns a Promise
   *
   * @example
   * ```
   * const payload = await a.toJSON({
   *   id: true,
   *   books: { id: true, reviews: { rating: true } }
   * });
   * ```
   * @see {@link https://joist-orm.io/docs/advanced/json-payloads | Json Payloads} on the Joist docs
   */
  toJSON(): object;
  toJSON<const H extends ToJsonHint<User>>(hint: H): Promise<JsonPayload<User, H>>;
  toJSON(hint?: any): object {
    return !hint || typeof hint === "string" ? super.toJSON() : toJSON(this, hint);
  }
}
