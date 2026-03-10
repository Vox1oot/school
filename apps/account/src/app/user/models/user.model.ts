import { Prop, Schema } from '@nestjs/mongoose';
import { IUser, UserRole } from '@school/interfaces';
import { Document } from 'mongoose';

@Schema()
export class User extends Document implements IUser {
  @Prop()
  displayName?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;
}
