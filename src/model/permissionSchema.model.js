import mongoose, { Schema, model } from 'mongoose'

const permissionSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
}, { timestamps: true })

export const Permission = mongoose.models.Permission || model("Permission", permissionSchema)