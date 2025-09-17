type WithId<T> = T & { id: string }

type Unpack<T> = T extends Array<infer U> ? U
    : T extends ReadonlyArray<infer U> ? U : T
