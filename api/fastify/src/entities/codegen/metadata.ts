import { configureMetadata, DateSerde, type Entity as Entity2, EntityManager as EntityManager1, type EntityMetadata, KeySerde, PrimitiveSerde, setRuntimeConfig } from "joist-orm";
import { User } from "../User.js";
import { newUser, userConfig } from "../entities.js";

setRuntimeConfig({ temporal: false });

export class EntityManager extends EntityManager1<{}, Entity, unknown> {}

export interface Entity extends Entity2 {
  id: string;
  em: EntityManager;
}

export const userMeta: EntityMetadata<User> = {
  cstr: User,
  type: "User",
  baseType: undefined,
  idType: "tagged-string",
  idDbType: "int",
  tagName: "u",
  tableName: "users",
  fields: {
    "id": { kind: "primaryKey", fieldName: "id", fieldIdName: undefined, required: true, serde: new KeySerde("u", "id", "id", "int"), immutable: true },
    "email": { kind: "primitive", fieldName: "email", fieldIdName: undefined, derived: false, required: true, protected: false, type: "string", serde: new PrimitiveSerde("email", "email", "character varying"), immutable: false },
    "password": { kind: "primitive", fieldName: "password", fieldIdName: undefined, derived: false, required: true, protected: false, type: "string", serde: new PrimitiveSerde("password", "password", "character varying"), immutable: false },
    "createdAt": { kind: "primitive", fieldName: "createdAt", fieldIdName: undefined, derived: "orm", required: false, protected: false, type: Date, serde: new DateSerde("createdAt", "created_at", "timestamp with time zone"), immutable: false },
    "updatedAt": { kind: "primitive", fieldName: "updatedAt", fieldIdName: undefined, derived: "orm", required: false, protected: false, type: Date, serde: new DateSerde("updatedAt", "updated_at", "timestamp with time zone"), immutable: false },
  },
  allFields: {},
  orderBy: undefined,
  timestampFields: { createdAt: "createdAt", updatedAt: "updatedAt", deletedAt: undefined },
  config: userConfig,
  factory: newUser,
  baseTypes: [],
  subTypes: [],
};

(User as any).metadata = userMeta;

export const allMetadata = [userMeta];
configureMetadata(allMetadata);
