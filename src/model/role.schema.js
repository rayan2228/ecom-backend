import mongoose, { Schema, model } from 'mongoose';

const roleSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    permissions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Permission"
        }
    ]
}, { timestamps: true });

export const Role = mongoose.models.Role || model("Role", roleSchema);