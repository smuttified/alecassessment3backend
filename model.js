const app = require("./server");

/**
 *    Vehicles
 */
const vehicleSchema = new app.mongoose.Schema({
    name: String,
    image: String,
    description: String,
});

const vehicles = new app.mongoose.model("vehicle", vehicleSchema);

exports.createVehicle = async function () {
    await vehicles.createCollection();
};

exports.vehicles = vehicles;

/**
 *     Bookings
 */

const bookingSchema = new app.mongoose.Schema({
    name: String,
    contact_number: String,
    date: Date,
    time: Number,
    helper: Number,
    vehicle_id: String,
    pickup_location: String,
    destination_location: String
});

const bookings = new app.mongoose.model("booking", bookingSchema);

exports.createBooking = async function () {
    await bookings.createCollection();
};

exports.bookings = bookings;