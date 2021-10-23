import { Document, FilterQuery, Model, Query, UpdateQuery } from 'mongoose';
export interface IRepositoryBase<T> {
    Create(item: T): Promise<boolean>;
    Update(_id: string, update: UpdateQuery<T>): Promise<boolean>;
    GetById(_id: string): Promise<Query<T, {}> | null>;
    GetAll(): Promise<Query<T[], {}>>;
    ClearAll(): Promise<void>;
}
export declare class RepositoryBase<T extends Document> implements IRepositoryBase<T> {
    private model;
    constructor(model: Model<T>);
    Create(item: T): Promise<boolean>;
    Update(_id: string, update: UpdateQuery<T>): Promise<boolean>;
    GetById(_id: string): Promise<Query<T, {}> | null>;
    GetByQuery(query: FilterQuery<T>): Promise<Query<T, {}> | null>;
    GetAll(): Promise<Query<T[], {}>>;
    Delete(_id: string): Promise<boolean>;
    ClearAll(): Promise<void>;
}
