# TypeMongo-Repository
Base repository implementation for MongoDB using Mongoose and Typegoose.
## Usage
To use TypeMongo-Repository define your schema using Mongoose.
```typescript
export interface IUser extends Document {
    firstName: string;
    surname: string;
    email: string;
    dob: Date;
    password: string;
}

const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    dob: { type: Date, required: true },
    password: { type: String, required: true },
})

export const User: Model<IUser> = model('User', UserSchema);
```
Extend the RepositoryBase class from TypeMongo-Repoistory.
```typescript
export class UserRepository extends RepositoryBase<IUser> implements IUserRepository {
    public constructor() {
        super(User);
    }

    public async getByEmail(email: string): Promise<IUser | null> {
        return await this.GetByQuery({ email: email } as FilterQuery<IUser>)
    }
}
```
Use the repository as so.
```typescript
private readonly userRepository: UserRepository = new UserRepository();
public async createUser(user: IUser): Promise<boolean> {
        return await this.userRepository.Create(user);
    }
```
