
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Location
 * 
 */
export type Location = $Result.DefaultSelection<Prisma.$LocationPayload>
/**
 * Model AdminLocation
 * 
 */
export type AdminLocation = $Result.DefaultSelection<Prisma.$AdminLocationPayload>
/**
 * Model MealCatalog
 * 
 */
export type MealCatalog = $Result.DefaultSelection<Prisma.$MealCatalogPayload>
/**
 * Model WeekdayMenu
 * Recurring meal option for a weekday at one office (many per weekday+slot)
 */
export type WeekdayMenu = $Result.DefaultSelection<Prisma.$WeekdayMenuPayload>
/**
 * Model DailyMenu
 * 
 */
export type DailyMenu = $Result.DefaultSelection<Prisma.$DailyMenuPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model WalletTransaction
 * 
 */
export type WalletTransaction = $Result.DefaultSelection<Prisma.$WalletTransactionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const PaymentMode: {
  CASH: 'CASH',
  WALLET: 'WALLET'
};

export type PaymentMode = (typeof PaymentMode)[keyof typeof PaymentMode]


export const MealSlot: {
  LUNCH: 'LUNCH',
  DINNER: 'DINNER'
};

export type MealSlot = (typeof MealSlot)[keyof typeof MealSlot]


export const OrderStatus: {
  PLACED: 'PLACED',
  CANCELLED: 'CANCELLED',
  DELIVERED: 'DELIVERED'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const PaymentStatus: {
  UNPAID: 'UNPAID',
  PAID: 'PAID',
  WALLET_CHARGED: 'WALLET_CHARGED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const WalletTxType: {
  DEPOSIT: 'DEPOSIT',
  CHARGE: 'CHARGE',
  DUE_PAYMENT: 'DUE_PAYMENT',
  ADJUSTMENT: 'ADJUSTMENT'
};

export type WalletTxType = (typeof WalletTxType)[keyof typeof WalletTxType]


export const Weekday: {
  SAT: 'SAT',
  SUN: 'SUN',
  MON: 'MON',
  TUE: 'TUE',
  WED: 'WED',
  THU: 'THU',
  FRI: 'FRI'
};

export type Weekday = (typeof Weekday)[keyof typeof Weekday]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type PaymentMode = $Enums.PaymentMode

export const PaymentMode: typeof $Enums.PaymentMode

export type MealSlot = $Enums.MealSlot

export const MealSlot: typeof $Enums.MealSlot

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type WalletTxType = $Enums.WalletTxType

export const WalletTxType: typeof $Enums.WalletTxType

export type Weekday = $Enums.Weekday

export const Weekday: typeof $Enums.Weekday

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Accounts
 * const accounts = await prisma.account.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.location`: Exposes CRUD operations for the **Location** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locations
    * const locations = await prisma.location.findMany()
    * ```
    */
  get location(): Prisma.LocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adminLocation`: Exposes CRUD operations for the **AdminLocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminLocations
    * const adminLocations = await prisma.adminLocation.findMany()
    * ```
    */
  get adminLocation(): Prisma.AdminLocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mealCatalog`: Exposes CRUD operations for the **MealCatalog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MealCatalogs
    * const mealCatalogs = await prisma.mealCatalog.findMany()
    * ```
    */
  get mealCatalog(): Prisma.MealCatalogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.weekdayMenu`: Exposes CRUD operations for the **WeekdayMenu** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WeekdayMenus
    * const weekdayMenus = await prisma.weekdayMenu.findMany()
    * ```
    */
  get weekdayMenu(): Prisma.WeekdayMenuDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dailyMenu`: Exposes CRUD operations for the **DailyMenu** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyMenus
    * const dailyMenus = await prisma.dailyMenu.findMany()
    * ```
    */
  get dailyMenu(): Prisma.DailyMenuDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.walletTransaction`: Exposes CRUD operations for the **WalletTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WalletTransactions
    * const walletTransactions = await prisma.walletTransaction.findMany()
    * ```
    */
  get walletTransaction(): Prisma.WalletTransactionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken',
    User: 'User',
    Location: 'Location',
    AdminLocation: 'AdminLocation',
    MealCatalog: 'MealCatalog',
    WeekdayMenu: 'WeekdayMenu',
    DailyMenu: 'DailyMenu',
    Order: 'Order',
    WalletTransaction: 'WalletTransaction'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "account" | "session" | "verificationToken" | "user" | "location" | "adminLocation" | "mealCatalog" | "weekdayMenu" | "dailyMenu" | "order" | "walletTransaction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Location: {
        payload: Prisma.$LocationPayload<ExtArgs>
        fields: Prisma.LocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findFirst: {
            args: Prisma.LocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findMany: {
            args: Prisma.LocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          create: {
            args: Prisma.LocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          createMany: {
            args: Prisma.LocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          delete: {
            args: Prisma.LocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          update: {
            args: Prisma.LocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          deleteMany: {
            args: Prisma.LocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          upsert: {
            args: Prisma.LocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          aggregate: {
            args: Prisma.LocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocation>
          }
          groupBy: {
            args: Prisma.LocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationCountArgs<ExtArgs>
            result: $Utils.Optional<LocationCountAggregateOutputType> | number
          }
        }
      }
      AdminLocation: {
        payload: Prisma.$AdminLocationPayload<ExtArgs>
        fields: Prisma.AdminLocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminLocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminLocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLocationPayload>
          }
          findFirst: {
            args: Prisma.AdminLocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminLocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLocationPayload>
          }
          findMany: {
            args: Prisma.AdminLocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLocationPayload>[]
          }
          create: {
            args: Prisma.AdminLocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLocationPayload>
          }
          createMany: {
            args: Prisma.AdminLocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminLocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLocationPayload>[]
          }
          delete: {
            args: Prisma.AdminLocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLocationPayload>
          }
          update: {
            args: Prisma.AdminLocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLocationPayload>
          }
          deleteMany: {
            args: Prisma.AdminLocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminLocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminLocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLocationPayload>[]
          }
          upsert: {
            args: Prisma.AdminLocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminLocationPayload>
          }
          aggregate: {
            args: Prisma.AdminLocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminLocation>
          }
          groupBy: {
            args: Prisma.AdminLocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminLocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminLocationCountArgs<ExtArgs>
            result: $Utils.Optional<AdminLocationCountAggregateOutputType> | number
          }
        }
      }
      MealCatalog: {
        payload: Prisma.$MealCatalogPayload<ExtArgs>
        fields: Prisma.MealCatalogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MealCatalogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealCatalogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MealCatalogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealCatalogPayload>
          }
          findFirst: {
            args: Prisma.MealCatalogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealCatalogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MealCatalogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealCatalogPayload>
          }
          findMany: {
            args: Prisma.MealCatalogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealCatalogPayload>[]
          }
          create: {
            args: Prisma.MealCatalogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealCatalogPayload>
          }
          createMany: {
            args: Prisma.MealCatalogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MealCatalogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealCatalogPayload>[]
          }
          delete: {
            args: Prisma.MealCatalogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealCatalogPayload>
          }
          update: {
            args: Prisma.MealCatalogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealCatalogPayload>
          }
          deleteMany: {
            args: Prisma.MealCatalogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MealCatalogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MealCatalogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealCatalogPayload>[]
          }
          upsert: {
            args: Prisma.MealCatalogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealCatalogPayload>
          }
          aggregate: {
            args: Prisma.MealCatalogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMealCatalog>
          }
          groupBy: {
            args: Prisma.MealCatalogGroupByArgs<ExtArgs>
            result: $Utils.Optional<MealCatalogGroupByOutputType>[]
          }
          count: {
            args: Prisma.MealCatalogCountArgs<ExtArgs>
            result: $Utils.Optional<MealCatalogCountAggregateOutputType> | number
          }
        }
      }
      WeekdayMenu: {
        payload: Prisma.$WeekdayMenuPayload<ExtArgs>
        fields: Prisma.WeekdayMenuFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WeekdayMenuFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekdayMenuPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WeekdayMenuFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekdayMenuPayload>
          }
          findFirst: {
            args: Prisma.WeekdayMenuFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekdayMenuPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WeekdayMenuFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekdayMenuPayload>
          }
          findMany: {
            args: Prisma.WeekdayMenuFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekdayMenuPayload>[]
          }
          create: {
            args: Prisma.WeekdayMenuCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekdayMenuPayload>
          }
          createMany: {
            args: Prisma.WeekdayMenuCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WeekdayMenuCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekdayMenuPayload>[]
          }
          delete: {
            args: Prisma.WeekdayMenuDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekdayMenuPayload>
          }
          update: {
            args: Prisma.WeekdayMenuUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekdayMenuPayload>
          }
          deleteMany: {
            args: Prisma.WeekdayMenuDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WeekdayMenuUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WeekdayMenuUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekdayMenuPayload>[]
          }
          upsert: {
            args: Prisma.WeekdayMenuUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WeekdayMenuPayload>
          }
          aggregate: {
            args: Prisma.WeekdayMenuAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWeekdayMenu>
          }
          groupBy: {
            args: Prisma.WeekdayMenuGroupByArgs<ExtArgs>
            result: $Utils.Optional<WeekdayMenuGroupByOutputType>[]
          }
          count: {
            args: Prisma.WeekdayMenuCountArgs<ExtArgs>
            result: $Utils.Optional<WeekdayMenuCountAggregateOutputType> | number
          }
        }
      }
      DailyMenu: {
        payload: Prisma.$DailyMenuPayload<ExtArgs>
        fields: Prisma.DailyMenuFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyMenuFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMenuPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyMenuFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMenuPayload>
          }
          findFirst: {
            args: Prisma.DailyMenuFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMenuPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyMenuFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMenuPayload>
          }
          findMany: {
            args: Prisma.DailyMenuFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMenuPayload>[]
          }
          create: {
            args: Prisma.DailyMenuCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMenuPayload>
          }
          createMany: {
            args: Prisma.DailyMenuCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyMenuCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMenuPayload>[]
          }
          delete: {
            args: Prisma.DailyMenuDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMenuPayload>
          }
          update: {
            args: Prisma.DailyMenuUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMenuPayload>
          }
          deleteMany: {
            args: Prisma.DailyMenuDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyMenuUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DailyMenuUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMenuPayload>[]
          }
          upsert: {
            args: Prisma.DailyMenuUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyMenuPayload>
          }
          aggregate: {
            args: Prisma.DailyMenuAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyMenu>
          }
          groupBy: {
            args: Prisma.DailyMenuGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyMenuGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyMenuCountArgs<ExtArgs>
            result: $Utils.Optional<DailyMenuCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      WalletTransaction: {
        payload: Prisma.$WalletTransactionPayload<ExtArgs>
        fields: Prisma.WalletTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WalletTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WalletTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload>
          }
          findFirst: {
            args: Prisma.WalletTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WalletTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload>
          }
          findMany: {
            args: Prisma.WalletTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload>[]
          }
          create: {
            args: Prisma.WalletTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload>
          }
          createMany: {
            args: Prisma.WalletTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WalletTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload>[]
          }
          delete: {
            args: Prisma.WalletTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload>
          }
          update: {
            args: Prisma.WalletTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload>
          }
          deleteMany: {
            args: Prisma.WalletTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WalletTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WalletTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload>[]
          }
          upsert: {
            args: Prisma.WalletTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletTransactionPayload>
          }
          aggregate: {
            args: Prisma.WalletTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWalletTransaction>
          }
          groupBy: {
            args: Prisma.WalletTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<WalletTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.WalletTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<WalletTransactionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    account?: AccountOmit
    session?: SessionOmit
    verificationToken?: VerificationTokenOmit
    user?: UserOmit
    location?: LocationOmit
    adminLocation?: AdminLocationOmit
    mealCatalog?: MealCatalogOmit
    weekdayMenu?: WeekdayMenuOmit
    dailyMenu?: DailyMenuOmit
    order?: OrderOmit
    walletTransaction?: WalletTransactionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
    adminLocations: number
    orders: number
    ordersPlaced: number
    walletTransactions: number
    createdTransactions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    adminLocations?: boolean | UserCountOutputTypeCountAdminLocationsArgs
    orders?: boolean | UserCountOutputTypeCountOrdersArgs
    ordersPlaced?: boolean | UserCountOutputTypeCountOrdersPlacedArgs
    walletTransactions?: boolean | UserCountOutputTypeCountWalletTransactionsArgs
    createdTransactions?: boolean | UserCountOutputTypeCountCreatedTransactionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAdminLocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminLocationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrdersPlacedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWalletTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletTransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletTransactionWhereInput
  }


  /**
   * Count Type LocationCountOutputType
   */

  export type LocationCountOutputType = {
    users: number
    adminLocations: number
    dailyMenus: number
    weekdayMenus: number
    orders: number
  }

  export type LocationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | LocationCountOutputTypeCountUsersArgs
    adminLocations?: boolean | LocationCountOutputTypeCountAdminLocationsArgs
    dailyMenus?: boolean | LocationCountOutputTypeCountDailyMenusArgs
    weekdayMenus?: boolean | LocationCountOutputTypeCountWeekdayMenusArgs
    orders?: boolean | LocationCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCountOutputType
     */
    select?: LocationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountAdminLocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminLocationWhereInput
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountDailyMenusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyMenuWhereInput
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountWeekdayMenusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeekdayMenuWhereInput
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Count Type MealCatalogCountOutputType
   */

  export type MealCatalogCountOutputType = {
    dailyMenus: number
    weekdayMenus: number
  }

  export type MealCatalogCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dailyMenus?: boolean | MealCatalogCountOutputTypeCountDailyMenusArgs
    weekdayMenus?: boolean | MealCatalogCountOutputTypeCountWeekdayMenusArgs
  }

  // Custom InputTypes
  /**
   * MealCatalogCountOutputType without action
   */
  export type MealCatalogCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealCatalogCountOutputType
     */
    select?: MealCatalogCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MealCatalogCountOutputType without action
   */
  export type MealCatalogCountOutputTypeCountDailyMenusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyMenuWhereInput
  }

  /**
   * MealCatalogCountOutputType without action
   */
  export type MealCatalogCountOutputTypeCountWeekdayMenusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeekdayMenuWhereInput
  }


  /**
   * Count Type WeekdayMenuCountOutputType
   */

  export type WeekdayMenuCountOutputType = {
    dailyMenus: number
  }

  export type WeekdayMenuCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dailyMenus?: boolean | WeekdayMenuCountOutputTypeCountDailyMenusArgs
  }

  // Custom InputTypes
  /**
   * WeekdayMenuCountOutputType without action
   */
  export type WeekdayMenuCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekdayMenuCountOutputType
     */
    select?: WeekdayMenuCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WeekdayMenuCountOutputType without action
   */
  export type WeekdayMenuCountOutputTypeCountDailyMenusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyMenuWhereInput
  }


  /**
   * Count Type DailyMenuCountOutputType
   */

  export type DailyMenuCountOutputType = {
    orders: number
  }

  export type DailyMenuCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | DailyMenuCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * DailyMenuCountOutputType without action
   */
  export type DailyMenuCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMenuCountOutputType
     */
    select?: DailyMenuCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DailyMenuCountOutputType without action
   */
  export type DailyMenuCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    walletTxs: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    walletTxs?: boolean | OrderCountOutputTypeCountWalletTxsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountWalletTxsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletTransactionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
    refresh_token_expires_in: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
    refresh_token_expires_in: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    refresh_token_expires_in: number | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    refresh_token_expires_in: number | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    refresh_token_expires_in: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
    refresh_token_expires_in?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
    refresh_token_expires_in?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    refresh_token_expires_in?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    refresh_token_expires_in?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    refresh_token_expires_in?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    refresh_token_expires_in: number | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state" | "refresh_token_expires_in", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
      refresh_token_expires_in: number | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
    readonly refresh_token_expires_in: FieldRef<"Account", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    balance: number | null
  }

  export type UserSumAggregateOutputType = {
    balance: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    role: $Enums.Role | null
    employeeId: string | null
    phoneNumber: string | null
    deskNumber: string | null
    buildingNumber: string | null
    floorNumber: string | null
    locationId: string | null
    paymentMode: $Enums.PaymentMode | null
    balance: number | null
    profileComplete: boolean | null
    isBanned: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    role: $Enums.Role | null
    employeeId: string | null
    phoneNumber: string | null
    deskNumber: string | null
    buildingNumber: string | null
    floorNumber: string | null
    locationId: string | null
    paymentMode: $Enums.PaymentMode | null
    balance: number | null
    profileComplete: boolean | null
    isBanned: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    role: number
    employeeId: number
    phoneNumber: number
    deskNumber: number
    buildingNumber: number
    floorNumber: number
    locationId: number
    paymentMode: number
    balance: number
    profileComplete: number
    isBanned: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    balance?: true
  }

  export type UserSumAggregateInputType = {
    balance?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    employeeId?: true
    phoneNumber?: true
    deskNumber?: true
    buildingNumber?: true
    floorNumber?: true
    locationId?: true
    paymentMode?: true
    balance?: true
    profileComplete?: true
    isBanned?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    employeeId?: true
    phoneNumber?: true
    deskNumber?: true
    buildingNumber?: true
    floorNumber?: true
    locationId?: true
    paymentMode?: true
    balance?: true
    profileComplete?: true
    isBanned?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    employeeId?: true
    phoneNumber?: true
    deskNumber?: true
    buildingNumber?: true
    floorNumber?: true
    locationId?: true
    paymentMode?: true
    balance?: true
    profileComplete?: true
    isBanned?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    role: $Enums.Role
    employeeId: string | null
    phoneNumber: string | null
    deskNumber: string | null
    buildingNumber: string | null
    floorNumber: string | null
    locationId: string | null
    paymentMode: $Enums.PaymentMode
    balance: number
    profileComplete: boolean
    isBanned: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    employeeId?: boolean
    phoneNumber?: boolean
    deskNumber?: boolean
    buildingNumber?: boolean
    floorNumber?: boolean
    locationId?: boolean
    paymentMode?: boolean
    balance?: boolean
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean | User$locationArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    adminLocations?: boolean | User$adminLocationsArgs<ExtArgs>
    orders?: boolean | User$ordersArgs<ExtArgs>
    ordersPlaced?: boolean | User$ordersPlacedArgs<ExtArgs>
    walletTransactions?: boolean | User$walletTransactionsArgs<ExtArgs>
    createdTransactions?: boolean | User$createdTransactionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    employeeId?: boolean
    phoneNumber?: boolean
    deskNumber?: boolean
    buildingNumber?: boolean
    floorNumber?: boolean
    locationId?: boolean
    paymentMode?: boolean
    balance?: boolean
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean | User$locationArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    employeeId?: boolean
    phoneNumber?: boolean
    deskNumber?: boolean
    buildingNumber?: boolean
    floorNumber?: boolean
    locationId?: boolean
    paymentMode?: boolean
    balance?: boolean
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean | User$locationArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    employeeId?: boolean
    phoneNumber?: boolean
    deskNumber?: boolean
    buildingNumber?: boolean
    floorNumber?: boolean
    locationId?: boolean
    paymentMode?: boolean
    balance?: boolean
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "role" | "employeeId" | "phoneNumber" | "deskNumber" | "buildingNumber" | "floorNumber" | "locationId" | "paymentMode" | "balance" | "profileComplete" | "isBanned" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | User$locationArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    adminLocations?: boolean | User$adminLocationsArgs<ExtArgs>
    orders?: boolean | User$ordersArgs<ExtArgs>
    ordersPlaced?: boolean | User$ordersPlacedArgs<ExtArgs>
    walletTransactions?: boolean | User$walletTransactionsArgs<ExtArgs>
    createdTransactions?: boolean | User$createdTransactionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | User$locationArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | User$locationArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      location: Prisma.$LocationPayload<ExtArgs> | null
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      adminLocations: Prisma.$AdminLocationPayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
      ordersPlaced: Prisma.$OrderPayload<ExtArgs>[]
      walletTransactions: Prisma.$WalletTransactionPayload<ExtArgs>[]
      createdTransactions: Prisma.$WalletTransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      emailVerified: Date | null
      image: string | null
      role: $Enums.Role
      employeeId: string | null
      phoneNumber: string | null
      deskNumber: string | null
      buildingNumber: string | null
      floorNumber: string | null
      locationId: string | null
      paymentMode: $Enums.PaymentMode
      /**
       * Balance in integer taka; may be negative (due)
       */
      balance: number
      profileComplete: boolean
      isBanned: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    location<T extends User$locationArgs<ExtArgs> = {}>(args?: Subset<T, User$locationArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    adminLocations<T extends User$adminLocationsArgs<ExtArgs> = {}>(args?: Subset<T, User$adminLocationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends User$ordersArgs<ExtArgs> = {}>(args?: Subset<T, User$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ordersPlaced<T extends User$ordersPlacedArgs<ExtArgs> = {}>(args?: Subset<T, User$ordersPlacedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    walletTransactions<T extends User$walletTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$walletTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdTransactions<T extends User$createdTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly employeeId: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly deskNumber: FieldRef<"User", 'String'>
    readonly buildingNumber: FieldRef<"User", 'String'>
    readonly floorNumber: FieldRef<"User", 'String'>
    readonly locationId: FieldRef<"User", 'String'>
    readonly paymentMode: FieldRef<"User", 'PaymentMode'>
    readonly balance: FieldRef<"User", 'Int'>
    readonly profileComplete: FieldRef<"User", 'Boolean'>
    readonly isBanned: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.location
   */
  export type User$locationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    where?: LocationWhereInput
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.adminLocations
   */
  export type User$adminLocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLocation
     */
    select?: AdminLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLocation
     */
    omit?: AdminLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLocationInclude<ExtArgs> | null
    where?: AdminLocationWhereInput
    orderBy?: AdminLocationOrderByWithRelationInput | AdminLocationOrderByWithRelationInput[]
    cursor?: AdminLocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AdminLocationScalarFieldEnum | AdminLocationScalarFieldEnum[]
  }

  /**
   * User.orders
   */
  export type User$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * User.ordersPlaced
   */
  export type User$ordersPlacedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * User.walletTransactions
   */
  export type User$walletTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletTransactionInclude<ExtArgs> | null
    where?: WalletTransactionWhereInput
    orderBy?: WalletTransactionOrderByWithRelationInput | WalletTransactionOrderByWithRelationInput[]
    cursor?: WalletTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WalletTransactionScalarFieldEnum | WalletTransactionScalarFieldEnum[]
  }

  /**
   * User.createdTransactions
   */
  export type User$createdTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletTransactionInclude<ExtArgs> | null
    where?: WalletTransactionWhereInput
    orderBy?: WalletTransactionOrderByWithRelationInput | WalletTransactionOrderByWithRelationInput[]
    cursor?: WalletTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WalletTransactionScalarFieldEnum | WalletTransactionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Location
   */

  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  export type LocationMinAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    defaultCutoffTime: string | null
    dinnerEnabled: boolean | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LocationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    defaultCutoffTime: string | null
    dinnerEnabled: boolean | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LocationCountAggregateOutputType = {
    id: number
    name: number
    address: number
    defaultCutoffTime: number
    dinnerEnabled: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LocationMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    defaultCutoffTime?: true
    dinnerEnabled?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LocationMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    defaultCutoffTime?: true
    dinnerEnabled?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LocationCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    defaultCutoffTime?: true
    dinnerEnabled?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Location to aggregate.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Locations
    **/
    _count?: true | LocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationMaxAggregateInputType
  }

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
        [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>
  }




  export type LocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithAggregationInput | LocationOrderByWithAggregationInput[]
    by: LocationScalarFieldEnum[] | LocationScalarFieldEnum
    having?: LocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationCountAggregateInputType | true
    _min?: LocationMinAggregateInputType
    _max?: LocationMaxAggregateInputType
  }

  export type LocationGroupByOutputType = {
    id: string
    name: string
    address: string | null
    defaultCutoffTime: string
    dinnerEnabled: boolean
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: LocationCountAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  type GetLocationGroupByPayload<T extends LocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationGroupByOutputType[P]>
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
        }
      >
    >


  export type LocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    defaultCutoffTime?: boolean
    dinnerEnabled?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Location$usersArgs<ExtArgs>
    adminLocations?: boolean | Location$adminLocationsArgs<ExtArgs>
    dailyMenus?: boolean | Location$dailyMenusArgs<ExtArgs>
    weekdayMenus?: boolean | Location$weekdayMenusArgs<ExtArgs>
    orders?: boolean | Location$ordersArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    defaultCutoffTime?: boolean
    dinnerEnabled?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["location"]>

  export type LocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    defaultCutoffTime?: boolean
    dinnerEnabled?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["location"]>

  export type LocationSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    defaultCutoffTime?: boolean
    dinnerEnabled?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "address" | "defaultCutoffTime" | "dinnerEnabled" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["location"]>
  export type LocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Location$usersArgs<ExtArgs>
    adminLocations?: boolean | Location$adminLocationsArgs<ExtArgs>
    dailyMenus?: boolean | Location$dailyMenusArgs<ExtArgs>
    weekdayMenus?: boolean | Location$weekdayMenusArgs<ExtArgs>
    orders?: boolean | Location$ordersArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Location"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      adminLocations: Prisma.$AdminLocationPayload<ExtArgs>[]
      dailyMenus: Prisma.$DailyMenuPayload<ExtArgs>[]
      weekdayMenus: Prisma.$WeekdayMenuPayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      address: string | null
      /**
       * Order cutoff as "HH:mm" in Asia/Dhaka (e.g. "14:00")
       */
      defaultCutoffTime: string
      /**
       * When false, dinner menus are hidden from employees and admin meal UI
       */
      dinnerEnabled: boolean
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["location"]>
    composites: {}
  }

  type LocationGetPayload<S extends boolean | null | undefined | LocationDefaultArgs> = $Result.GetResult<Prisma.$LocationPayload, S>

  type LocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocationCountAggregateInputType | true
    }

  export interface LocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Location'], meta: { name: 'Location' } }
    /**
     * Find zero or one Location that matches the filter.
     * @param {LocationFindUniqueArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationFindUniqueArgs>(args: SelectSubset<T, LocationFindUniqueArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Location that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationFindUniqueOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationFindFirstArgs>(args?: SelectSubset<T, LocationFindFirstArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.location.findMany()
     * 
     * // Get first 10 Locations
     * const locations = await prisma.location.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationWithIdOnly = await prisma.location.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocationFindManyArgs>(args?: SelectSubset<T, LocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Location.
     * @param {LocationCreateArgs} args - Arguments to create a Location.
     * @example
     * // Create one Location
     * const Location = await prisma.location.create({
     *   data: {
     *     // ... data to create a Location
     *   }
     * })
     * 
     */
    create<T extends LocationCreateArgs>(args: SelectSubset<T, LocationCreateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Locations.
     * @param {LocationCreateManyArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocationCreateManyArgs>(args?: SelectSubset<T, LocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Locations and returns the data saved in the database.
     * @param {LocationCreateManyAndReturnArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocationCreateManyAndReturnArgs>(args?: SelectSubset<T, LocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Location.
     * @param {LocationDeleteArgs} args - Arguments to delete one Location.
     * @example
     * // Delete one Location
     * const Location = await prisma.location.delete({
     *   where: {
     *     // ... filter to delete one Location
     *   }
     * })
     * 
     */
    delete<T extends LocationDeleteArgs>(args: SelectSubset<T, LocationDeleteArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Location.
     * @param {LocationUpdateArgs} args - Arguments to update one Location.
     * @example
     * // Update one Location
     * const location = await prisma.location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationUpdateArgs>(args: SelectSubset<T, LocationUpdateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Locations.
     * @param {LocationDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationDeleteManyArgs>(args?: SelectSubset<T, LocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationUpdateManyArgs>(args: SelectSubset<T, LocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations and returns the data updated in the database.
     * @param {LocationUpdateManyAndReturnArgs} args - Arguments to update many Locations.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LocationUpdateManyAndReturnArgs>(args: SelectSubset<T, LocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Location.
     * @param {LocationUpsertArgs} args - Arguments to update or create a Location.
     * @example
     * // Update or create a Location
     * const location = await prisma.location.upsert({
     *   create: {
     *     // ... data to create a Location
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Location we want to update
     *   }
     * })
     */
    upsert<T extends LocationUpsertArgs>(args: SelectSubset<T, LocationUpsertArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.location.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
    **/
    count<T extends LocationCountArgs>(
      args?: Subset<T, LocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LocationAggregateArgs>(args: Subset<T, LocationAggregateArgs>): Prisma.PrismaPromise<GetLocationAggregateType<T>>

    /**
     * Group by Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationGroupByArgs['orderBy'] }
        : { orderBy?: LocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Location model
   */
  readonly fields: LocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Location$usersArgs<ExtArgs> = {}>(args?: Subset<T, Location$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    adminLocations<T extends Location$adminLocationsArgs<ExtArgs> = {}>(args?: Subset<T, Location$adminLocationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dailyMenus<T extends Location$dailyMenusArgs<ExtArgs> = {}>(args?: Subset<T, Location$dailyMenusArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyMenuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    weekdayMenus<T extends Location$weekdayMenusArgs<ExtArgs> = {}>(args?: Subset<T, Location$weekdayMenusArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeekdayMenuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends Location$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Location$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Location model
   */
  interface LocationFieldRefs {
    readonly id: FieldRef<"Location", 'String'>
    readonly name: FieldRef<"Location", 'String'>
    readonly address: FieldRef<"Location", 'String'>
    readonly defaultCutoffTime: FieldRef<"Location", 'String'>
    readonly dinnerEnabled: FieldRef<"Location", 'Boolean'>
    readonly isActive: FieldRef<"Location", 'Boolean'>
    readonly createdAt: FieldRef<"Location", 'DateTime'>
    readonly updatedAt: FieldRef<"Location", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Location findUnique
   */
  export type LocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findUniqueOrThrow
   */
  export type LocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findFirst
   */
  export type LocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findFirstOrThrow
   */
  export type LocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findMany
   */
  export type LocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Locations to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location create
   */
  export type LocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to create a Location.
     */
    data: XOR<LocationCreateInput, LocationUncheckedCreateInput>
  }

  /**
   * Location createMany
   */
  export type LocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Location createManyAndReturn
   */
  export type LocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Location update
   */
  export type LocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to update a Location.
     */
    data: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
    /**
     * Choose, which Location to update.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location updateMany
   */
  export type LocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location updateManyAndReturn
   */
  export type LocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location upsert
   */
  export type LocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The filter to search for the Location to update in case it exists.
     */
    where: LocationWhereUniqueInput
    /**
     * In case the Location found by the `where` argument doesn't exist, create a new Location with this data.
     */
    create: XOR<LocationCreateInput, LocationUncheckedCreateInput>
    /**
     * In case the Location was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
  }

  /**
   * Location delete
   */
  export type LocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter which Location to delete.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location deleteMany
   */
  export type LocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locations to delete
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to delete.
     */
    limit?: number
  }

  /**
   * Location.users
   */
  export type Location$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Location.adminLocations
   */
  export type Location$adminLocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLocation
     */
    select?: AdminLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLocation
     */
    omit?: AdminLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLocationInclude<ExtArgs> | null
    where?: AdminLocationWhereInput
    orderBy?: AdminLocationOrderByWithRelationInput | AdminLocationOrderByWithRelationInput[]
    cursor?: AdminLocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AdminLocationScalarFieldEnum | AdminLocationScalarFieldEnum[]
  }

  /**
   * Location.dailyMenus
   */
  export type Location$dailyMenusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMenu
     */
    select?: DailyMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMenu
     */
    omit?: DailyMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMenuInclude<ExtArgs> | null
    where?: DailyMenuWhereInput
    orderBy?: DailyMenuOrderByWithRelationInput | DailyMenuOrderByWithRelationInput[]
    cursor?: DailyMenuWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DailyMenuScalarFieldEnum | DailyMenuScalarFieldEnum[]
  }

  /**
   * Location.weekdayMenus
   */
  export type Location$weekdayMenusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekdayMenu
     */
    select?: WeekdayMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekdayMenu
     */
    omit?: WeekdayMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekdayMenuInclude<ExtArgs> | null
    where?: WeekdayMenuWhereInput
    orderBy?: WeekdayMenuOrderByWithRelationInput | WeekdayMenuOrderByWithRelationInput[]
    cursor?: WeekdayMenuWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WeekdayMenuScalarFieldEnum | WeekdayMenuScalarFieldEnum[]
  }

  /**
   * Location.orders
   */
  export type Location$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Location without action
   */
  export type LocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
  }


  /**
   * Model AdminLocation
   */

  export type AggregateAdminLocation = {
    _count: AdminLocationCountAggregateOutputType | null
    _min: AdminLocationMinAggregateOutputType | null
    _max: AdminLocationMaxAggregateOutputType | null
  }

  export type AdminLocationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    locationId: string | null
  }

  export type AdminLocationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    locationId: string | null
  }

  export type AdminLocationCountAggregateOutputType = {
    id: number
    userId: number
    locationId: number
    _all: number
  }


  export type AdminLocationMinAggregateInputType = {
    id?: true
    userId?: true
    locationId?: true
  }

  export type AdminLocationMaxAggregateInputType = {
    id?: true
    userId?: true
    locationId?: true
  }

  export type AdminLocationCountAggregateInputType = {
    id?: true
    userId?: true
    locationId?: true
    _all?: true
  }

  export type AdminLocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminLocation to aggregate.
     */
    where?: AdminLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminLocations to fetch.
     */
    orderBy?: AdminLocationOrderByWithRelationInput | AdminLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminLocations
    **/
    _count?: true | AdminLocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminLocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminLocationMaxAggregateInputType
  }

  export type GetAdminLocationAggregateType<T extends AdminLocationAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminLocation[P]>
      : GetScalarType<T[P], AggregateAdminLocation[P]>
  }




  export type AdminLocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminLocationWhereInput
    orderBy?: AdminLocationOrderByWithAggregationInput | AdminLocationOrderByWithAggregationInput[]
    by: AdminLocationScalarFieldEnum[] | AdminLocationScalarFieldEnum
    having?: AdminLocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminLocationCountAggregateInputType | true
    _min?: AdminLocationMinAggregateInputType
    _max?: AdminLocationMaxAggregateInputType
  }

  export type AdminLocationGroupByOutputType = {
    id: string
    userId: string
    locationId: string
    _count: AdminLocationCountAggregateOutputType | null
    _min: AdminLocationMinAggregateOutputType | null
    _max: AdminLocationMaxAggregateOutputType | null
  }

  type GetAdminLocationGroupByPayload<T extends AdminLocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminLocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminLocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminLocationGroupByOutputType[P]>
            : GetScalarType<T[P], AdminLocationGroupByOutputType[P]>
        }
      >
    >


  export type AdminLocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    locationId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminLocation"]>

  export type AdminLocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    locationId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminLocation"]>

  export type AdminLocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    locationId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminLocation"]>

  export type AdminLocationSelectScalar = {
    id?: boolean
    userId?: boolean
    locationId?: boolean
  }

  export type AdminLocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "locationId", ExtArgs["result"]["adminLocation"]>
  export type AdminLocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }
  export type AdminLocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }
  export type AdminLocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }

  export type $AdminLocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminLocation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      location: Prisma.$LocationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      locationId: string
    }, ExtArgs["result"]["adminLocation"]>
    composites: {}
  }

  type AdminLocationGetPayload<S extends boolean | null | undefined | AdminLocationDefaultArgs> = $Result.GetResult<Prisma.$AdminLocationPayload, S>

  type AdminLocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminLocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminLocationCountAggregateInputType | true
    }

  export interface AdminLocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminLocation'], meta: { name: 'AdminLocation' } }
    /**
     * Find zero or one AdminLocation that matches the filter.
     * @param {AdminLocationFindUniqueArgs} args - Arguments to find a AdminLocation
     * @example
     * // Get one AdminLocation
     * const adminLocation = await prisma.adminLocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminLocationFindUniqueArgs>(args: SelectSubset<T, AdminLocationFindUniqueArgs<ExtArgs>>): Prisma__AdminLocationClient<$Result.GetResult<Prisma.$AdminLocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminLocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminLocationFindUniqueOrThrowArgs} args - Arguments to find a AdminLocation
     * @example
     * // Get one AdminLocation
     * const adminLocation = await prisma.adminLocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminLocationFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminLocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminLocationClient<$Result.GetResult<Prisma.$AdminLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminLocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminLocationFindFirstArgs} args - Arguments to find a AdminLocation
     * @example
     * // Get one AdminLocation
     * const adminLocation = await prisma.adminLocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminLocationFindFirstArgs>(args?: SelectSubset<T, AdminLocationFindFirstArgs<ExtArgs>>): Prisma__AdminLocationClient<$Result.GetResult<Prisma.$AdminLocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminLocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminLocationFindFirstOrThrowArgs} args - Arguments to find a AdminLocation
     * @example
     * // Get one AdminLocation
     * const adminLocation = await prisma.adminLocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminLocationFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminLocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminLocationClient<$Result.GetResult<Prisma.$AdminLocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminLocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminLocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminLocations
     * const adminLocations = await prisma.adminLocation.findMany()
     * 
     * // Get first 10 AdminLocations
     * const adminLocations = await prisma.adminLocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminLocationWithIdOnly = await prisma.adminLocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminLocationFindManyArgs>(args?: SelectSubset<T, AdminLocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminLocation.
     * @param {AdminLocationCreateArgs} args - Arguments to create a AdminLocation.
     * @example
     * // Create one AdminLocation
     * const AdminLocation = await prisma.adminLocation.create({
     *   data: {
     *     // ... data to create a AdminLocation
     *   }
     * })
     * 
     */
    create<T extends AdminLocationCreateArgs>(args: SelectSubset<T, AdminLocationCreateArgs<ExtArgs>>): Prisma__AdminLocationClient<$Result.GetResult<Prisma.$AdminLocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminLocations.
     * @param {AdminLocationCreateManyArgs} args - Arguments to create many AdminLocations.
     * @example
     * // Create many AdminLocations
     * const adminLocation = await prisma.adminLocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminLocationCreateManyArgs>(args?: SelectSubset<T, AdminLocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminLocations and returns the data saved in the database.
     * @param {AdminLocationCreateManyAndReturnArgs} args - Arguments to create many AdminLocations.
     * @example
     * // Create many AdminLocations
     * const adminLocation = await prisma.adminLocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminLocations and only return the `id`
     * const adminLocationWithIdOnly = await prisma.adminLocation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminLocationCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminLocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminLocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AdminLocation.
     * @param {AdminLocationDeleteArgs} args - Arguments to delete one AdminLocation.
     * @example
     * // Delete one AdminLocation
     * const AdminLocation = await prisma.adminLocation.delete({
     *   where: {
     *     // ... filter to delete one AdminLocation
     *   }
     * })
     * 
     */
    delete<T extends AdminLocationDeleteArgs>(args: SelectSubset<T, AdminLocationDeleteArgs<ExtArgs>>): Prisma__AdminLocationClient<$Result.GetResult<Prisma.$AdminLocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminLocation.
     * @param {AdminLocationUpdateArgs} args - Arguments to update one AdminLocation.
     * @example
     * // Update one AdminLocation
     * const adminLocation = await prisma.adminLocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminLocationUpdateArgs>(args: SelectSubset<T, AdminLocationUpdateArgs<ExtArgs>>): Prisma__AdminLocationClient<$Result.GetResult<Prisma.$AdminLocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminLocations.
     * @param {AdminLocationDeleteManyArgs} args - Arguments to filter AdminLocations to delete.
     * @example
     * // Delete a few AdminLocations
     * const { count } = await prisma.adminLocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminLocationDeleteManyArgs>(args?: SelectSubset<T, AdminLocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminLocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminLocations
     * const adminLocation = await prisma.adminLocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminLocationUpdateManyArgs>(args: SelectSubset<T, AdminLocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminLocations and returns the data updated in the database.
     * @param {AdminLocationUpdateManyAndReturnArgs} args - Arguments to update many AdminLocations.
     * @example
     * // Update many AdminLocations
     * const adminLocation = await prisma.adminLocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AdminLocations and only return the `id`
     * const adminLocationWithIdOnly = await prisma.adminLocation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminLocationUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminLocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminLocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AdminLocation.
     * @param {AdminLocationUpsertArgs} args - Arguments to update or create a AdminLocation.
     * @example
     * // Update or create a AdminLocation
     * const adminLocation = await prisma.adminLocation.upsert({
     *   create: {
     *     // ... data to create a AdminLocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminLocation we want to update
     *   }
     * })
     */
    upsert<T extends AdminLocationUpsertArgs>(args: SelectSubset<T, AdminLocationUpsertArgs<ExtArgs>>): Prisma__AdminLocationClient<$Result.GetResult<Prisma.$AdminLocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdminLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminLocationCountArgs} args - Arguments to filter AdminLocations to count.
     * @example
     * // Count the number of AdminLocations
     * const count = await prisma.adminLocation.count({
     *   where: {
     *     // ... the filter for the AdminLocations we want to count
     *   }
     * })
    **/
    count<T extends AdminLocationCountArgs>(
      args?: Subset<T, AdminLocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminLocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminLocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminLocationAggregateArgs>(args: Subset<T, AdminLocationAggregateArgs>): Prisma.PrismaPromise<GetAdminLocationAggregateType<T>>

    /**
     * Group by AdminLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminLocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminLocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminLocationGroupByArgs['orderBy'] }
        : { orderBy?: AdminLocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminLocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminLocation model
   */
  readonly fields: AdminLocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminLocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminLocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    location<T extends LocationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LocationDefaultArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminLocation model
   */
  interface AdminLocationFieldRefs {
    readonly id: FieldRef<"AdminLocation", 'String'>
    readonly userId: FieldRef<"AdminLocation", 'String'>
    readonly locationId: FieldRef<"AdminLocation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AdminLocation findUnique
   */
  export type AdminLocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLocation
     */
    select?: AdminLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLocation
     */
    omit?: AdminLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLocationInclude<ExtArgs> | null
    /**
     * Filter, which AdminLocation to fetch.
     */
    where: AdminLocationWhereUniqueInput
  }

  /**
   * AdminLocation findUniqueOrThrow
   */
  export type AdminLocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLocation
     */
    select?: AdminLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLocation
     */
    omit?: AdminLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLocationInclude<ExtArgs> | null
    /**
     * Filter, which AdminLocation to fetch.
     */
    where: AdminLocationWhereUniqueInput
  }

  /**
   * AdminLocation findFirst
   */
  export type AdminLocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLocation
     */
    select?: AdminLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLocation
     */
    omit?: AdminLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLocationInclude<ExtArgs> | null
    /**
     * Filter, which AdminLocation to fetch.
     */
    where?: AdminLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminLocations to fetch.
     */
    orderBy?: AdminLocationOrderByWithRelationInput | AdminLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminLocations.
     */
    cursor?: AdminLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminLocations.
     */
    distinct?: AdminLocationScalarFieldEnum | AdminLocationScalarFieldEnum[]
  }

  /**
   * AdminLocation findFirstOrThrow
   */
  export type AdminLocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLocation
     */
    select?: AdminLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLocation
     */
    omit?: AdminLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLocationInclude<ExtArgs> | null
    /**
     * Filter, which AdminLocation to fetch.
     */
    where?: AdminLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminLocations to fetch.
     */
    orderBy?: AdminLocationOrderByWithRelationInput | AdminLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminLocations.
     */
    cursor?: AdminLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminLocations.
     */
    distinct?: AdminLocationScalarFieldEnum | AdminLocationScalarFieldEnum[]
  }

  /**
   * AdminLocation findMany
   */
  export type AdminLocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLocation
     */
    select?: AdminLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLocation
     */
    omit?: AdminLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLocationInclude<ExtArgs> | null
    /**
     * Filter, which AdminLocations to fetch.
     */
    where?: AdminLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminLocations to fetch.
     */
    orderBy?: AdminLocationOrderByWithRelationInput | AdminLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminLocations.
     */
    cursor?: AdminLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminLocations.
     */
    skip?: number
    distinct?: AdminLocationScalarFieldEnum | AdminLocationScalarFieldEnum[]
  }

  /**
   * AdminLocation create
   */
  export type AdminLocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLocation
     */
    select?: AdminLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLocation
     */
    omit?: AdminLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLocationInclude<ExtArgs> | null
    /**
     * The data needed to create a AdminLocation.
     */
    data: XOR<AdminLocationCreateInput, AdminLocationUncheckedCreateInput>
  }

  /**
   * AdminLocation createMany
   */
  export type AdminLocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminLocations.
     */
    data: AdminLocationCreateManyInput | AdminLocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminLocation createManyAndReturn
   */
  export type AdminLocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLocation
     */
    select?: AdminLocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLocation
     */
    omit?: AdminLocationOmit<ExtArgs> | null
    /**
     * The data used to create many AdminLocations.
     */
    data: AdminLocationCreateManyInput | AdminLocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AdminLocation update
   */
  export type AdminLocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLocation
     */
    select?: AdminLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLocation
     */
    omit?: AdminLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLocationInclude<ExtArgs> | null
    /**
     * The data needed to update a AdminLocation.
     */
    data: XOR<AdminLocationUpdateInput, AdminLocationUncheckedUpdateInput>
    /**
     * Choose, which AdminLocation to update.
     */
    where: AdminLocationWhereUniqueInput
  }

  /**
   * AdminLocation updateMany
   */
  export type AdminLocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminLocations.
     */
    data: XOR<AdminLocationUpdateManyMutationInput, AdminLocationUncheckedUpdateManyInput>
    /**
     * Filter which AdminLocations to update
     */
    where?: AdminLocationWhereInput
    /**
     * Limit how many AdminLocations to update.
     */
    limit?: number
  }

  /**
   * AdminLocation updateManyAndReturn
   */
  export type AdminLocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLocation
     */
    select?: AdminLocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLocation
     */
    omit?: AdminLocationOmit<ExtArgs> | null
    /**
     * The data used to update AdminLocations.
     */
    data: XOR<AdminLocationUpdateManyMutationInput, AdminLocationUncheckedUpdateManyInput>
    /**
     * Filter which AdminLocations to update
     */
    where?: AdminLocationWhereInput
    /**
     * Limit how many AdminLocations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AdminLocation upsert
   */
  export type AdminLocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLocation
     */
    select?: AdminLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLocation
     */
    omit?: AdminLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLocationInclude<ExtArgs> | null
    /**
     * The filter to search for the AdminLocation to update in case it exists.
     */
    where: AdminLocationWhereUniqueInput
    /**
     * In case the AdminLocation found by the `where` argument doesn't exist, create a new AdminLocation with this data.
     */
    create: XOR<AdminLocationCreateInput, AdminLocationUncheckedCreateInput>
    /**
     * In case the AdminLocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminLocationUpdateInput, AdminLocationUncheckedUpdateInput>
  }

  /**
   * AdminLocation delete
   */
  export type AdminLocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLocation
     */
    select?: AdminLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLocation
     */
    omit?: AdminLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLocationInclude<ExtArgs> | null
    /**
     * Filter which AdminLocation to delete.
     */
    where: AdminLocationWhereUniqueInput
  }

  /**
   * AdminLocation deleteMany
   */
  export type AdminLocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminLocations to delete
     */
    where?: AdminLocationWhereInput
    /**
     * Limit how many AdminLocations to delete.
     */
    limit?: number
  }

  /**
   * AdminLocation without action
   */
  export type AdminLocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminLocation
     */
    select?: AdminLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminLocation
     */
    omit?: AdminLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminLocationInclude<ExtArgs> | null
  }


  /**
   * Model MealCatalog
   */

  export type AggregateMealCatalog = {
    _count: MealCatalogCountAggregateOutputType | null
    _avg: MealCatalogAvgAggregateOutputType | null
    _sum: MealCatalogSumAggregateOutputType | null
    _min: MealCatalogMinAggregateOutputType | null
    _max: MealCatalogMaxAggregateOutputType | null
  }

  export type MealCatalogAvgAggregateOutputType = {
    defaultPrice: number | null
  }

  export type MealCatalogSumAggregateOutputType = {
    defaultPrice: number | null
  }

  export type MealCatalogMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    imageUrl: string | null
    defaultPrice: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MealCatalogMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    imageUrl: string | null
    defaultPrice: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MealCatalogCountAggregateOutputType = {
    id: number
    name: number
    description: number
    imageUrl: number
    defaultPrice: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MealCatalogAvgAggregateInputType = {
    defaultPrice?: true
  }

  export type MealCatalogSumAggregateInputType = {
    defaultPrice?: true
  }

  export type MealCatalogMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    imageUrl?: true
    defaultPrice?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MealCatalogMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    imageUrl?: true
    defaultPrice?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MealCatalogCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    imageUrl?: true
    defaultPrice?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MealCatalogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MealCatalog to aggregate.
     */
    where?: MealCatalogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealCatalogs to fetch.
     */
    orderBy?: MealCatalogOrderByWithRelationInput | MealCatalogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MealCatalogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealCatalogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealCatalogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MealCatalogs
    **/
    _count?: true | MealCatalogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MealCatalogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MealCatalogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MealCatalogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MealCatalogMaxAggregateInputType
  }

  export type GetMealCatalogAggregateType<T extends MealCatalogAggregateArgs> = {
        [P in keyof T & keyof AggregateMealCatalog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMealCatalog[P]>
      : GetScalarType<T[P], AggregateMealCatalog[P]>
  }




  export type MealCatalogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MealCatalogWhereInput
    orderBy?: MealCatalogOrderByWithAggregationInput | MealCatalogOrderByWithAggregationInput[]
    by: MealCatalogScalarFieldEnum[] | MealCatalogScalarFieldEnum
    having?: MealCatalogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MealCatalogCountAggregateInputType | true
    _avg?: MealCatalogAvgAggregateInputType
    _sum?: MealCatalogSumAggregateInputType
    _min?: MealCatalogMinAggregateInputType
    _max?: MealCatalogMaxAggregateInputType
  }

  export type MealCatalogGroupByOutputType = {
    id: string
    name: string
    description: string | null
    imageUrl: string | null
    defaultPrice: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: MealCatalogCountAggregateOutputType | null
    _avg: MealCatalogAvgAggregateOutputType | null
    _sum: MealCatalogSumAggregateOutputType | null
    _min: MealCatalogMinAggregateOutputType | null
    _max: MealCatalogMaxAggregateOutputType | null
  }

  type GetMealCatalogGroupByPayload<T extends MealCatalogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MealCatalogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MealCatalogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MealCatalogGroupByOutputType[P]>
            : GetScalarType<T[P], MealCatalogGroupByOutputType[P]>
        }
      >
    >


  export type MealCatalogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    defaultPrice?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dailyMenus?: boolean | MealCatalog$dailyMenusArgs<ExtArgs>
    weekdayMenus?: boolean | MealCatalog$weekdayMenusArgs<ExtArgs>
    _count?: boolean | MealCatalogCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mealCatalog"]>

  export type MealCatalogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    defaultPrice?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mealCatalog"]>

  export type MealCatalogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    defaultPrice?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mealCatalog"]>

  export type MealCatalogSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    defaultPrice?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MealCatalogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "imageUrl" | "defaultPrice" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["mealCatalog"]>
  export type MealCatalogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dailyMenus?: boolean | MealCatalog$dailyMenusArgs<ExtArgs>
    weekdayMenus?: boolean | MealCatalog$weekdayMenusArgs<ExtArgs>
    _count?: boolean | MealCatalogCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MealCatalogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MealCatalogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MealCatalogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MealCatalog"
    objects: {
      dailyMenus: Prisma.$DailyMenuPayload<ExtArgs>[]
      weekdayMenus: Prisma.$WeekdayMenuPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      imageUrl: string | null
      defaultPrice: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mealCatalog"]>
    composites: {}
  }

  type MealCatalogGetPayload<S extends boolean | null | undefined | MealCatalogDefaultArgs> = $Result.GetResult<Prisma.$MealCatalogPayload, S>

  type MealCatalogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MealCatalogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MealCatalogCountAggregateInputType | true
    }

  export interface MealCatalogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MealCatalog'], meta: { name: 'MealCatalog' } }
    /**
     * Find zero or one MealCatalog that matches the filter.
     * @param {MealCatalogFindUniqueArgs} args - Arguments to find a MealCatalog
     * @example
     * // Get one MealCatalog
     * const mealCatalog = await prisma.mealCatalog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MealCatalogFindUniqueArgs>(args: SelectSubset<T, MealCatalogFindUniqueArgs<ExtArgs>>): Prisma__MealCatalogClient<$Result.GetResult<Prisma.$MealCatalogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MealCatalog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MealCatalogFindUniqueOrThrowArgs} args - Arguments to find a MealCatalog
     * @example
     * // Get one MealCatalog
     * const mealCatalog = await prisma.mealCatalog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MealCatalogFindUniqueOrThrowArgs>(args: SelectSubset<T, MealCatalogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MealCatalogClient<$Result.GetResult<Prisma.$MealCatalogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MealCatalog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealCatalogFindFirstArgs} args - Arguments to find a MealCatalog
     * @example
     * // Get one MealCatalog
     * const mealCatalog = await prisma.mealCatalog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MealCatalogFindFirstArgs>(args?: SelectSubset<T, MealCatalogFindFirstArgs<ExtArgs>>): Prisma__MealCatalogClient<$Result.GetResult<Prisma.$MealCatalogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MealCatalog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealCatalogFindFirstOrThrowArgs} args - Arguments to find a MealCatalog
     * @example
     * // Get one MealCatalog
     * const mealCatalog = await prisma.mealCatalog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MealCatalogFindFirstOrThrowArgs>(args?: SelectSubset<T, MealCatalogFindFirstOrThrowArgs<ExtArgs>>): Prisma__MealCatalogClient<$Result.GetResult<Prisma.$MealCatalogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MealCatalogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealCatalogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MealCatalogs
     * const mealCatalogs = await prisma.mealCatalog.findMany()
     * 
     * // Get first 10 MealCatalogs
     * const mealCatalogs = await prisma.mealCatalog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mealCatalogWithIdOnly = await prisma.mealCatalog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MealCatalogFindManyArgs>(args?: SelectSubset<T, MealCatalogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealCatalogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MealCatalog.
     * @param {MealCatalogCreateArgs} args - Arguments to create a MealCatalog.
     * @example
     * // Create one MealCatalog
     * const MealCatalog = await prisma.mealCatalog.create({
     *   data: {
     *     // ... data to create a MealCatalog
     *   }
     * })
     * 
     */
    create<T extends MealCatalogCreateArgs>(args: SelectSubset<T, MealCatalogCreateArgs<ExtArgs>>): Prisma__MealCatalogClient<$Result.GetResult<Prisma.$MealCatalogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MealCatalogs.
     * @param {MealCatalogCreateManyArgs} args - Arguments to create many MealCatalogs.
     * @example
     * // Create many MealCatalogs
     * const mealCatalog = await prisma.mealCatalog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MealCatalogCreateManyArgs>(args?: SelectSubset<T, MealCatalogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MealCatalogs and returns the data saved in the database.
     * @param {MealCatalogCreateManyAndReturnArgs} args - Arguments to create many MealCatalogs.
     * @example
     * // Create many MealCatalogs
     * const mealCatalog = await prisma.mealCatalog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MealCatalogs and only return the `id`
     * const mealCatalogWithIdOnly = await prisma.mealCatalog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MealCatalogCreateManyAndReturnArgs>(args?: SelectSubset<T, MealCatalogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealCatalogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MealCatalog.
     * @param {MealCatalogDeleteArgs} args - Arguments to delete one MealCatalog.
     * @example
     * // Delete one MealCatalog
     * const MealCatalog = await prisma.mealCatalog.delete({
     *   where: {
     *     // ... filter to delete one MealCatalog
     *   }
     * })
     * 
     */
    delete<T extends MealCatalogDeleteArgs>(args: SelectSubset<T, MealCatalogDeleteArgs<ExtArgs>>): Prisma__MealCatalogClient<$Result.GetResult<Prisma.$MealCatalogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MealCatalog.
     * @param {MealCatalogUpdateArgs} args - Arguments to update one MealCatalog.
     * @example
     * // Update one MealCatalog
     * const mealCatalog = await prisma.mealCatalog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MealCatalogUpdateArgs>(args: SelectSubset<T, MealCatalogUpdateArgs<ExtArgs>>): Prisma__MealCatalogClient<$Result.GetResult<Prisma.$MealCatalogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MealCatalogs.
     * @param {MealCatalogDeleteManyArgs} args - Arguments to filter MealCatalogs to delete.
     * @example
     * // Delete a few MealCatalogs
     * const { count } = await prisma.mealCatalog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MealCatalogDeleteManyArgs>(args?: SelectSubset<T, MealCatalogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MealCatalogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealCatalogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MealCatalogs
     * const mealCatalog = await prisma.mealCatalog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MealCatalogUpdateManyArgs>(args: SelectSubset<T, MealCatalogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MealCatalogs and returns the data updated in the database.
     * @param {MealCatalogUpdateManyAndReturnArgs} args - Arguments to update many MealCatalogs.
     * @example
     * // Update many MealCatalogs
     * const mealCatalog = await prisma.mealCatalog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MealCatalogs and only return the `id`
     * const mealCatalogWithIdOnly = await prisma.mealCatalog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MealCatalogUpdateManyAndReturnArgs>(args: SelectSubset<T, MealCatalogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealCatalogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MealCatalog.
     * @param {MealCatalogUpsertArgs} args - Arguments to update or create a MealCatalog.
     * @example
     * // Update or create a MealCatalog
     * const mealCatalog = await prisma.mealCatalog.upsert({
     *   create: {
     *     // ... data to create a MealCatalog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MealCatalog we want to update
     *   }
     * })
     */
    upsert<T extends MealCatalogUpsertArgs>(args: SelectSubset<T, MealCatalogUpsertArgs<ExtArgs>>): Prisma__MealCatalogClient<$Result.GetResult<Prisma.$MealCatalogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MealCatalogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealCatalogCountArgs} args - Arguments to filter MealCatalogs to count.
     * @example
     * // Count the number of MealCatalogs
     * const count = await prisma.mealCatalog.count({
     *   where: {
     *     // ... the filter for the MealCatalogs we want to count
     *   }
     * })
    **/
    count<T extends MealCatalogCountArgs>(
      args?: Subset<T, MealCatalogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MealCatalogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MealCatalog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealCatalogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MealCatalogAggregateArgs>(args: Subset<T, MealCatalogAggregateArgs>): Prisma.PrismaPromise<GetMealCatalogAggregateType<T>>

    /**
     * Group by MealCatalog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealCatalogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MealCatalogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MealCatalogGroupByArgs['orderBy'] }
        : { orderBy?: MealCatalogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MealCatalogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMealCatalogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MealCatalog model
   */
  readonly fields: MealCatalogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MealCatalog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MealCatalogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dailyMenus<T extends MealCatalog$dailyMenusArgs<ExtArgs> = {}>(args?: Subset<T, MealCatalog$dailyMenusArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyMenuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    weekdayMenus<T extends MealCatalog$weekdayMenusArgs<ExtArgs> = {}>(args?: Subset<T, MealCatalog$weekdayMenusArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeekdayMenuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MealCatalog model
   */
  interface MealCatalogFieldRefs {
    readonly id: FieldRef<"MealCatalog", 'String'>
    readonly name: FieldRef<"MealCatalog", 'String'>
    readonly description: FieldRef<"MealCatalog", 'String'>
    readonly imageUrl: FieldRef<"MealCatalog", 'String'>
    readonly defaultPrice: FieldRef<"MealCatalog", 'Int'>
    readonly isActive: FieldRef<"MealCatalog", 'Boolean'>
    readonly createdAt: FieldRef<"MealCatalog", 'DateTime'>
    readonly updatedAt: FieldRef<"MealCatalog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MealCatalog findUnique
   */
  export type MealCatalogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealCatalog
     */
    select?: MealCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealCatalog
     */
    omit?: MealCatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealCatalogInclude<ExtArgs> | null
    /**
     * Filter, which MealCatalog to fetch.
     */
    where: MealCatalogWhereUniqueInput
  }

  /**
   * MealCatalog findUniqueOrThrow
   */
  export type MealCatalogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealCatalog
     */
    select?: MealCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealCatalog
     */
    omit?: MealCatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealCatalogInclude<ExtArgs> | null
    /**
     * Filter, which MealCatalog to fetch.
     */
    where: MealCatalogWhereUniqueInput
  }

  /**
   * MealCatalog findFirst
   */
  export type MealCatalogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealCatalog
     */
    select?: MealCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealCatalog
     */
    omit?: MealCatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealCatalogInclude<ExtArgs> | null
    /**
     * Filter, which MealCatalog to fetch.
     */
    where?: MealCatalogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealCatalogs to fetch.
     */
    orderBy?: MealCatalogOrderByWithRelationInput | MealCatalogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MealCatalogs.
     */
    cursor?: MealCatalogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealCatalogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealCatalogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MealCatalogs.
     */
    distinct?: MealCatalogScalarFieldEnum | MealCatalogScalarFieldEnum[]
  }

  /**
   * MealCatalog findFirstOrThrow
   */
  export type MealCatalogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealCatalog
     */
    select?: MealCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealCatalog
     */
    omit?: MealCatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealCatalogInclude<ExtArgs> | null
    /**
     * Filter, which MealCatalog to fetch.
     */
    where?: MealCatalogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealCatalogs to fetch.
     */
    orderBy?: MealCatalogOrderByWithRelationInput | MealCatalogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MealCatalogs.
     */
    cursor?: MealCatalogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealCatalogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealCatalogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MealCatalogs.
     */
    distinct?: MealCatalogScalarFieldEnum | MealCatalogScalarFieldEnum[]
  }

  /**
   * MealCatalog findMany
   */
  export type MealCatalogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealCatalog
     */
    select?: MealCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealCatalog
     */
    omit?: MealCatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealCatalogInclude<ExtArgs> | null
    /**
     * Filter, which MealCatalogs to fetch.
     */
    where?: MealCatalogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealCatalogs to fetch.
     */
    orderBy?: MealCatalogOrderByWithRelationInput | MealCatalogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MealCatalogs.
     */
    cursor?: MealCatalogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealCatalogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealCatalogs.
     */
    skip?: number
    distinct?: MealCatalogScalarFieldEnum | MealCatalogScalarFieldEnum[]
  }

  /**
   * MealCatalog create
   */
  export type MealCatalogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealCatalog
     */
    select?: MealCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealCatalog
     */
    omit?: MealCatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealCatalogInclude<ExtArgs> | null
    /**
     * The data needed to create a MealCatalog.
     */
    data: XOR<MealCatalogCreateInput, MealCatalogUncheckedCreateInput>
  }

  /**
   * MealCatalog createMany
   */
  export type MealCatalogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MealCatalogs.
     */
    data: MealCatalogCreateManyInput | MealCatalogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MealCatalog createManyAndReturn
   */
  export type MealCatalogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealCatalog
     */
    select?: MealCatalogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MealCatalog
     */
    omit?: MealCatalogOmit<ExtArgs> | null
    /**
     * The data used to create many MealCatalogs.
     */
    data: MealCatalogCreateManyInput | MealCatalogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MealCatalog update
   */
  export type MealCatalogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealCatalog
     */
    select?: MealCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealCatalog
     */
    omit?: MealCatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealCatalogInclude<ExtArgs> | null
    /**
     * The data needed to update a MealCatalog.
     */
    data: XOR<MealCatalogUpdateInput, MealCatalogUncheckedUpdateInput>
    /**
     * Choose, which MealCatalog to update.
     */
    where: MealCatalogWhereUniqueInput
  }

  /**
   * MealCatalog updateMany
   */
  export type MealCatalogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MealCatalogs.
     */
    data: XOR<MealCatalogUpdateManyMutationInput, MealCatalogUncheckedUpdateManyInput>
    /**
     * Filter which MealCatalogs to update
     */
    where?: MealCatalogWhereInput
    /**
     * Limit how many MealCatalogs to update.
     */
    limit?: number
  }

  /**
   * MealCatalog updateManyAndReturn
   */
  export type MealCatalogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealCatalog
     */
    select?: MealCatalogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MealCatalog
     */
    omit?: MealCatalogOmit<ExtArgs> | null
    /**
     * The data used to update MealCatalogs.
     */
    data: XOR<MealCatalogUpdateManyMutationInput, MealCatalogUncheckedUpdateManyInput>
    /**
     * Filter which MealCatalogs to update
     */
    where?: MealCatalogWhereInput
    /**
     * Limit how many MealCatalogs to update.
     */
    limit?: number
  }

  /**
   * MealCatalog upsert
   */
  export type MealCatalogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealCatalog
     */
    select?: MealCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealCatalog
     */
    omit?: MealCatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealCatalogInclude<ExtArgs> | null
    /**
     * The filter to search for the MealCatalog to update in case it exists.
     */
    where: MealCatalogWhereUniqueInput
    /**
     * In case the MealCatalog found by the `where` argument doesn't exist, create a new MealCatalog with this data.
     */
    create: XOR<MealCatalogCreateInput, MealCatalogUncheckedCreateInput>
    /**
     * In case the MealCatalog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MealCatalogUpdateInput, MealCatalogUncheckedUpdateInput>
  }

  /**
   * MealCatalog delete
   */
  export type MealCatalogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealCatalog
     */
    select?: MealCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealCatalog
     */
    omit?: MealCatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealCatalogInclude<ExtArgs> | null
    /**
     * Filter which MealCatalog to delete.
     */
    where: MealCatalogWhereUniqueInput
  }

  /**
   * MealCatalog deleteMany
   */
  export type MealCatalogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MealCatalogs to delete
     */
    where?: MealCatalogWhereInput
    /**
     * Limit how many MealCatalogs to delete.
     */
    limit?: number
  }

  /**
   * MealCatalog.dailyMenus
   */
  export type MealCatalog$dailyMenusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMenu
     */
    select?: DailyMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMenu
     */
    omit?: DailyMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMenuInclude<ExtArgs> | null
    where?: DailyMenuWhereInput
    orderBy?: DailyMenuOrderByWithRelationInput | DailyMenuOrderByWithRelationInput[]
    cursor?: DailyMenuWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DailyMenuScalarFieldEnum | DailyMenuScalarFieldEnum[]
  }

  /**
   * MealCatalog.weekdayMenus
   */
  export type MealCatalog$weekdayMenusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekdayMenu
     */
    select?: WeekdayMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekdayMenu
     */
    omit?: WeekdayMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekdayMenuInclude<ExtArgs> | null
    where?: WeekdayMenuWhereInput
    orderBy?: WeekdayMenuOrderByWithRelationInput | WeekdayMenuOrderByWithRelationInput[]
    cursor?: WeekdayMenuWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WeekdayMenuScalarFieldEnum | WeekdayMenuScalarFieldEnum[]
  }

  /**
   * MealCatalog without action
   */
  export type MealCatalogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealCatalog
     */
    select?: MealCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealCatalog
     */
    omit?: MealCatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealCatalogInclude<ExtArgs> | null
  }


  /**
   * Model WeekdayMenu
   */

  export type AggregateWeekdayMenu = {
    _count: WeekdayMenuCountAggregateOutputType | null
    _avg: WeekdayMenuAvgAggregateOutputType | null
    _sum: WeekdayMenuSumAggregateOutputType | null
    _min: WeekdayMenuMinAggregateOutputType | null
    _max: WeekdayMenuMaxAggregateOutputType | null
  }

  export type WeekdayMenuAvgAggregateOutputType = {
    price: number | null
  }

  export type WeekdayMenuSumAggregateOutputType = {
    price: number | null
  }

  export type WeekdayMenuMinAggregateOutputType = {
    id: string | null
    locationId: string | null
    weekday: $Enums.Weekday | null
    slot: $Enums.MealSlot | null
    title: string | null
    description: string | null
    price: number | null
    imageUrl: string | null
    catalogItemId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WeekdayMenuMaxAggregateOutputType = {
    id: string | null
    locationId: string | null
    weekday: $Enums.Weekday | null
    slot: $Enums.MealSlot | null
    title: string | null
    description: string | null
    price: number | null
    imageUrl: string | null
    catalogItemId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WeekdayMenuCountAggregateOutputType = {
    id: number
    locationId: number
    weekday: number
    slot: number
    title: number
    description: number
    price: number
    imageUrl: number
    catalogItemId: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WeekdayMenuAvgAggregateInputType = {
    price?: true
  }

  export type WeekdayMenuSumAggregateInputType = {
    price?: true
  }

  export type WeekdayMenuMinAggregateInputType = {
    id?: true
    locationId?: true
    weekday?: true
    slot?: true
    title?: true
    description?: true
    price?: true
    imageUrl?: true
    catalogItemId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WeekdayMenuMaxAggregateInputType = {
    id?: true
    locationId?: true
    weekday?: true
    slot?: true
    title?: true
    description?: true
    price?: true
    imageUrl?: true
    catalogItemId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WeekdayMenuCountAggregateInputType = {
    id?: true
    locationId?: true
    weekday?: true
    slot?: true
    title?: true
    description?: true
    price?: true
    imageUrl?: true
    catalogItemId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WeekdayMenuAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeekdayMenu to aggregate.
     */
    where?: WeekdayMenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeekdayMenus to fetch.
     */
    orderBy?: WeekdayMenuOrderByWithRelationInput | WeekdayMenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WeekdayMenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeekdayMenus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeekdayMenus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WeekdayMenus
    **/
    _count?: true | WeekdayMenuCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WeekdayMenuAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WeekdayMenuSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WeekdayMenuMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WeekdayMenuMaxAggregateInputType
  }

  export type GetWeekdayMenuAggregateType<T extends WeekdayMenuAggregateArgs> = {
        [P in keyof T & keyof AggregateWeekdayMenu]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWeekdayMenu[P]>
      : GetScalarType<T[P], AggregateWeekdayMenu[P]>
  }




  export type WeekdayMenuGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WeekdayMenuWhereInput
    orderBy?: WeekdayMenuOrderByWithAggregationInput | WeekdayMenuOrderByWithAggregationInput[]
    by: WeekdayMenuScalarFieldEnum[] | WeekdayMenuScalarFieldEnum
    having?: WeekdayMenuScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WeekdayMenuCountAggregateInputType | true
    _avg?: WeekdayMenuAvgAggregateInputType
    _sum?: WeekdayMenuSumAggregateInputType
    _min?: WeekdayMenuMinAggregateInputType
    _max?: WeekdayMenuMaxAggregateInputType
  }

  export type WeekdayMenuGroupByOutputType = {
    id: string
    locationId: string
    weekday: $Enums.Weekday
    slot: $Enums.MealSlot
    title: string
    description: string | null
    price: number
    imageUrl: string | null
    catalogItemId: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: WeekdayMenuCountAggregateOutputType | null
    _avg: WeekdayMenuAvgAggregateOutputType | null
    _sum: WeekdayMenuSumAggregateOutputType | null
    _min: WeekdayMenuMinAggregateOutputType | null
    _max: WeekdayMenuMaxAggregateOutputType | null
  }

  type GetWeekdayMenuGroupByPayload<T extends WeekdayMenuGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WeekdayMenuGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WeekdayMenuGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WeekdayMenuGroupByOutputType[P]>
            : GetScalarType<T[P], WeekdayMenuGroupByOutputType[P]>
        }
      >
    >


  export type WeekdayMenuSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    locationId?: boolean
    weekday?: boolean
    slot?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    imageUrl?: boolean
    catalogItemId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
    catalogItem?: boolean | WeekdayMenu$catalogItemArgs<ExtArgs>
    dailyMenus?: boolean | WeekdayMenu$dailyMenusArgs<ExtArgs>
    _count?: boolean | WeekdayMenuCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["weekdayMenu"]>

  export type WeekdayMenuSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    locationId?: boolean
    weekday?: boolean
    slot?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    imageUrl?: boolean
    catalogItemId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
    catalogItem?: boolean | WeekdayMenu$catalogItemArgs<ExtArgs>
  }, ExtArgs["result"]["weekdayMenu"]>

  export type WeekdayMenuSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    locationId?: boolean
    weekday?: boolean
    slot?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    imageUrl?: boolean
    catalogItemId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
    catalogItem?: boolean | WeekdayMenu$catalogItemArgs<ExtArgs>
  }, ExtArgs["result"]["weekdayMenu"]>

  export type WeekdayMenuSelectScalar = {
    id?: boolean
    locationId?: boolean
    weekday?: boolean
    slot?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    imageUrl?: boolean
    catalogItemId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WeekdayMenuOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "locationId" | "weekday" | "slot" | "title" | "description" | "price" | "imageUrl" | "catalogItemId" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["weekdayMenu"]>
  export type WeekdayMenuInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
    catalogItem?: boolean | WeekdayMenu$catalogItemArgs<ExtArgs>
    dailyMenus?: boolean | WeekdayMenu$dailyMenusArgs<ExtArgs>
    _count?: boolean | WeekdayMenuCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WeekdayMenuIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
    catalogItem?: boolean | WeekdayMenu$catalogItemArgs<ExtArgs>
  }
  export type WeekdayMenuIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
    catalogItem?: boolean | WeekdayMenu$catalogItemArgs<ExtArgs>
  }

  export type $WeekdayMenuPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WeekdayMenu"
    objects: {
      location: Prisma.$LocationPayload<ExtArgs>
      catalogItem: Prisma.$MealCatalogPayload<ExtArgs> | null
      dailyMenus: Prisma.$DailyMenuPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      locationId: string
      weekday: $Enums.Weekday
      slot: $Enums.MealSlot
      title: string
      description: string | null
      price: number
      imageUrl: string | null
      catalogItemId: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["weekdayMenu"]>
    composites: {}
  }

  type WeekdayMenuGetPayload<S extends boolean | null | undefined | WeekdayMenuDefaultArgs> = $Result.GetResult<Prisma.$WeekdayMenuPayload, S>

  type WeekdayMenuCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WeekdayMenuFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WeekdayMenuCountAggregateInputType | true
    }

  export interface WeekdayMenuDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WeekdayMenu'], meta: { name: 'WeekdayMenu' } }
    /**
     * Find zero or one WeekdayMenu that matches the filter.
     * @param {WeekdayMenuFindUniqueArgs} args - Arguments to find a WeekdayMenu
     * @example
     * // Get one WeekdayMenu
     * const weekdayMenu = await prisma.weekdayMenu.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WeekdayMenuFindUniqueArgs>(args: SelectSubset<T, WeekdayMenuFindUniqueArgs<ExtArgs>>): Prisma__WeekdayMenuClient<$Result.GetResult<Prisma.$WeekdayMenuPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WeekdayMenu that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WeekdayMenuFindUniqueOrThrowArgs} args - Arguments to find a WeekdayMenu
     * @example
     * // Get one WeekdayMenu
     * const weekdayMenu = await prisma.weekdayMenu.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WeekdayMenuFindUniqueOrThrowArgs>(args: SelectSubset<T, WeekdayMenuFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WeekdayMenuClient<$Result.GetResult<Prisma.$WeekdayMenuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeekdayMenu that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeekdayMenuFindFirstArgs} args - Arguments to find a WeekdayMenu
     * @example
     * // Get one WeekdayMenu
     * const weekdayMenu = await prisma.weekdayMenu.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WeekdayMenuFindFirstArgs>(args?: SelectSubset<T, WeekdayMenuFindFirstArgs<ExtArgs>>): Prisma__WeekdayMenuClient<$Result.GetResult<Prisma.$WeekdayMenuPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WeekdayMenu that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeekdayMenuFindFirstOrThrowArgs} args - Arguments to find a WeekdayMenu
     * @example
     * // Get one WeekdayMenu
     * const weekdayMenu = await prisma.weekdayMenu.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WeekdayMenuFindFirstOrThrowArgs>(args?: SelectSubset<T, WeekdayMenuFindFirstOrThrowArgs<ExtArgs>>): Prisma__WeekdayMenuClient<$Result.GetResult<Prisma.$WeekdayMenuPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WeekdayMenus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeekdayMenuFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WeekdayMenus
     * const weekdayMenus = await prisma.weekdayMenu.findMany()
     * 
     * // Get first 10 WeekdayMenus
     * const weekdayMenus = await prisma.weekdayMenu.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const weekdayMenuWithIdOnly = await prisma.weekdayMenu.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WeekdayMenuFindManyArgs>(args?: SelectSubset<T, WeekdayMenuFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeekdayMenuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WeekdayMenu.
     * @param {WeekdayMenuCreateArgs} args - Arguments to create a WeekdayMenu.
     * @example
     * // Create one WeekdayMenu
     * const WeekdayMenu = await prisma.weekdayMenu.create({
     *   data: {
     *     // ... data to create a WeekdayMenu
     *   }
     * })
     * 
     */
    create<T extends WeekdayMenuCreateArgs>(args: SelectSubset<T, WeekdayMenuCreateArgs<ExtArgs>>): Prisma__WeekdayMenuClient<$Result.GetResult<Prisma.$WeekdayMenuPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WeekdayMenus.
     * @param {WeekdayMenuCreateManyArgs} args - Arguments to create many WeekdayMenus.
     * @example
     * // Create many WeekdayMenus
     * const weekdayMenu = await prisma.weekdayMenu.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WeekdayMenuCreateManyArgs>(args?: SelectSubset<T, WeekdayMenuCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WeekdayMenus and returns the data saved in the database.
     * @param {WeekdayMenuCreateManyAndReturnArgs} args - Arguments to create many WeekdayMenus.
     * @example
     * // Create many WeekdayMenus
     * const weekdayMenu = await prisma.weekdayMenu.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WeekdayMenus and only return the `id`
     * const weekdayMenuWithIdOnly = await prisma.weekdayMenu.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WeekdayMenuCreateManyAndReturnArgs>(args?: SelectSubset<T, WeekdayMenuCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeekdayMenuPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WeekdayMenu.
     * @param {WeekdayMenuDeleteArgs} args - Arguments to delete one WeekdayMenu.
     * @example
     * // Delete one WeekdayMenu
     * const WeekdayMenu = await prisma.weekdayMenu.delete({
     *   where: {
     *     // ... filter to delete one WeekdayMenu
     *   }
     * })
     * 
     */
    delete<T extends WeekdayMenuDeleteArgs>(args: SelectSubset<T, WeekdayMenuDeleteArgs<ExtArgs>>): Prisma__WeekdayMenuClient<$Result.GetResult<Prisma.$WeekdayMenuPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WeekdayMenu.
     * @param {WeekdayMenuUpdateArgs} args - Arguments to update one WeekdayMenu.
     * @example
     * // Update one WeekdayMenu
     * const weekdayMenu = await prisma.weekdayMenu.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WeekdayMenuUpdateArgs>(args: SelectSubset<T, WeekdayMenuUpdateArgs<ExtArgs>>): Prisma__WeekdayMenuClient<$Result.GetResult<Prisma.$WeekdayMenuPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WeekdayMenus.
     * @param {WeekdayMenuDeleteManyArgs} args - Arguments to filter WeekdayMenus to delete.
     * @example
     * // Delete a few WeekdayMenus
     * const { count } = await prisma.weekdayMenu.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WeekdayMenuDeleteManyArgs>(args?: SelectSubset<T, WeekdayMenuDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeekdayMenus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeekdayMenuUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WeekdayMenus
     * const weekdayMenu = await prisma.weekdayMenu.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WeekdayMenuUpdateManyArgs>(args: SelectSubset<T, WeekdayMenuUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WeekdayMenus and returns the data updated in the database.
     * @param {WeekdayMenuUpdateManyAndReturnArgs} args - Arguments to update many WeekdayMenus.
     * @example
     * // Update many WeekdayMenus
     * const weekdayMenu = await prisma.weekdayMenu.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WeekdayMenus and only return the `id`
     * const weekdayMenuWithIdOnly = await prisma.weekdayMenu.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WeekdayMenuUpdateManyAndReturnArgs>(args: SelectSubset<T, WeekdayMenuUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WeekdayMenuPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WeekdayMenu.
     * @param {WeekdayMenuUpsertArgs} args - Arguments to update or create a WeekdayMenu.
     * @example
     * // Update or create a WeekdayMenu
     * const weekdayMenu = await prisma.weekdayMenu.upsert({
     *   create: {
     *     // ... data to create a WeekdayMenu
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WeekdayMenu we want to update
     *   }
     * })
     */
    upsert<T extends WeekdayMenuUpsertArgs>(args: SelectSubset<T, WeekdayMenuUpsertArgs<ExtArgs>>): Prisma__WeekdayMenuClient<$Result.GetResult<Prisma.$WeekdayMenuPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WeekdayMenus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeekdayMenuCountArgs} args - Arguments to filter WeekdayMenus to count.
     * @example
     * // Count the number of WeekdayMenus
     * const count = await prisma.weekdayMenu.count({
     *   where: {
     *     // ... the filter for the WeekdayMenus we want to count
     *   }
     * })
    **/
    count<T extends WeekdayMenuCountArgs>(
      args?: Subset<T, WeekdayMenuCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WeekdayMenuCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WeekdayMenu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeekdayMenuAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WeekdayMenuAggregateArgs>(args: Subset<T, WeekdayMenuAggregateArgs>): Prisma.PrismaPromise<GetWeekdayMenuAggregateType<T>>

    /**
     * Group by WeekdayMenu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WeekdayMenuGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WeekdayMenuGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WeekdayMenuGroupByArgs['orderBy'] }
        : { orderBy?: WeekdayMenuGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WeekdayMenuGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWeekdayMenuGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WeekdayMenu model
   */
  readonly fields: WeekdayMenuFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WeekdayMenu.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WeekdayMenuClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    location<T extends LocationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LocationDefaultArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    catalogItem<T extends WeekdayMenu$catalogItemArgs<ExtArgs> = {}>(args?: Subset<T, WeekdayMenu$catalogItemArgs<ExtArgs>>): Prisma__MealCatalogClient<$Result.GetResult<Prisma.$MealCatalogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    dailyMenus<T extends WeekdayMenu$dailyMenusArgs<ExtArgs> = {}>(args?: Subset<T, WeekdayMenu$dailyMenusArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyMenuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WeekdayMenu model
   */
  interface WeekdayMenuFieldRefs {
    readonly id: FieldRef<"WeekdayMenu", 'String'>
    readonly locationId: FieldRef<"WeekdayMenu", 'String'>
    readonly weekday: FieldRef<"WeekdayMenu", 'Weekday'>
    readonly slot: FieldRef<"WeekdayMenu", 'MealSlot'>
    readonly title: FieldRef<"WeekdayMenu", 'String'>
    readonly description: FieldRef<"WeekdayMenu", 'String'>
    readonly price: FieldRef<"WeekdayMenu", 'Int'>
    readonly imageUrl: FieldRef<"WeekdayMenu", 'String'>
    readonly catalogItemId: FieldRef<"WeekdayMenu", 'String'>
    readonly isActive: FieldRef<"WeekdayMenu", 'Boolean'>
    readonly createdAt: FieldRef<"WeekdayMenu", 'DateTime'>
    readonly updatedAt: FieldRef<"WeekdayMenu", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WeekdayMenu findUnique
   */
  export type WeekdayMenuFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekdayMenu
     */
    select?: WeekdayMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekdayMenu
     */
    omit?: WeekdayMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekdayMenuInclude<ExtArgs> | null
    /**
     * Filter, which WeekdayMenu to fetch.
     */
    where: WeekdayMenuWhereUniqueInput
  }

  /**
   * WeekdayMenu findUniqueOrThrow
   */
  export type WeekdayMenuFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekdayMenu
     */
    select?: WeekdayMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekdayMenu
     */
    omit?: WeekdayMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekdayMenuInclude<ExtArgs> | null
    /**
     * Filter, which WeekdayMenu to fetch.
     */
    where: WeekdayMenuWhereUniqueInput
  }

  /**
   * WeekdayMenu findFirst
   */
  export type WeekdayMenuFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekdayMenu
     */
    select?: WeekdayMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekdayMenu
     */
    omit?: WeekdayMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekdayMenuInclude<ExtArgs> | null
    /**
     * Filter, which WeekdayMenu to fetch.
     */
    where?: WeekdayMenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeekdayMenus to fetch.
     */
    orderBy?: WeekdayMenuOrderByWithRelationInput | WeekdayMenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeekdayMenus.
     */
    cursor?: WeekdayMenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeekdayMenus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeekdayMenus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeekdayMenus.
     */
    distinct?: WeekdayMenuScalarFieldEnum | WeekdayMenuScalarFieldEnum[]
  }

  /**
   * WeekdayMenu findFirstOrThrow
   */
  export type WeekdayMenuFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekdayMenu
     */
    select?: WeekdayMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekdayMenu
     */
    omit?: WeekdayMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekdayMenuInclude<ExtArgs> | null
    /**
     * Filter, which WeekdayMenu to fetch.
     */
    where?: WeekdayMenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeekdayMenus to fetch.
     */
    orderBy?: WeekdayMenuOrderByWithRelationInput | WeekdayMenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WeekdayMenus.
     */
    cursor?: WeekdayMenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeekdayMenus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeekdayMenus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WeekdayMenus.
     */
    distinct?: WeekdayMenuScalarFieldEnum | WeekdayMenuScalarFieldEnum[]
  }

  /**
   * WeekdayMenu findMany
   */
  export type WeekdayMenuFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekdayMenu
     */
    select?: WeekdayMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekdayMenu
     */
    omit?: WeekdayMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekdayMenuInclude<ExtArgs> | null
    /**
     * Filter, which WeekdayMenus to fetch.
     */
    where?: WeekdayMenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WeekdayMenus to fetch.
     */
    orderBy?: WeekdayMenuOrderByWithRelationInput | WeekdayMenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WeekdayMenus.
     */
    cursor?: WeekdayMenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WeekdayMenus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WeekdayMenus.
     */
    skip?: number
    distinct?: WeekdayMenuScalarFieldEnum | WeekdayMenuScalarFieldEnum[]
  }

  /**
   * WeekdayMenu create
   */
  export type WeekdayMenuCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekdayMenu
     */
    select?: WeekdayMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekdayMenu
     */
    omit?: WeekdayMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekdayMenuInclude<ExtArgs> | null
    /**
     * The data needed to create a WeekdayMenu.
     */
    data: XOR<WeekdayMenuCreateInput, WeekdayMenuUncheckedCreateInput>
  }

  /**
   * WeekdayMenu createMany
   */
  export type WeekdayMenuCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WeekdayMenus.
     */
    data: WeekdayMenuCreateManyInput | WeekdayMenuCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WeekdayMenu createManyAndReturn
   */
  export type WeekdayMenuCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekdayMenu
     */
    select?: WeekdayMenuSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeekdayMenu
     */
    omit?: WeekdayMenuOmit<ExtArgs> | null
    /**
     * The data used to create many WeekdayMenus.
     */
    data: WeekdayMenuCreateManyInput | WeekdayMenuCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekdayMenuIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeekdayMenu update
   */
  export type WeekdayMenuUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekdayMenu
     */
    select?: WeekdayMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekdayMenu
     */
    omit?: WeekdayMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekdayMenuInclude<ExtArgs> | null
    /**
     * The data needed to update a WeekdayMenu.
     */
    data: XOR<WeekdayMenuUpdateInput, WeekdayMenuUncheckedUpdateInput>
    /**
     * Choose, which WeekdayMenu to update.
     */
    where: WeekdayMenuWhereUniqueInput
  }

  /**
   * WeekdayMenu updateMany
   */
  export type WeekdayMenuUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WeekdayMenus.
     */
    data: XOR<WeekdayMenuUpdateManyMutationInput, WeekdayMenuUncheckedUpdateManyInput>
    /**
     * Filter which WeekdayMenus to update
     */
    where?: WeekdayMenuWhereInput
    /**
     * Limit how many WeekdayMenus to update.
     */
    limit?: number
  }

  /**
   * WeekdayMenu updateManyAndReturn
   */
  export type WeekdayMenuUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekdayMenu
     */
    select?: WeekdayMenuSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WeekdayMenu
     */
    omit?: WeekdayMenuOmit<ExtArgs> | null
    /**
     * The data used to update WeekdayMenus.
     */
    data: XOR<WeekdayMenuUpdateManyMutationInput, WeekdayMenuUncheckedUpdateManyInput>
    /**
     * Filter which WeekdayMenus to update
     */
    where?: WeekdayMenuWhereInput
    /**
     * Limit how many WeekdayMenus to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekdayMenuIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WeekdayMenu upsert
   */
  export type WeekdayMenuUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekdayMenu
     */
    select?: WeekdayMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekdayMenu
     */
    omit?: WeekdayMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekdayMenuInclude<ExtArgs> | null
    /**
     * The filter to search for the WeekdayMenu to update in case it exists.
     */
    where: WeekdayMenuWhereUniqueInput
    /**
     * In case the WeekdayMenu found by the `where` argument doesn't exist, create a new WeekdayMenu with this data.
     */
    create: XOR<WeekdayMenuCreateInput, WeekdayMenuUncheckedCreateInput>
    /**
     * In case the WeekdayMenu was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WeekdayMenuUpdateInput, WeekdayMenuUncheckedUpdateInput>
  }

  /**
   * WeekdayMenu delete
   */
  export type WeekdayMenuDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekdayMenu
     */
    select?: WeekdayMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekdayMenu
     */
    omit?: WeekdayMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekdayMenuInclude<ExtArgs> | null
    /**
     * Filter which WeekdayMenu to delete.
     */
    where: WeekdayMenuWhereUniqueInput
  }

  /**
   * WeekdayMenu deleteMany
   */
  export type WeekdayMenuDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WeekdayMenus to delete
     */
    where?: WeekdayMenuWhereInput
    /**
     * Limit how many WeekdayMenus to delete.
     */
    limit?: number
  }

  /**
   * WeekdayMenu.catalogItem
   */
  export type WeekdayMenu$catalogItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealCatalog
     */
    select?: MealCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealCatalog
     */
    omit?: MealCatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealCatalogInclude<ExtArgs> | null
    where?: MealCatalogWhereInput
  }

  /**
   * WeekdayMenu.dailyMenus
   */
  export type WeekdayMenu$dailyMenusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMenu
     */
    select?: DailyMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMenu
     */
    omit?: DailyMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMenuInclude<ExtArgs> | null
    where?: DailyMenuWhereInput
    orderBy?: DailyMenuOrderByWithRelationInput | DailyMenuOrderByWithRelationInput[]
    cursor?: DailyMenuWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DailyMenuScalarFieldEnum | DailyMenuScalarFieldEnum[]
  }

  /**
   * WeekdayMenu without action
   */
  export type WeekdayMenuDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekdayMenu
     */
    select?: WeekdayMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekdayMenu
     */
    omit?: WeekdayMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekdayMenuInclude<ExtArgs> | null
  }


  /**
   * Model DailyMenu
   */

  export type AggregateDailyMenu = {
    _count: DailyMenuCountAggregateOutputType | null
    _avg: DailyMenuAvgAggregateOutputType | null
    _sum: DailyMenuSumAggregateOutputType | null
    _min: DailyMenuMinAggregateOutputType | null
    _max: DailyMenuMaxAggregateOutputType | null
  }

  export type DailyMenuAvgAggregateOutputType = {
    price: number | null
  }

  export type DailyMenuSumAggregateOutputType = {
    price: number | null
  }

  export type DailyMenuMinAggregateOutputType = {
    id: string | null
    locationId: string | null
    date: Date | null
    slot: $Enums.MealSlot | null
    title: string | null
    description: string | null
    price: number | null
    imageUrl: string | null
    catalogItemId: string | null
    sourceWeekdayMenuId: string | null
    cutoffAt: Date | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyMenuMaxAggregateOutputType = {
    id: string | null
    locationId: string | null
    date: Date | null
    slot: $Enums.MealSlot | null
    title: string | null
    description: string | null
    price: number | null
    imageUrl: string | null
    catalogItemId: string | null
    sourceWeekdayMenuId: string | null
    cutoffAt: Date | null
    isPublished: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyMenuCountAggregateOutputType = {
    id: number
    locationId: number
    date: number
    slot: number
    title: number
    description: number
    price: number
    imageUrl: number
    catalogItemId: number
    sourceWeekdayMenuId: number
    cutoffAt: number
    isPublished: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DailyMenuAvgAggregateInputType = {
    price?: true
  }

  export type DailyMenuSumAggregateInputType = {
    price?: true
  }

  export type DailyMenuMinAggregateInputType = {
    id?: true
    locationId?: true
    date?: true
    slot?: true
    title?: true
    description?: true
    price?: true
    imageUrl?: true
    catalogItemId?: true
    sourceWeekdayMenuId?: true
    cutoffAt?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyMenuMaxAggregateInputType = {
    id?: true
    locationId?: true
    date?: true
    slot?: true
    title?: true
    description?: true
    price?: true
    imageUrl?: true
    catalogItemId?: true
    sourceWeekdayMenuId?: true
    cutoffAt?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyMenuCountAggregateInputType = {
    id?: true
    locationId?: true
    date?: true
    slot?: true
    title?: true
    description?: true
    price?: true
    imageUrl?: true
    catalogItemId?: true
    sourceWeekdayMenuId?: true
    cutoffAt?: true
    isPublished?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DailyMenuAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyMenu to aggregate.
     */
    where?: DailyMenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyMenus to fetch.
     */
    orderBy?: DailyMenuOrderByWithRelationInput | DailyMenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyMenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyMenus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyMenus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyMenus
    **/
    _count?: true | DailyMenuCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DailyMenuAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DailyMenuSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyMenuMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyMenuMaxAggregateInputType
  }

  export type GetDailyMenuAggregateType<T extends DailyMenuAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyMenu]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyMenu[P]>
      : GetScalarType<T[P], AggregateDailyMenu[P]>
  }




  export type DailyMenuGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyMenuWhereInput
    orderBy?: DailyMenuOrderByWithAggregationInput | DailyMenuOrderByWithAggregationInput[]
    by: DailyMenuScalarFieldEnum[] | DailyMenuScalarFieldEnum
    having?: DailyMenuScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyMenuCountAggregateInputType | true
    _avg?: DailyMenuAvgAggregateInputType
    _sum?: DailyMenuSumAggregateInputType
    _min?: DailyMenuMinAggregateInputType
    _max?: DailyMenuMaxAggregateInputType
  }

  export type DailyMenuGroupByOutputType = {
    id: string
    locationId: string
    date: Date
    slot: $Enums.MealSlot
    title: string
    description: string | null
    price: number
    imageUrl: string | null
    catalogItemId: string | null
    sourceWeekdayMenuId: string | null
    cutoffAt: Date | null
    isPublished: boolean
    createdAt: Date
    updatedAt: Date
    _count: DailyMenuCountAggregateOutputType | null
    _avg: DailyMenuAvgAggregateOutputType | null
    _sum: DailyMenuSumAggregateOutputType | null
    _min: DailyMenuMinAggregateOutputType | null
    _max: DailyMenuMaxAggregateOutputType | null
  }

  type GetDailyMenuGroupByPayload<T extends DailyMenuGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyMenuGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyMenuGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyMenuGroupByOutputType[P]>
            : GetScalarType<T[P], DailyMenuGroupByOutputType[P]>
        }
      >
    >


  export type DailyMenuSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    locationId?: boolean
    date?: boolean
    slot?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    imageUrl?: boolean
    catalogItemId?: boolean
    sourceWeekdayMenuId?: boolean
    cutoffAt?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
    catalogItem?: boolean | DailyMenu$catalogItemArgs<ExtArgs>
    sourceWeekdayMenu?: boolean | DailyMenu$sourceWeekdayMenuArgs<ExtArgs>
    orders?: boolean | DailyMenu$ordersArgs<ExtArgs>
    _count?: boolean | DailyMenuCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyMenu"]>

  export type DailyMenuSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    locationId?: boolean
    date?: boolean
    slot?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    imageUrl?: boolean
    catalogItemId?: boolean
    sourceWeekdayMenuId?: boolean
    cutoffAt?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
    catalogItem?: boolean | DailyMenu$catalogItemArgs<ExtArgs>
    sourceWeekdayMenu?: boolean | DailyMenu$sourceWeekdayMenuArgs<ExtArgs>
  }, ExtArgs["result"]["dailyMenu"]>

  export type DailyMenuSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    locationId?: boolean
    date?: boolean
    slot?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    imageUrl?: boolean
    catalogItemId?: boolean
    sourceWeekdayMenuId?: boolean
    cutoffAt?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
    catalogItem?: boolean | DailyMenu$catalogItemArgs<ExtArgs>
    sourceWeekdayMenu?: boolean | DailyMenu$sourceWeekdayMenuArgs<ExtArgs>
  }, ExtArgs["result"]["dailyMenu"]>

  export type DailyMenuSelectScalar = {
    id?: boolean
    locationId?: boolean
    date?: boolean
    slot?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    imageUrl?: boolean
    catalogItemId?: boolean
    sourceWeekdayMenuId?: boolean
    cutoffAt?: boolean
    isPublished?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DailyMenuOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "locationId" | "date" | "slot" | "title" | "description" | "price" | "imageUrl" | "catalogItemId" | "sourceWeekdayMenuId" | "cutoffAt" | "isPublished" | "createdAt" | "updatedAt", ExtArgs["result"]["dailyMenu"]>
  export type DailyMenuInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
    catalogItem?: boolean | DailyMenu$catalogItemArgs<ExtArgs>
    sourceWeekdayMenu?: boolean | DailyMenu$sourceWeekdayMenuArgs<ExtArgs>
    orders?: boolean | DailyMenu$ordersArgs<ExtArgs>
    _count?: boolean | DailyMenuCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DailyMenuIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
    catalogItem?: boolean | DailyMenu$catalogItemArgs<ExtArgs>
    sourceWeekdayMenu?: boolean | DailyMenu$sourceWeekdayMenuArgs<ExtArgs>
  }
  export type DailyMenuIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
    catalogItem?: boolean | DailyMenu$catalogItemArgs<ExtArgs>
    sourceWeekdayMenu?: boolean | DailyMenu$sourceWeekdayMenuArgs<ExtArgs>
  }

  export type $DailyMenuPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyMenu"
    objects: {
      location: Prisma.$LocationPayload<ExtArgs>
      catalogItem: Prisma.$MealCatalogPayload<ExtArgs> | null
      sourceWeekdayMenu: Prisma.$WeekdayMenuPayload<ExtArgs> | null
      orders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      locationId: string
      date: Date
      slot: $Enums.MealSlot
      title: string
      description: string | null
      price: number
      imageUrl: string | null
      catalogItemId: string | null
      /**
       * When set, this row was materialized from a weekday template
       */
      sourceWeekdayMenuId: string | null
      /**
       * Absolute cutoff datetime (Asia/Dhaka resolved); null = use location default for that day
       */
      cutoffAt: Date | null
      isPublished: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dailyMenu"]>
    composites: {}
  }

  type DailyMenuGetPayload<S extends boolean | null | undefined | DailyMenuDefaultArgs> = $Result.GetResult<Prisma.$DailyMenuPayload, S>

  type DailyMenuCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DailyMenuFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DailyMenuCountAggregateInputType | true
    }

  export interface DailyMenuDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyMenu'], meta: { name: 'DailyMenu' } }
    /**
     * Find zero or one DailyMenu that matches the filter.
     * @param {DailyMenuFindUniqueArgs} args - Arguments to find a DailyMenu
     * @example
     * // Get one DailyMenu
     * const dailyMenu = await prisma.dailyMenu.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyMenuFindUniqueArgs>(args: SelectSubset<T, DailyMenuFindUniqueArgs<ExtArgs>>): Prisma__DailyMenuClient<$Result.GetResult<Prisma.$DailyMenuPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DailyMenu that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DailyMenuFindUniqueOrThrowArgs} args - Arguments to find a DailyMenu
     * @example
     * // Get one DailyMenu
     * const dailyMenu = await prisma.dailyMenu.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyMenuFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyMenuFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyMenuClient<$Result.GetResult<Prisma.$DailyMenuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyMenu that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMenuFindFirstArgs} args - Arguments to find a DailyMenu
     * @example
     * // Get one DailyMenu
     * const dailyMenu = await prisma.dailyMenu.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyMenuFindFirstArgs>(args?: SelectSubset<T, DailyMenuFindFirstArgs<ExtArgs>>): Prisma__DailyMenuClient<$Result.GetResult<Prisma.$DailyMenuPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyMenu that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMenuFindFirstOrThrowArgs} args - Arguments to find a DailyMenu
     * @example
     * // Get one DailyMenu
     * const dailyMenu = await prisma.dailyMenu.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyMenuFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyMenuFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyMenuClient<$Result.GetResult<Prisma.$DailyMenuPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DailyMenus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMenuFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyMenus
     * const dailyMenus = await prisma.dailyMenu.findMany()
     * 
     * // Get first 10 DailyMenus
     * const dailyMenus = await prisma.dailyMenu.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailyMenuWithIdOnly = await prisma.dailyMenu.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DailyMenuFindManyArgs>(args?: SelectSubset<T, DailyMenuFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyMenuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DailyMenu.
     * @param {DailyMenuCreateArgs} args - Arguments to create a DailyMenu.
     * @example
     * // Create one DailyMenu
     * const DailyMenu = await prisma.dailyMenu.create({
     *   data: {
     *     // ... data to create a DailyMenu
     *   }
     * })
     * 
     */
    create<T extends DailyMenuCreateArgs>(args: SelectSubset<T, DailyMenuCreateArgs<ExtArgs>>): Prisma__DailyMenuClient<$Result.GetResult<Prisma.$DailyMenuPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DailyMenus.
     * @param {DailyMenuCreateManyArgs} args - Arguments to create many DailyMenus.
     * @example
     * // Create many DailyMenus
     * const dailyMenu = await prisma.dailyMenu.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyMenuCreateManyArgs>(args?: SelectSubset<T, DailyMenuCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyMenus and returns the data saved in the database.
     * @param {DailyMenuCreateManyAndReturnArgs} args - Arguments to create many DailyMenus.
     * @example
     * // Create many DailyMenus
     * const dailyMenu = await prisma.dailyMenu.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyMenus and only return the `id`
     * const dailyMenuWithIdOnly = await prisma.dailyMenu.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyMenuCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyMenuCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyMenuPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DailyMenu.
     * @param {DailyMenuDeleteArgs} args - Arguments to delete one DailyMenu.
     * @example
     * // Delete one DailyMenu
     * const DailyMenu = await prisma.dailyMenu.delete({
     *   where: {
     *     // ... filter to delete one DailyMenu
     *   }
     * })
     * 
     */
    delete<T extends DailyMenuDeleteArgs>(args: SelectSubset<T, DailyMenuDeleteArgs<ExtArgs>>): Prisma__DailyMenuClient<$Result.GetResult<Prisma.$DailyMenuPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DailyMenu.
     * @param {DailyMenuUpdateArgs} args - Arguments to update one DailyMenu.
     * @example
     * // Update one DailyMenu
     * const dailyMenu = await prisma.dailyMenu.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyMenuUpdateArgs>(args: SelectSubset<T, DailyMenuUpdateArgs<ExtArgs>>): Prisma__DailyMenuClient<$Result.GetResult<Prisma.$DailyMenuPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DailyMenus.
     * @param {DailyMenuDeleteManyArgs} args - Arguments to filter DailyMenus to delete.
     * @example
     * // Delete a few DailyMenus
     * const { count } = await prisma.dailyMenu.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyMenuDeleteManyArgs>(args?: SelectSubset<T, DailyMenuDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyMenus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMenuUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyMenus
     * const dailyMenu = await prisma.dailyMenu.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyMenuUpdateManyArgs>(args: SelectSubset<T, DailyMenuUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyMenus and returns the data updated in the database.
     * @param {DailyMenuUpdateManyAndReturnArgs} args - Arguments to update many DailyMenus.
     * @example
     * // Update many DailyMenus
     * const dailyMenu = await prisma.dailyMenu.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DailyMenus and only return the `id`
     * const dailyMenuWithIdOnly = await prisma.dailyMenu.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DailyMenuUpdateManyAndReturnArgs>(args: SelectSubset<T, DailyMenuUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyMenuPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DailyMenu.
     * @param {DailyMenuUpsertArgs} args - Arguments to update or create a DailyMenu.
     * @example
     * // Update or create a DailyMenu
     * const dailyMenu = await prisma.dailyMenu.upsert({
     *   create: {
     *     // ... data to create a DailyMenu
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyMenu we want to update
     *   }
     * })
     */
    upsert<T extends DailyMenuUpsertArgs>(args: SelectSubset<T, DailyMenuUpsertArgs<ExtArgs>>): Prisma__DailyMenuClient<$Result.GetResult<Prisma.$DailyMenuPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DailyMenus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMenuCountArgs} args - Arguments to filter DailyMenus to count.
     * @example
     * // Count the number of DailyMenus
     * const count = await prisma.dailyMenu.count({
     *   where: {
     *     // ... the filter for the DailyMenus we want to count
     *   }
     * })
    **/
    count<T extends DailyMenuCountArgs>(
      args?: Subset<T, DailyMenuCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyMenuCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyMenu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMenuAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DailyMenuAggregateArgs>(args: Subset<T, DailyMenuAggregateArgs>): Prisma.PrismaPromise<GetDailyMenuAggregateType<T>>

    /**
     * Group by DailyMenu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyMenuGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DailyMenuGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyMenuGroupByArgs['orderBy'] }
        : { orderBy?: DailyMenuGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DailyMenuGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyMenuGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyMenu model
   */
  readonly fields: DailyMenuFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyMenu.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyMenuClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    location<T extends LocationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LocationDefaultArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    catalogItem<T extends DailyMenu$catalogItemArgs<ExtArgs> = {}>(args?: Subset<T, DailyMenu$catalogItemArgs<ExtArgs>>): Prisma__MealCatalogClient<$Result.GetResult<Prisma.$MealCatalogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    sourceWeekdayMenu<T extends DailyMenu$sourceWeekdayMenuArgs<ExtArgs> = {}>(args?: Subset<T, DailyMenu$sourceWeekdayMenuArgs<ExtArgs>>): Prisma__WeekdayMenuClient<$Result.GetResult<Prisma.$WeekdayMenuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    orders<T extends DailyMenu$ordersArgs<ExtArgs> = {}>(args?: Subset<T, DailyMenu$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DailyMenu model
   */
  interface DailyMenuFieldRefs {
    readonly id: FieldRef<"DailyMenu", 'String'>
    readonly locationId: FieldRef<"DailyMenu", 'String'>
    readonly date: FieldRef<"DailyMenu", 'DateTime'>
    readonly slot: FieldRef<"DailyMenu", 'MealSlot'>
    readonly title: FieldRef<"DailyMenu", 'String'>
    readonly description: FieldRef<"DailyMenu", 'String'>
    readonly price: FieldRef<"DailyMenu", 'Int'>
    readonly imageUrl: FieldRef<"DailyMenu", 'String'>
    readonly catalogItemId: FieldRef<"DailyMenu", 'String'>
    readonly sourceWeekdayMenuId: FieldRef<"DailyMenu", 'String'>
    readonly cutoffAt: FieldRef<"DailyMenu", 'DateTime'>
    readonly isPublished: FieldRef<"DailyMenu", 'Boolean'>
    readonly createdAt: FieldRef<"DailyMenu", 'DateTime'>
    readonly updatedAt: FieldRef<"DailyMenu", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DailyMenu findUnique
   */
  export type DailyMenuFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMenu
     */
    select?: DailyMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMenu
     */
    omit?: DailyMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMenuInclude<ExtArgs> | null
    /**
     * Filter, which DailyMenu to fetch.
     */
    where: DailyMenuWhereUniqueInput
  }

  /**
   * DailyMenu findUniqueOrThrow
   */
  export type DailyMenuFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMenu
     */
    select?: DailyMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMenu
     */
    omit?: DailyMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMenuInclude<ExtArgs> | null
    /**
     * Filter, which DailyMenu to fetch.
     */
    where: DailyMenuWhereUniqueInput
  }

  /**
   * DailyMenu findFirst
   */
  export type DailyMenuFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMenu
     */
    select?: DailyMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMenu
     */
    omit?: DailyMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMenuInclude<ExtArgs> | null
    /**
     * Filter, which DailyMenu to fetch.
     */
    where?: DailyMenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyMenus to fetch.
     */
    orderBy?: DailyMenuOrderByWithRelationInput | DailyMenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyMenus.
     */
    cursor?: DailyMenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyMenus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyMenus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyMenus.
     */
    distinct?: DailyMenuScalarFieldEnum | DailyMenuScalarFieldEnum[]
  }

  /**
   * DailyMenu findFirstOrThrow
   */
  export type DailyMenuFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMenu
     */
    select?: DailyMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMenu
     */
    omit?: DailyMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMenuInclude<ExtArgs> | null
    /**
     * Filter, which DailyMenu to fetch.
     */
    where?: DailyMenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyMenus to fetch.
     */
    orderBy?: DailyMenuOrderByWithRelationInput | DailyMenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyMenus.
     */
    cursor?: DailyMenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyMenus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyMenus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyMenus.
     */
    distinct?: DailyMenuScalarFieldEnum | DailyMenuScalarFieldEnum[]
  }

  /**
   * DailyMenu findMany
   */
  export type DailyMenuFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMenu
     */
    select?: DailyMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMenu
     */
    omit?: DailyMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMenuInclude<ExtArgs> | null
    /**
     * Filter, which DailyMenus to fetch.
     */
    where?: DailyMenuWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyMenus to fetch.
     */
    orderBy?: DailyMenuOrderByWithRelationInput | DailyMenuOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyMenus.
     */
    cursor?: DailyMenuWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyMenus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyMenus.
     */
    skip?: number
    distinct?: DailyMenuScalarFieldEnum | DailyMenuScalarFieldEnum[]
  }

  /**
   * DailyMenu create
   */
  export type DailyMenuCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMenu
     */
    select?: DailyMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMenu
     */
    omit?: DailyMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMenuInclude<ExtArgs> | null
    /**
     * The data needed to create a DailyMenu.
     */
    data: XOR<DailyMenuCreateInput, DailyMenuUncheckedCreateInput>
  }

  /**
   * DailyMenu createMany
   */
  export type DailyMenuCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyMenus.
     */
    data: DailyMenuCreateManyInput | DailyMenuCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyMenu createManyAndReturn
   */
  export type DailyMenuCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMenu
     */
    select?: DailyMenuSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMenu
     */
    omit?: DailyMenuOmit<ExtArgs> | null
    /**
     * The data used to create many DailyMenus.
     */
    data: DailyMenuCreateManyInput | DailyMenuCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMenuIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyMenu update
   */
  export type DailyMenuUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMenu
     */
    select?: DailyMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMenu
     */
    omit?: DailyMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMenuInclude<ExtArgs> | null
    /**
     * The data needed to update a DailyMenu.
     */
    data: XOR<DailyMenuUpdateInput, DailyMenuUncheckedUpdateInput>
    /**
     * Choose, which DailyMenu to update.
     */
    where: DailyMenuWhereUniqueInput
  }

  /**
   * DailyMenu updateMany
   */
  export type DailyMenuUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyMenus.
     */
    data: XOR<DailyMenuUpdateManyMutationInput, DailyMenuUncheckedUpdateManyInput>
    /**
     * Filter which DailyMenus to update
     */
    where?: DailyMenuWhereInput
    /**
     * Limit how many DailyMenus to update.
     */
    limit?: number
  }

  /**
   * DailyMenu updateManyAndReturn
   */
  export type DailyMenuUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMenu
     */
    select?: DailyMenuSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMenu
     */
    omit?: DailyMenuOmit<ExtArgs> | null
    /**
     * The data used to update DailyMenus.
     */
    data: XOR<DailyMenuUpdateManyMutationInput, DailyMenuUncheckedUpdateManyInput>
    /**
     * Filter which DailyMenus to update
     */
    where?: DailyMenuWhereInput
    /**
     * Limit how many DailyMenus to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMenuIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyMenu upsert
   */
  export type DailyMenuUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMenu
     */
    select?: DailyMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMenu
     */
    omit?: DailyMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMenuInclude<ExtArgs> | null
    /**
     * The filter to search for the DailyMenu to update in case it exists.
     */
    where: DailyMenuWhereUniqueInput
    /**
     * In case the DailyMenu found by the `where` argument doesn't exist, create a new DailyMenu with this data.
     */
    create: XOR<DailyMenuCreateInput, DailyMenuUncheckedCreateInput>
    /**
     * In case the DailyMenu was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyMenuUpdateInput, DailyMenuUncheckedUpdateInput>
  }

  /**
   * DailyMenu delete
   */
  export type DailyMenuDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMenu
     */
    select?: DailyMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMenu
     */
    omit?: DailyMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMenuInclude<ExtArgs> | null
    /**
     * Filter which DailyMenu to delete.
     */
    where: DailyMenuWhereUniqueInput
  }

  /**
   * DailyMenu deleteMany
   */
  export type DailyMenuDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyMenus to delete
     */
    where?: DailyMenuWhereInput
    /**
     * Limit how many DailyMenus to delete.
     */
    limit?: number
  }

  /**
   * DailyMenu.catalogItem
   */
  export type DailyMenu$catalogItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealCatalog
     */
    select?: MealCatalogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealCatalog
     */
    omit?: MealCatalogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealCatalogInclude<ExtArgs> | null
    where?: MealCatalogWhereInput
  }

  /**
   * DailyMenu.sourceWeekdayMenu
   */
  export type DailyMenu$sourceWeekdayMenuArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WeekdayMenu
     */
    select?: WeekdayMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WeekdayMenu
     */
    omit?: WeekdayMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WeekdayMenuInclude<ExtArgs> | null
    where?: WeekdayMenuWhereInput
  }

  /**
   * DailyMenu.orders
   */
  export type DailyMenu$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * DailyMenu without action
   */
  export type DailyMenuDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyMenu
     */
    select?: DailyMenuSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyMenu
     */
    omit?: DailyMenuOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyMenuInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    amount: number | null
  }

  export type OrderSumAggregateOutputType = {
    amount: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    userId: string | null
    dailyMenuId: string | null
    locationId: string | null
    amount: number | null
    note: string | null
    status: $Enums.OrderStatus | null
    paymentStatus: $Enums.PaymentStatus | null
    deliveredAt: Date | null
    paidAt: Date | null
    placedById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    dailyMenuId: string | null
    locationId: string | null
    amount: number | null
    note: string | null
    status: $Enums.OrderStatus | null
    paymentStatus: $Enums.PaymentStatus | null
    deliveredAt: Date | null
    paidAt: Date | null
    placedById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    userId: number
    dailyMenuId: number
    locationId: number
    amount: number
    note: number
    status: number
    paymentStatus: number
    deliveredAt: number
    paidAt: number
    placedById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    amount?: true
  }

  export type OrderSumAggregateInputType = {
    amount?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    userId?: true
    dailyMenuId?: true
    locationId?: true
    amount?: true
    note?: true
    status?: true
    paymentStatus?: true
    deliveredAt?: true
    paidAt?: true
    placedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    userId?: true
    dailyMenuId?: true
    locationId?: true
    amount?: true
    note?: true
    status?: true
    paymentStatus?: true
    deliveredAt?: true
    paidAt?: true
    placedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    userId?: true
    dailyMenuId?: true
    locationId?: true
    amount?: true
    note?: true
    status?: true
    paymentStatus?: true
    deliveredAt?: true
    paidAt?: true
    placedById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    userId: string
    dailyMenuId: string
    locationId: string
    amount: number
    note: string | null
    status: $Enums.OrderStatus
    paymentStatus: $Enums.PaymentStatus
    deliveredAt: Date | null
    paidAt: Date | null
    placedById: string | null
    createdAt: Date
    updatedAt: Date
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dailyMenuId?: boolean
    locationId?: boolean
    amount?: boolean
    note?: boolean
    status?: boolean
    paymentStatus?: boolean
    deliveredAt?: boolean
    paidAt?: boolean
    placedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    placedBy?: boolean | Order$placedByArgs<ExtArgs>
    dailyMenu?: boolean | DailyMenuDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
    walletTxs?: boolean | Order$walletTxsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dailyMenuId?: boolean
    locationId?: boolean
    amount?: boolean
    note?: boolean
    status?: boolean
    paymentStatus?: boolean
    deliveredAt?: boolean
    paidAt?: boolean
    placedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    placedBy?: boolean | Order$placedByArgs<ExtArgs>
    dailyMenu?: boolean | DailyMenuDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    dailyMenuId?: boolean
    locationId?: boolean
    amount?: boolean
    note?: boolean
    status?: boolean
    paymentStatus?: boolean
    deliveredAt?: boolean
    paidAt?: boolean
    placedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    placedBy?: boolean | Order$placedByArgs<ExtArgs>
    dailyMenu?: boolean | DailyMenuDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    userId?: boolean
    dailyMenuId?: boolean
    locationId?: boolean
    amount?: boolean
    note?: boolean
    status?: boolean
    paymentStatus?: boolean
    deliveredAt?: boolean
    paidAt?: boolean
    placedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "dailyMenuId" | "locationId" | "amount" | "note" | "status" | "paymentStatus" | "deliveredAt" | "paidAt" | "placedById" | "createdAt" | "updatedAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    placedBy?: boolean | Order$placedByArgs<ExtArgs>
    dailyMenu?: boolean | DailyMenuDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
    walletTxs?: boolean | Order$walletTxsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    placedBy?: boolean | Order$placedByArgs<ExtArgs>
    dailyMenu?: boolean | DailyMenuDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    placedBy?: boolean | Order$placedByArgs<ExtArgs>
    dailyMenu?: boolean | DailyMenuDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      placedBy: Prisma.$UserPayload<ExtArgs> | null
      dailyMenu: Prisma.$DailyMenuPayload<ExtArgs>
      location: Prisma.$LocationPayload<ExtArgs>
      walletTxs: Prisma.$WalletTransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      dailyMenuId: string
      locationId: string
      amount: number
      note: string | null
      status: $Enums.OrderStatus
      paymentStatus: $Enums.PaymentStatus
      deliveredAt: Date | null
      paidAt: Date | null
      /**
       * Admin who placed this order on behalf of the user (null = self-order)
       */
      placedById: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    placedBy<T extends Order$placedByArgs<ExtArgs> = {}>(args?: Subset<T, Order$placedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    dailyMenu<T extends DailyMenuDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DailyMenuDefaultArgs<ExtArgs>>): Prisma__DailyMenuClient<$Result.GetResult<Prisma.$DailyMenuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    location<T extends LocationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LocationDefaultArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    walletTxs<T extends Order$walletTxsArgs<ExtArgs> = {}>(args?: Subset<T, Order$walletTxsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly userId: FieldRef<"Order", 'String'>
    readonly dailyMenuId: FieldRef<"Order", 'String'>
    readonly locationId: FieldRef<"Order", 'String'>
    readonly amount: FieldRef<"Order", 'Int'>
    readonly note: FieldRef<"Order", 'String'>
    readonly status: FieldRef<"Order", 'OrderStatus'>
    readonly paymentStatus: FieldRef<"Order", 'PaymentStatus'>
    readonly deliveredAt: FieldRef<"Order", 'DateTime'>
    readonly paidAt: FieldRef<"Order", 'DateTime'>
    readonly placedById: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.placedBy
   */
  export type Order$placedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Order.walletTxs
   */
  export type Order$walletTxsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletTransactionInclude<ExtArgs> | null
    where?: WalletTransactionWhereInput
    orderBy?: WalletTransactionOrderByWithRelationInput | WalletTransactionOrderByWithRelationInput[]
    cursor?: WalletTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WalletTransactionScalarFieldEnum | WalletTransactionScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model WalletTransaction
   */

  export type AggregateWalletTransaction = {
    _count: WalletTransactionCountAggregateOutputType | null
    _avg: WalletTransactionAvgAggregateOutputType | null
    _sum: WalletTransactionSumAggregateOutputType | null
    _min: WalletTransactionMinAggregateOutputType | null
    _max: WalletTransactionMaxAggregateOutputType | null
  }

  export type WalletTransactionAvgAggregateOutputType = {
    amount: number | null
    balanceAfter: number | null
  }

  export type WalletTransactionSumAggregateOutputType = {
    amount: number | null
    balanceAfter: number | null
  }

  export type WalletTransactionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.WalletTxType | null
    amount: number | null
    balanceAfter: number | null
    orderId: string | null
    createdById: string | null
    note: string | null
    createdAt: Date | null
  }

  export type WalletTransactionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.WalletTxType | null
    amount: number | null
    balanceAfter: number | null
    orderId: string | null
    createdById: string | null
    note: string | null
    createdAt: Date | null
  }

  export type WalletTransactionCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    amount: number
    balanceAfter: number
    orderId: number
    createdById: number
    note: number
    createdAt: number
    _all: number
  }


  export type WalletTransactionAvgAggregateInputType = {
    amount?: true
    balanceAfter?: true
  }

  export type WalletTransactionSumAggregateInputType = {
    amount?: true
    balanceAfter?: true
  }

  export type WalletTransactionMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    amount?: true
    balanceAfter?: true
    orderId?: true
    createdById?: true
    note?: true
    createdAt?: true
  }

  export type WalletTransactionMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    amount?: true
    balanceAfter?: true
    orderId?: true
    createdById?: true
    note?: true
    createdAt?: true
  }

  export type WalletTransactionCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    amount?: true
    balanceAfter?: true
    orderId?: true
    createdById?: true
    note?: true
    createdAt?: true
    _all?: true
  }

  export type WalletTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WalletTransaction to aggregate.
     */
    where?: WalletTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WalletTransactions to fetch.
     */
    orderBy?: WalletTransactionOrderByWithRelationInput | WalletTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WalletTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WalletTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WalletTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WalletTransactions
    **/
    _count?: true | WalletTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WalletTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WalletTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WalletTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WalletTransactionMaxAggregateInputType
  }

  export type GetWalletTransactionAggregateType<T extends WalletTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateWalletTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWalletTransaction[P]>
      : GetScalarType<T[P], AggregateWalletTransaction[P]>
  }




  export type WalletTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletTransactionWhereInput
    orderBy?: WalletTransactionOrderByWithAggregationInput | WalletTransactionOrderByWithAggregationInput[]
    by: WalletTransactionScalarFieldEnum[] | WalletTransactionScalarFieldEnum
    having?: WalletTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WalletTransactionCountAggregateInputType | true
    _avg?: WalletTransactionAvgAggregateInputType
    _sum?: WalletTransactionSumAggregateInputType
    _min?: WalletTransactionMinAggregateInputType
    _max?: WalletTransactionMaxAggregateInputType
  }

  export type WalletTransactionGroupByOutputType = {
    id: string
    userId: string
    type: $Enums.WalletTxType
    amount: number
    balanceAfter: number
    orderId: string | null
    createdById: string | null
    note: string | null
    createdAt: Date
    _count: WalletTransactionCountAggregateOutputType | null
    _avg: WalletTransactionAvgAggregateOutputType | null
    _sum: WalletTransactionSumAggregateOutputType | null
    _min: WalletTransactionMinAggregateOutputType | null
    _max: WalletTransactionMaxAggregateOutputType | null
  }

  type GetWalletTransactionGroupByPayload<T extends WalletTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WalletTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WalletTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WalletTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], WalletTransactionGroupByOutputType[P]>
        }
      >
    >


  export type WalletTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    amount?: boolean
    balanceAfter?: boolean
    orderId?: boolean
    createdById?: boolean
    note?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    order?: boolean | WalletTransaction$orderArgs<ExtArgs>
    createdBy?: boolean | WalletTransaction$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["walletTransaction"]>

  export type WalletTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    amount?: boolean
    balanceAfter?: boolean
    orderId?: boolean
    createdById?: boolean
    note?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    order?: boolean | WalletTransaction$orderArgs<ExtArgs>
    createdBy?: boolean | WalletTransaction$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["walletTransaction"]>

  export type WalletTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    amount?: boolean
    balanceAfter?: boolean
    orderId?: boolean
    createdById?: boolean
    note?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    order?: boolean | WalletTransaction$orderArgs<ExtArgs>
    createdBy?: boolean | WalletTransaction$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["walletTransaction"]>

  export type WalletTransactionSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    amount?: boolean
    balanceAfter?: boolean
    orderId?: boolean
    createdById?: boolean
    note?: boolean
    createdAt?: boolean
  }

  export type WalletTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "amount" | "balanceAfter" | "orderId" | "createdById" | "note" | "createdAt", ExtArgs["result"]["walletTransaction"]>
  export type WalletTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    order?: boolean | WalletTransaction$orderArgs<ExtArgs>
    createdBy?: boolean | WalletTransaction$createdByArgs<ExtArgs>
  }
  export type WalletTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    order?: boolean | WalletTransaction$orderArgs<ExtArgs>
    createdBy?: boolean | WalletTransaction$createdByArgs<ExtArgs>
  }
  export type WalletTransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    order?: boolean | WalletTransaction$orderArgs<ExtArgs>
    createdBy?: boolean | WalletTransaction$createdByArgs<ExtArgs>
  }

  export type $WalletTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WalletTransaction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      order: Prisma.$OrderPayload<ExtArgs> | null
      createdBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: $Enums.WalletTxType
      /**
       * Signed amount applied to balance (positive deposit, negative charge)
       */
      amount: number
      balanceAfter: number
      orderId: string | null
      createdById: string | null
      note: string | null
      createdAt: Date
    }, ExtArgs["result"]["walletTransaction"]>
    composites: {}
  }

  type WalletTransactionGetPayload<S extends boolean | null | undefined | WalletTransactionDefaultArgs> = $Result.GetResult<Prisma.$WalletTransactionPayload, S>

  type WalletTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WalletTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WalletTransactionCountAggregateInputType | true
    }

  export interface WalletTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WalletTransaction'], meta: { name: 'WalletTransaction' } }
    /**
     * Find zero or one WalletTransaction that matches the filter.
     * @param {WalletTransactionFindUniqueArgs} args - Arguments to find a WalletTransaction
     * @example
     * // Get one WalletTransaction
     * const walletTransaction = await prisma.walletTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WalletTransactionFindUniqueArgs>(args: SelectSubset<T, WalletTransactionFindUniqueArgs<ExtArgs>>): Prisma__WalletTransactionClient<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WalletTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WalletTransactionFindUniqueOrThrowArgs} args - Arguments to find a WalletTransaction
     * @example
     * // Get one WalletTransaction
     * const walletTransaction = await prisma.walletTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WalletTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, WalletTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WalletTransactionClient<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WalletTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletTransactionFindFirstArgs} args - Arguments to find a WalletTransaction
     * @example
     * // Get one WalletTransaction
     * const walletTransaction = await prisma.walletTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WalletTransactionFindFirstArgs>(args?: SelectSubset<T, WalletTransactionFindFirstArgs<ExtArgs>>): Prisma__WalletTransactionClient<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WalletTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletTransactionFindFirstOrThrowArgs} args - Arguments to find a WalletTransaction
     * @example
     * // Get one WalletTransaction
     * const walletTransaction = await prisma.walletTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WalletTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, WalletTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__WalletTransactionClient<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WalletTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WalletTransactions
     * const walletTransactions = await prisma.walletTransaction.findMany()
     * 
     * // Get first 10 WalletTransactions
     * const walletTransactions = await prisma.walletTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const walletTransactionWithIdOnly = await prisma.walletTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WalletTransactionFindManyArgs>(args?: SelectSubset<T, WalletTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WalletTransaction.
     * @param {WalletTransactionCreateArgs} args - Arguments to create a WalletTransaction.
     * @example
     * // Create one WalletTransaction
     * const WalletTransaction = await prisma.walletTransaction.create({
     *   data: {
     *     // ... data to create a WalletTransaction
     *   }
     * })
     * 
     */
    create<T extends WalletTransactionCreateArgs>(args: SelectSubset<T, WalletTransactionCreateArgs<ExtArgs>>): Prisma__WalletTransactionClient<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WalletTransactions.
     * @param {WalletTransactionCreateManyArgs} args - Arguments to create many WalletTransactions.
     * @example
     * // Create many WalletTransactions
     * const walletTransaction = await prisma.walletTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WalletTransactionCreateManyArgs>(args?: SelectSubset<T, WalletTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WalletTransactions and returns the data saved in the database.
     * @param {WalletTransactionCreateManyAndReturnArgs} args - Arguments to create many WalletTransactions.
     * @example
     * // Create many WalletTransactions
     * const walletTransaction = await prisma.walletTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WalletTransactions and only return the `id`
     * const walletTransactionWithIdOnly = await prisma.walletTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WalletTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, WalletTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WalletTransaction.
     * @param {WalletTransactionDeleteArgs} args - Arguments to delete one WalletTransaction.
     * @example
     * // Delete one WalletTransaction
     * const WalletTransaction = await prisma.walletTransaction.delete({
     *   where: {
     *     // ... filter to delete one WalletTransaction
     *   }
     * })
     * 
     */
    delete<T extends WalletTransactionDeleteArgs>(args: SelectSubset<T, WalletTransactionDeleteArgs<ExtArgs>>): Prisma__WalletTransactionClient<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WalletTransaction.
     * @param {WalletTransactionUpdateArgs} args - Arguments to update one WalletTransaction.
     * @example
     * // Update one WalletTransaction
     * const walletTransaction = await prisma.walletTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WalletTransactionUpdateArgs>(args: SelectSubset<T, WalletTransactionUpdateArgs<ExtArgs>>): Prisma__WalletTransactionClient<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WalletTransactions.
     * @param {WalletTransactionDeleteManyArgs} args - Arguments to filter WalletTransactions to delete.
     * @example
     * // Delete a few WalletTransactions
     * const { count } = await prisma.walletTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WalletTransactionDeleteManyArgs>(args?: SelectSubset<T, WalletTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WalletTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WalletTransactions
     * const walletTransaction = await prisma.walletTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WalletTransactionUpdateManyArgs>(args: SelectSubset<T, WalletTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WalletTransactions and returns the data updated in the database.
     * @param {WalletTransactionUpdateManyAndReturnArgs} args - Arguments to update many WalletTransactions.
     * @example
     * // Update many WalletTransactions
     * const walletTransaction = await prisma.walletTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WalletTransactions and only return the `id`
     * const walletTransactionWithIdOnly = await prisma.walletTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WalletTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, WalletTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WalletTransaction.
     * @param {WalletTransactionUpsertArgs} args - Arguments to update or create a WalletTransaction.
     * @example
     * // Update or create a WalletTransaction
     * const walletTransaction = await prisma.walletTransaction.upsert({
     *   create: {
     *     // ... data to create a WalletTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WalletTransaction we want to update
     *   }
     * })
     */
    upsert<T extends WalletTransactionUpsertArgs>(args: SelectSubset<T, WalletTransactionUpsertArgs<ExtArgs>>): Prisma__WalletTransactionClient<$Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WalletTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletTransactionCountArgs} args - Arguments to filter WalletTransactions to count.
     * @example
     * // Count the number of WalletTransactions
     * const count = await prisma.walletTransaction.count({
     *   where: {
     *     // ... the filter for the WalletTransactions we want to count
     *   }
     * })
    **/
    count<T extends WalletTransactionCountArgs>(
      args?: Subset<T, WalletTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WalletTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WalletTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WalletTransactionAggregateArgs>(args: Subset<T, WalletTransactionAggregateArgs>): Prisma.PrismaPromise<GetWalletTransactionAggregateType<T>>

    /**
     * Group by WalletTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WalletTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WalletTransactionGroupByArgs['orderBy'] }
        : { orderBy?: WalletTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WalletTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WalletTransaction model
   */
  readonly fields: WalletTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WalletTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WalletTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    order<T extends WalletTransaction$orderArgs<ExtArgs> = {}>(args?: Subset<T, WalletTransaction$orderArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends WalletTransaction$createdByArgs<ExtArgs> = {}>(args?: Subset<T, WalletTransaction$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WalletTransaction model
   */
  interface WalletTransactionFieldRefs {
    readonly id: FieldRef<"WalletTransaction", 'String'>
    readonly userId: FieldRef<"WalletTransaction", 'String'>
    readonly type: FieldRef<"WalletTransaction", 'WalletTxType'>
    readonly amount: FieldRef<"WalletTransaction", 'Int'>
    readonly balanceAfter: FieldRef<"WalletTransaction", 'Int'>
    readonly orderId: FieldRef<"WalletTransaction", 'String'>
    readonly createdById: FieldRef<"WalletTransaction", 'String'>
    readonly note: FieldRef<"WalletTransaction", 'String'>
    readonly createdAt: FieldRef<"WalletTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WalletTransaction findUnique
   */
  export type WalletTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletTransactionInclude<ExtArgs> | null
    /**
     * Filter, which WalletTransaction to fetch.
     */
    where: WalletTransactionWhereUniqueInput
  }

  /**
   * WalletTransaction findUniqueOrThrow
   */
  export type WalletTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletTransactionInclude<ExtArgs> | null
    /**
     * Filter, which WalletTransaction to fetch.
     */
    where: WalletTransactionWhereUniqueInput
  }

  /**
   * WalletTransaction findFirst
   */
  export type WalletTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletTransactionInclude<ExtArgs> | null
    /**
     * Filter, which WalletTransaction to fetch.
     */
    where?: WalletTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WalletTransactions to fetch.
     */
    orderBy?: WalletTransactionOrderByWithRelationInput | WalletTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WalletTransactions.
     */
    cursor?: WalletTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WalletTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WalletTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WalletTransactions.
     */
    distinct?: WalletTransactionScalarFieldEnum | WalletTransactionScalarFieldEnum[]
  }

  /**
   * WalletTransaction findFirstOrThrow
   */
  export type WalletTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletTransactionInclude<ExtArgs> | null
    /**
     * Filter, which WalletTransaction to fetch.
     */
    where?: WalletTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WalletTransactions to fetch.
     */
    orderBy?: WalletTransactionOrderByWithRelationInput | WalletTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WalletTransactions.
     */
    cursor?: WalletTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WalletTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WalletTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WalletTransactions.
     */
    distinct?: WalletTransactionScalarFieldEnum | WalletTransactionScalarFieldEnum[]
  }

  /**
   * WalletTransaction findMany
   */
  export type WalletTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletTransactionInclude<ExtArgs> | null
    /**
     * Filter, which WalletTransactions to fetch.
     */
    where?: WalletTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WalletTransactions to fetch.
     */
    orderBy?: WalletTransactionOrderByWithRelationInput | WalletTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WalletTransactions.
     */
    cursor?: WalletTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WalletTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WalletTransactions.
     */
    skip?: number
    distinct?: WalletTransactionScalarFieldEnum | WalletTransactionScalarFieldEnum[]
  }

  /**
   * WalletTransaction create
   */
  export type WalletTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a WalletTransaction.
     */
    data: XOR<WalletTransactionCreateInput, WalletTransactionUncheckedCreateInput>
  }

  /**
   * WalletTransaction createMany
   */
  export type WalletTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WalletTransactions.
     */
    data: WalletTransactionCreateManyInput | WalletTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WalletTransaction createManyAndReturn
   */
  export type WalletTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many WalletTransactions.
     */
    data: WalletTransactionCreateManyInput | WalletTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WalletTransaction update
   */
  export type WalletTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a WalletTransaction.
     */
    data: XOR<WalletTransactionUpdateInput, WalletTransactionUncheckedUpdateInput>
    /**
     * Choose, which WalletTransaction to update.
     */
    where: WalletTransactionWhereUniqueInput
  }

  /**
   * WalletTransaction updateMany
   */
  export type WalletTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WalletTransactions.
     */
    data: XOR<WalletTransactionUpdateManyMutationInput, WalletTransactionUncheckedUpdateManyInput>
    /**
     * Filter which WalletTransactions to update
     */
    where?: WalletTransactionWhereInput
    /**
     * Limit how many WalletTransactions to update.
     */
    limit?: number
  }

  /**
   * WalletTransaction updateManyAndReturn
   */
  export type WalletTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * The data used to update WalletTransactions.
     */
    data: XOR<WalletTransactionUpdateManyMutationInput, WalletTransactionUncheckedUpdateManyInput>
    /**
     * Filter which WalletTransactions to update
     */
    where?: WalletTransactionWhereInput
    /**
     * Limit how many WalletTransactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletTransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WalletTransaction upsert
   */
  export type WalletTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the WalletTransaction to update in case it exists.
     */
    where: WalletTransactionWhereUniqueInput
    /**
     * In case the WalletTransaction found by the `where` argument doesn't exist, create a new WalletTransaction with this data.
     */
    create: XOR<WalletTransactionCreateInput, WalletTransactionUncheckedCreateInput>
    /**
     * In case the WalletTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WalletTransactionUpdateInput, WalletTransactionUncheckedUpdateInput>
  }

  /**
   * WalletTransaction delete
   */
  export type WalletTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletTransactionInclude<ExtArgs> | null
    /**
     * Filter which WalletTransaction to delete.
     */
    where: WalletTransactionWhereUniqueInput
  }

  /**
   * WalletTransaction deleteMany
   */
  export type WalletTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WalletTransactions to delete
     */
    where?: WalletTransactionWhereInput
    /**
     * Limit how many WalletTransactions to delete.
     */
    limit?: number
  }

  /**
   * WalletTransaction.order
   */
  export type WalletTransaction$orderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
  }

  /**
   * WalletTransaction.createdBy
   */
  export type WalletTransaction$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * WalletTransaction without action
   */
  export type WalletTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletTransaction
     */
    select?: WalletTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletTransaction
     */
    omit?: WalletTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletTransactionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state',
    refresh_token_expires_in: 'refresh_token_expires_in'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    role: 'role',
    employeeId: 'employeeId',
    phoneNumber: 'phoneNumber',
    deskNumber: 'deskNumber',
    buildingNumber: 'buildingNumber',
    floorNumber: 'floorNumber',
    locationId: 'locationId',
    paymentMode: 'paymentMode',
    balance: 'balance',
    profileComplete: 'profileComplete',
    isBanned: 'isBanned',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const LocationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    defaultCutoffTime: 'defaultCutoffTime',
    dinnerEnabled: 'dinnerEnabled',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum]


  export const AdminLocationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    locationId: 'locationId'
  };

  export type AdminLocationScalarFieldEnum = (typeof AdminLocationScalarFieldEnum)[keyof typeof AdminLocationScalarFieldEnum]


  export const MealCatalogScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    imageUrl: 'imageUrl',
    defaultPrice: 'defaultPrice',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MealCatalogScalarFieldEnum = (typeof MealCatalogScalarFieldEnum)[keyof typeof MealCatalogScalarFieldEnum]


  export const WeekdayMenuScalarFieldEnum: {
    id: 'id',
    locationId: 'locationId',
    weekday: 'weekday',
    slot: 'slot',
    title: 'title',
    description: 'description',
    price: 'price',
    imageUrl: 'imageUrl',
    catalogItemId: 'catalogItemId',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WeekdayMenuScalarFieldEnum = (typeof WeekdayMenuScalarFieldEnum)[keyof typeof WeekdayMenuScalarFieldEnum]


  export const DailyMenuScalarFieldEnum: {
    id: 'id',
    locationId: 'locationId',
    date: 'date',
    slot: 'slot',
    title: 'title',
    description: 'description',
    price: 'price',
    imageUrl: 'imageUrl',
    catalogItemId: 'catalogItemId',
    sourceWeekdayMenuId: 'sourceWeekdayMenuId',
    cutoffAt: 'cutoffAt',
    isPublished: 'isPublished',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DailyMenuScalarFieldEnum = (typeof DailyMenuScalarFieldEnum)[keyof typeof DailyMenuScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    dailyMenuId: 'dailyMenuId',
    locationId: 'locationId',
    amount: 'amount',
    note: 'note',
    status: 'status',
    paymentStatus: 'paymentStatus',
    deliveredAt: 'deliveredAt',
    paidAt: 'paidAt',
    placedById: 'placedById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const WalletTransactionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    amount: 'amount',
    balanceAfter: 'balanceAfter',
    orderId: 'orderId',
    createdById: 'createdById',
    note: 'note',
    createdAt: 'createdAt'
  };

  export type WalletTransactionScalarFieldEnum = (typeof WalletTransactionScalarFieldEnum)[keyof typeof WalletTransactionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'PaymentMode'
   */
  export type EnumPaymentModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMode'>
    


  /**
   * Reference to a field of type 'PaymentMode[]'
   */
  export type ListEnumPaymentModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMode[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Weekday'
   */
  export type EnumWeekdayFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Weekday'>
    


  /**
   * Reference to a field of type 'Weekday[]'
   */
  export type ListEnumWeekdayFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Weekday[]'>
    


  /**
   * Reference to a field of type 'MealSlot'
   */
  export type EnumMealSlotFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MealSlot'>
    


  /**
   * Reference to a field of type 'MealSlot[]'
   */
  export type ListEnumMealSlotFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MealSlot[]'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'WalletTxType'
   */
  export type EnumWalletTxTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletTxType'>
    


  /**
   * Reference to a field of type 'WalletTxType[]'
   */
  export type ListEnumWalletTxTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletTxType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    refresh_token_expires_in?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    refresh_token_expires_in?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableWithAggregatesFilter<"Account"> | number | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    employeeId?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    deskNumber?: StringNullableFilter<"User"> | string | null
    buildingNumber?: StringNullableFilter<"User"> | string | null
    floorNumber?: StringNullableFilter<"User"> | string | null
    locationId?: StringNullableFilter<"User"> | string | null
    paymentMode?: EnumPaymentModeFilter<"User"> | $Enums.PaymentMode
    balance?: IntFilter<"User"> | number
    profileComplete?: BoolFilter<"User"> | boolean
    isBanned?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    location?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    adminLocations?: AdminLocationListRelationFilter
    orders?: OrderListRelationFilter
    ordersPlaced?: OrderListRelationFilter
    walletTransactions?: WalletTransactionListRelationFilter
    createdTransactions?: WalletTransactionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    employeeId?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    deskNumber?: SortOrderInput | SortOrder
    buildingNumber?: SortOrderInput | SortOrder
    floorNumber?: SortOrderInput | SortOrder
    locationId?: SortOrderInput | SortOrder
    paymentMode?: SortOrder
    balance?: SortOrder
    profileComplete?: SortOrder
    isBanned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    location?: LocationOrderByWithRelationInput
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    adminLocations?: AdminLocationOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
    ordersPlaced?: OrderOrderByRelationAggregateInput
    walletTransactions?: WalletTransactionOrderByRelationAggregateInput
    createdTransactions?: WalletTransactionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    employeeId?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    deskNumber?: StringNullableFilter<"User"> | string | null
    buildingNumber?: StringNullableFilter<"User"> | string | null
    floorNumber?: StringNullableFilter<"User"> | string | null
    locationId?: StringNullableFilter<"User"> | string | null
    paymentMode?: EnumPaymentModeFilter<"User"> | $Enums.PaymentMode
    balance?: IntFilter<"User"> | number
    profileComplete?: BoolFilter<"User"> | boolean
    isBanned?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    location?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    adminLocations?: AdminLocationListRelationFilter
    orders?: OrderListRelationFilter
    ordersPlaced?: OrderListRelationFilter
    walletTransactions?: WalletTransactionListRelationFilter
    createdTransactions?: WalletTransactionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    employeeId?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    deskNumber?: SortOrderInput | SortOrder
    buildingNumber?: SortOrderInput | SortOrder
    floorNumber?: SortOrderInput | SortOrder
    locationId?: SortOrderInput | SortOrder
    paymentMode?: SortOrder
    balance?: SortOrder
    profileComplete?: SortOrder
    isBanned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    employeeId?: StringNullableWithAggregatesFilter<"User"> | string | null
    phoneNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    deskNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    buildingNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    floorNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    locationId?: StringNullableWithAggregatesFilter<"User"> | string | null
    paymentMode?: EnumPaymentModeWithAggregatesFilter<"User"> | $Enums.PaymentMode
    balance?: IntWithAggregatesFilter<"User"> | number
    profileComplete?: BoolWithAggregatesFilter<"User"> | boolean
    isBanned?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type LocationWhereInput = {
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    id?: StringFilter<"Location"> | string
    name?: StringFilter<"Location"> | string
    address?: StringNullableFilter<"Location"> | string | null
    defaultCutoffTime?: StringFilter<"Location"> | string
    dinnerEnabled?: BoolFilter<"Location"> | boolean
    isActive?: BoolFilter<"Location"> | boolean
    createdAt?: DateTimeFilter<"Location"> | Date | string
    updatedAt?: DateTimeFilter<"Location"> | Date | string
    users?: UserListRelationFilter
    adminLocations?: AdminLocationListRelationFilter
    dailyMenus?: DailyMenuListRelationFilter
    weekdayMenus?: WeekdayMenuListRelationFilter
    orders?: OrderListRelationFilter
  }

  export type LocationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    defaultCutoffTime?: SortOrder
    dinnerEnabled?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    adminLocations?: AdminLocationOrderByRelationAggregateInput
    dailyMenus?: DailyMenuOrderByRelationAggregateInput
    weekdayMenus?: WeekdayMenuOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
  }

  export type LocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    name?: StringFilter<"Location"> | string
    address?: StringNullableFilter<"Location"> | string | null
    defaultCutoffTime?: StringFilter<"Location"> | string
    dinnerEnabled?: BoolFilter<"Location"> | boolean
    isActive?: BoolFilter<"Location"> | boolean
    createdAt?: DateTimeFilter<"Location"> | Date | string
    updatedAt?: DateTimeFilter<"Location"> | Date | string
    users?: UserListRelationFilter
    adminLocations?: AdminLocationListRelationFilter
    dailyMenus?: DailyMenuListRelationFilter
    weekdayMenus?: WeekdayMenuListRelationFilter
    orders?: OrderListRelationFilter
  }, "id">

  export type LocationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    defaultCutoffTime?: SortOrder
    dinnerEnabled?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LocationCountOrderByAggregateInput
    _max?: LocationMaxOrderByAggregateInput
    _min?: LocationMinOrderByAggregateInput
  }

  export type LocationScalarWhereWithAggregatesInput = {
    AND?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    OR?: LocationScalarWhereWithAggregatesInput[]
    NOT?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Location"> | string
    name?: StringWithAggregatesFilter<"Location"> | string
    address?: StringNullableWithAggregatesFilter<"Location"> | string | null
    defaultCutoffTime?: StringWithAggregatesFilter<"Location"> | string
    dinnerEnabled?: BoolWithAggregatesFilter<"Location"> | boolean
    isActive?: BoolWithAggregatesFilter<"Location"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Location"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Location"> | Date | string
  }

  export type AdminLocationWhereInput = {
    AND?: AdminLocationWhereInput | AdminLocationWhereInput[]
    OR?: AdminLocationWhereInput[]
    NOT?: AdminLocationWhereInput | AdminLocationWhereInput[]
    id?: StringFilter<"AdminLocation"> | string
    userId?: StringFilter<"AdminLocation"> | string
    locationId?: StringFilter<"AdminLocation"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
  }

  export type AdminLocationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    locationId?: SortOrder
    user?: UserOrderByWithRelationInput
    location?: LocationOrderByWithRelationInput
  }

  export type AdminLocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_locationId?: AdminLocationUserIdLocationIdCompoundUniqueInput
    AND?: AdminLocationWhereInput | AdminLocationWhereInput[]
    OR?: AdminLocationWhereInput[]
    NOT?: AdminLocationWhereInput | AdminLocationWhereInput[]
    userId?: StringFilter<"AdminLocation"> | string
    locationId?: StringFilter<"AdminLocation"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
  }, "id" | "userId_locationId">

  export type AdminLocationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    locationId?: SortOrder
    _count?: AdminLocationCountOrderByAggregateInput
    _max?: AdminLocationMaxOrderByAggregateInput
    _min?: AdminLocationMinOrderByAggregateInput
  }

  export type AdminLocationScalarWhereWithAggregatesInput = {
    AND?: AdminLocationScalarWhereWithAggregatesInput | AdminLocationScalarWhereWithAggregatesInput[]
    OR?: AdminLocationScalarWhereWithAggregatesInput[]
    NOT?: AdminLocationScalarWhereWithAggregatesInput | AdminLocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminLocation"> | string
    userId?: StringWithAggregatesFilter<"AdminLocation"> | string
    locationId?: StringWithAggregatesFilter<"AdminLocation"> | string
  }

  export type MealCatalogWhereInput = {
    AND?: MealCatalogWhereInput | MealCatalogWhereInput[]
    OR?: MealCatalogWhereInput[]
    NOT?: MealCatalogWhereInput | MealCatalogWhereInput[]
    id?: StringFilter<"MealCatalog"> | string
    name?: StringFilter<"MealCatalog"> | string
    description?: StringNullableFilter<"MealCatalog"> | string | null
    imageUrl?: StringNullableFilter<"MealCatalog"> | string | null
    defaultPrice?: IntFilter<"MealCatalog"> | number
    isActive?: BoolFilter<"MealCatalog"> | boolean
    createdAt?: DateTimeFilter<"MealCatalog"> | Date | string
    updatedAt?: DateTimeFilter<"MealCatalog"> | Date | string
    dailyMenus?: DailyMenuListRelationFilter
    weekdayMenus?: WeekdayMenuListRelationFilter
  }

  export type MealCatalogOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    defaultPrice?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dailyMenus?: DailyMenuOrderByRelationAggregateInput
    weekdayMenus?: WeekdayMenuOrderByRelationAggregateInput
  }

  export type MealCatalogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MealCatalogWhereInput | MealCatalogWhereInput[]
    OR?: MealCatalogWhereInput[]
    NOT?: MealCatalogWhereInput | MealCatalogWhereInput[]
    name?: StringFilter<"MealCatalog"> | string
    description?: StringNullableFilter<"MealCatalog"> | string | null
    imageUrl?: StringNullableFilter<"MealCatalog"> | string | null
    defaultPrice?: IntFilter<"MealCatalog"> | number
    isActive?: BoolFilter<"MealCatalog"> | boolean
    createdAt?: DateTimeFilter<"MealCatalog"> | Date | string
    updatedAt?: DateTimeFilter<"MealCatalog"> | Date | string
    dailyMenus?: DailyMenuListRelationFilter
    weekdayMenus?: WeekdayMenuListRelationFilter
  }, "id">

  export type MealCatalogOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    defaultPrice?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MealCatalogCountOrderByAggregateInput
    _avg?: MealCatalogAvgOrderByAggregateInput
    _max?: MealCatalogMaxOrderByAggregateInput
    _min?: MealCatalogMinOrderByAggregateInput
    _sum?: MealCatalogSumOrderByAggregateInput
  }

  export type MealCatalogScalarWhereWithAggregatesInput = {
    AND?: MealCatalogScalarWhereWithAggregatesInput | MealCatalogScalarWhereWithAggregatesInput[]
    OR?: MealCatalogScalarWhereWithAggregatesInput[]
    NOT?: MealCatalogScalarWhereWithAggregatesInput | MealCatalogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MealCatalog"> | string
    name?: StringWithAggregatesFilter<"MealCatalog"> | string
    description?: StringNullableWithAggregatesFilter<"MealCatalog"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"MealCatalog"> | string | null
    defaultPrice?: IntWithAggregatesFilter<"MealCatalog"> | number
    isActive?: BoolWithAggregatesFilter<"MealCatalog"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"MealCatalog"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MealCatalog"> | Date | string
  }

  export type WeekdayMenuWhereInput = {
    AND?: WeekdayMenuWhereInput | WeekdayMenuWhereInput[]
    OR?: WeekdayMenuWhereInput[]
    NOT?: WeekdayMenuWhereInput | WeekdayMenuWhereInput[]
    id?: StringFilter<"WeekdayMenu"> | string
    locationId?: StringFilter<"WeekdayMenu"> | string
    weekday?: EnumWeekdayFilter<"WeekdayMenu"> | $Enums.Weekday
    slot?: EnumMealSlotFilter<"WeekdayMenu"> | $Enums.MealSlot
    title?: StringFilter<"WeekdayMenu"> | string
    description?: StringNullableFilter<"WeekdayMenu"> | string | null
    price?: IntFilter<"WeekdayMenu"> | number
    imageUrl?: StringNullableFilter<"WeekdayMenu"> | string | null
    catalogItemId?: StringNullableFilter<"WeekdayMenu"> | string | null
    isActive?: BoolFilter<"WeekdayMenu"> | boolean
    createdAt?: DateTimeFilter<"WeekdayMenu"> | Date | string
    updatedAt?: DateTimeFilter<"WeekdayMenu"> | Date | string
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
    catalogItem?: XOR<MealCatalogNullableScalarRelationFilter, MealCatalogWhereInput> | null
    dailyMenus?: DailyMenuListRelationFilter
  }

  export type WeekdayMenuOrderByWithRelationInput = {
    id?: SortOrder
    locationId?: SortOrder
    weekday?: SortOrder
    slot?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    catalogItemId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    location?: LocationOrderByWithRelationInput
    catalogItem?: MealCatalogOrderByWithRelationInput
    dailyMenus?: DailyMenuOrderByRelationAggregateInput
  }

  export type WeekdayMenuWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WeekdayMenuWhereInput | WeekdayMenuWhereInput[]
    OR?: WeekdayMenuWhereInput[]
    NOT?: WeekdayMenuWhereInput | WeekdayMenuWhereInput[]
    locationId?: StringFilter<"WeekdayMenu"> | string
    weekday?: EnumWeekdayFilter<"WeekdayMenu"> | $Enums.Weekday
    slot?: EnumMealSlotFilter<"WeekdayMenu"> | $Enums.MealSlot
    title?: StringFilter<"WeekdayMenu"> | string
    description?: StringNullableFilter<"WeekdayMenu"> | string | null
    price?: IntFilter<"WeekdayMenu"> | number
    imageUrl?: StringNullableFilter<"WeekdayMenu"> | string | null
    catalogItemId?: StringNullableFilter<"WeekdayMenu"> | string | null
    isActive?: BoolFilter<"WeekdayMenu"> | boolean
    createdAt?: DateTimeFilter<"WeekdayMenu"> | Date | string
    updatedAt?: DateTimeFilter<"WeekdayMenu"> | Date | string
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
    catalogItem?: XOR<MealCatalogNullableScalarRelationFilter, MealCatalogWhereInput> | null
    dailyMenus?: DailyMenuListRelationFilter
  }, "id">

  export type WeekdayMenuOrderByWithAggregationInput = {
    id?: SortOrder
    locationId?: SortOrder
    weekday?: SortOrder
    slot?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    catalogItemId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WeekdayMenuCountOrderByAggregateInput
    _avg?: WeekdayMenuAvgOrderByAggregateInput
    _max?: WeekdayMenuMaxOrderByAggregateInput
    _min?: WeekdayMenuMinOrderByAggregateInput
    _sum?: WeekdayMenuSumOrderByAggregateInput
  }

  export type WeekdayMenuScalarWhereWithAggregatesInput = {
    AND?: WeekdayMenuScalarWhereWithAggregatesInput | WeekdayMenuScalarWhereWithAggregatesInput[]
    OR?: WeekdayMenuScalarWhereWithAggregatesInput[]
    NOT?: WeekdayMenuScalarWhereWithAggregatesInput | WeekdayMenuScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WeekdayMenu"> | string
    locationId?: StringWithAggregatesFilter<"WeekdayMenu"> | string
    weekday?: EnumWeekdayWithAggregatesFilter<"WeekdayMenu"> | $Enums.Weekday
    slot?: EnumMealSlotWithAggregatesFilter<"WeekdayMenu"> | $Enums.MealSlot
    title?: StringWithAggregatesFilter<"WeekdayMenu"> | string
    description?: StringNullableWithAggregatesFilter<"WeekdayMenu"> | string | null
    price?: IntWithAggregatesFilter<"WeekdayMenu"> | number
    imageUrl?: StringNullableWithAggregatesFilter<"WeekdayMenu"> | string | null
    catalogItemId?: StringNullableWithAggregatesFilter<"WeekdayMenu"> | string | null
    isActive?: BoolWithAggregatesFilter<"WeekdayMenu"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"WeekdayMenu"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WeekdayMenu"> | Date | string
  }

  export type DailyMenuWhereInput = {
    AND?: DailyMenuWhereInput | DailyMenuWhereInput[]
    OR?: DailyMenuWhereInput[]
    NOT?: DailyMenuWhereInput | DailyMenuWhereInput[]
    id?: StringFilter<"DailyMenu"> | string
    locationId?: StringFilter<"DailyMenu"> | string
    date?: DateTimeFilter<"DailyMenu"> | Date | string
    slot?: EnumMealSlotFilter<"DailyMenu"> | $Enums.MealSlot
    title?: StringFilter<"DailyMenu"> | string
    description?: StringNullableFilter<"DailyMenu"> | string | null
    price?: IntFilter<"DailyMenu"> | number
    imageUrl?: StringNullableFilter<"DailyMenu"> | string | null
    catalogItemId?: StringNullableFilter<"DailyMenu"> | string | null
    sourceWeekdayMenuId?: StringNullableFilter<"DailyMenu"> | string | null
    cutoffAt?: DateTimeNullableFilter<"DailyMenu"> | Date | string | null
    isPublished?: BoolFilter<"DailyMenu"> | boolean
    createdAt?: DateTimeFilter<"DailyMenu"> | Date | string
    updatedAt?: DateTimeFilter<"DailyMenu"> | Date | string
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
    catalogItem?: XOR<MealCatalogNullableScalarRelationFilter, MealCatalogWhereInput> | null
    sourceWeekdayMenu?: XOR<WeekdayMenuNullableScalarRelationFilter, WeekdayMenuWhereInput> | null
    orders?: OrderListRelationFilter
  }

  export type DailyMenuOrderByWithRelationInput = {
    id?: SortOrder
    locationId?: SortOrder
    date?: SortOrder
    slot?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    catalogItemId?: SortOrderInput | SortOrder
    sourceWeekdayMenuId?: SortOrderInput | SortOrder
    cutoffAt?: SortOrderInput | SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    location?: LocationOrderByWithRelationInput
    catalogItem?: MealCatalogOrderByWithRelationInput
    sourceWeekdayMenu?: WeekdayMenuOrderByWithRelationInput
    orders?: OrderOrderByRelationAggregateInput
  }

  export type DailyMenuWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    date_sourceWeekdayMenuId?: DailyMenuDateSourceWeekdayMenuIdCompoundUniqueInput
    AND?: DailyMenuWhereInput | DailyMenuWhereInput[]
    OR?: DailyMenuWhereInput[]
    NOT?: DailyMenuWhereInput | DailyMenuWhereInput[]
    locationId?: StringFilter<"DailyMenu"> | string
    date?: DateTimeFilter<"DailyMenu"> | Date | string
    slot?: EnumMealSlotFilter<"DailyMenu"> | $Enums.MealSlot
    title?: StringFilter<"DailyMenu"> | string
    description?: StringNullableFilter<"DailyMenu"> | string | null
    price?: IntFilter<"DailyMenu"> | number
    imageUrl?: StringNullableFilter<"DailyMenu"> | string | null
    catalogItemId?: StringNullableFilter<"DailyMenu"> | string | null
    sourceWeekdayMenuId?: StringNullableFilter<"DailyMenu"> | string | null
    cutoffAt?: DateTimeNullableFilter<"DailyMenu"> | Date | string | null
    isPublished?: BoolFilter<"DailyMenu"> | boolean
    createdAt?: DateTimeFilter<"DailyMenu"> | Date | string
    updatedAt?: DateTimeFilter<"DailyMenu"> | Date | string
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
    catalogItem?: XOR<MealCatalogNullableScalarRelationFilter, MealCatalogWhereInput> | null
    sourceWeekdayMenu?: XOR<WeekdayMenuNullableScalarRelationFilter, WeekdayMenuWhereInput> | null
    orders?: OrderListRelationFilter
  }, "id" | "date_sourceWeekdayMenuId">

  export type DailyMenuOrderByWithAggregationInput = {
    id?: SortOrder
    locationId?: SortOrder
    date?: SortOrder
    slot?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    catalogItemId?: SortOrderInput | SortOrder
    sourceWeekdayMenuId?: SortOrderInput | SortOrder
    cutoffAt?: SortOrderInput | SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DailyMenuCountOrderByAggregateInput
    _avg?: DailyMenuAvgOrderByAggregateInput
    _max?: DailyMenuMaxOrderByAggregateInput
    _min?: DailyMenuMinOrderByAggregateInput
    _sum?: DailyMenuSumOrderByAggregateInput
  }

  export type DailyMenuScalarWhereWithAggregatesInput = {
    AND?: DailyMenuScalarWhereWithAggregatesInput | DailyMenuScalarWhereWithAggregatesInput[]
    OR?: DailyMenuScalarWhereWithAggregatesInput[]
    NOT?: DailyMenuScalarWhereWithAggregatesInput | DailyMenuScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DailyMenu"> | string
    locationId?: StringWithAggregatesFilter<"DailyMenu"> | string
    date?: DateTimeWithAggregatesFilter<"DailyMenu"> | Date | string
    slot?: EnumMealSlotWithAggregatesFilter<"DailyMenu"> | $Enums.MealSlot
    title?: StringWithAggregatesFilter<"DailyMenu"> | string
    description?: StringNullableWithAggregatesFilter<"DailyMenu"> | string | null
    price?: IntWithAggregatesFilter<"DailyMenu"> | number
    imageUrl?: StringNullableWithAggregatesFilter<"DailyMenu"> | string | null
    catalogItemId?: StringNullableWithAggregatesFilter<"DailyMenu"> | string | null
    sourceWeekdayMenuId?: StringNullableWithAggregatesFilter<"DailyMenu"> | string | null
    cutoffAt?: DateTimeNullableWithAggregatesFilter<"DailyMenu"> | Date | string | null
    isPublished?: BoolWithAggregatesFilter<"DailyMenu"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"DailyMenu"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DailyMenu"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    userId?: StringFilter<"Order"> | string
    dailyMenuId?: StringFilter<"Order"> | string
    locationId?: StringFilter<"Order"> | string
    amount?: IntFilter<"Order"> | number
    note?: StringNullableFilter<"Order"> | string | null
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFilter<"Order"> | $Enums.PaymentStatus
    deliveredAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    paidAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    placedById?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    placedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    dailyMenu?: XOR<DailyMenuScalarRelationFilter, DailyMenuWhereInput>
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
    walletTxs?: WalletTransactionListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    dailyMenuId?: SortOrder
    locationId?: SortOrder
    amount?: SortOrder
    note?: SortOrderInput | SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    placedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    placedBy?: UserOrderByWithRelationInput
    dailyMenu?: DailyMenuOrderByWithRelationInput
    location?: LocationOrderByWithRelationInput
    walletTxs?: WalletTransactionOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    userId?: StringFilter<"Order"> | string
    dailyMenuId?: StringFilter<"Order"> | string
    locationId?: StringFilter<"Order"> | string
    amount?: IntFilter<"Order"> | number
    note?: StringNullableFilter<"Order"> | string | null
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFilter<"Order"> | $Enums.PaymentStatus
    deliveredAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    paidAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    placedById?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    placedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    dailyMenu?: XOR<DailyMenuScalarRelationFilter, DailyMenuWhereInput>
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
    walletTxs?: WalletTransactionListRelationFilter
  }, "id">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    dailyMenuId?: SortOrder
    locationId?: SortOrder
    amount?: SortOrder
    note?: SortOrderInput | SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    placedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    userId?: StringWithAggregatesFilter<"Order"> | string
    dailyMenuId?: StringWithAggregatesFilter<"Order"> | string
    locationId?: StringWithAggregatesFilter<"Order"> | string
    amount?: IntWithAggregatesFilter<"Order"> | number
    note?: StringNullableWithAggregatesFilter<"Order"> | string | null
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusWithAggregatesFilter<"Order"> | $Enums.PaymentStatus
    deliveredAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    paidAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    placedById?: StringNullableWithAggregatesFilter<"Order"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type WalletTransactionWhereInput = {
    AND?: WalletTransactionWhereInput | WalletTransactionWhereInput[]
    OR?: WalletTransactionWhereInput[]
    NOT?: WalletTransactionWhereInput | WalletTransactionWhereInput[]
    id?: StringFilter<"WalletTransaction"> | string
    userId?: StringFilter<"WalletTransaction"> | string
    type?: EnumWalletTxTypeFilter<"WalletTransaction"> | $Enums.WalletTxType
    amount?: IntFilter<"WalletTransaction"> | number
    balanceAfter?: IntFilter<"WalletTransaction"> | number
    orderId?: StringNullableFilter<"WalletTransaction"> | string | null
    createdById?: StringNullableFilter<"WalletTransaction"> | string | null
    note?: StringNullableFilter<"WalletTransaction"> | string | null
    createdAt?: DateTimeFilter<"WalletTransaction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    order?: XOR<OrderNullableScalarRelationFilter, OrderWhereInput> | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type WalletTransactionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    orderId?: SortOrderInput | SortOrder
    createdById?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    order?: OrderOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
  }

  export type WalletTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WalletTransactionWhereInput | WalletTransactionWhereInput[]
    OR?: WalletTransactionWhereInput[]
    NOT?: WalletTransactionWhereInput | WalletTransactionWhereInput[]
    userId?: StringFilter<"WalletTransaction"> | string
    type?: EnumWalletTxTypeFilter<"WalletTransaction"> | $Enums.WalletTxType
    amount?: IntFilter<"WalletTransaction"> | number
    balanceAfter?: IntFilter<"WalletTransaction"> | number
    orderId?: StringNullableFilter<"WalletTransaction"> | string | null
    createdById?: StringNullableFilter<"WalletTransaction"> | string | null
    note?: StringNullableFilter<"WalletTransaction"> | string | null
    createdAt?: DateTimeFilter<"WalletTransaction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    order?: XOR<OrderNullableScalarRelationFilter, OrderWhereInput> | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type WalletTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    orderId?: SortOrderInput | SortOrder
    createdById?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: WalletTransactionCountOrderByAggregateInput
    _avg?: WalletTransactionAvgOrderByAggregateInput
    _max?: WalletTransactionMaxOrderByAggregateInput
    _min?: WalletTransactionMinOrderByAggregateInput
    _sum?: WalletTransactionSumOrderByAggregateInput
  }

  export type WalletTransactionScalarWhereWithAggregatesInput = {
    AND?: WalletTransactionScalarWhereWithAggregatesInput | WalletTransactionScalarWhereWithAggregatesInput[]
    OR?: WalletTransactionScalarWhereWithAggregatesInput[]
    NOT?: WalletTransactionScalarWhereWithAggregatesInput | WalletTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WalletTransaction"> | string
    userId?: StringWithAggregatesFilter<"WalletTransaction"> | string
    type?: EnumWalletTxTypeWithAggregatesFilter<"WalletTransaction"> | $Enums.WalletTxType
    amount?: IntWithAggregatesFilter<"WalletTransaction"> | number
    balanceAfter?: IntWithAggregatesFilter<"WalletTransaction"> | number
    orderId?: StringNullableWithAggregatesFilter<"WalletTransaction"> | string | null
    createdById?: StringNullableWithAggregatesFilter<"WalletTransaction"> | string | null
    note?: StringNullableWithAggregatesFilter<"WalletTransaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WalletTransaction"> | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    employeeId?: string | null
    phoneNumber?: string | null
    deskNumber?: string | null
    buildingNumber?: string | null
    floorNumber?: string | null
    paymentMode?: $Enums.PaymentMode
    balance?: number
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: LocationCreateNestedOneWithoutUsersInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    adminLocations?: AdminLocationCreateNestedManyWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    ordersPlaced?: OrderCreateNestedManyWithoutPlacedByInput
    walletTransactions?: WalletTransactionCreateNestedManyWithoutUserInput
    createdTransactions?: WalletTransactionCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    employeeId?: string | null
    phoneNumber?: string | null
    deskNumber?: string | null
    buildingNumber?: string | null
    floorNumber?: string | null
    locationId?: string | null
    paymentMode?: $Enums.PaymentMode
    balance?: number
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    adminLocations?: AdminLocationUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    ordersPlaced?: OrderUncheckedCreateNestedManyWithoutPlacedByInput
    walletTransactions?: WalletTransactionUncheckedCreateNestedManyWithoutUserInput
    createdTransactions?: WalletTransactionUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneWithoutUsersNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    adminLocations?: AdminLocationUpdateManyWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    ordersPlaced?: OrderUpdateManyWithoutPlacedByNestedInput
    walletTransactions?: WalletTransactionUpdateManyWithoutUserNestedInput
    createdTransactions?: WalletTransactionUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    adminLocations?: AdminLocationUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    ordersPlaced?: OrderUncheckedUpdateManyWithoutPlacedByNestedInput
    walletTransactions?: WalletTransactionUncheckedUpdateManyWithoutUserNestedInput
    createdTransactions?: WalletTransactionUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    employeeId?: string | null
    phoneNumber?: string | null
    deskNumber?: string | null
    buildingNumber?: string | null
    floorNumber?: string | null
    locationId?: string | null
    paymentMode?: $Enums.PaymentMode
    balance?: number
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationCreateInput = {
    id?: string
    name: string
    address?: string | null
    defaultCutoffTime?: string
    dinnerEnabled?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutLocationInput
    adminLocations?: AdminLocationCreateNestedManyWithoutLocationInput
    dailyMenus?: DailyMenuCreateNestedManyWithoutLocationInput
    weekdayMenus?: WeekdayMenuCreateNestedManyWithoutLocationInput
    orders?: OrderCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateInput = {
    id?: string
    name: string
    address?: string | null
    defaultCutoffTime?: string
    dinnerEnabled?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutLocationInput
    adminLocations?: AdminLocationUncheckedCreateNestedManyWithoutLocationInput
    dailyMenus?: DailyMenuUncheckedCreateNestedManyWithoutLocationInput
    weekdayMenus?: WeekdayMenuUncheckedCreateNestedManyWithoutLocationInput
    orders?: OrderUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    defaultCutoffTime?: StringFieldUpdateOperationsInput | string
    dinnerEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutLocationNestedInput
    adminLocations?: AdminLocationUpdateManyWithoutLocationNestedInput
    dailyMenus?: DailyMenuUpdateManyWithoutLocationNestedInput
    weekdayMenus?: WeekdayMenuUpdateManyWithoutLocationNestedInput
    orders?: OrderUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    defaultCutoffTime?: StringFieldUpdateOperationsInput | string
    dinnerEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutLocationNestedInput
    adminLocations?: AdminLocationUncheckedUpdateManyWithoutLocationNestedInput
    dailyMenus?: DailyMenuUncheckedUpdateManyWithoutLocationNestedInput
    weekdayMenus?: WeekdayMenuUncheckedUpdateManyWithoutLocationNestedInput
    orders?: OrderUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type LocationCreateManyInput = {
    id?: string
    name: string
    address?: string | null
    defaultCutoffTime?: string
    dinnerEnabled?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    defaultCutoffTime?: StringFieldUpdateOperationsInput | string
    dinnerEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    defaultCutoffTime?: StringFieldUpdateOperationsInput | string
    dinnerEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminLocationCreateInput = {
    id?: string
    user: UserCreateNestedOneWithoutAdminLocationsInput
    location: LocationCreateNestedOneWithoutAdminLocationsInput
  }

  export type AdminLocationUncheckedCreateInput = {
    id?: string
    userId: string
    locationId: string
  }

  export type AdminLocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutAdminLocationsNestedInput
    location?: LocationUpdateOneRequiredWithoutAdminLocationsNestedInput
  }

  export type AdminLocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
  }

  export type AdminLocationCreateManyInput = {
    id?: string
    userId: string
    locationId: string
  }

  export type AdminLocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type AdminLocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
  }

  export type MealCatalogCreateInput = {
    id?: string
    name: string
    description?: string | null
    imageUrl?: string | null
    defaultPrice: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dailyMenus?: DailyMenuCreateNestedManyWithoutCatalogItemInput
    weekdayMenus?: WeekdayMenuCreateNestedManyWithoutCatalogItemInput
  }

  export type MealCatalogUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    imageUrl?: string | null
    defaultPrice: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dailyMenus?: DailyMenuUncheckedCreateNestedManyWithoutCatalogItemInput
    weekdayMenus?: WeekdayMenuUncheckedCreateNestedManyWithoutCatalogItemInput
  }

  export type MealCatalogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultPrice?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyMenus?: DailyMenuUpdateManyWithoutCatalogItemNestedInput
    weekdayMenus?: WeekdayMenuUpdateManyWithoutCatalogItemNestedInput
  }

  export type MealCatalogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultPrice?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyMenus?: DailyMenuUncheckedUpdateManyWithoutCatalogItemNestedInput
    weekdayMenus?: WeekdayMenuUncheckedUpdateManyWithoutCatalogItemNestedInput
  }

  export type MealCatalogCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    imageUrl?: string | null
    defaultPrice: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MealCatalogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultPrice?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MealCatalogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultPrice?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeekdayMenuCreateInput = {
    id?: string
    weekday: $Enums.Weekday
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    location: LocationCreateNestedOneWithoutWeekdayMenusInput
    catalogItem?: MealCatalogCreateNestedOneWithoutWeekdayMenusInput
    dailyMenus?: DailyMenuCreateNestedManyWithoutSourceWeekdayMenuInput
  }

  export type WeekdayMenuUncheckedCreateInput = {
    id?: string
    locationId: string
    weekday: $Enums.Weekday
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    catalogItemId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dailyMenus?: DailyMenuUncheckedCreateNestedManyWithoutSourceWeekdayMenuInput
  }

  export type WeekdayMenuUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekday?: EnumWeekdayFieldUpdateOperationsInput | $Enums.Weekday
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneRequiredWithoutWeekdayMenusNestedInput
    catalogItem?: MealCatalogUpdateOneWithoutWeekdayMenusNestedInput
    dailyMenus?: DailyMenuUpdateManyWithoutSourceWeekdayMenuNestedInput
  }

  export type WeekdayMenuUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    weekday?: EnumWeekdayFieldUpdateOperationsInput | $Enums.Weekday
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    catalogItemId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyMenus?: DailyMenuUncheckedUpdateManyWithoutSourceWeekdayMenuNestedInput
  }

  export type WeekdayMenuCreateManyInput = {
    id?: string
    locationId: string
    weekday: $Enums.Weekday
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    catalogItemId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeekdayMenuUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekday?: EnumWeekdayFieldUpdateOperationsInput | $Enums.Weekday
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeekdayMenuUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    weekday?: EnumWeekdayFieldUpdateOperationsInput | $Enums.Weekday
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    catalogItemId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyMenuCreateInput = {
    id?: string
    date: Date | string
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    cutoffAt?: Date | string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    location: LocationCreateNestedOneWithoutDailyMenusInput
    catalogItem?: MealCatalogCreateNestedOneWithoutDailyMenusInput
    sourceWeekdayMenu?: WeekdayMenuCreateNestedOneWithoutDailyMenusInput
    orders?: OrderCreateNestedManyWithoutDailyMenuInput
  }

  export type DailyMenuUncheckedCreateInput = {
    id?: string
    locationId: string
    date: Date | string
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    catalogItemId?: string | null
    sourceWeekdayMenuId?: string | null
    cutoffAt?: Date | string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutDailyMenuInput
  }

  export type DailyMenuUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cutoffAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneRequiredWithoutDailyMenusNestedInput
    catalogItem?: MealCatalogUpdateOneWithoutDailyMenusNestedInput
    sourceWeekdayMenu?: WeekdayMenuUpdateOneWithoutDailyMenusNestedInput
    orders?: OrderUpdateManyWithoutDailyMenuNestedInput
  }

  export type DailyMenuUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    catalogItemId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceWeekdayMenuId?: NullableStringFieldUpdateOperationsInput | string | null
    cutoffAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutDailyMenuNestedInput
  }

  export type DailyMenuCreateManyInput = {
    id?: string
    locationId: string
    date: Date | string
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    catalogItemId?: string | null
    sourceWeekdayMenuId?: string | null
    cutoffAt?: Date | string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyMenuUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cutoffAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyMenuUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    catalogItemId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceWeekdayMenuId?: NullableStringFieldUpdateOperationsInput | string | null
    cutoffAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    id?: string
    amount: number
    note?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    deliveredAt?: Date | string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOrdersInput
    placedBy?: UserCreateNestedOneWithoutOrdersPlacedInput
    dailyMenu: DailyMenuCreateNestedOneWithoutOrdersInput
    location: LocationCreateNestedOneWithoutOrdersInput
    walletTxs?: WalletTransactionCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    userId: string
    dailyMenuId: string
    locationId: string
    amount: number
    note?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    deliveredAt?: Date | string | null
    paidAt?: Date | string | null
    placedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    walletTxs?: WalletTransactionUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    placedBy?: UserUpdateOneWithoutOrdersPlacedNestedInput
    dailyMenu?: DailyMenuUpdateOneRequiredWithoutOrdersNestedInput
    location?: LocationUpdateOneRequiredWithoutOrdersNestedInput
    walletTxs?: WalletTransactionUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dailyMenuId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    placedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletTxs?: WalletTransactionUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    userId: string
    dailyMenuId: string
    locationId: string
    amount: number
    note?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    deliveredAt?: Date | string | null
    paidAt?: Date | string | null
    placedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dailyMenuId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    placedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletTransactionCreateInput = {
    id?: string
    type: $Enums.WalletTxType
    amount: number
    balanceAfter: number
    note?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutWalletTransactionsInput
    order?: OrderCreateNestedOneWithoutWalletTxsInput
    createdBy?: UserCreateNestedOneWithoutCreatedTransactionsInput
  }

  export type WalletTransactionUncheckedCreateInput = {
    id?: string
    userId: string
    type: $Enums.WalletTxType
    amount: number
    balanceAfter: number
    orderId?: string | null
    createdById?: string | null
    note?: string | null
    createdAt?: Date | string
  }

  export type WalletTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumWalletTxTypeFieldUpdateOperationsInput | $Enums.WalletTxType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWalletTransactionsNestedInput
    order?: OrderUpdateOneWithoutWalletTxsNestedInput
    createdBy?: UserUpdateOneWithoutCreatedTransactionsNestedInput
  }

  export type WalletTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumWalletTxTypeFieldUpdateOperationsInput | $Enums.WalletTxType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletTransactionCreateManyInput = {
    id?: string
    userId: string
    type: $Enums.WalletTxType
    amount: number
    balanceAfter: number
    orderId?: string | null
    createdById?: string | null
    note?: string | null
    createdAt?: Date | string
  }

  export type WalletTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumWalletTxTypeFieldUpdateOperationsInput | $Enums.WalletTxType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumWalletTxTypeFieldUpdateOperationsInput | $Enums.WalletTxType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type EnumPaymentModeFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMode | EnumPaymentModeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMode[] | ListEnumPaymentModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMode[] | ListEnumPaymentModeFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentModeFilter<$PrismaModel> | $Enums.PaymentMode
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type LocationNullableScalarRelationFilter = {
    is?: LocationWhereInput | null
    isNot?: LocationWhereInput | null
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AdminLocationListRelationFilter = {
    every?: AdminLocationWhereInput
    some?: AdminLocationWhereInput
    none?: AdminLocationWhereInput
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type WalletTransactionListRelationFilter = {
    every?: WalletTransactionWhereInput
    some?: WalletTransactionWhereInput
    none?: WalletTransactionWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AdminLocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WalletTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    employeeId?: SortOrder
    phoneNumber?: SortOrder
    deskNumber?: SortOrder
    buildingNumber?: SortOrder
    floorNumber?: SortOrder
    locationId?: SortOrder
    paymentMode?: SortOrder
    balance?: SortOrder
    profileComplete?: SortOrder
    isBanned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    employeeId?: SortOrder
    phoneNumber?: SortOrder
    deskNumber?: SortOrder
    buildingNumber?: SortOrder
    floorNumber?: SortOrder
    locationId?: SortOrder
    paymentMode?: SortOrder
    balance?: SortOrder
    profileComplete?: SortOrder
    isBanned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    employeeId?: SortOrder
    phoneNumber?: SortOrder
    deskNumber?: SortOrder
    buildingNumber?: SortOrder
    floorNumber?: SortOrder
    locationId?: SortOrder
    paymentMode?: SortOrder
    balance?: SortOrder
    profileComplete?: SortOrder
    isBanned?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type EnumPaymentModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMode | EnumPaymentModeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMode[] | ListEnumPaymentModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMode[] | ListEnumPaymentModeFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentModeWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentModeFilter<$PrismaModel>
    _max?: NestedEnumPaymentModeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type DailyMenuListRelationFilter = {
    every?: DailyMenuWhereInput
    some?: DailyMenuWhereInput
    none?: DailyMenuWhereInput
  }

  export type WeekdayMenuListRelationFilter = {
    every?: WeekdayMenuWhereInput
    some?: WeekdayMenuWhereInput
    none?: WeekdayMenuWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DailyMenuOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WeekdayMenuOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LocationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    defaultCutoffTime?: SortOrder
    dinnerEnabled?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LocationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    defaultCutoffTime?: SortOrder
    dinnerEnabled?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LocationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    defaultCutoffTime?: SortOrder
    dinnerEnabled?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LocationScalarRelationFilter = {
    is?: LocationWhereInput
    isNot?: LocationWhereInput
  }

  export type AdminLocationUserIdLocationIdCompoundUniqueInput = {
    userId: string
    locationId: string
  }

  export type AdminLocationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    locationId?: SortOrder
  }

  export type AdminLocationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    locationId?: SortOrder
  }

  export type AdminLocationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    locationId?: SortOrder
  }

  export type MealCatalogCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    defaultPrice?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MealCatalogAvgOrderByAggregateInput = {
    defaultPrice?: SortOrder
  }

  export type MealCatalogMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    defaultPrice?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MealCatalogMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    defaultPrice?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MealCatalogSumOrderByAggregateInput = {
    defaultPrice?: SortOrder
  }

  export type EnumWeekdayFilter<$PrismaModel = never> = {
    equals?: $Enums.Weekday | EnumWeekdayFieldRefInput<$PrismaModel>
    in?: $Enums.Weekday[] | ListEnumWeekdayFieldRefInput<$PrismaModel>
    notIn?: $Enums.Weekday[] | ListEnumWeekdayFieldRefInput<$PrismaModel>
    not?: NestedEnumWeekdayFilter<$PrismaModel> | $Enums.Weekday
  }

  export type EnumMealSlotFilter<$PrismaModel = never> = {
    equals?: $Enums.MealSlot | EnumMealSlotFieldRefInput<$PrismaModel>
    in?: $Enums.MealSlot[] | ListEnumMealSlotFieldRefInput<$PrismaModel>
    notIn?: $Enums.MealSlot[] | ListEnumMealSlotFieldRefInput<$PrismaModel>
    not?: NestedEnumMealSlotFilter<$PrismaModel> | $Enums.MealSlot
  }

  export type MealCatalogNullableScalarRelationFilter = {
    is?: MealCatalogWhereInput | null
    isNot?: MealCatalogWhereInput | null
  }

  export type WeekdayMenuCountOrderByAggregateInput = {
    id?: SortOrder
    locationId?: SortOrder
    weekday?: SortOrder
    slot?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    imageUrl?: SortOrder
    catalogItemId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeekdayMenuAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type WeekdayMenuMaxOrderByAggregateInput = {
    id?: SortOrder
    locationId?: SortOrder
    weekday?: SortOrder
    slot?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    imageUrl?: SortOrder
    catalogItemId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeekdayMenuMinOrderByAggregateInput = {
    id?: SortOrder
    locationId?: SortOrder
    weekday?: SortOrder
    slot?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    imageUrl?: SortOrder
    catalogItemId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WeekdayMenuSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type EnumWeekdayWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Weekday | EnumWeekdayFieldRefInput<$PrismaModel>
    in?: $Enums.Weekday[] | ListEnumWeekdayFieldRefInput<$PrismaModel>
    notIn?: $Enums.Weekday[] | ListEnumWeekdayFieldRefInput<$PrismaModel>
    not?: NestedEnumWeekdayWithAggregatesFilter<$PrismaModel> | $Enums.Weekday
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWeekdayFilter<$PrismaModel>
    _max?: NestedEnumWeekdayFilter<$PrismaModel>
  }

  export type EnumMealSlotWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MealSlot | EnumMealSlotFieldRefInput<$PrismaModel>
    in?: $Enums.MealSlot[] | ListEnumMealSlotFieldRefInput<$PrismaModel>
    notIn?: $Enums.MealSlot[] | ListEnumMealSlotFieldRefInput<$PrismaModel>
    not?: NestedEnumMealSlotWithAggregatesFilter<$PrismaModel> | $Enums.MealSlot
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMealSlotFilter<$PrismaModel>
    _max?: NestedEnumMealSlotFilter<$PrismaModel>
  }

  export type WeekdayMenuNullableScalarRelationFilter = {
    is?: WeekdayMenuWhereInput | null
    isNot?: WeekdayMenuWhereInput | null
  }

  export type DailyMenuDateSourceWeekdayMenuIdCompoundUniqueInput = {
    date: Date | string
    sourceWeekdayMenuId: string
  }

  export type DailyMenuCountOrderByAggregateInput = {
    id?: SortOrder
    locationId?: SortOrder
    date?: SortOrder
    slot?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    imageUrl?: SortOrder
    catalogItemId?: SortOrder
    sourceWeekdayMenuId?: SortOrder
    cutoffAt?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyMenuAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type DailyMenuMaxOrderByAggregateInput = {
    id?: SortOrder
    locationId?: SortOrder
    date?: SortOrder
    slot?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    imageUrl?: SortOrder
    catalogItemId?: SortOrder
    sourceWeekdayMenuId?: SortOrder
    cutoffAt?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyMenuMinOrderByAggregateInput = {
    id?: SortOrder
    locationId?: SortOrder
    date?: SortOrder
    slot?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    imageUrl?: SortOrder
    catalogItemId?: SortOrder
    sourceWeekdayMenuId?: SortOrder
    cutoffAt?: SortOrder
    isPublished?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyMenuSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type DailyMenuScalarRelationFilter = {
    is?: DailyMenuWhereInput
    isNot?: DailyMenuWhereInput
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dailyMenuId?: SortOrder
    locationId?: SortOrder
    amount?: SortOrder
    note?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    deliveredAt?: SortOrder
    paidAt?: SortOrder
    placedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dailyMenuId?: SortOrder
    locationId?: SortOrder
    amount?: SortOrder
    note?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    deliveredAt?: SortOrder
    paidAt?: SortOrder
    placedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    dailyMenuId?: SortOrder
    locationId?: SortOrder
    amount?: SortOrder
    note?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    deliveredAt?: SortOrder
    paidAt?: SortOrder
    placedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type EnumWalletTxTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletTxType | EnumWalletTxTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WalletTxType[] | ListEnumWalletTxTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WalletTxType[] | ListEnumWalletTxTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWalletTxTypeFilter<$PrismaModel> | $Enums.WalletTxType
  }

  export type OrderNullableScalarRelationFilter = {
    is?: OrderWhereInput | null
    isNot?: OrderWhereInput | null
  }

  export type WalletTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    orderId?: SortOrder
    createdById?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type WalletTransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
    balanceAfter?: SortOrder
  }

  export type WalletTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    orderId?: SortOrder
    createdById?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type WalletTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    orderId?: SortOrder
    createdById?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type WalletTransactionSumOrderByAggregateInput = {
    amount?: SortOrder
    balanceAfter?: SortOrder
  }

  export type EnumWalletTxTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletTxType | EnumWalletTxTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WalletTxType[] | ListEnumWalletTxTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WalletTxType[] | ListEnumWalletTxTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWalletTxTypeWithAggregatesFilter<$PrismaModel> | $Enums.WalletTxType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWalletTxTypeFilter<$PrismaModel>
    _max?: NestedEnumWalletTxTypeFilter<$PrismaModel>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type LocationCreateNestedOneWithoutUsersInput = {
    create?: XOR<LocationCreateWithoutUsersInput, LocationUncheckedCreateWithoutUsersInput>
    connectOrCreate?: LocationCreateOrConnectWithoutUsersInput
    connect?: LocationWhereUniqueInput
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AdminLocationCreateNestedManyWithoutUserInput = {
    create?: XOR<AdminLocationCreateWithoutUserInput, AdminLocationUncheckedCreateWithoutUserInput> | AdminLocationCreateWithoutUserInput[] | AdminLocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AdminLocationCreateOrConnectWithoutUserInput | AdminLocationCreateOrConnectWithoutUserInput[]
    createMany?: AdminLocationCreateManyUserInputEnvelope
    connect?: AdminLocationWhereUniqueInput | AdminLocationWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutPlacedByInput = {
    create?: XOR<OrderCreateWithoutPlacedByInput, OrderUncheckedCreateWithoutPlacedByInput> | OrderCreateWithoutPlacedByInput[] | OrderUncheckedCreateWithoutPlacedByInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutPlacedByInput | OrderCreateOrConnectWithoutPlacedByInput[]
    createMany?: OrderCreateManyPlacedByInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type WalletTransactionCreateNestedManyWithoutUserInput = {
    create?: XOR<WalletTransactionCreateWithoutUserInput, WalletTransactionUncheckedCreateWithoutUserInput> | WalletTransactionCreateWithoutUserInput[] | WalletTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletTransactionCreateOrConnectWithoutUserInput | WalletTransactionCreateOrConnectWithoutUserInput[]
    createMany?: WalletTransactionCreateManyUserInputEnvelope
    connect?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
  }

  export type WalletTransactionCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<WalletTransactionCreateWithoutCreatedByInput, WalletTransactionUncheckedCreateWithoutCreatedByInput> | WalletTransactionCreateWithoutCreatedByInput[] | WalletTransactionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: WalletTransactionCreateOrConnectWithoutCreatedByInput | WalletTransactionCreateOrConnectWithoutCreatedByInput[]
    createMany?: WalletTransactionCreateManyCreatedByInputEnvelope
    connect?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AdminLocationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AdminLocationCreateWithoutUserInput, AdminLocationUncheckedCreateWithoutUserInput> | AdminLocationCreateWithoutUserInput[] | AdminLocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AdminLocationCreateOrConnectWithoutUserInput | AdminLocationCreateOrConnectWithoutUserInput[]
    createMany?: AdminLocationCreateManyUserInputEnvelope
    connect?: AdminLocationWhereUniqueInput | AdminLocationWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutPlacedByInput = {
    create?: XOR<OrderCreateWithoutPlacedByInput, OrderUncheckedCreateWithoutPlacedByInput> | OrderCreateWithoutPlacedByInput[] | OrderUncheckedCreateWithoutPlacedByInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutPlacedByInput | OrderCreateOrConnectWithoutPlacedByInput[]
    createMany?: OrderCreateManyPlacedByInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type WalletTransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WalletTransactionCreateWithoutUserInput, WalletTransactionUncheckedCreateWithoutUserInput> | WalletTransactionCreateWithoutUserInput[] | WalletTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletTransactionCreateOrConnectWithoutUserInput | WalletTransactionCreateOrConnectWithoutUserInput[]
    createMany?: WalletTransactionCreateManyUserInputEnvelope
    connect?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
  }

  export type WalletTransactionUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<WalletTransactionCreateWithoutCreatedByInput, WalletTransactionUncheckedCreateWithoutCreatedByInput> | WalletTransactionCreateWithoutCreatedByInput[] | WalletTransactionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: WalletTransactionCreateOrConnectWithoutCreatedByInput | WalletTransactionCreateOrConnectWithoutCreatedByInput[]
    createMany?: WalletTransactionCreateManyCreatedByInputEnvelope
    connect?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type EnumPaymentModeFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMode
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type LocationUpdateOneWithoutUsersNestedInput = {
    create?: XOR<LocationCreateWithoutUsersInput, LocationUncheckedCreateWithoutUsersInput>
    connectOrCreate?: LocationCreateOrConnectWithoutUsersInput
    upsert?: LocationUpsertWithoutUsersInput
    disconnect?: LocationWhereInput | boolean
    delete?: LocationWhereInput | boolean
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutUsersInput, LocationUpdateWithoutUsersInput>, LocationUncheckedUpdateWithoutUsersInput>
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AdminLocationUpdateManyWithoutUserNestedInput = {
    create?: XOR<AdminLocationCreateWithoutUserInput, AdminLocationUncheckedCreateWithoutUserInput> | AdminLocationCreateWithoutUserInput[] | AdminLocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AdminLocationCreateOrConnectWithoutUserInput | AdminLocationCreateOrConnectWithoutUserInput[]
    upsert?: AdminLocationUpsertWithWhereUniqueWithoutUserInput | AdminLocationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AdminLocationCreateManyUserInputEnvelope
    set?: AdminLocationWhereUniqueInput | AdminLocationWhereUniqueInput[]
    disconnect?: AdminLocationWhereUniqueInput | AdminLocationWhereUniqueInput[]
    delete?: AdminLocationWhereUniqueInput | AdminLocationWhereUniqueInput[]
    connect?: AdminLocationWhereUniqueInput | AdminLocationWhereUniqueInput[]
    update?: AdminLocationUpdateWithWhereUniqueWithoutUserInput | AdminLocationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AdminLocationUpdateManyWithWhereWithoutUserInput | AdminLocationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AdminLocationScalarWhereInput | AdminLocationScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutPlacedByNestedInput = {
    create?: XOR<OrderCreateWithoutPlacedByInput, OrderUncheckedCreateWithoutPlacedByInput> | OrderCreateWithoutPlacedByInput[] | OrderUncheckedCreateWithoutPlacedByInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutPlacedByInput | OrderCreateOrConnectWithoutPlacedByInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutPlacedByInput | OrderUpsertWithWhereUniqueWithoutPlacedByInput[]
    createMany?: OrderCreateManyPlacedByInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutPlacedByInput | OrderUpdateWithWhereUniqueWithoutPlacedByInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutPlacedByInput | OrderUpdateManyWithWhereWithoutPlacedByInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type WalletTransactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<WalletTransactionCreateWithoutUserInput, WalletTransactionUncheckedCreateWithoutUserInput> | WalletTransactionCreateWithoutUserInput[] | WalletTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletTransactionCreateOrConnectWithoutUserInput | WalletTransactionCreateOrConnectWithoutUserInput[]
    upsert?: WalletTransactionUpsertWithWhereUniqueWithoutUserInput | WalletTransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WalletTransactionCreateManyUserInputEnvelope
    set?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    disconnect?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    delete?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    connect?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    update?: WalletTransactionUpdateWithWhereUniqueWithoutUserInput | WalletTransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WalletTransactionUpdateManyWithWhereWithoutUserInput | WalletTransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WalletTransactionScalarWhereInput | WalletTransactionScalarWhereInput[]
  }

  export type WalletTransactionUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<WalletTransactionCreateWithoutCreatedByInput, WalletTransactionUncheckedCreateWithoutCreatedByInput> | WalletTransactionCreateWithoutCreatedByInput[] | WalletTransactionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: WalletTransactionCreateOrConnectWithoutCreatedByInput | WalletTransactionCreateOrConnectWithoutCreatedByInput[]
    upsert?: WalletTransactionUpsertWithWhereUniqueWithoutCreatedByInput | WalletTransactionUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: WalletTransactionCreateManyCreatedByInputEnvelope
    set?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    disconnect?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    delete?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    connect?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    update?: WalletTransactionUpdateWithWhereUniqueWithoutCreatedByInput | WalletTransactionUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: WalletTransactionUpdateManyWithWhereWithoutCreatedByInput | WalletTransactionUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: WalletTransactionScalarWhereInput | WalletTransactionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AdminLocationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AdminLocationCreateWithoutUserInput, AdminLocationUncheckedCreateWithoutUserInput> | AdminLocationCreateWithoutUserInput[] | AdminLocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AdminLocationCreateOrConnectWithoutUserInput | AdminLocationCreateOrConnectWithoutUserInput[]
    upsert?: AdminLocationUpsertWithWhereUniqueWithoutUserInput | AdminLocationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AdminLocationCreateManyUserInputEnvelope
    set?: AdminLocationWhereUniqueInput | AdminLocationWhereUniqueInput[]
    disconnect?: AdminLocationWhereUniqueInput | AdminLocationWhereUniqueInput[]
    delete?: AdminLocationWhereUniqueInput | AdminLocationWhereUniqueInput[]
    connect?: AdminLocationWhereUniqueInput | AdminLocationWhereUniqueInput[]
    update?: AdminLocationUpdateWithWhereUniqueWithoutUserInput | AdminLocationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AdminLocationUpdateManyWithWhereWithoutUserInput | AdminLocationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AdminLocationScalarWhereInput | AdminLocationScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutPlacedByNestedInput = {
    create?: XOR<OrderCreateWithoutPlacedByInput, OrderUncheckedCreateWithoutPlacedByInput> | OrderCreateWithoutPlacedByInput[] | OrderUncheckedCreateWithoutPlacedByInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutPlacedByInput | OrderCreateOrConnectWithoutPlacedByInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutPlacedByInput | OrderUpsertWithWhereUniqueWithoutPlacedByInput[]
    createMany?: OrderCreateManyPlacedByInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutPlacedByInput | OrderUpdateWithWhereUniqueWithoutPlacedByInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutPlacedByInput | OrderUpdateManyWithWhereWithoutPlacedByInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type WalletTransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WalletTransactionCreateWithoutUserInput, WalletTransactionUncheckedCreateWithoutUserInput> | WalletTransactionCreateWithoutUserInput[] | WalletTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WalletTransactionCreateOrConnectWithoutUserInput | WalletTransactionCreateOrConnectWithoutUserInput[]
    upsert?: WalletTransactionUpsertWithWhereUniqueWithoutUserInput | WalletTransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WalletTransactionCreateManyUserInputEnvelope
    set?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    disconnect?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    delete?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    connect?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    update?: WalletTransactionUpdateWithWhereUniqueWithoutUserInput | WalletTransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WalletTransactionUpdateManyWithWhereWithoutUserInput | WalletTransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WalletTransactionScalarWhereInput | WalletTransactionScalarWhereInput[]
  }

  export type WalletTransactionUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<WalletTransactionCreateWithoutCreatedByInput, WalletTransactionUncheckedCreateWithoutCreatedByInput> | WalletTransactionCreateWithoutCreatedByInput[] | WalletTransactionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: WalletTransactionCreateOrConnectWithoutCreatedByInput | WalletTransactionCreateOrConnectWithoutCreatedByInput[]
    upsert?: WalletTransactionUpsertWithWhereUniqueWithoutCreatedByInput | WalletTransactionUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: WalletTransactionCreateManyCreatedByInputEnvelope
    set?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    disconnect?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    delete?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    connect?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    update?: WalletTransactionUpdateWithWhereUniqueWithoutCreatedByInput | WalletTransactionUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: WalletTransactionUpdateManyWithWhereWithoutCreatedByInput | WalletTransactionUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: WalletTransactionScalarWhereInput | WalletTransactionScalarWhereInput[]
  }

  export type UserCreateNestedManyWithoutLocationInput = {
    create?: XOR<UserCreateWithoutLocationInput, UserUncheckedCreateWithoutLocationInput> | UserCreateWithoutLocationInput[] | UserUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutLocationInput | UserCreateOrConnectWithoutLocationInput[]
    createMany?: UserCreateManyLocationInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type AdminLocationCreateNestedManyWithoutLocationInput = {
    create?: XOR<AdminLocationCreateWithoutLocationInput, AdminLocationUncheckedCreateWithoutLocationInput> | AdminLocationCreateWithoutLocationInput[] | AdminLocationUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: AdminLocationCreateOrConnectWithoutLocationInput | AdminLocationCreateOrConnectWithoutLocationInput[]
    createMany?: AdminLocationCreateManyLocationInputEnvelope
    connect?: AdminLocationWhereUniqueInput | AdminLocationWhereUniqueInput[]
  }

  export type DailyMenuCreateNestedManyWithoutLocationInput = {
    create?: XOR<DailyMenuCreateWithoutLocationInput, DailyMenuUncheckedCreateWithoutLocationInput> | DailyMenuCreateWithoutLocationInput[] | DailyMenuUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: DailyMenuCreateOrConnectWithoutLocationInput | DailyMenuCreateOrConnectWithoutLocationInput[]
    createMany?: DailyMenuCreateManyLocationInputEnvelope
    connect?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
  }

  export type WeekdayMenuCreateNestedManyWithoutLocationInput = {
    create?: XOR<WeekdayMenuCreateWithoutLocationInput, WeekdayMenuUncheckedCreateWithoutLocationInput> | WeekdayMenuCreateWithoutLocationInput[] | WeekdayMenuUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: WeekdayMenuCreateOrConnectWithoutLocationInput | WeekdayMenuCreateOrConnectWithoutLocationInput[]
    createMany?: WeekdayMenuCreateManyLocationInputEnvelope
    connect?: WeekdayMenuWhereUniqueInput | WeekdayMenuWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutLocationInput = {
    create?: XOR<OrderCreateWithoutLocationInput, OrderUncheckedCreateWithoutLocationInput> | OrderCreateWithoutLocationInput[] | OrderUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutLocationInput | OrderCreateOrConnectWithoutLocationInput[]
    createMany?: OrderCreateManyLocationInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<UserCreateWithoutLocationInput, UserUncheckedCreateWithoutLocationInput> | UserCreateWithoutLocationInput[] | UserUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutLocationInput | UserCreateOrConnectWithoutLocationInput[]
    createMany?: UserCreateManyLocationInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type AdminLocationUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<AdminLocationCreateWithoutLocationInput, AdminLocationUncheckedCreateWithoutLocationInput> | AdminLocationCreateWithoutLocationInput[] | AdminLocationUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: AdminLocationCreateOrConnectWithoutLocationInput | AdminLocationCreateOrConnectWithoutLocationInput[]
    createMany?: AdminLocationCreateManyLocationInputEnvelope
    connect?: AdminLocationWhereUniqueInput | AdminLocationWhereUniqueInput[]
  }

  export type DailyMenuUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<DailyMenuCreateWithoutLocationInput, DailyMenuUncheckedCreateWithoutLocationInput> | DailyMenuCreateWithoutLocationInput[] | DailyMenuUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: DailyMenuCreateOrConnectWithoutLocationInput | DailyMenuCreateOrConnectWithoutLocationInput[]
    createMany?: DailyMenuCreateManyLocationInputEnvelope
    connect?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
  }

  export type WeekdayMenuUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<WeekdayMenuCreateWithoutLocationInput, WeekdayMenuUncheckedCreateWithoutLocationInput> | WeekdayMenuCreateWithoutLocationInput[] | WeekdayMenuUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: WeekdayMenuCreateOrConnectWithoutLocationInput | WeekdayMenuCreateOrConnectWithoutLocationInput[]
    createMany?: WeekdayMenuCreateManyLocationInputEnvelope
    connect?: WeekdayMenuWhereUniqueInput | WeekdayMenuWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<OrderCreateWithoutLocationInput, OrderUncheckedCreateWithoutLocationInput> | OrderCreateWithoutLocationInput[] | OrderUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutLocationInput | OrderCreateOrConnectWithoutLocationInput[]
    createMany?: OrderCreateManyLocationInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutLocationNestedInput = {
    create?: XOR<UserCreateWithoutLocationInput, UserUncheckedCreateWithoutLocationInput> | UserCreateWithoutLocationInput[] | UserUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutLocationInput | UserCreateOrConnectWithoutLocationInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutLocationInput | UserUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: UserCreateManyLocationInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutLocationInput | UserUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: UserUpdateManyWithWhereWithoutLocationInput | UserUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type AdminLocationUpdateManyWithoutLocationNestedInput = {
    create?: XOR<AdminLocationCreateWithoutLocationInput, AdminLocationUncheckedCreateWithoutLocationInput> | AdminLocationCreateWithoutLocationInput[] | AdminLocationUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: AdminLocationCreateOrConnectWithoutLocationInput | AdminLocationCreateOrConnectWithoutLocationInput[]
    upsert?: AdminLocationUpsertWithWhereUniqueWithoutLocationInput | AdminLocationUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: AdminLocationCreateManyLocationInputEnvelope
    set?: AdminLocationWhereUniqueInput | AdminLocationWhereUniqueInput[]
    disconnect?: AdminLocationWhereUniqueInput | AdminLocationWhereUniqueInput[]
    delete?: AdminLocationWhereUniqueInput | AdminLocationWhereUniqueInput[]
    connect?: AdminLocationWhereUniqueInput | AdminLocationWhereUniqueInput[]
    update?: AdminLocationUpdateWithWhereUniqueWithoutLocationInput | AdminLocationUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: AdminLocationUpdateManyWithWhereWithoutLocationInput | AdminLocationUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: AdminLocationScalarWhereInput | AdminLocationScalarWhereInput[]
  }

  export type DailyMenuUpdateManyWithoutLocationNestedInput = {
    create?: XOR<DailyMenuCreateWithoutLocationInput, DailyMenuUncheckedCreateWithoutLocationInput> | DailyMenuCreateWithoutLocationInput[] | DailyMenuUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: DailyMenuCreateOrConnectWithoutLocationInput | DailyMenuCreateOrConnectWithoutLocationInput[]
    upsert?: DailyMenuUpsertWithWhereUniqueWithoutLocationInput | DailyMenuUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: DailyMenuCreateManyLocationInputEnvelope
    set?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    disconnect?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    delete?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    connect?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    update?: DailyMenuUpdateWithWhereUniqueWithoutLocationInput | DailyMenuUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: DailyMenuUpdateManyWithWhereWithoutLocationInput | DailyMenuUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: DailyMenuScalarWhereInput | DailyMenuScalarWhereInput[]
  }

  export type WeekdayMenuUpdateManyWithoutLocationNestedInput = {
    create?: XOR<WeekdayMenuCreateWithoutLocationInput, WeekdayMenuUncheckedCreateWithoutLocationInput> | WeekdayMenuCreateWithoutLocationInput[] | WeekdayMenuUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: WeekdayMenuCreateOrConnectWithoutLocationInput | WeekdayMenuCreateOrConnectWithoutLocationInput[]
    upsert?: WeekdayMenuUpsertWithWhereUniqueWithoutLocationInput | WeekdayMenuUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: WeekdayMenuCreateManyLocationInputEnvelope
    set?: WeekdayMenuWhereUniqueInput | WeekdayMenuWhereUniqueInput[]
    disconnect?: WeekdayMenuWhereUniqueInput | WeekdayMenuWhereUniqueInput[]
    delete?: WeekdayMenuWhereUniqueInput | WeekdayMenuWhereUniqueInput[]
    connect?: WeekdayMenuWhereUniqueInput | WeekdayMenuWhereUniqueInput[]
    update?: WeekdayMenuUpdateWithWhereUniqueWithoutLocationInput | WeekdayMenuUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: WeekdayMenuUpdateManyWithWhereWithoutLocationInput | WeekdayMenuUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: WeekdayMenuScalarWhereInput | WeekdayMenuScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutLocationNestedInput = {
    create?: XOR<OrderCreateWithoutLocationInput, OrderUncheckedCreateWithoutLocationInput> | OrderCreateWithoutLocationInput[] | OrderUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutLocationInput | OrderCreateOrConnectWithoutLocationInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutLocationInput | OrderUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: OrderCreateManyLocationInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutLocationInput | OrderUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutLocationInput | OrderUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<UserCreateWithoutLocationInput, UserUncheckedCreateWithoutLocationInput> | UserCreateWithoutLocationInput[] | UserUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutLocationInput | UserCreateOrConnectWithoutLocationInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutLocationInput | UserUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: UserCreateManyLocationInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutLocationInput | UserUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: UserUpdateManyWithWhereWithoutLocationInput | UserUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type AdminLocationUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<AdminLocationCreateWithoutLocationInput, AdminLocationUncheckedCreateWithoutLocationInput> | AdminLocationCreateWithoutLocationInput[] | AdminLocationUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: AdminLocationCreateOrConnectWithoutLocationInput | AdminLocationCreateOrConnectWithoutLocationInput[]
    upsert?: AdminLocationUpsertWithWhereUniqueWithoutLocationInput | AdminLocationUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: AdminLocationCreateManyLocationInputEnvelope
    set?: AdminLocationWhereUniqueInput | AdminLocationWhereUniqueInput[]
    disconnect?: AdminLocationWhereUniqueInput | AdminLocationWhereUniqueInput[]
    delete?: AdminLocationWhereUniqueInput | AdminLocationWhereUniqueInput[]
    connect?: AdminLocationWhereUniqueInput | AdminLocationWhereUniqueInput[]
    update?: AdminLocationUpdateWithWhereUniqueWithoutLocationInput | AdminLocationUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: AdminLocationUpdateManyWithWhereWithoutLocationInput | AdminLocationUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: AdminLocationScalarWhereInput | AdminLocationScalarWhereInput[]
  }

  export type DailyMenuUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<DailyMenuCreateWithoutLocationInput, DailyMenuUncheckedCreateWithoutLocationInput> | DailyMenuCreateWithoutLocationInput[] | DailyMenuUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: DailyMenuCreateOrConnectWithoutLocationInput | DailyMenuCreateOrConnectWithoutLocationInput[]
    upsert?: DailyMenuUpsertWithWhereUniqueWithoutLocationInput | DailyMenuUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: DailyMenuCreateManyLocationInputEnvelope
    set?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    disconnect?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    delete?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    connect?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    update?: DailyMenuUpdateWithWhereUniqueWithoutLocationInput | DailyMenuUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: DailyMenuUpdateManyWithWhereWithoutLocationInput | DailyMenuUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: DailyMenuScalarWhereInput | DailyMenuScalarWhereInput[]
  }

  export type WeekdayMenuUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<WeekdayMenuCreateWithoutLocationInput, WeekdayMenuUncheckedCreateWithoutLocationInput> | WeekdayMenuCreateWithoutLocationInput[] | WeekdayMenuUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: WeekdayMenuCreateOrConnectWithoutLocationInput | WeekdayMenuCreateOrConnectWithoutLocationInput[]
    upsert?: WeekdayMenuUpsertWithWhereUniqueWithoutLocationInput | WeekdayMenuUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: WeekdayMenuCreateManyLocationInputEnvelope
    set?: WeekdayMenuWhereUniqueInput | WeekdayMenuWhereUniqueInput[]
    disconnect?: WeekdayMenuWhereUniqueInput | WeekdayMenuWhereUniqueInput[]
    delete?: WeekdayMenuWhereUniqueInput | WeekdayMenuWhereUniqueInput[]
    connect?: WeekdayMenuWhereUniqueInput | WeekdayMenuWhereUniqueInput[]
    update?: WeekdayMenuUpdateWithWhereUniqueWithoutLocationInput | WeekdayMenuUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: WeekdayMenuUpdateManyWithWhereWithoutLocationInput | WeekdayMenuUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: WeekdayMenuScalarWhereInput | WeekdayMenuScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<OrderCreateWithoutLocationInput, OrderUncheckedCreateWithoutLocationInput> | OrderCreateWithoutLocationInput[] | OrderUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutLocationInput | OrderCreateOrConnectWithoutLocationInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutLocationInput | OrderUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: OrderCreateManyLocationInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutLocationInput | OrderUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutLocationInput | OrderUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAdminLocationsInput = {
    create?: XOR<UserCreateWithoutAdminLocationsInput, UserUncheckedCreateWithoutAdminLocationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminLocationsInput
    connect?: UserWhereUniqueInput
  }

  export type LocationCreateNestedOneWithoutAdminLocationsInput = {
    create?: XOR<LocationCreateWithoutAdminLocationsInput, LocationUncheckedCreateWithoutAdminLocationsInput>
    connectOrCreate?: LocationCreateOrConnectWithoutAdminLocationsInput
    connect?: LocationWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAdminLocationsNestedInput = {
    create?: XOR<UserCreateWithoutAdminLocationsInput, UserUncheckedCreateWithoutAdminLocationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminLocationsInput
    upsert?: UserUpsertWithoutAdminLocationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAdminLocationsInput, UserUpdateWithoutAdminLocationsInput>, UserUncheckedUpdateWithoutAdminLocationsInput>
  }

  export type LocationUpdateOneRequiredWithoutAdminLocationsNestedInput = {
    create?: XOR<LocationCreateWithoutAdminLocationsInput, LocationUncheckedCreateWithoutAdminLocationsInput>
    connectOrCreate?: LocationCreateOrConnectWithoutAdminLocationsInput
    upsert?: LocationUpsertWithoutAdminLocationsInput
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutAdminLocationsInput, LocationUpdateWithoutAdminLocationsInput>, LocationUncheckedUpdateWithoutAdminLocationsInput>
  }

  export type DailyMenuCreateNestedManyWithoutCatalogItemInput = {
    create?: XOR<DailyMenuCreateWithoutCatalogItemInput, DailyMenuUncheckedCreateWithoutCatalogItemInput> | DailyMenuCreateWithoutCatalogItemInput[] | DailyMenuUncheckedCreateWithoutCatalogItemInput[]
    connectOrCreate?: DailyMenuCreateOrConnectWithoutCatalogItemInput | DailyMenuCreateOrConnectWithoutCatalogItemInput[]
    createMany?: DailyMenuCreateManyCatalogItemInputEnvelope
    connect?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
  }

  export type WeekdayMenuCreateNestedManyWithoutCatalogItemInput = {
    create?: XOR<WeekdayMenuCreateWithoutCatalogItemInput, WeekdayMenuUncheckedCreateWithoutCatalogItemInput> | WeekdayMenuCreateWithoutCatalogItemInput[] | WeekdayMenuUncheckedCreateWithoutCatalogItemInput[]
    connectOrCreate?: WeekdayMenuCreateOrConnectWithoutCatalogItemInput | WeekdayMenuCreateOrConnectWithoutCatalogItemInput[]
    createMany?: WeekdayMenuCreateManyCatalogItemInputEnvelope
    connect?: WeekdayMenuWhereUniqueInput | WeekdayMenuWhereUniqueInput[]
  }

  export type DailyMenuUncheckedCreateNestedManyWithoutCatalogItemInput = {
    create?: XOR<DailyMenuCreateWithoutCatalogItemInput, DailyMenuUncheckedCreateWithoutCatalogItemInput> | DailyMenuCreateWithoutCatalogItemInput[] | DailyMenuUncheckedCreateWithoutCatalogItemInput[]
    connectOrCreate?: DailyMenuCreateOrConnectWithoutCatalogItemInput | DailyMenuCreateOrConnectWithoutCatalogItemInput[]
    createMany?: DailyMenuCreateManyCatalogItemInputEnvelope
    connect?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
  }

  export type WeekdayMenuUncheckedCreateNestedManyWithoutCatalogItemInput = {
    create?: XOR<WeekdayMenuCreateWithoutCatalogItemInput, WeekdayMenuUncheckedCreateWithoutCatalogItemInput> | WeekdayMenuCreateWithoutCatalogItemInput[] | WeekdayMenuUncheckedCreateWithoutCatalogItemInput[]
    connectOrCreate?: WeekdayMenuCreateOrConnectWithoutCatalogItemInput | WeekdayMenuCreateOrConnectWithoutCatalogItemInput[]
    createMany?: WeekdayMenuCreateManyCatalogItemInputEnvelope
    connect?: WeekdayMenuWhereUniqueInput | WeekdayMenuWhereUniqueInput[]
  }

  export type DailyMenuUpdateManyWithoutCatalogItemNestedInput = {
    create?: XOR<DailyMenuCreateWithoutCatalogItemInput, DailyMenuUncheckedCreateWithoutCatalogItemInput> | DailyMenuCreateWithoutCatalogItemInput[] | DailyMenuUncheckedCreateWithoutCatalogItemInput[]
    connectOrCreate?: DailyMenuCreateOrConnectWithoutCatalogItemInput | DailyMenuCreateOrConnectWithoutCatalogItemInput[]
    upsert?: DailyMenuUpsertWithWhereUniqueWithoutCatalogItemInput | DailyMenuUpsertWithWhereUniqueWithoutCatalogItemInput[]
    createMany?: DailyMenuCreateManyCatalogItemInputEnvelope
    set?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    disconnect?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    delete?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    connect?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    update?: DailyMenuUpdateWithWhereUniqueWithoutCatalogItemInput | DailyMenuUpdateWithWhereUniqueWithoutCatalogItemInput[]
    updateMany?: DailyMenuUpdateManyWithWhereWithoutCatalogItemInput | DailyMenuUpdateManyWithWhereWithoutCatalogItemInput[]
    deleteMany?: DailyMenuScalarWhereInput | DailyMenuScalarWhereInput[]
  }

  export type WeekdayMenuUpdateManyWithoutCatalogItemNestedInput = {
    create?: XOR<WeekdayMenuCreateWithoutCatalogItemInput, WeekdayMenuUncheckedCreateWithoutCatalogItemInput> | WeekdayMenuCreateWithoutCatalogItemInput[] | WeekdayMenuUncheckedCreateWithoutCatalogItemInput[]
    connectOrCreate?: WeekdayMenuCreateOrConnectWithoutCatalogItemInput | WeekdayMenuCreateOrConnectWithoutCatalogItemInput[]
    upsert?: WeekdayMenuUpsertWithWhereUniqueWithoutCatalogItemInput | WeekdayMenuUpsertWithWhereUniqueWithoutCatalogItemInput[]
    createMany?: WeekdayMenuCreateManyCatalogItemInputEnvelope
    set?: WeekdayMenuWhereUniqueInput | WeekdayMenuWhereUniqueInput[]
    disconnect?: WeekdayMenuWhereUniqueInput | WeekdayMenuWhereUniqueInput[]
    delete?: WeekdayMenuWhereUniqueInput | WeekdayMenuWhereUniqueInput[]
    connect?: WeekdayMenuWhereUniqueInput | WeekdayMenuWhereUniqueInput[]
    update?: WeekdayMenuUpdateWithWhereUniqueWithoutCatalogItemInput | WeekdayMenuUpdateWithWhereUniqueWithoutCatalogItemInput[]
    updateMany?: WeekdayMenuUpdateManyWithWhereWithoutCatalogItemInput | WeekdayMenuUpdateManyWithWhereWithoutCatalogItemInput[]
    deleteMany?: WeekdayMenuScalarWhereInput | WeekdayMenuScalarWhereInput[]
  }

  export type DailyMenuUncheckedUpdateManyWithoutCatalogItemNestedInput = {
    create?: XOR<DailyMenuCreateWithoutCatalogItemInput, DailyMenuUncheckedCreateWithoutCatalogItemInput> | DailyMenuCreateWithoutCatalogItemInput[] | DailyMenuUncheckedCreateWithoutCatalogItemInput[]
    connectOrCreate?: DailyMenuCreateOrConnectWithoutCatalogItemInput | DailyMenuCreateOrConnectWithoutCatalogItemInput[]
    upsert?: DailyMenuUpsertWithWhereUniqueWithoutCatalogItemInput | DailyMenuUpsertWithWhereUniqueWithoutCatalogItemInput[]
    createMany?: DailyMenuCreateManyCatalogItemInputEnvelope
    set?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    disconnect?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    delete?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    connect?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    update?: DailyMenuUpdateWithWhereUniqueWithoutCatalogItemInput | DailyMenuUpdateWithWhereUniqueWithoutCatalogItemInput[]
    updateMany?: DailyMenuUpdateManyWithWhereWithoutCatalogItemInput | DailyMenuUpdateManyWithWhereWithoutCatalogItemInput[]
    deleteMany?: DailyMenuScalarWhereInput | DailyMenuScalarWhereInput[]
  }

  export type WeekdayMenuUncheckedUpdateManyWithoutCatalogItemNestedInput = {
    create?: XOR<WeekdayMenuCreateWithoutCatalogItemInput, WeekdayMenuUncheckedCreateWithoutCatalogItemInput> | WeekdayMenuCreateWithoutCatalogItemInput[] | WeekdayMenuUncheckedCreateWithoutCatalogItemInput[]
    connectOrCreate?: WeekdayMenuCreateOrConnectWithoutCatalogItemInput | WeekdayMenuCreateOrConnectWithoutCatalogItemInput[]
    upsert?: WeekdayMenuUpsertWithWhereUniqueWithoutCatalogItemInput | WeekdayMenuUpsertWithWhereUniqueWithoutCatalogItemInput[]
    createMany?: WeekdayMenuCreateManyCatalogItemInputEnvelope
    set?: WeekdayMenuWhereUniqueInput | WeekdayMenuWhereUniqueInput[]
    disconnect?: WeekdayMenuWhereUniqueInput | WeekdayMenuWhereUniqueInput[]
    delete?: WeekdayMenuWhereUniqueInput | WeekdayMenuWhereUniqueInput[]
    connect?: WeekdayMenuWhereUniqueInput | WeekdayMenuWhereUniqueInput[]
    update?: WeekdayMenuUpdateWithWhereUniqueWithoutCatalogItemInput | WeekdayMenuUpdateWithWhereUniqueWithoutCatalogItemInput[]
    updateMany?: WeekdayMenuUpdateManyWithWhereWithoutCatalogItemInput | WeekdayMenuUpdateManyWithWhereWithoutCatalogItemInput[]
    deleteMany?: WeekdayMenuScalarWhereInput | WeekdayMenuScalarWhereInput[]
  }

  export type LocationCreateNestedOneWithoutWeekdayMenusInput = {
    create?: XOR<LocationCreateWithoutWeekdayMenusInput, LocationUncheckedCreateWithoutWeekdayMenusInput>
    connectOrCreate?: LocationCreateOrConnectWithoutWeekdayMenusInput
    connect?: LocationWhereUniqueInput
  }

  export type MealCatalogCreateNestedOneWithoutWeekdayMenusInput = {
    create?: XOR<MealCatalogCreateWithoutWeekdayMenusInput, MealCatalogUncheckedCreateWithoutWeekdayMenusInput>
    connectOrCreate?: MealCatalogCreateOrConnectWithoutWeekdayMenusInput
    connect?: MealCatalogWhereUniqueInput
  }

  export type DailyMenuCreateNestedManyWithoutSourceWeekdayMenuInput = {
    create?: XOR<DailyMenuCreateWithoutSourceWeekdayMenuInput, DailyMenuUncheckedCreateWithoutSourceWeekdayMenuInput> | DailyMenuCreateWithoutSourceWeekdayMenuInput[] | DailyMenuUncheckedCreateWithoutSourceWeekdayMenuInput[]
    connectOrCreate?: DailyMenuCreateOrConnectWithoutSourceWeekdayMenuInput | DailyMenuCreateOrConnectWithoutSourceWeekdayMenuInput[]
    createMany?: DailyMenuCreateManySourceWeekdayMenuInputEnvelope
    connect?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
  }

  export type DailyMenuUncheckedCreateNestedManyWithoutSourceWeekdayMenuInput = {
    create?: XOR<DailyMenuCreateWithoutSourceWeekdayMenuInput, DailyMenuUncheckedCreateWithoutSourceWeekdayMenuInput> | DailyMenuCreateWithoutSourceWeekdayMenuInput[] | DailyMenuUncheckedCreateWithoutSourceWeekdayMenuInput[]
    connectOrCreate?: DailyMenuCreateOrConnectWithoutSourceWeekdayMenuInput | DailyMenuCreateOrConnectWithoutSourceWeekdayMenuInput[]
    createMany?: DailyMenuCreateManySourceWeekdayMenuInputEnvelope
    connect?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
  }

  export type EnumWeekdayFieldUpdateOperationsInput = {
    set?: $Enums.Weekday
  }

  export type EnumMealSlotFieldUpdateOperationsInput = {
    set?: $Enums.MealSlot
  }

  export type LocationUpdateOneRequiredWithoutWeekdayMenusNestedInput = {
    create?: XOR<LocationCreateWithoutWeekdayMenusInput, LocationUncheckedCreateWithoutWeekdayMenusInput>
    connectOrCreate?: LocationCreateOrConnectWithoutWeekdayMenusInput
    upsert?: LocationUpsertWithoutWeekdayMenusInput
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutWeekdayMenusInput, LocationUpdateWithoutWeekdayMenusInput>, LocationUncheckedUpdateWithoutWeekdayMenusInput>
  }

  export type MealCatalogUpdateOneWithoutWeekdayMenusNestedInput = {
    create?: XOR<MealCatalogCreateWithoutWeekdayMenusInput, MealCatalogUncheckedCreateWithoutWeekdayMenusInput>
    connectOrCreate?: MealCatalogCreateOrConnectWithoutWeekdayMenusInput
    upsert?: MealCatalogUpsertWithoutWeekdayMenusInput
    disconnect?: MealCatalogWhereInput | boolean
    delete?: MealCatalogWhereInput | boolean
    connect?: MealCatalogWhereUniqueInput
    update?: XOR<XOR<MealCatalogUpdateToOneWithWhereWithoutWeekdayMenusInput, MealCatalogUpdateWithoutWeekdayMenusInput>, MealCatalogUncheckedUpdateWithoutWeekdayMenusInput>
  }

  export type DailyMenuUpdateManyWithoutSourceWeekdayMenuNestedInput = {
    create?: XOR<DailyMenuCreateWithoutSourceWeekdayMenuInput, DailyMenuUncheckedCreateWithoutSourceWeekdayMenuInput> | DailyMenuCreateWithoutSourceWeekdayMenuInput[] | DailyMenuUncheckedCreateWithoutSourceWeekdayMenuInput[]
    connectOrCreate?: DailyMenuCreateOrConnectWithoutSourceWeekdayMenuInput | DailyMenuCreateOrConnectWithoutSourceWeekdayMenuInput[]
    upsert?: DailyMenuUpsertWithWhereUniqueWithoutSourceWeekdayMenuInput | DailyMenuUpsertWithWhereUniqueWithoutSourceWeekdayMenuInput[]
    createMany?: DailyMenuCreateManySourceWeekdayMenuInputEnvelope
    set?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    disconnect?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    delete?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    connect?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    update?: DailyMenuUpdateWithWhereUniqueWithoutSourceWeekdayMenuInput | DailyMenuUpdateWithWhereUniqueWithoutSourceWeekdayMenuInput[]
    updateMany?: DailyMenuUpdateManyWithWhereWithoutSourceWeekdayMenuInput | DailyMenuUpdateManyWithWhereWithoutSourceWeekdayMenuInput[]
    deleteMany?: DailyMenuScalarWhereInput | DailyMenuScalarWhereInput[]
  }

  export type DailyMenuUncheckedUpdateManyWithoutSourceWeekdayMenuNestedInput = {
    create?: XOR<DailyMenuCreateWithoutSourceWeekdayMenuInput, DailyMenuUncheckedCreateWithoutSourceWeekdayMenuInput> | DailyMenuCreateWithoutSourceWeekdayMenuInput[] | DailyMenuUncheckedCreateWithoutSourceWeekdayMenuInput[]
    connectOrCreate?: DailyMenuCreateOrConnectWithoutSourceWeekdayMenuInput | DailyMenuCreateOrConnectWithoutSourceWeekdayMenuInput[]
    upsert?: DailyMenuUpsertWithWhereUniqueWithoutSourceWeekdayMenuInput | DailyMenuUpsertWithWhereUniqueWithoutSourceWeekdayMenuInput[]
    createMany?: DailyMenuCreateManySourceWeekdayMenuInputEnvelope
    set?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    disconnect?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    delete?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    connect?: DailyMenuWhereUniqueInput | DailyMenuWhereUniqueInput[]
    update?: DailyMenuUpdateWithWhereUniqueWithoutSourceWeekdayMenuInput | DailyMenuUpdateWithWhereUniqueWithoutSourceWeekdayMenuInput[]
    updateMany?: DailyMenuUpdateManyWithWhereWithoutSourceWeekdayMenuInput | DailyMenuUpdateManyWithWhereWithoutSourceWeekdayMenuInput[]
    deleteMany?: DailyMenuScalarWhereInput | DailyMenuScalarWhereInput[]
  }

  export type LocationCreateNestedOneWithoutDailyMenusInput = {
    create?: XOR<LocationCreateWithoutDailyMenusInput, LocationUncheckedCreateWithoutDailyMenusInput>
    connectOrCreate?: LocationCreateOrConnectWithoutDailyMenusInput
    connect?: LocationWhereUniqueInput
  }

  export type MealCatalogCreateNestedOneWithoutDailyMenusInput = {
    create?: XOR<MealCatalogCreateWithoutDailyMenusInput, MealCatalogUncheckedCreateWithoutDailyMenusInput>
    connectOrCreate?: MealCatalogCreateOrConnectWithoutDailyMenusInput
    connect?: MealCatalogWhereUniqueInput
  }

  export type WeekdayMenuCreateNestedOneWithoutDailyMenusInput = {
    create?: XOR<WeekdayMenuCreateWithoutDailyMenusInput, WeekdayMenuUncheckedCreateWithoutDailyMenusInput>
    connectOrCreate?: WeekdayMenuCreateOrConnectWithoutDailyMenusInput
    connect?: WeekdayMenuWhereUniqueInput
  }

  export type OrderCreateNestedManyWithoutDailyMenuInput = {
    create?: XOR<OrderCreateWithoutDailyMenuInput, OrderUncheckedCreateWithoutDailyMenuInput> | OrderCreateWithoutDailyMenuInput[] | OrderUncheckedCreateWithoutDailyMenuInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutDailyMenuInput | OrderCreateOrConnectWithoutDailyMenuInput[]
    createMany?: OrderCreateManyDailyMenuInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutDailyMenuInput = {
    create?: XOR<OrderCreateWithoutDailyMenuInput, OrderUncheckedCreateWithoutDailyMenuInput> | OrderCreateWithoutDailyMenuInput[] | OrderUncheckedCreateWithoutDailyMenuInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutDailyMenuInput | OrderCreateOrConnectWithoutDailyMenuInput[]
    createMany?: OrderCreateManyDailyMenuInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type LocationUpdateOneRequiredWithoutDailyMenusNestedInput = {
    create?: XOR<LocationCreateWithoutDailyMenusInput, LocationUncheckedCreateWithoutDailyMenusInput>
    connectOrCreate?: LocationCreateOrConnectWithoutDailyMenusInput
    upsert?: LocationUpsertWithoutDailyMenusInput
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutDailyMenusInput, LocationUpdateWithoutDailyMenusInput>, LocationUncheckedUpdateWithoutDailyMenusInput>
  }

  export type MealCatalogUpdateOneWithoutDailyMenusNestedInput = {
    create?: XOR<MealCatalogCreateWithoutDailyMenusInput, MealCatalogUncheckedCreateWithoutDailyMenusInput>
    connectOrCreate?: MealCatalogCreateOrConnectWithoutDailyMenusInput
    upsert?: MealCatalogUpsertWithoutDailyMenusInput
    disconnect?: MealCatalogWhereInput | boolean
    delete?: MealCatalogWhereInput | boolean
    connect?: MealCatalogWhereUniqueInput
    update?: XOR<XOR<MealCatalogUpdateToOneWithWhereWithoutDailyMenusInput, MealCatalogUpdateWithoutDailyMenusInput>, MealCatalogUncheckedUpdateWithoutDailyMenusInput>
  }

  export type WeekdayMenuUpdateOneWithoutDailyMenusNestedInput = {
    create?: XOR<WeekdayMenuCreateWithoutDailyMenusInput, WeekdayMenuUncheckedCreateWithoutDailyMenusInput>
    connectOrCreate?: WeekdayMenuCreateOrConnectWithoutDailyMenusInput
    upsert?: WeekdayMenuUpsertWithoutDailyMenusInput
    disconnect?: WeekdayMenuWhereInput | boolean
    delete?: WeekdayMenuWhereInput | boolean
    connect?: WeekdayMenuWhereUniqueInput
    update?: XOR<XOR<WeekdayMenuUpdateToOneWithWhereWithoutDailyMenusInput, WeekdayMenuUpdateWithoutDailyMenusInput>, WeekdayMenuUncheckedUpdateWithoutDailyMenusInput>
  }

  export type OrderUpdateManyWithoutDailyMenuNestedInput = {
    create?: XOR<OrderCreateWithoutDailyMenuInput, OrderUncheckedCreateWithoutDailyMenuInput> | OrderCreateWithoutDailyMenuInput[] | OrderUncheckedCreateWithoutDailyMenuInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutDailyMenuInput | OrderCreateOrConnectWithoutDailyMenuInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutDailyMenuInput | OrderUpsertWithWhereUniqueWithoutDailyMenuInput[]
    createMany?: OrderCreateManyDailyMenuInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutDailyMenuInput | OrderUpdateWithWhereUniqueWithoutDailyMenuInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutDailyMenuInput | OrderUpdateManyWithWhereWithoutDailyMenuInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutDailyMenuNestedInput = {
    create?: XOR<OrderCreateWithoutDailyMenuInput, OrderUncheckedCreateWithoutDailyMenuInput> | OrderCreateWithoutDailyMenuInput[] | OrderUncheckedCreateWithoutDailyMenuInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutDailyMenuInput | OrderCreateOrConnectWithoutDailyMenuInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutDailyMenuInput | OrderUpsertWithWhereUniqueWithoutDailyMenuInput[]
    createMany?: OrderCreateManyDailyMenuInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutDailyMenuInput | OrderUpdateWithWhereUniqueWithoutDailyMenuInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutDailyMenuInput | OrderUpdateManyWithWhereWithoutDailyMenuInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOrdersInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOrdersPlacedInput = {
    create?: XOR<UserCreateWithoutOrdersPlacedInput, UserUncheckedCreateWithoutOrdersPlacedInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersPlacedInput
    connect?: UserWhereUniqueInput
  }

  export type DailyMenuCreateNestedOneWithoutOrdersInput = {
    create?: XOR<DailyMenuCreateWithoutOrdersInput, DailyMenuUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: DailyMenuCreateOrConnectWithoutOrdersInput
    connect?: DailyMenuWhereUniqueInput
  }

  export type LocationCreateNestedOneWithoutOrdersInput = {
    create?: XOR<LocationCreateWithoutOrdersInput, LocationUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: LocationCreateOrConnectWithoutOrdersInput
    connect?: LocationWhereUniqueInput
  }

  export type WalletTransactionCreateNestedManyWithoutOrderInput = {
    create?: XOR<WalletTransactionCreateWithoutOrderInput, WalletTransactionUncheckedCreateWithoutOrderInput> | WalletTransactionCreateWithoutOrderInput[] | WalletTransactionUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: WalletTransactionCreateOrConnectWithoutOrderInput | WalletTransactionCreateOrConnectWithoutOrderInput[]
    createMany?: WalletTransactionCreateManyOrderInputEnvelope
    connect?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
  }

  export type WalletTransactionUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<WalletTransactionCreateWithoutOrderInput, WalletTransactionUncheckedCreateWithoutOrderInput> | WalletTransactionCreateWithoutOrderInput[] | WalletTransactionUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: WalletTransactionCreateOrConnectWithoutOrderInput | WalletTransactionCreateOrConnectWithoutOrderInput[]
    createMany?: WalletTransactionCreateManyOrderInputEnvelope
    connect?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type UserUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    upsert?: UserUpsertWithoutOrdersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrdersInput, UserUpdateWithoutOrdersInput>, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type UserUpdateOneWithoutOrdersPlacedNestedInput = {
    create?: XOR<UserCreateWithoutOrdersPlacedInput, UserUncheckedCreateWithoutOrdersPlacedInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersPlacedInput
    upsert?: UserUpsertWithoutOrdersPlacedInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrdersPlacedInput, UserUpdateWithoutOrdersPlacedInput>, UserUncheckedUpdateWithoutOrdersPlacedInput>
  }

  export type DailyMenuUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<DailyMenuCreateWithoutOrdersInput, DailyMenuUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: DailyMenuCreateOrConnectWithoutOrdersInput
    upsert?: DailyMenuUpsertWithoutOrdersInput
    connect?: DailyMenuWhereUniqueInput
    update?: XOR<XOR<DailyMenuUpdateToOneWithWhereWithoutOrdersInput, DailyMenuUpdateWithoutOrdersInput>, DailyMenuUncheckedUpdateWithoutOrdersInput>
  }

  export type LocationUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<LocationCreateWithoutOrdersInput, LocationUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: LocationCreateOrConnectWithoutOrdersInput
    upsert?: LocationUpsertWithoutOrdersInput
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutOrdersInput, LocationUpdateWithoutOrdersInput>, LocationUncheckedUpdateWithoutOrdersInput>
  }

  export type WalletTransactionUpdateManyWithoutOrderNestedInput = {
    create?: XOR<WalletTransactionCreateWithoutOrderInput, WalletTransactionUncheckedCreateWithoutOrderInput> | WalletTransactionCreateWithoutOrderInput[] | WalletTransactionUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: WalletTransactionCreateOrConnectWithoutOrderInput | WalletTransactionCreateOrConnectWithoutOrderInput[]
    upsert?: WalletTransactionUpsertWithWhereUniqueWithoutOrderInput | WalletTransactionUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: WalletTransactionCreateManyOrderInputEnvelope
    set?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    disconnect?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    delete?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    connect?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    update?: WalletTransactionUpdateWithWhereUniqueWithoutOrderInput | WalletTransactionUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: WalletTransactionUpdateManyWithWhereWithoutOrderInput | WalletTransactionUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: WalletTransactionScalarWhereInput | WalletTransactionScalarWhereInput[]
  }

  export type WalletTransactionUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<WalletTransactionCreateWithoutOrderInput, WalletTransactionUncheckedCreateWithoutOrderInput> | WalletTransactionCreateWithoutOrderInput[] | WalletTransactionUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: WalletTransactionCreateOrConnectWithoutOrderInput | WalletTransactionCreateOrConnectWithoutOrderInput[]
    upsert?: WalletTransactionUpsertWithWhereUniqueWithoutOrderInput | WalletTransactionUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: WalletTransactionCreateManyOrderInputEnvelope
    set?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    disconnect?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    delete?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    connect?: WalletTransactionWhereUniqueInput | WalletTransactionWhereUniqueInput[]
    update?: WalletTransactionUpdateWithWhereUniqueWithoutOrderInput | WalletTransactionUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: WalletTransactionUpdateManyWithWhereWithoutOrderInput | WalletTransactionUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: WalletTransactionScalarWhereInput | WalletTransactionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutWalletTransactionsInput = {
    create?: XOR<UserCreateWithoutWalletTransactionsInput, UserUncheckedCreateWithoutWalletTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type OrderCreateNestedOneWithoutWalletTxsInput = {
    create?: XOR<OrderCreateWithoutWalletTxsInput, OrderUncheckedCreateWithoutWalletTxsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutWalletTxsInput
    connect?: OrderWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreatedTransactionsInput = {
    create?: XOR<UserCreateWithoutCreatedTransactionsInput, UserUncheckedCreateWithoutCreatedTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumWalletTxTypeFieldUpdateOperationsInput = {
    set?: $Enums.WalletTxType
  }

  export type UserUpdateOneRequiredWithoutWalletTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutWalletTransactionsInput, UserUncheckedCreateWithoutWalletTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletTransactionsInput
    upsert?: UserUpsertWithoutWalletTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWalletTransactionsInput, UserUpdateWithoutWalletTransactionsInput>, UserUncheckedUpdateWithoutWalletTransactionsInput>
  }

  export type OrderUpdateOneWithoutWalletTxsNestedInput = {
    create?: XOR<OrderCreateWithoutWalletTxsInput, OrderUncheckedCreateWithoutWalletTxsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutWalletTxsInput
    upsert?: OrderUpsertWithoutWalletTxsInput
    disconnect?: OrderWhereInput | boolean
    delete?: OrderWhereInput | boolean
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutWalletTxsInput, OrderUpdateWithoutWalletTxsInput>, OrderUncheckedUpdateWithoutWalletTxsInput>
  }

  export type UserUpdateOneWithoutCreatedTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedTransactionsInput, UserUncheckedCreateWithoutCreatedTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTransactionsInput
    upsert?: UserUpsertWithoutCreatedTransactionsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedTransactionsInput, UserUpdateWithoutCreatedTransactionsInput>, UserUncheckedUpdateWithoutCreatedTransactionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumPaymentModeFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMode | EnumPaymentModeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMode[] | ListEnumPaymentModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMode[] | ListEnumPaymentModeFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentModeFilter<$PrismaModel> | $Enums.PaymentMode
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedEnumPaymentModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMode | EnumPaymentModeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMode[] | ListEnumPaymentModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMode[] | ListEnumPaymentModeFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentModeWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentModeFilter<$PrismaModel>
    _max?: NestedEnumPaymentModeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumWeekdayFilter<$PrismaModel = never> = {
    equals?: $Enums.Weekday | EnumWeekdayFieldRefInput<$PrismaModel>
    in?: $Enums.Weekday[] | ListEnumWeekdayFieldRefInput<$PrismaModel>
    notIn?: $Enums.Weekday[] | ListEnumWeekdayFieldRefInput<$PrismaModel>
    not?: NestedEnumWeekdayFilter<$PrismaModel> | $Enums.Weekday
  }

  export type NestedEnumMealSlotFilter<$PrismaModel = never> = {
    equals?: $Enums.MealSlot | EnumMealSlotFieldRefInput<$PrismaModel>
    in?: $Enums.MealSlot[] | ListEnumMealSlotFieldRefInput<$PrismaModel>
    notIn?: $Enums.MealSlot[] | ListEnumMealSlotFieldRefInput<$PrismaModel>
    not?: NestedEnumMealSlotFilter<$PrismaModel> | $Enums.MealSlot
  }

  export type NestedEnumWeekdayWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Weekday | EnumWeekdayFieldRefInput<$PrismaModel>
    in?: $Enums.Weekday[] | ListEnumWeekdayFieldRefInput<$PrismaModel>
    notIn?: $Enums.Weekday[] | ListEnumWeekdayFieldRefInput<$PrismaModel>
    not?: NestedEnumWeekdayWithAggregatesFilter<$PrismaModel> | $Enums.Weekday
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWeekdayFilter<$PrismaModel>
    _max?: NestedEnumWeekdayFilter<$PrismaModel>
  }

  export type NestedEnumMealSlotWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MealSlot | EnumMealSlotFieldRefInput<$PrismaModel>
    in?: $Enums.MealSlot[] | ListEnumMealSlotFieldRefInput<$PrismaModel>
    notIn?: $Enums.MealSlot[] | ListEnumMealSlotFieldRefInput<$PrismaModel>
    not?: NestedEnumMealSlotWithAggregatesFilter<$PrismaModel> | $Enums.MealSlot
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMealSlotFilter<$PrismaModel>
    _max?: NestedEnumMealSlotFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumWalletTxTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletTxType | EnumWalletTxTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WalletTxType[] | ListEnumWalletTxTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WalletTxType[] | ListEnumWalletTxTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWalletTxTypeFilter<$PrismaModel> | $Enums.WalletTxType
  }

  export type NestedEnumWalletTxTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletTxType | EnumWalletTxTypeFieldRefInput<$PrismaModel>
    in?: $Enums.WalletTxType[] | ListEnumWalletTxTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.WalletTxType[] | ListEnumWalletTxTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumWalletTxTypeWithAggregatesFilter<$PrismaModel> | $Enums.WalletTxType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWalletTxTypeFilter<$PrismaModel>
    _max?: NestedEnumWalletTxTypeFilter<$PrismaModel>
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    employeeId?: string | null
    phoneNumber?: string | null
    deskNumber?: string | null
    buildingNumber?: string | null
    floorNumber?: string | null
    paymentMode?: $Enums.PaymentMode
    balance?: number
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: LocationCreateNestedOneWithoutUsersInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    adminLocations?: AdminLocationCreateNestedManyWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    ordersPlaced?: OrderCreateNestedManyWithoutPlacedByInput
    walletTransactions?: WalletTransactionCreateNestedManyWithoutUserInput
    createdTransactions?: WalletTransactionCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    employeeId?: string | null
    phoneNumber?: string | null
    deskNumber?: string | null
    buildingNumber?: string | null
    floorNumber?: string | null
    locationId?: string | null
    paymentMode?: $Enums.PaymentMode
    balance?: number
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    adminLocations?: AdminLocationUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    ordersPlaced?: OrderUncheckedCreateNestedManyWithoutPlacedByInput
    walletTransactions?: WalletTransactionUncheckedCreateNestedManyWithoutUserInput
    createdTransactions?: WalletTransactionUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneWithoutUsersNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    adminLocations?: AdminLocationUpdateManyWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    ordersPlaced?: OrderUpdateManyWithoutPlacedByNestedInput
    walletTransactions?: WalletTransactionUpdateManyWithoutUserNestedInput
    createdTransactions?: WalletTransactionUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    adminLocations?: AdminLocationUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    ordersPlaced?: OrderUncheckedUpdateManyWithoutPlacedByNestedInput
    walletTransactions?: WalletTransactionUncheckedUpdateManyWithoutUserNestedInput
    createdTransactions?: WalletTransactionUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    employeeId?: string | null
    phoneNumber?: string | null
    deskNumber?: string | null
    buildingNumber?: string | null
    floorNumber?: string | null
    paymentMode?: $Enums.PaymentMode
    balance?: number
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: LocationCreateNestedOneWithoutUsersInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    adminLocations?: AdminLocationCreateNestedManyWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    ordersPlaced?: OrderCreateNestedManyWithoutPlacedByInput
    walletTransactions?: WalletTransactionCreateNestedManyWithoutUserInput
    createdTransactions?: WalletTransactionCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    employeeId?: string | null
    phoneNumber?: string | null
    deskNumber?: string | null
    buildingNumber?: string | null
    floorNumber?: string | null
    locationId?: string | null
    paymentMode?: $Enums.PaymentMode
    balance?: number
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    adminLocations?: AdminLocationUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    ordersPlaced?: OrderUncheckedCreateNestedManyWithoutPlacedByInput
    walletTransactions?: WalletTransactionUncheckedCreateNestedManyWithoutUserInput
    createdTransactions?: WalletTransactionUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneWithoutUsersNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    adminLocations?: AdminLocationUpdateManyWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    ordersPlaced?: OrderUpdateManyWithoutPlacedByNestedInput
    walletTransactions?: WalletTransactionUpdateManyWithoutUserNestedInput
    createdTransactions?: WalletTransactionUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    adminLocations?: AdminLocationUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    ordersPlaced?: OrderUncheckedUpdateManyWithoutPlacedByNestedInput
    walletTransactions?: WalletTransactionUncheckedUpdateManyWithoutUserNestedInput
    createdTransactions?: WalletTransactionUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type LocationCreateWithoutUsersInput = {
    id?: string
    name: string
    address?: string | null
    defaultCutoffTime?: string
    dinnerEnabled?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    adminLocations?: AdminLocationCreateNestedManyWithoutLocationInput
    dailyMenus?: DailyMenuCreateNestedManyWithoutLocationInput
    weekdayMenus?: WeekdayMenuCreateNestedManyWithoutLocationInput
    orders?: OrderCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    address?: string | null
    defaultCutoffTime?: string
    dinnerEnabled?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    adminLocations?: AdminLocationUncheckedCreateNestedManyWithoutLocationInput
    dailyMenus?: DailyMenuUncheckedCreateNestedManyWithoutLocationInput
    weekdayMenus?: WeekdayMenuUncheckedCreateNestedManyWithoutLocationInput
    orders?: OrderUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationCreateOrConnectWithoutUsersInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutUsersInput, LocationUncheckedCreateWithoutUsersInput>
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AdminLocationCreateWithoutUserInput = {
    id?: string
    location: LocationCreateNestedOneWithoutAdminLocationsInput
  }

  export type AdminLocationUncheckedCreateWithoutUserInput = {
    id?: string
    locationId: string
  }

  export type AdminLocationCreateOrConnectWithoutUserInput = {
    where: AdminLocationWhereUniqueInput
    create: XOR<AdminLocationCreateWithoutUserInput, AdminLocationUncheckedCreateWithoutUserInput>
  }

  export type AdminLocationCreateManyUserInputEnvelope = {
    data: AdminLocationCreateManyUserInput | AdminLocationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutUserInput = {
    id?: string
    amount: number
    note?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    deliveredAt?: Date | string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    placedBy?: UserCreateNestedOneWithoutOrdersPlacedInput
    dailyMenu: DailyMenuCreateNestedOneWithoutOrdersInput
    location: LocationCreateNestedOneWithoutOrdersInput
    walletTxs?: WalletTransactionCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutUserInput = {
    id?: string
    dailyMenuId: string
    locationId: string
    amount: number
    note?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    deliveredAt?: Date | string | null
    paidAt?: Date | string | null
    placedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    walletTxs?: WalletTransactionUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutUserInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderCreateManyUserInputEnvelope = {
    data: OrderCreateManyUserInput | OrderCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutPlacedByInput = {
    id?: string
    amount: number
    note?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    deliveredAt?: Date | string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOrdersInput
    dailyMenu: DailyMenuCreateNestedOneWithoutOrdersInput
    location: LocationCreateNestedOneWithoutOrdersInput
    walletTxs?: WalletTransactionCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutPlacedByInput = {
    id?: string
    userId: string
    dailyMenuId: string
    locationId: string
    amount: number
    note?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    deliveredAt?: Date | string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    walletTxs?: WalletTransactionUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutPlacedByInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutPlacedByInput, OrderUncheckedCreateWithoutPlacedByInput>
  }

  export type OrderCreateManyPlacedByInputEnvelope = {
    data: OrderCreateManyPlacedByInput | OrderCreateManyPlacedByInput[]
    skipDuplicates?: boolean
  }

  export type WalletTransactionCreateWithoutUserInput = {
    id?: string
    type: $Enums.WalletTxType
    amount: number
    balanceAfter: number
    note?: string | null
    createdAt?: Date | string
    order?: OrderCreateNestedOneWithoutWalletTxsInput
    createdBy?: UserCreateNestedOneWithoutCreatedTransactionsInput
  }

  export type WalletTransactionUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.WalletTxType
    amount: number
    balanceAfter: number
    orderId?: string | null
    createdById?: string | null
    note?: string | null
    createdAt?: Date | string
  }

  export type WalletTransactionCreateOrConnectWithoutUserInput = {
    where: WalletTransactionWhereUniqueInput
    create: XOR<WalletTransactionCreateWithoutUserInput, WalletTransactionUncheckedCreateWithoutUserInput>
  }

  export type WalletTransactionCreateManyUserInputEnvelope = {
    data: WalletTransactionCreateManyUserInput | WalletTransactionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WalletTransactionCreateWithoutCreatedByInput = {
    id?: string
    type: $Enums.WalletTxType
    amount: number
    balanceAfter: number
    note?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutWalletTransactionsInput
    order?: OrderCreateNestedOneWithoutWalletTxsInput
  }

  export type WalletTransactionUncheckedCreateWithoutCreatedByInput = {
    id?: string
    userId: string
    type: $Enums.WalletTxType
    amount: number
    balanceAfter: number
    orderId?: string | null
    note?: string | null
    createdAt?: Date | string
  }

  export type WalletTransactionCreateOrConnectWithoutCreatedByInput = {
    where: WalletTransactionWhereUniqueInput
    create: XOR<WalletTransactionCreateWithoutCreatedByInput, WalletTransactionUncheckedCreateWithoutCreatedByInput>
  }

  export type WalletTransactionCreateManyCreatedByInputEnvelope = {
    data: WalletTransactionCreateManyCreatedByInput | WalletTransactionCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type LocationUpsertWithoutUsersInput = {
    update: XOR<LocationUpdateWithoutUsersInput, LocationUncheckedUpdateWithoutUsersInput>
    create: XOR<LocationCreateWithoutUsersInput, LocationUncheckedCreateWithoutUsersInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutUsersInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutUsersInput, LocationUncheckedUpdateWithoutUsersInput>
  }

  export type LocationUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    defaultCutoffTime?: StringFieldUpdateOperationsInput | string
    dinnerEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminLocations?: AdminLocationUpdateManyWithoutLocationNestedInput
    dailyMenus?: DailyMenuUpdateManyWithoutLocationNestedInput
    weekdayMenus?: WeekdayMenuUpdateManyWithoutLocationNestedInput
    orders?: OrderUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    defaultCutoffTime?: StringFieldUpdateOperationsInput | string
    dinnerEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminLocations?: AdminLocationUncheckedUpdateManyWithoutLocationNestedInput
    dailyMenus?: DailyMenuUncheckedUpdateManyWithoutLocationNestedInput
    weekdayMenus?: WeekdayMenuUncheckedUpdateManyWithoutLocationNestedInput
    orders?: OrderUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type AdminLocationUpsertWithWhereUniqueWithoutUserInput = {
    where: AdminLocationWhereUniqueInput
    update: XOR<AdminLocationUpdateWithoutUserInput, AdminLocationUncheckedUpdateWithoutUserInput>
    create: XOR<AdminLocationCreateWithoutUserInput, AdminLocationUncheckedCreateWithoutUserInput>
  }

  export type AdminLocationUpdateWithWhereUniqueWithoutUserInput = {
    where: AdminLocationWhereUniqueInput
    data: XOR<AdminLocationUpdateWithoutUserInput, AdminLocationUncheckedUpdateWithoutUserInput>
  }

  export type AdminLocationUpdateManyWithWhereWithoutUserInput = {
    where: AdminLocationScalarWhereInput
    data: XOR<AdminLocationUpdateManyMutationInput, AdminLocationUncheckedUpdateManyWithoutUserInput>
  }

  export type AdminLocationScalarWhereInput = {
    AND?: AdminLocationScalarWhereInput | AdminLocationScalarWhereInput[]
    OR?: AdminLocationScalarWhereInput[]
    NOT?: AdminLocationScalarWhereInput | AdminLocationScalarWhereInput[]
    id?: StringFilter<"AdminLocation"> | string
    userId?: StringFilter<"AdminLocation"> | string
    locationId?: StringFilter<"AdminLocation"> | string
  }

  export type OrderUpsertWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
  }

  export type OrderUpdateManyWithWhereWithoutUserInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutUserInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    userId?: StringFilter<"Order"> | string
    dailyMenuId?: StringFilter<"Order"> | string
    locationId?: StringFilter<"Order"> | string
    amount?: IntFilter<"Order"> | number
    note?: StringNullableFilter<"Order"> | string | null
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFilter<"Order"> | $Enums.PaymentStatus
    deliveredAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    paidAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    placedById?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
  }

  export type OrderUpsertWithWhereUniqueWithoutPlacedByInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutPlacedByInput, OrderUncheckedUpdateWithoutPlacedByInput>
    create: XOR<OrderCreateWithoutPlacedByInput, OrderUncheckedCreateWithoutPlacedByInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutPlacedByInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutPlacedByInput, OrderUncheckedUpdateWithoutPlacedByInput>
  }

  export type OrderUpdateManyWithWhereWithoutPlacedByInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutPlacedByInput>
  }

  export type WalletTransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: WalletTransactionWhereUniqueInput
    update: XOR<WalletTransactionUpdateWithoutUserInput, WalletTransactionUncheckedUpdateWithoutUserInput>
    create: XOR<WalletTransactionCreateWithoutUserInput, WalletTransactionUncheckedCreateWithoutUserInput>
  }

  export type WalletTransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: WalletTransactionWhereUniqueInput
    data: XOR<WalletTransactionUpdateWithoutUserInput, WalletTransactionUncheckedUpdateWithoutUserInput>
  }

  export type WalletTransactionUpdateManyWithWhereWithoutUserInput = {
    where: WalletTransactionScalarWhereInput
    data: XOR<WalletTransactionUpdateManyMutationInput, WalletTransactionUncheckedUpdateManyWithoutUserInput>
  }

  export type WalletTransactionScalarWhereInput = {
    AND?: WalletTransactionScalarWhereInput | WalletTransactionScalarWhereInput[]
    OR?: WalletTransactionScalarWhereInput[]
    NOT?: WalletTransactionScalarWhereInput | WalletTransactionScalarWhereInput[]
    id?: StringFilter<"WalletTransaction"> | string
    userId?: StringFilter<"WalletTransaction"> | string
    type?: EnumWalletTxTypeFilter<"WalletTransaction"> | $Enums.WalletTxType
    amount?: IntFilter<"WalletTransaction"> | number
    balanceAfter?: IntFilter<"WalletTransaction"> | number
    orderId?: StringNullableFilter<"WalletTransaction"> | string | null
    createdById?: StringNullableFilter<"WalletTransaction"> | string | null
    note?: StringNullableFilter<"WalletTransaction"> | string | null
    createdAt?: DateTimeFilter<"WalletTransaction"> | Date | string
  }

  export type WalletTransactionUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: WalletTransactionWhereUniqueInput
    update: XOR<WalletTransactionUpdateWithoutCreatedByInput, WalletTransactionUncheckedUpdateWithoutCreatedByInput>
    create: XOR<WalletTransactionCreateWithoutCreatedByInput, WalletTransactionUncheckedCreateWithoutCreatedByInput>
  }

  export type WalletTransactionUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: WalletTransactionWhereUniqueInput
    data: XOR<WalletTransactionUpdateWithoutCreatedByInput, WalletTransactionUncheckedUpdateWithoutCreatedByInput>
  }

  export type WalletTransactionUpdateManyWithWhereWithoutCreatedByInput = {
    where: WalletTransactionScalarWhereInput
    data: XOR<WalletTransactionUpdateManyMutationInput, WalletTransactionUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type UserCreateWithoutLocationInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    employeeId?: string | null
    phoneNumber?: string | null
    deskNumber?: string | null
    buildingNumber?: string | null
    floorNumber?: string | null
    paymentMode?: $Enums.PaymentMode
    balance?: number
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    adminLocations?: AdminLocationCreateNestedManyWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    ordersPlaced?: OrderCreateNestedManyWithoutPlacedByInput
    walletTransactions?: WalletTransactionCreateNestedManyWithoutUserInput
    createdTransactions?: WalletTransactionCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutLocationInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    employeeId?: string | null
    phoneNumber?: string | null
    deskNumber?: string | null
    buildingNumber?: string | null
    floorNumber?: string | null
    paymentMode?: $Enums.PaymentMode
    balance?: number
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    adminLocations?: AdminLocationUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    ordersPlaced?: OrderUncheckedCreateNestedManyWithoutPlacedByInput
    walletTransactions?: WalletTransactionUncheckedCreateNestedManyWithoutUserInput
    createdTransactions?: WalletTransactionUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutLocationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLocationInput, UserUncheckedCreateWithoutLocationInput>
  }

  export type UserCreateManyLocationInputEnvelope = {
    data: UserCreateManyLocationInput | UserCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type AdminLocationCreateWithoutLocationInput = {
    id?: string
    user: UserCreateNestedOneWithoutAdminLocationsInput
  }

  export type AdminLocationUncheckedCreateWithoutLocationInput = {
    id?: string
    userId: string
  }

  export type AdminLocationCreateOrConnectWithoutLocationInput = {
    where: AdminLocationWhereUniqueInput
    create: XOR<AdminLocationCreateWithoutLocationInput, AdminLocationUncheckedCreateWithoutLocationInput>
  }

  export type AdminLocationCreateManyLocationInputEnvelope = {
    data: AdminLocationCreateManyLocationInput | AdminLocationCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type DailyMenuCreateWithoutLocationInput = {
    id?: string
    date: Date | string
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    cutoffAt?: Date | string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    catalogItem?: MealCatalogCreateNestedOneWithoutDailyMenusInput
    sourceWeekdayMenu?: WeekdayMenuCreateNestedOneWithoutDailyMenusInput
    orders?: OrderCreateNestedManyWithoutDailyMenuInput
  }

  export type DailyMenuUncheckedCreateWithoutLocationInput = {
    id?: string
    date: Date | string
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    catalogItemId?: string | null
    sourceWeekdayMenuId?: string | null
    cutoffAt?: Date | string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutDailyMenuInput
  }

  export type DailyMenuCreateOrConnectWithoutLocationInput = {
    where: DailyMenuWhereUniqueInput
    create: XOR<DailyMenuCreateWithoutLocationInput, DailyMenuUncheckedCreateWithoutLocationInput>
  }

  export type DailyMenuCreateManyLocationInputEnvelope = {
    data: DailyMenuCreateManyLocationInput | DailyMenuCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type WeekdayMenuCreateWithoutLocationInput = {
    id?: string
    weekday: $Enums.Weekday
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    catalogItem?: MealCatalogCreateNestedOneWithoutWeekdayMenusInput
    dailyMenus?: DailyMenuCreateNestedManyWithoutSourceWeekdayMenuInput
  }

  export type WeekdayMenuUncheckedCreateWithoutLocationInput = {
    id?: string
    weekday: $Enums.Weekday
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    catalogItemId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dailyMenus?: DailyMenuUncheckedCreateNestedManyWithoutSourceWeekdayMenuInput
  }

  export type WeekdayMenuCreateOrConnectWithoutLocationInput = {
    where: WeekdayMenuWhereUniqueInput
    create: XOR<WeekdayMenuCreateWithoutLocationInput, WeekdayMenuUncheckedCreateWithoutLocationInput>
  }

  export type WeekdayMenuCreateManyLocationInputEnvelope = {
    data: WeekdayMenuCreateManyLocationInput | WeekdayMenuCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutLocationInput = {
    id?: string
    amount: number
    note?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    deliveredAt?: Date | string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOrdersInput
    placedBy?: UserCreateNestedOneWithoutOrdersPlacedInput
    dailyMenu: DailyMenuCreateNestedOneWithoutOrdersInput
    walletTxs?: WalletTransactionCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutLocationInput = {
    id?: string
    userId: string
    dailyMenuId: string
    amount: number
    note?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    deliveredAt?: Date | string | null
    paidAt?: Date | string | null
    placedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    walletTxs?: WalletTransactionUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutLocationInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutLocationInput, OrderUncheckedCreateWithoutLocationInput>
  }

  export type OrderCreateManyLocationInputEnvelope = {
    data: OrderCreateManyLocationInput | OrderCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutLocationInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutLocationInput, UserUncheckedUpdateWithoutLocationInput>
    create: XOR<UserCreateWithoutLocationInput, UserUncheckedCreateWithoutLocationInput>
  }

  export type UserUpdateWithWhereUniqueWithoutLocationInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutLocationInput, UserUncheckedUpdateWithoutLocationInput>
  }

  export type UserUpdateManyWithWhereWithoutLocationInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutLocationInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    employeeId?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    deskNumber?: StringNullableFilter<"User"> | string | null
    buildingNumber?: StringNullableFilter<"User"> | string | null
    floorNumber?: StringNullableFilter<"User"> | string | null
    locationId?: StringNullableFilter<"User"> | string | null
    paymentMode?: EnumPaymentModeFilter<"User"> | $Enums.PaymentMode
    balance?: IntFilter<"User"> | number
    profileComplete?: BoolFilter<"User"> | boolean
    isBanned?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type AdminLocationUpsertWithWhereUniqueWithoutLocationInput = {
    where: AdminLocationWhereUniqueInput
    update: XOR<AdminLocationUpdateWithoutLocationInput, AdminLocationUncheckedUpdateWithoutLocationInput>
    create: XOR<AdminLocationCreateWithoutLocationInput, AdminLocationUncheckedCreateWithoutLocationInput>
  }

  export type AdminLocationUpdateWithWhereUniqueWithoutLocationInput = {
    where: AdminLocationWhereUniqueInput
    data: XOR<AdminLocationUpdateWithoutLocationInput, AdminLocationUncheckedUpdateWithoutLocationInput>
  }

  export type AdminLocationUpdateManyWithWhereWithoutLocationInput = {
    where: AdminLocationScalarWhereInput
    data: XOR<AdminLocationUpdateManyMutationInput, AdminLocationUncheckedUpdateManyWithoutLocationInput>
  }

  export type DailyMenuUpsertWithWhereUniqueWithoutLocationInput = {
    where: DailyMenuWhereUniqueInput
    update: XOR<DailyMenuUpdateWithoutLocationInput, DailyMenuUncheckedUpdateWithoutLocationInput>
    create: XOR<DailyMenuCreateWithoutLocationInput, DailyMenuUncheckedCreateWithoutLocationInput>
  }

  export type DailyMenuUpdateWithWhereUniqueWithoutLocationInput = {
    where: DailyMenuWhereUniqueInput
    data: XOR<DailyMenuUpdateWithoutLocationInput, DailyMenuUncheckedUpdateWithoutLocationInput>
  }

  export type DailyMenuUpdateManyWithWhereWithoutLocationInput = {
    where: DailyMenuScalarWhereInput
    data: XOR<DailyMenuUpdateManyMutationInput, DailyMenuUncheckedUpdateManyWithoutLocationInput>
  }

  export type DailyMenuScalarWhereInput = {
    AND?: DailyMenuScalarWhereInput | DailyMenuScalarWhereInput[]
    OR?: DailyMenuScalarWhereInput[]
    NOT?: DailyMenuScalarWhereInput | DailyMenuScalarWhereInput[]
    id?: StringFilter<"DailyMenu"> | string
    locationId?: StringFilter<"DailyMenu"> | string
    date?: DateTimeFilter<"DailyMenu"> | Date | string
    slot?: EnumMealSlotFilter<"DailyMenu"> | $Enums.MealSlot
    title?: StringFilter<"DailyMenu"> | string
    description?: StringNullableFilter<"DailyMenu"> | string | null
    price?: IntFilter<"DailyMenu"> | number
    imageUrl?: StringNullableFilter<"DailyMenu"> | string | null
    catalogItemId?: StringNullableFilter<"DailyMenu"> | string | null
    sourceWeekdayMenuId?: StringNullableFilter<"DailyMenu"> | string | null
    cutoffAt?: DateTimeNullableFilter<"DailyMenu"> | Date | string | null
    isPublished?: BoolFilter<"DailyMenu"> | boolean
    createdAt?: DateTimeFilter<"DailyMenu"> | Date | string
    updatedAt?: DateTimeFilter<"DailyMenu"> | Date | string
  }

  export type WeekdayMenuUpsertWithWhereUniqueWithoutLocationInput = {
    where: WeekdayMenuWhereUniqueInput
    update: XOR<WeekdayMenuUpdateWithoutLocationInput, WeekdayMenuUncheckedUpdateWithoutLocationInput>
    create: XOR<WeekdayMenuCreateWithoutLocationInput, WeekdayMenuUncheckedCreateWithoutLocationInput>
  }

  export type WeekdayMenuUpdateWithWhereUniqueWithoutLocationInput = {
    where: WeekdayMenuWhereUniqueInput
    data: XOR<WeekdayMenuUpdateWithoutLocationInput, WeekdayMenuUncheckedUpdateWithoutLocationInput>
  }

  export type WeekdayMenuUpdateManyWithWhereWithoutLocationInput = {
    where: WeekdayMenuScalarWhereInput
    data: XOR<WeekdayMenuUpdateManyMutationInput, WeekdayMenuUncheckedUpdateManyWithoutLocationInput>
  }

  export type WeekdayMenuScalarWhereInput = {
    AND?: WeekdayMenuScalarWhereInput | WeekdayMenuScalarWhereInput[]
    OR?: WeekdayMenuScalarWhereInput[]
    NOT?: WeekdayMenuScalarWhereInput | WeekdayMenuScalarWhereInput[]
    id?: StringFilter<"WeekdayMenu"> | string
    locationId?: StringFilter<"WeekdayMenu"> | string
    weekday?: EnumWeekdayFilter<"WeekdayMenu"> | $Enums.Weekday
    slot?: EnumMealSlotFilter<"WeekdayMenu"> | $Enums.MealSlot
    title?: StringFilter<"WeekdayMenu"> | string
    description?: StringNullableFilter<"WeekdayMenu"> | string | null
    price?: IntFilter<"WeekdayMenu"> | number
    imageUrl?: StringNullableFilter<"WeekdayMenu"> | string | null
    catalogItemId?: StringNullableFilter<"WeekdayMenu"> | string | null
    isActive?: BoolFilter<"WeekdayMenu"> | boolean
    createdAt?: DateTimeFilter<"WeekdayMenu"> | Date | string
    updatedAt?: DateTimeFilter<"WeekdayMenu"> | Date | string
  }

  export type OrderUpsertWithWhereUniqueWithoutLocationInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutLocationInput, OrderUncheckedUpdateWithoutLocationInput>
    create: XOR<OrderCreateWithoutLocationInput, OrderUncheckedCreateWithoutLocationInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutLocationInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutLocationInput, OrderUncheckedUpdateWithoutLocationInput>
  }

  export type OrderUpdateManyWithWhereWithoutLocationInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutLocationInput>
  }

  export type UserCreateWithoutAdminLocationsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    employeeId?: string | null
    phoneNumber?: string | null
    deskNumber?: string | null
    buildingNumber?: string | null
    floorNumber?: string | null
    paymentMode?: $Enums.PaymentMode
    balance?: number
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: LocationCreateNestedOneWithoutUsersInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    ordersPlaced?: OrderCreateNestedManyWithoutPlacedByInput
    walletTransactions?: WalletTransactionCreateNestedManyWithoutUserInput
    createdTransactions?: WalletTransactionCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutAdminLocationsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    employeeId?: string | null
    phoneNumber?: string | null
    deskNumber?: string | null
    buildingNumber?: string | null
    floorNumber?: string | null
    locationId?: string | null
    paymentMode?: $Enums.PaymentMode
    balance?: number
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    ordersPlaced?: OrderUncheckedCreateNestedManyWithoutPlacedByInput
    walletTransactions?: WalletTransactionUncheckedCreateNestedManyWithoutUserInput
    createdTransactions?: WalletTransactionUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutAdminLocationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAdminLocationsInput, UserUncheckedCreateWithoutAdminLocationsInput>
  }

  export type LocationCreateWithoutAdminLocationsInput = {
    id?: string
    name: string
    address?: string | null
    defaultCutoffTime?: string
    dinnerEnabled?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutLocationInput
    dailyMenus?: DailyMenuCreateNestedManyWithoutLocationInput
    weekdayMenus?: WeekdayMenuCreateNestedManyWithoutLocationInput
    orders?: OrderCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateWithoutAdminLocationsInput = {
    id?: string
    name: string
    address?: string | null
    defaultCutoffTime?: string
    dinnerEnabled?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutLocationInput
    dailyMenus?: DailyMenuUncheckedCreateNestedManyWithoutLocationInput
    weekdayMenus?: WeekdayMenuUncheckedCreateNestedManyWithoutLocationInput
    orders?: OrderUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationCreateOrConnectWithoutAdminLocationsInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutAdminLocationsInput, LocationUncheckedCreateWithoutAdminLocationsInput>
  }

  export type UserUpsertWithoutAdminLocationsInput = {
    update: XOR<UserUpdateWithoutAdminLocationsInput, UserUncheckedUpdateWithoutAdminLocationsInput>
    create: XOR<UserCreateWithoutAdminLocationsInput, UserUncheckedCreateWithoutAdminLocationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAdminLocationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAdminLocationsInput, UserUncheckedUpdateWithoutAdminLocationsInput>
  }

  export type UserUpdateWithoutAdminLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneWithoutUsersNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    ordersPlaced?: OrderUpdateManyWithoutPlacedByNestedInput
    walletTransactions?: WalletTransactionUpdateManyWithoutUserNestedInput
    createdTransactions?: WalletTransactionUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAdminLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    ordersPlaced?: OrderUncheckedUpdateManyWithoutPlacedByNestedInput
    walletTransactions?: WalletTransactionUncheckedUpdateManyWithoutUserNestedInput
    createdTransactions?: WalletTransactionUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type LocationUpsertWithoutAdminLocationsInput = {
    update: XOR<LocationUpdateWithoutAdminLocationsInput, LocationUncheckedUpdateWithoutAdminLocationsInput>
    create: XOR<LocationCreateWithoutAdminLocationsInput, LocationUncheckedCreateWithoutAdminLocationsInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutAdminLocationsInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutAdminLocationsInput, LocationUncheckedUpdateWithoutAdminLocationsInput>
  }

  export type LocationUpdateWithoutAdminLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    defaultCutoffTime?: StringFieldUpdateOperationsInput | string
    dinnerEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutLocationNestedInput
    dailyMenus?: DailyMenuUpdateManyWithoutLocationNestedInput
    weekdayMenus?: WeekdayMenuUpdateManyWithoutLocationNestedInput
    orders?: OrderUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutAdminLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    defaultCutoffTime?: StringFieldUpdateOperationsInput | string
    dinnerEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutLocationNestedInput
    dailyMenus?: DailyMenuUncheckedUpdateManyWithoutLocationNestedInput
    weekdayMenus?: WeekdayMenuUncheckedUpdateManyWithoutLocationNestedInput
    orders?: OrderUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type DailyMenuCreateWithoutCatalogItemInput = {
    id?: string
    date: Date | string
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    cutoffAt?: Date | string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    location: LocationCreateNestedOneWithoutDailyMenusInput
    sourceWeekdayMenu?: WeekdayMenuCreateNestedOneWithoutDailyMenusInput
    orders?: OrderCreateNestedManyWithoutDailyMenuInput
  }

  export type DailyMenuUncheckedCreateWithoutCatalogItemInput = {
    id?: string
    locationId: string
    date: Date | string
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    sourceWeekdayMenuId?: string | null
    cutoffAt?: Date | string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutDailyMenuInput
  }

  export type DailyMenuCreateOrConnectWithoutCatalogItemInput = {
    where: DailyMenuWhereUniqueInput
    create: XOR<DailyMenuCreateWithoutCatalogItemInput, DailyMenuUncheckedCreateWithoutCatalogItemInput>
  }

  export type DailyMenuCreateManyCatalogItemInputEnvelope = {
    data: DailyMenuCreateManyCatalogItemInput | DailyMenuCreateManyCatalogItemInput[]
    skipDuplicates?: boolean
  }

  export type WeekdayMenuCreateWithoutCatalogItemInput = {
    id?: string
    weekday: $Enums.Weekday
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    location: LocationCreateNestedOneWithoutWeekdayMenusInput
    dailyMenus?: DailyMenuCreateNestedManyWithoutSourceWeekdayMenuInput
  }

  export type WeekdayMenuUncheckedCreateWithoutCatalogItemInput = {
    id?: string
    locationId: string
    weekday: $Enums.Weekday
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dailyMenus?: DailyMenuUncheckedCreateNestedManyWithoutSourceWeekdayMenuInput
  }

  export type WeekdayMenuCreateOrConnectWithoutCatalogItemInput = {
    where: WeekdayMenuWhereUniqueInput
    create: XOR<WeekdayMenuCreateWithoutCatalogItemInput, WeekdayMenuUncheckedCreateWithoutCatalogItemInput>
  }

  export type WeekdayMenuCreateManyCatalogItemInputEnvelope = {
    data: WeekdayMenuCreateManyCatalogItemInput | WeekdayMenuCreateManyCatalogItemInput[]
    skipDuplicates?: boolean
  }

  export type DailyMenuUpsertWithWhereUniqueWithoutCatalogItemInput = {
    where: DailyMenuWhereUniqueInput
    update: XOR<DailyMenuUpdateWithoutCatalogItemInput, DailyMenuUncheckedUpdateWithoutCatalogItemInput>
    create: XOR<DailyMenuCreateWithoutCatalogItemInput, DailyMenuUncheckedCreateWithoutCatalogItemInput>
  }

  export type DailyMenuUpdateWithWhereUniqueWithoutCatalogItemInput = {
    where: DailyMenuWhereUniqueInput
    data: XOR<DailyMenuUpdateWithoutCatalogItemInput, DailyMenuUncheckedUpdateWithoutCatalogItemInput>
  }

  export type DailyMenuUpdateManyWithWhereWithoutCatalogItemInput = {
    where: DailyMenuScalarWhereInput
    data: XOR<DailyMenuUpdateManyMutationInput, DailyMenuUncheckedUpdateManyWithoutCatalogItemInput>
  }

  export type WeekdayMenuUpsertWithWhereUniqueWithoutCatalogItemInput = {
    where: WeekdayMenuWhereUniqueInput
    update: XOR<WeekdayMenuUpdateWithoutCatalogItemInput, WeekdayMenuUncheckedUpdateWithoutCatalogItemInput>
    create: XOR<WeekdayMenuCreateWithoutCatalogItemInput, WeekdayMenuUncheckedCreateWithoutCatalogItemInput>
  }

  export type WeekdayMenuUpdateWithWhereUniqueWithoutCatalogItemInput = {
    where: WeekdayMenuWhereUniqueInput
    data: XOR<WeekdayMenuUpdateWithoutCatalogItemInput, WeekdayMenuUncheckedUpdateWithoutCatalogItemInput>
  }

  export type WeekdayMenuUpdateManyWithWhereWithoutCatalogItemInput = {
    where: WeekdayMenuScalarWhereInput
    data: XOR<WeekdayMenuUpdateManyMutationInput, WeekdayMenuUncheckedUpdateManyWithoutCatalogItemInput>
  }

  export type LocationCreateWithoutWeekdayMenusInput = {
    id?: string
    name: string
    address?: string | null
    defaultCutoffTime?: string
    dinnerEnabled?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutLocationInput
    adminLocations?: AdminLocationCreateNestedManyWithoutLocationInput
    dailyMenus?: DailyMenuCreateNestedManyWithoutLocationInput
    orders?: OrderCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateWithoutWeekdayMenusInput = {
    id?: string
    name: string
    address?: string | null
    defaultCutoffTime?: string
    dinnerEnabled?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutLocationInput
    adminLocations?: AdminLocationUncheckedCreateNestedManyWithoutLocationInput
    dailyMenus?: DailyMenuUncheckedCreateNestedManyWithoutLocationInput
    orders?: OrderUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationCreateOrConnectWithoutWeekdayMenusInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutWeekdayMenusInput, LocationUncheckedCreateWithoutWeekdayMenusInput>
  }

  export type MealCatalogCreateWithoutWeekdayMenusInput = {
    id?: string
    name: string
    description?: string | null
    imageUrl?: string | null
    defaultPrice: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dailyMenus?: DailyMenuCreateNestedManyWithoutCatalogItemInput
  }

  export type MealCatalogUncheckedCreateWithoutWeekdayMenusInput = {
    id?: string
    name: string
    description?: string | null
    imageUrl?: string | null
    defaultPrice: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dailyMenus?: DailyMenuUncheckedCreateNestedManyWithoutCatalogItemInput
  }

  export type MealCatalogCreateOrConnectWithoutWeekdayMenusInput = {
    where: MealCatalogWhereUniqueInput
    create: XOR<MealCatalogCreateWithoutWeekdayMenusInput, MealCatalogUncheckedCreateWithoutWeekdayMenusInput>
  }

  export type DailyMenuCreateWithoutSourceWeekdayMenuInput = {
    id?: string
    date: Date | string
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    cutoffAt?: Date | string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    location: LocationCreateNestedOneWithoutDailyMenusInput
    catalogItem?: MealCatalogCreateNestedOneWithoutDailyMenusInput
    orders?: OrderCreateNestedManyWithoutDailyMenuInput
  }

  export type DailyMenuUncheckedCreateWithoutSourceWeekdayMenuInput = {
    id?: string
    locationId: string
    date: Date | string
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    catalogItemId?: string | null
    cutoffAt?: Date | string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutDailyMenuInput
  }

  export type DailyMenuCreateOrConnectWithoutSourceWeekdayMenuInput = {
    where: DailyMenuWhereUniqueInput
    create: XOR<DailyMenuCreateWithoutSourceWeekdayMenuInput, DailyMenuUncheckedCreateWithoutSourceWeekdayMenuInput>
  }

  export type DailyMenuCreateManySourceWeekdayMenuInputEnvelope = {
    data: DailyMenuCreateManySourceWeekdayMenuInput | DailyMenuCreateManySourceWeekdayMenuInput[]
    skipDuplicates?: boolean
  }

  export type LocationUpsertWithoutWeekdayMenusInput = {
    update: XOR<LocationUpdateWithoutWeekdayMenusInput, LocationUncheckedUpdateWithoutWeekdayMenusInput>
    create: XOR<LocationCreateWithoutWeekdayMenusInput, LocationUncheckedCreateWithoutWeekdayMenusInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutWeekdayMenusInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutWeekdayMenusInput, LocationUncheckedUpdateWithoutWeekdayMenusInput>
  }

  export type LocationUpdateWithoutWeekdayMenusInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    defaultCutoffTime?: StringFieldUpdateOperationsInput | string
    dinnerEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutLocationNestedInput
    adminLocations?: AdminLocationUpdateManyWithoutLocationNestedInput
    dailyMenus?: DailyMenuUpdateManyWithoutLocationNestedInput
    orders?: OrderUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutWeekdayMenusInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    defaultCutoffTime?: StringFieldUpdateOperationsInput | string
    dinnerEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutLocationNestedInput
    adminLocations?: AdminLocationUncheckedUpdateManyWithoutLocationNestedInput
    dailyMenus?: DailyMenuUncheckedUpdateManyWithoutLocationNestedInput
    orders?: OrderUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type MealCatalogUpsertWithoutWeekdayMenusInput = {
    update: XOR<MealCatalogUpdateWithoutWeekdayMenusInput, MealCatalogUncheckedUpdateWithoutWeekdayMenusInput>
    create: XOR<MealCatalogCreateWithoutWeekdayMenusInput, MealCatalogUncheckedCreateWithoutWeekdayMenusInput>
    where?: MealCatalogWhereInput
  }

  export type MealCatalogUpdateToOneWithWhereWithoutWeekdayMenusInput = {
    where?: MealCatalogWhereInput
    data: XOR<MealCatalogUpdateWithoutWeekdayMenusInput, MealCatalogUncheckedUpdateWithoutWeekdayMenusInput>
  }

  export type MealCatalogUpdateWithoutWeekdayMenusInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultPrice?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyMenus?: DailyMenuUpdateManyWithoutCatalogItemNestedInput
  }

  export type MealCatalogUncheckedUpdateWithoutWeekdayMenusInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultPrice?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyMenus?: DailyMenuUncheckedUpdateManyWithoutCatalogItemNestedInput
  }

  export type DailyMenuUpsertWithWhereUniqueWithoutSourceWeekdayMenuInput = {
    where: DailyMenuWhereUniqueInput
    update: XOR<DailyMenuUpdateWithoutSourceWeekdayMenuInput, DailyMenuUncheckedUpdateWithoutSourceWeekdayMenuInput>
    create: XOR<DailyMenuCreateWithoutSourceWeekdayMenuInput, DailyMenuUncheckedCreateWithoutSourceWeekdayMenuInput>
  }

  export type DailyMenuUpdateWithWhereUniqueWithoutSourceWeekdayMenuInput = {
    where: DailyMenuWhereUniqueInput
    data: XOR<DailyMenuUpdateWithoutSourceWeekdayMenuInput, DailyMenuUncheckedUpdateWithoutSourceWeekdayMenuInput>
  }

  export type DailyMenuUpdateManyWithWhereWithoutSourceWeekdayMenuInput = {
    where: DailyMenuScalarWhereInput
    data: XOR<DailyMenuUpdateManyMutationInput, DailyMenuUncheckedUpdateManyWithoutSourceWeekdayMenuInput>
  }

  export type LocationCreateWithoutDailyMenusInput = {
    id?: string
    name: string
    address?: string | null
    defaultCutoffTime?: string
    dinnerEnabled?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutLocationInput
    adminLocations?: AdminLocationCreateNestedManyWithoutLocationInput
    weekdayMenus?: WeekdayMenuCreateNestedManyWithoutLocationInput
    orders?: OrderCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateWithoutDailyMenusInput = {
    id?: string
    name: string
    address?: string | null
    defaultCutoffTime?: string
    dinnerEnabled?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutLocationInput
    adminLocations?: AdminLocationUncheckedCreateNestedManyWithoutLocationInput
    weekdayMenus?: WeekdayMenuUncheckedCreateNestedManyWithoutLocationInput
    orders?: OrderUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationCreateOrConnectWithoutDailyMenusInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutDailyMenusInput, LocationUncheckedCreateWithoutDailyMenusInput>
  }

  export type MealCatalogCreateWithoutDailyMenusInput = {
    id?: string
    name: string
    description?: string | null
    imageUrl?: string | null
    defaultPrice: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    weekdayMenus?: WeekdayMenuCreateNestedManyWithoutCatalogItemInput
  }

  export type MealCatalogUncheckedCreateWithoutDailyMenusInput = {
    id?: string
    name: string
    description?: string | null
    imageUrl?: string | null
    defaultPrice: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    weekdayMenus?: WeekdayMenuUncheckedCreateNestedManyWithoutCatalogItemInput
  }

  export type MealCatalogCreateOrConnectWithoutDailyMenusInput = {
    where: MealCatalogWhereUniqueInput
    create: XOR<MealCatalogCreateWithoutDailyMenusInput, MealCatalogUncheckedCreateWithoutDailyMenusInput>
  }

  export type WeekdayMenuCreateWithoutDailyMenusInput = {
    id?: string
    weekday: $Enums.Weekday
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    location: LocationCreateNestedOneWithoutWeekdayMenusInput
    catalogItem?: MealCatalogCreateNestedOneWithoutWeekdayMenusInput
  }

  export type WeekdayMenuUncheckedCreateWithoutDailyMenusInput = {
    id?: string
    locationId: string
    weekday: $Enums.Weekday
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    catalogItemId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeekdayMenuCreateOrConnectWithoutDailyMenusInput = {
    where: WeekdayMenuWhereUniqueInput
    create: XOR<WeekdayMenuCreateWithoutDailyMenusInput, WeekdayMenuUncheckedCreateWithoutDailyMenusInput>
  }

  export type OrderCreateWithoutDailyMenuInput = {
    id?: string
    amount: number
    note?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    deliveredAt?: Date | string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOrdersInput
    placedBy?: UserCreateNestedOneWithoutOrdersPlacedInput
    location: LocationCreateNestedOneWithoutOrdersInput
    walletTxs?: WalletTransactionCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutDailyMenuInput = {
    id?: string
    userId: string
    locationId: string
    amount: number
    note?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    deliveredAt?: Date | string | null
    paidAt?: Date | string | null
    placedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    walletTxs?: WalletTransactionUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutDailyMenuInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutDailyMenuInput, OrderUncheckedCreateWithoutDailyMenuInput>
  }

  export type OrderCreateManyDailyMenuInputEnvelope = {
    data: OrderCreateManyDailyMenuInput | OrderCreateManyDailyMenuInput[]
    skipDuplicates?: boolean
  }

  export type LocationUpsertWithoutDailyMenusInput = {
    update: XOR<LocationUpdateWithoutDailyMenusInput, LocationUncheckedUpdateWithoutDailyMenusInput>
    create: XOR<LocationCreateWithoutDailyMenusInput, LocationUncheckedCreateWithoutDailyMenusInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutDailyMenusInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutDailyMenusInput, LocationUncheckedUpdateWithoutDailyMenusInput>
  }

  export type LocationUpdateWithoutDailyMenusInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    defaultCutoffTime?: StringFieldUpdateOperationsInput | string
    dinnerEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutLocationNestedInput
    adminLocations?: AdminLocationUpdateManyWithoutLocationNestedInput
    weekdayMenus?: WeekdayMenuUpdateManyWithoutLocationNestedInput
    orders?: OrderUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutDailyMenusInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    defaultCutoffTime?: StringFieldUpdateOperationsInput | string
    dinnerEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutLocationNestedInput
    adminLocations?: AdminLocationUncheckedUpdateManyWithoutLocationNestedInput
    weekdayMenus?: WeekdayMenuUncheckedUpdateManyWithoutLocationNestedInput
    orders?: OrderUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type MealCatalogUpsertWithoutDailyMenusInput = {
    update: XOR<MealCatalogUpdateWithoutDailyMenusInput, MealCatalogUncheckedUpdateWithoutDailyMenusInput>
    create: XOR<MealCatalogCreateWithoutDailyMenusInput, MealCatalogUncheckedCreateWithoutDailyMenusInput>
    where?: MealCatalogWhereInput
  }

  export type MealCatalogUpdateToOneWithWhereWithoutDailyMenusInput = {
    where?: MealCatalogWhereInput
    data: XOR<MealCatalogUpdateWithoutDailyMenusInput, MealCatalogUncheckedUpdateWithoutDailyMenusInput>
  }

  export type MealCatalogUpdateWithoutDailyMenusInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultPrice?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weekdayMenus?: WeekdayMenuUpdateManyWithoutCatalogItemNestedInput
  }

  export type MealCatalogUncheckedUpdateWithoutDailyMenusInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultPrice?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weekdayMenus?: WeekdayMenuUncheckedUpdateManyWithoutCatalogItemNestedInput
  }

  export type WeekdayMenuUpsertWithoutDailyMenusInput = {
    update: XOR<WeekdayMenuUpdateWithoutDailyMenusInput, WeekdayMenuUncheckedUpdateWithoutDailyMenusInput>
    create: XOR<WeekdayMenuCreateWithoutDailyMenusInput, WeekdayMenuUncheckedCreateWithoutDailyMenusInput>
    where?: WeekdayMenuWhereInput
  }

  export type WeekdayMenuUpdateToOneWithWhereWithoutDailyMenusInput = {
    where?: WeekdayMenuWhereInput
    data: XOR<WeekdayMenuUpdateWithoutDailyMenusInput, WeekdayMenuUncheckedUpdateWithoutDailyMenusInput>
  }

  export type WeekdayMenuUpdateWithoutDailyMenusInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekday?: EnumWeekdayFieldUpdateOperationsInput | $Enums.Weekday
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneRequiredWithoutWeekdayMenusNestedInput
    catalogItem?: MealCatalogUpdateOneWithoutWeekdayMenusNestedInput
  }

  export type WeekdayMenuUncheckedUpdateWithoutDailyMenusInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    weekday?: EnumWeekdayFieldUpdateOperationsInput | $Enums.Weekday
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    catalogItemId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpsertWithWhereUniqueWithoutDailyMenuInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutDailyMenuInput, OrderUncheckedUpdateWithoutDailyMenuInput>
    create: XOR<OrderCreateWithoutDailyMenuInput, OrderUncheckedCreateWithoutDailyMenuInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutDailyMenuInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutDailyMenuInput, OrderUncheckedUpdateWithoutDailyMenuInput>
  }

  export type OrderUpdateManyWithWhereWithoutDailyMenuInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutDailyMenuInput>
  }

  export type UserCreateWithoutOrdersInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    employeeId?: string | null
    phoneNumber?: string | null
    deskNumber?: string | null
    buildingNumber?: string | null
    floorNumber?: string | null
    paymentMode?: $Enums.PaymentMode
    balance?: number
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: LocationCreateNestedOneWithoutUsersInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    adminLocations?: AdminLocationCreateNestedManyWithoutUserInput
    ordersPlaced?: OrderCreateNestedManyWithoutPlacedByInput
    walletTransactions?: WalletTransactionCreateNestedManyWithoutUserInput
    createdTransactions?: WalletTransactionCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutOrdersInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    employeeId?: string | null
    phoneNumber?: string | null
    deskNumber?: string | null
    buildingNumber?: string | null
    floorNumber?: string | null
    locationId?: string | null
    paymentMode?: $Enums.PaymentMode
    balance?: number
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    adminLocations?: AdminLocationUncheckedCreateNestedManyWithoutUserInput
    ordersPlaced?: OrderUncheckedCreateNestedManyWithoutPlacedByInput
    walletTransactions?: WalletTransactionUncheckedCreateNestedManyWithoutUserInput
    createdTransactions?: WalletTransactionUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutOrdersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
  }

  export type UserCreateWithoutOrdersPlacedInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    employeeId?: string | null
    phoneNumber?: string | null
    deskNumber?: string | null
    buildingNumber?: string | null
    floorNumber?: string | null
    paymentMode?: $Enums.PaymentMode
    balance?: number
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: LocationCreateNestedOneWithoutUsersInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    adminLocations?: AdminLocationCreateNestedManyWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    walletTransactions?: WalletTransactionCreateNestedManyWithoutUserInput
    createdTransactions?: WalletTransactionCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutOrdersPlacedInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    employeeId?: string | null
    phoneNumber?: string | null
    deskNumber?: string | null
    buildingNumber?: string | null
    floorNumber?: string | null
    locationId?: string | null
    paymentMode?: $Enums.PaymentMode
    balance?: number
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    adminLocations?: AdminLocationUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    walletTransactions?: WalletTransactionUncheckedCreateNestedManyWithoutUserInput
    createdTransactions?: WalletTransactionUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutOrdersPlacedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrdersPlacedInput, UserUncheckedCreateWithoutOrdersPlacedInput>
  }

  export type DailyMenuCreateWithoutOrdersInput = {
    id?: string
    date: Date | string
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    cutoffAt?: Date | string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    location: LocationCreateNestedOneWithoutDailyMenusInput
    catalogItem?: MealCatalogCreateNestedOneWithoutDailyMenusInput
    sourceWeekdayMenu?: WeekdayMenuCreateNestedOneWithoutDailyMenusInput
  }

  export type DailyMenuUncheckedCreateWithoutOrdersInput = {
    id?: string
    locationId: string
    date: Date | string
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    catalogItemId?: string | null
    sourceWeekdayMenuId?: string | null
    cutoffAt?: Date | string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyMenuCreateOrConnectWithoutOrdersInput = {
    where: DailyMenuWhereUniqueInput
    create: XOR<DailyMenuCreateWithoutOrdersInput, DailyMenuUncheckedCreateWithoutOrdersInput>
  }

  export type LocationCreateWithoutOrdersInput = {
    id?: string
    name: string
    address?: string | null
    defaultCutoffTime?: string
    dinnerEnabled?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutLocationInput
    adminLocations?: AdminLocationCreateNestedManyWithoutLocationInput
    dailyMenus?: DailyMenuCreateNestedManyWithoutLocationInput
    weekdayMenus?: WeekdayMenuCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateWithoutOrdersInput = {
    id?: string
    name: string
    address?: string | null
    defaultCutoffTime?: string
    dinnerEnabled?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutLocationInput
    adminLocations?: AdminLocationUncheckedCreateNestedManyWithoutLocationInput
    dailyMenus?: DailyMenuUncheckedCreateNestedManyWithoutLocationInput
    weekdayMenus?: WeekdayMenuUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationCreateOrConnectWithoutOrdersInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutOrdersInput, LocationUncheckedCreateWithoutOrdersInput>
  }

  export type WalletTransactionCreateWithoutOrderInput = {
    id?: string
    type: $Enums.WalletTxType
    amount: number
    balanceAfter: number
    note?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutWalletTransactionsInput
    createdBy?: UserCreateNestedOneWithoutCreatedTransactionsInput
  }

  export type WalletTransactionUncheckedCreateWithoutOrderInput = {
    id?: string
    userId: string
    type: $Enums.WalletTxType
    amount: number
    balanceAfter: number
    createdById?: string | null
    note?: string | null
    createdAt?: Date | string
  }

  export type WalletTransactionCreateOrConnectWithoutOrderInput = {
    where: WalletTransactionWhereUniqueInput
    create: XOR<WalletTransactionCreateWithoutOrderInput, WalletTransactionUncheckedCreateWithoutOrderInput>
  }

  export type WalletTransactionCreateManyOrderInputEnvelope = {
    data: WalletTransactionCreateManyOrderInput | WalletTransactionCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOrdersInput = {
    update: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type UserUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneWithoutUsersNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    adminLocations?: AdminLocationUpdateManyWithoutUserNestedInput
    ordersPlaced?: OrderUpdateManyWithoutPlacedByNestedInput
    walletTransactions?: WalletTransactionUpdateManyWithoutUserNestedInput
    createdTransactions?: WalletTransactionUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    adminLocations?: AdminLocationUncheckedUpdateManyWithoutUserNestedInput
    ordersPlaced?: OrderUncheckedUpdateManyWithoutPlacedByNestedInput
    walletTransactions?: WalletTransactionUncheckedUpdateManyWithoutUserNestedInput
    createdTransactions?: WalletTransactionUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUpsertWithoutOrdersPlacedInput = {
    update: XOR<UserUpdateWithoutOrdersPlacedInput, UserUncheckedUpdateWithoutOrdersPlacedInput>
    create: XOR<UserCreateWithoutOrdersPlacedInput, UserUncheckedCreateWithoutOrdersPlacedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrdersPlacedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrdersPlacedInput, UserUncheckedUpdateWithoutOrdersPlacedInput>
  }

  export type UserUpdateWithoutOrdersPlacedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneWithoutUsersNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    adminLocations?: AdminLocationUpdateManyWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    walletTransactions?: WalletTransactionUpdateManyWithoutUserNestedInput
    createdTransactions?: WalletTransactionUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutOrdersPlacedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    adminLocations?: AdminLocationUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    walletTransactions?: WalletTransactionUncheckedUpdateManyWithoutUserNestedInput
    createdTransactions?: WalletTransactionUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type DailyMenuUpsertWithoutOrdersInput = {
    update: XOR<DailyMenuUpdateWithoutOrdersInput, DailyMenuUncheckedUpdateWithoutOrdersInput>
    create: XOR<DailyMenuCreateWithoutOrdersInput, DailyMenuUncheckedCreateWithoutOrdersInput>
    where?: DailyMenuWhereInput
  }

  export type DailyMenuUpdateToOneWithWhereWithoutOrdersInput = {
    where?: DailyMenuWhereInput
    data: XOR<DailyMenuUpdateWithoutOrdersInput, DailyMenuUncheckedUpdateWithoutOrdersInput>
  }

  export type DailyMenuUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cutoffAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneRequiredWithoutDailyMenusNestedInput
    catalogItem?: MealCatalogUpdateOneWithoutDailyMenusNestedInput
    sourceWeekdayMenu?: WeekdayMenuUpdateOneWithoutDailyMenusNestedInput
  }

  export type DailyMenuUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    catalogItemId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceWeekdayMenuId?: NullableStringFieldUpdateOperationsInput | string | null
    cutoffAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationUpsertWithoutOrdersInput = {
    update: XOR<LocationUpdateWithoutOrdersInput, LocationUncheckedUpdateWithoutOrdersInput>
    create: XOR<LocationCreateWithoutOrdersInput, LocationUncheckedCreateWithoutOrdersInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutOrdersInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutOrdersInput, LocationUncheckedUpdateWithoutOrdersInput>
  }

  export type LocationUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    defaultCutoffTime?: StringFieldUpdateOperationsInput | string
    dinnerEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutLocationNestedInput
    adminLocations?: AdminLocationUpdateManyWithoutLocationNestedInput
    dailyMenus?: DailyMenuUpdateManyWithoutLocationNestedInput
    weekdayMenus?: WeekdayMenuUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    defaultCutoffTime?: StringFieldUpdateOperationsInput | string
    dinnerEnabled?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutLocationNestedInput
    adminLocations?: AdminLocationUncheckedUpdateManyWithoutLocationNestedInput
    dailyMenus?: DailyMenuUncheckedUpdateManyWithoutLocationNestedInput
    weekdayMenus?: WeekdayMenuUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type WalletTransactionUpsertWithWhereUniqueWithoutOrderInput = {
    where: WalletTransactionWhereUniqueInput
    update: XOR<WalletTransactionUpdateWithoutOrderInput, WalletTransactionUncheckedUpdateWithoutOrderInput>
    create: XOR<WalletTransactionCreateWithoutOrderInput, WalletTransactionUncheckedCreateWithoutOrderInput>
  }

  export type WalletTransactionUpdateWithWhereUniqueWithoutOrderInput = {
    where: WalletTransactionWhereUniqueInput
    data: XOR<WalletTransactionUpdateWithoutOrderInput, WalletTransactionUncheckedUpdateWithoutOrderInput>
  }

  export type WalletTransactionUpdateManyWithWhereWithoutOrderInput = {
    where: WalletTransactionScalarWhereInput
    data: XOR<WalletTransactionUpdateManyMutationInput, WalletTransactionUncheckedUpdateManyWithoutOrderInput>
  }

  export type UserCreateWithoutWalletTransactionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    employeeId?: string | null
    phoneNumber?: string | null
    deskNumber?: string | null
    buildingNumber?: string | null
    floorNumber?: string | null
    paymentMode?: $Enums.PaymentMode
    balance?: number
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: LocationCreateNestedOneWithoutUsersInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    adminLocations?: AdminLocationCreateNestedManyWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    ordersPlaced?: OrderCreateNestedManyWithoutPlacedByInput
    createdTransactions?: WalletTransactionCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutWalletTransactionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    employeeId?: string | null
    phoneNumber?: string | null
    deskNumber?: string | null
    buildingNumber?: string | null
    floorNumber?: string | null
    locationId?: string | null
    paymentMode?: $Enums.PaymentMode
    balance?: number
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    adminLocations?: AdminLocationUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    ordersPlaced?: OrderUncheckedCreateNestedManyWithoutPlacedByInput
    createdTransactions?: WalletTransactionUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutWalletTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWalletTransactionsInput, UserUncheckedCreateWithoutWalletTransactionsInput>
  }

  export type OrderCreateWithoutWalletTxsInput = {
    id?: string
    amount: number
    note?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    deliveredAt?: Date | string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOrdersInput
    placedBy?: UserCreateNestedOneWithoutOrdersPlacedInput
    dailyMenu: DailyMenuCreateNestedOneWithoutOrdersInput
    location: LocationCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutWalletTxsInput = {
    id?: string
    userId: string
    dailyMenuId: string
    locationId: string
    amount: number
    note?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    deliveredAt?: Date | string | null
    paidAt?: Date | string | null
    placedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateOrConnectWithoutWalletTxsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutWalletTxsInput, OrderUncheckedCreateWithoutWalletTxsInput>
  }

  export type UserCreateWithoutCreatedTransactionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    employeeId?: string | null
    phoneNumber?: string | null
    deskNumber?: string | null
    buildingNumber?: string | null
    floorNumber?: string | null
    paymentMode?: $Enums.PaymentMode
    balance?: number
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: LocationCreateNestedOneWithoutUsersInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    adminLocations?: AdminLocationCreateNestedManyWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    ordersPlaced?: OrderCreateNestedManyWithoutPlacedByInput
    walletTransactions?: WalletTransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedTransactionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    employeeId?: string | null
    phoneNumber?: string | null
    deskNumber?: string | null
    buildingNumber?: string | null
    floorNumber?: string | null
    locationId?: string | null
    paymentMode?: $Enums.PaymentMode
    balance?: number
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    adminLocations?: AdminLocationUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    ordersPlaced?: OrderUncheckedCreateNestedManyWithoutPlacedByInput
    walletTransactions?: WalletTransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedTransactionsInput, UserUncheckedCreateWithoutCreatedTransactionsInput>
  }

  export type UserUpsertWithoutWalletTransactionsInput = {
    update: XOR<UserUpdateWithoutWalletTransactionsInput, UserUncheckedUpdateWithoutWalletTransactionsInput>
    create: XOR<UserCreateWithoutWalletTransactionsInput, UserUncheckedCreateWithoutWalletTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWalletTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWalletTransactionsInput, UserUncheckedUpdateWithoutWalletTransactionsInput>
  }

  export type UserUpdateWithoutWalletTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneWithoutUsersNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    adminLocations?: AdminLocationUpdateManyWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    ordersPlaced?: OrderUpdateManyWithoutPlacedByNestedInput
    createdTransactions?: WalletTransactionUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutWalletTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    adminLocations?: AdminLocationUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    ordersPlaced?: OrderUncheckedUpdateManyWithoutPlacedByNestedInput
    createdTransactions?: WalletTransactionUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type OrderUpsertWithoutWalletTxsInput = {
    update: XOR<OrderUpdateWithoutWalletTxsInput, OrderUncheckedUpdateWithoutWalletTxsInput>
    create: XOR<OrderCreateWithoutWalletTxsInput, OrderUncheckedCreateWithoutWalletTxsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutWalletTxsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutWalletTxsInput, OrderUncheckedUpdateWithoutWalletTxsInput>
  }

  export type OrderUpdateWithoutWalletTxsInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    placedBy?: UserUpdateOneWithoutOrdersPlacedNestedInput
    dailyMenu?: DailyMenuUpdateOneRequiredWithoutOrdersNestedInput
    location?: LocationUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutWalletTxsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dailyMenuId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    placedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutCreatedTransactionsInput = {
    update: XOR<UserUpdateWithoutCreatedTransactionsInput, UserUncheckedUpdateWithoutCreatedTransactionsInput>
    create: XOR<UserCreateWithoutCreatedTransactionsInput, UserUncheckedCreateWithoutCreatedTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedTransactionsInput, UserUncheckedUpdateWithoutCreatedTransactionsInput>
  }

  export type UserUpdateWithoutCreatedTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneWithoutUsersNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    adminLocations?: AdminLocationUpdateManyWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    ordersPlaced?: OrderUpdateManyWithoutPlacedByNestedInput
    walletTransactions?: WalletTransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    locationId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    adminLocations?: AdminLocationUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    ordersPlaced?: OrderUncheckedUpdateManyWithoutPlacedByNestedInput
    walletTransactions?: WalletTransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type AdminLocationCreateManyUserInput = {
    id?: string
    locationId: string
  }

  export type OrderCreateManyUserInput = {
    id?: string
    dailyMenuId: string
    locationId: string
    amount: number
    note?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    deliveredAt?: Date | string | null
    paidAt?: Date | string | null
    placedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateManyPlacedByInput = {
    id?: string
    userId: string
    dailyMenuId: string
    locationId: string
    amount: number
    note?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    deliveredAt?: Date | string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WalletTransactionCreateManyUserInput = {
    id?: string
    type: $Enums.WalletTxType
    amount: number
    balanceAfter: number
    orderId?: string | null
    createdById?: string | null
    note?: string | null
    createdAt?: Date | string
  }

  export type WalletTransactionCreateManyCreatedByInput = {
    id?: string
    userId: string
    type: $Enums.WalletTxType
    amount: number
    balanceAfter: number
    orderId?: string | null
    note?: string | null
    createdAt?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminLocationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    location?: LocationUpdateOneRequiredWithoutAdminLocationsNestedInput
  }

  export type AdminLocationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
  }

  export type AdminLocationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
  }

  export type OrderUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    placedBy?: UserUpdateOneWithoutOrdersPlacedNestedInput
    dailyMenu?: DailyMenuUpdateOneRequiredWithoutOrdersNestedInput
    location?: LocationUpdateOneRequiredWithoutOrdersNestedInput
    walletTxs?: WalletTransactionUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    dailyMenuId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    placedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletTxs?: WalletTransactionUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    dailyMenuId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    placedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutPlacedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    dailyMenu?: DailyMenuUpdateOneRequiredWithoutOrdersNestedInput
    location?: LocationUpdateOneRequiredWithoutOrdersNestedInput
    walletTxs?: WalletTransactionUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutPlacedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dailyMenuId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletTxs?: WalletTransactionUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutPlacedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dailyMenuId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletTransactionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumWalletTxTypeFieldUpdateOperationsInput | $Enums.WalletTxType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneWithoutWalletTxsNestedInput
    createdBy?: UserUpdateOneWithoutCreatedTransactionsNestedInput
  }

  export type WalletTransactionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumWalletTxTypeFieldUpdateOperationsInput | $Enums.WalletTxType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletTransactionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumWalletTxTypeFieldUpdateOperationsInput | $Enums.WalletTxType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletTransactionUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumWalletTxTypeFieldUpdateOperationsInput | $Enums.WalletTxType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWalletTransactionsNestedInput
    order?: OrderUpdateOneWithoutWalletTxsNestedInput
  }

  export type WalletTransactionUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumWalletTxTypeFieldUpdateOperationsInput | $Enums.WalletTxType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletTransactionUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumWalletTxTypeFieldUpdateOperationsInput | $Enums.WalletTxType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyLocationInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: $Enums.Role
    employeeId?: string | null
    phoneNumber?: string | null
    deskNumber?: string | null
    buildingNumber?: string | null
    floorNumber?: string | null
    paymentMode?: $Enums.PaymentMode
    balance?: number
    profileComplete?: boolean
    isBanned?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminLocationCreateManyLocationInput = {
    id?: string
    userId: string
  }

  export type DailyMenuCreateManyLocationInput = {
    id?: string
    date: Date | string
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    catalogItemId?: string | null
    sourceWeekdayMenuId?: string | null
    cutoffAt?: Date | string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeekdayMenuCreateManyLocationInput = {
    id?: string
    weekday: $Enums.Weekday
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    catalogItemId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateManyLocationInput = {
    id?: string
    userId: string
    dailyMenuId: string
    amount: number
    note?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    deliveredAt?: Date | string | null
    paidAt?: Date | string | null
    placedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    adminLocations?: AdminLocationUpdateManyWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    ordersPlaced?: OrderUpdateManyWithoutPlacedByNestedInput
    walletTransactions?: WalletTransactionUpdateManyWithoutUserNestedInput
    createdTransactions?: WalletTransactionUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    adminLocations?: AdminLocationUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    ordersPlaced?: OrderUncheckedUpdateManyWithoutPlacedByNestedInput
    walletTransactions?: WalletTransactionUncheckedUpdateManyWithoutUserNestedInput
    createdTransactions?: WalletTransactionUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateManyWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    deskNumber?: NullableStringFieldUpdateOperationsInput | string | null
    buildingNumber?: NullableStringFieldUpdateOperationsInput | string | null
    floorNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMode?: EnumPaymentModeFieldUpdateOperationsInput | $Enums.PaymentMode
    balance?: IntFieldUpdateOperationsInput | number
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    isBanned?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminLocationUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutAdminLocationsNestedInput
  }

  export type AdminLocationUncheckedUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AdminLocationUncheckedUpdateManyWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type DailyMenuUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cutoffAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    catalogItem?: MealCatalogUpdateOneWithoutDailyMenusNestedInput
    sourceWeekdayMenu?: WeekdayMenuUpdateOneWithoutDailyMenusNestedInput
    orders?: OrderUpdateManyWithoutDailyMenuNestedInput
  }

  export type DailyMenuUncheckedUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    catalogItemId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceWeekdayMenuId?: NullableStringFieldUpdateOperationsInput | string | null
    cutoffAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutDailyMenuNestedInput
  }

  export type DailyMenuUncheckedUpdateManyWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    catalogItemId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceWeekdayMenuId?: NullableStringFieldUpdateOperationsInput | string | null
    cutoffAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeekdayMenuUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekday?: EnumWeekdayFieldUpdateOperationsInput | $Enums.Weekday
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    catalogItem?: MealCatalogUpdateOneWithoutWeekdayMenusNestedInput
    dailyMenus?: DailyMenuUpdateManyWithoutSourceWeekdayMenuNestedInput
  }

  export type WeekdayMenuUncheckedUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekday?: EnumWeekdayFieldUpdateOperationsInput | $Enums.Weekday
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    catalogItemId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyMenus?: DailyMenuUncheckedUpdateManyWithoutSourceWeekdayMenuNestedInput
  }

  export type WeekdayMenuUncheckedUpdateManyWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekday?: EnumWeekdayFieldUpdateOperationsInput | $Enums.Weekday
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    catalogItemId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    placedBy?: UserUpdateOneWithoutOrdersPlacedNestedInput
    dailyMenu?: DailyMenuUpdateOneRequiredWithoutOrdersNestedInput
    walletTxs?: WalletTransactionUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dailyMenuId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    placedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletTxs?: WalletTransactionUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    dailyMenuId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    placedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyMenuCreateManyCatalogItemInput = {
    id?: string
    locationId: string
    date: Date | string
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    sourceWeekdayMenuId?: string | null
    cutoffAt?: Date | string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WeekdayMenuCreateManyCatalogItemInput = {
    id?: string
    locationId: string
    weekday: $Enums.Weekday
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyMenuUpdateWithoutCatalogItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cutoffAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneRequiredWithoutDailyMenusNestedInput
    sourceWeekdayMenu?: WeekdayMenuUpdateOneWithoutDailyMenusNestedInput
    orders?: OrderUpdateManyWithoutDailyMenuNestedInput
  }

  export type DailyMenuUncheckedUpdateWithoutCatalogItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceWeekdayMenuId?: NullableStringFieldUpdateOperationsInput | string | null
    cutoffAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutDailyMenuNestedInput
  }

  export type DailyMenuUncheckedUpdateManyWithoutCatalogItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceWeekdayMenuId?: NullableStringFieldUpdateOperationsInput | string | null
    cutoffAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WeekdayMenuUpdateWithoutCatalogItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    weekday?: EnumWeekdayFieldUpdateOperationsInput | $Enums.Weekday
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneRequiredWithoutWeekdayMenusNestedInput
    dailyMenus?: DailyMenuUpdateManyWithoutSourceWeekdayMenuNestedInput
  }

  export type WeekdayMenuUncheckedUpdateWithoutCatalogItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    weekday?: EnumWeekdayFieldUpdateOperationsInput | $Enums.Weekday
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyMenus?: DailyMenuUncheckedUpdateManyWithoutSourceWeekdayMenuNestedInput
  }

  export type WeekdayMenuUncheckedUpdateManyWithoutCatalogItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    weekday?: EnumWeekdayFieldUpdateOperationsInput | $Enums.Weekday
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyMenuCreateManySourceWeekdayMenuInput = {
    id?: string
    locationId: string
    date: Date | string
    slot: $Enums.MealSlot
    title: string
    description?: string | null
    price: number
    imageUrl?: string | null
    catalogItemId?: string | null
    cutoffAt?: Date | string | null
    isPublished?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyMenuUpdateWithoutSourceWeekdayMenuInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cutoffAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneRequiredWithoutDailyMenusNestedInput
    catalogItem?: MealCatalogUpdateOneWithoutDailyMenusNestedInput
    orders?: OrderUpdateManyWithoutDailyMenuNestedInput
  }

  export type DailyMenuUncheckedUpdateWithoutSourceWeekdayMenuInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    catalogItemId?: NullableStringFieldUpdateOperationsInput | string | null
    cutoffAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutDailyMenuNestedInput
  }

  export type DailyMenuUncheckedUpdateManyWithoutSourceWeekdayMenuInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    slot?: EnumMealSlotFieldUpdateOperationsInput | $Enums.MealSlot
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    catalogItemId?: NullableStringFieldUpdateOperationsInput | string | null
    cutoffAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManyDailyMenuInput = {
    id?: string
    userId: string
    locationId: string
    amount: number
    note?: string | null
    status?: $Enums.OrderStatus
    paymentStatus?: $Enums.PaymentStatus
    deliveredAt?: Date | string | null
    paidAt?: Date | string | null
    placedById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateWithoutDailyMenuInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    placedBy?: UserUpdateOneWithoutOrdersPlacedNestedInput
    location?: LocationUpdateOneRequiredWithoutOrdersNestedInput
    walletTxs?: WalletTransactionUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutDailyMenuInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    placedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletTxs?: WalletTransactionUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutDailyMenuInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    placedById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletTransactionCreateManyOrderInput = {
    id?: string
    userId: string
    type: $Enums.WalletTxType
    amount: number
    balanceAfter: number
    createdById?: string | null
    note?: string | null
    createdAt?: Date | string
  }

  export type WalletTransactionUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumWalletTxTypeFieldUpdateOperationsInput | $Enums.WalletTxType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWalletTransactionsNestedInput
    createdBy?: UserUpdateOneWithoutCreatedTransactionsNestedInput
  }

  export type WalletTransactionUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumWalletTxTypeFieldUpdateOperationsInput | $Enums.WalletTxType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletTransactionUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumWalletTxTypeFieldUpdateOperationsInput | $Enums.WalletTxType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}