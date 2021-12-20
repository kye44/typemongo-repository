import { mongoose } from '@typegoose/typegoose';
import { Document, FilterQuery, Model, Query, UpdateQuery } from 'mongoose';

export interface IRepositoryBase<T> {
    Create(item: T): Promise<T | null>;
    Update(_id: string, update: UpdateQuery<T>): Promise<boolean>;
    GetById(_id: string): Promise<Query<T, {}> | null>;
    GetAll(): Promise<Query<T[], {}>>;
    ClearAll(): Promise<void>;

}

export class RepositoryBase<T extends Document> implements IRepositoryBase<T>{
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    public async Create(item: T): Promise<T | null> {
        try {
            return await this.model.create(item);
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }

    public async Update(_id: string, update: UpdateQuery<T>): Promise<boolean> {
        try {
            await this.model.updateOne({ _id: new mongoose.Types.ObjectId(_id) } as FilterQuery<T>, update);
            return true;
        }
        catch {
            console.log(`Failed to update item with the ID of ${_id}`);
            return false;
        }
    }

    public async GetById(_id: string): Promise<Query<T, {}> | null> {
        return await this.model.findOne({ _id: new mongoose.Types.ObjectId(_id) } as FilterQuery<T>);
    }

    public async GetByQuery(query: FilterQuery<T>): Promise<Query<T, {}> | null> {
        return await this.model.findOne(query);
    }

    public async GetAllByQuery(query: FilterQuery<T>): Promise<Query<T[], {}> | null> {
        return await this.model.find(query);
    }
    public async GetAll(): Promise<Query<T[], {}>> {
        return await this.model.find();
    }

    public async Delete(_id: string): Promise<boolean> {
        try {
            await this.model.findOneAndRemove({ _id: new mongoose.Types.ObjectId(_id) } as FilterQuery<T>);
            return true
        }
        catch {
            console.log(`Failed to remove item with the ID of ${_id}`);
            return false;
        }
    }

    public async ClearAll(): Promise<void> {
        await this.model.deleteMany();
    }
}