////////////////////////////////////////////////////////////////////////////
//
// Copyright 2022 Realm Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
////////////////////////////////////////////////////////////////////////////

import * as binding from "@realm/bindgen";

import { Object as RealmObject, CanonicalObjectSchema } from "./Object";
import { Results } from "./Results";
import { transformObjectSchema } from "./schema-utils";

type Constructor<T = unknown> = { new (...args: unknown[]): T };

export class Realm {
  public static Object = RealmObject;
  public static Results = Results;

  private internal: binding.Realm;

  constructor() {
    this.internal = binding.Realm.getSharedRealm({
      path: this.getDefaultPath(),
      fifoFilesFallbackPath: this.fifoFilesFallbackPath(),
    });
  }

  get empty(): boolean {
    // ObjectStore::is_empty(realm->read_group())
    throw new Error("Not yet implemented");
  }

  get path(): string {
    return this.internal.config.path;
  }

  get readOnly(): boolean {
    // schema_mode == SchemaMode::Immutable
    throw new Error("Not yet implemented");
  }

  get schema(): CanonicalObjectSchema[] {
    return this.internal.schema.map(transformObjectSchema);
  }

  get schemaVersion(): number {
    return this.internal.schemaVersion;
  }

  get isInTransaction(): boolean {
    return this.internal.isInTransaction;
  }

  get isClosed(): boolean {
    return this.internal.isClosed;
  }

  get syncSession(): any {
    throw new Error("Not yet implemented");
  }

  get subscriptions(): any {
    throw new Error("Not yet implemented");
  }

  close(): void {
    this.internal.close();
  }

  create(): RealmObject {
    throw new Error("Not yet implemented");
  }

  delete(): void {
    throw new Error("Not yet implemented");
  }

  deleteModel(): void {
    throw new Error("Not yet implemented");
  }

  deleteAll(): void {
    throw new Error("Not yet implemented");
  }

  objectForPrimaryKey<T = Record<string, unknown>>(type: string, primaryKey: T[keyof T]): RealmObject<T>;
  objectForPrimaryKey<T>(type: Constructor<T>, primaryKey: T[keyof T]): RealmObject<T>;
  objectForPrimaryKey<T>(type: string | Constructor<T>, primaryKey: T[keyof T]): RealmObject<T> {
    // Implements https://github.com/realm/realm-js/blob/v11/src/js_realm.hpp#L1240-L1258
    const objectSchema = this.findObjectSchema(type);
    // auto realm_object = realm::Object::get_for_primary_key(accessor, realm, object_schema, args[1]);
    throw new Error("Not yet implemented");
  }

  objects<T>(): Results<T> {
    throw new Error("Not yet implemented");
  }

  addListener(): unknown {
    throw new Error("Not yet implemented");
  }

  removeListener(): unknown {
    throw new Error("Not yet implemented");
  }

  removeAllListeners(): unknown {
    throw new Error("Not yet implemented");
  }

  write<T>(callback: () => T): T {
    throw new Error("Not yet implemented");
  }

  beginTransaction(): void {
    this.internal.beginTransaction();
  }

  commitTransaction(): void {
    this.internal.commitTransaction();
  }

  cancelTransaction(): void {
    this.internal.cancelTransaction();
  }

  compact(): boolean {
    throw new Error("Not yet implemented");
  }

  writeCopyTo(): unknown {
    throw new Error("Not yet implemented");
  }

  _updateSchema(): unknown {
    throw new Error("Not yet implemented");
  }

  /**
   * TODO: Make this platform dependent
   */
  private getDefaultPath() {
    return "default.realm";
  }

  /**
   * TODO: Make this platform dependent
   */
  private fifoFilesFallbackPath() {
    return "";
  }

  /**
   * Finds the object schema from a specific name
   * @see https://github.com/realm/realm-js/blob/v11/src/js_realm.hpp#L465-L508
   */
  private findObjectSchema(name: string | Constructor): binding.ObjectSchema {
    if (typeof name === "string") {
      return this.internal.schema.find((schema) => schema.name === name);
    } else {
      throw new Error("Not yet implemented");
    }
  }
}