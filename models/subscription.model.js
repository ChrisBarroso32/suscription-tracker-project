import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    price: {
        type: Number,
        required: [true, "Recuerda pagar el precio de tu subscripción."],
        min: [0, "El precio a pagar debe ser mayor a 0."],
        max: [1000, "El precio a pagar debe ser menos a 1000."],
    },
    currency: {
        type: String,
        enum: ["EUR", "USD", "MXN"],
        default: "USD",
    },
    frequency: {
        type: String,
        enum: ["diario", "semanal", "mensual", "anual"],
        required: true,
    },
    cathegory:{
        type: String,
        enum: ["deportes", "entretenimiento", "noticias", "estilo de vida", "tecnología", "finanzas", "política", "otros"],
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["activo", "cancelado", "expirado"],
        default: "activo",
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'La fecha de inicio está en pasado.',
        }
    },
    renewalDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value >  this.startDate
            },
            message: 'La fecha renovación de subscripción debe ser después de la fecha de inicio.',
        },
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        index: true,
    }

}, { timestaps: true });

// Autocalcula el fecha de renovación si falta.
subscriptionSchema.pre("save", function (next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    //  Actualización del estado de la subscripción si pasa la fecha de renovación.
    if(this.renewalDate < new Date()) {
        this.status = "expirado";
    }

    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;