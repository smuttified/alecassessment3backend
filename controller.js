const { vehicles, bookings } = require("./model");
const app = require("./server");

exports.route = function () {
    app.instance.post("/getVehicles", async function (req, res) {
        res.send(await vehicles.find({}).exec());
    });
    app.instance.post("/getVehicleInfo", async function (req, res) {
        res.send(await vehicles.find({ name: decodeURIComponent(req.body.name) }).exec());
    });
    app.instance.post("/authentication", async function (req, res) {
        if (req.body.username === "admin" && req.body.password === "1234") {
            req.session.login_session = true;
            res.send({ id: req.session.id, session: req.session });
        } else {
            res.send({ session: false });
        }
    });
    app.instance.post("/saveBooking", async function (req, res) {
        const existing = await bookings.find({ vehicle_id: req.body.vehicle_id, date: new Date(decodeURIComponent(req.body.date.split("T")[0])), time: req.body.time });
        if (existing.length) {
            res.send({ status: "error", message: "The selected vehicle is already scheduled for the given date and time" });
        } else {
            await bookings.create(req.body);
            res.send({ status: "success", message: "You have been scheduled!" });
        }
    });
    app.instance.post("/admin/getVehicles", async function (req, res) {
        if (!req.body.cookieid) {
            res.send({ session: false });
        } else {
            res.send(await vehicles.find({}).exec());
        }
    });
    app.instance.post("/admin/getBookings", async function (req, res) {
        if (!req.body.cookieid) {
            res.send({ session: false });
        } else {
            res.send(await bookings.find({}).exec());
        }
    });
    app.instance.post("/admin/getVehicleInfo", async function (req, res) {
        if (!req.body.cookieid) {
            res.send({ session: false });
        } else {
            if (req.body.id === "new") {
                res.send({});
            } else {
                res.send(await vehicles.find({ _id: decodeURIComponent(req.body.id) }).exec());
            }
        }
    });
    app.instance.post("/admin/saveVehicle", async function (req, res) {
        if (!req.body.cookieid) {
            res.send({ session: false });
        } else {
            if (req.body._id) {
                res.send(await vehicles.findOneAndUpdate({ _id: req.body._id }, req.body));
            } else {
                res.send(await vehicles.create(req.body));
            }
        }
    });
    app.instance.post("/admin/deleteVehicle", async function (req, res) {
        if (!req.body.cookieid) {
            res.send({ session: false });
        } else {
            res.send(await vehicles.findOneAndDelete({ _id: req.body.id }).exec());
        }
    });

};