const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const multer = require("multer");
const registeredUsers = require("./models/registeredUsers");
const modelEmployeeRegister = require("./models/modelEmployeeRegister");


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to DB..."))
.catch((error) => console.error("Problem connecting to DB:", error));

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./Images"),
    filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

// Registration form data handle
app.post("/register", (req, res) => {
    registeredUsers.findOne({ email: req.body.email })
        .then((user) => {
            if (user !== null) {
                res.json("Email already registered.");
            } else {
                const dataForDB = new registeredUsers(req.body);
                dataForDB.save()
                    .then(() => res.json("Input stored in DB successfully."))
                    .catch((error) => {
                        console.error("Error saving data:", error);
                        res.json("Data cannot be saved, problem at saving time.");
                    });
            }
        })
        .catch((error) => {
            console.error("Registration problem:", error);
            res.json("Registration problem.");
        });
});

// Handling Login Action
app.post("/login", (req, res) => {
    registeredUsers.findOne({ email: req.body.email })
        .then((user) => {
            if (user && user.cnfPassword === req.body.password) {
                res.json({ "status": "success", "id": user._id });
            } else {
                res.json({ "status": "fail" });
            }
        })
        .catch(() => res.json({ "status": "noUser" }));
});

// Respond data to the Dashboard component
app.get("/user/:ID", (req, res) => {
    const ID = req.params.ID;
    registeredUsers.findOne({ _id: ID })
        .then((user) => res.json(user.name))
        .catch(() => {
            console.error("Problem fetching user:", error);
            res.status(500).send("Problem fetching user.");
        });
});

// Storing create employee form data
app.post("/employees", upload.single("image"), (req, res) => {
    modelEmployeeRegister.findOne({ email: req.body.email })
        .then((user) => {
            if (user !== null) {
                res.json("Email already registered.");
            } else {
                const dataForDB = new modelEmployeeRegister({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    designation: req.body.designation,
                    gender: req.body.gender,
                    course: req.body.course,
                    image: req.file.filename
                });
                dataForDB.save()
                    .then(() => res.send("Input stored in DB successfully."))
                    .catch((error) => {
                        console.error("Error saving data:", error);
                        res.json("Data cannot be saved, problem at saving time.");
                    });
            }
        })
        .catch(() => res.json("Registration problem."));
});

// Responding employee-list
app.get("/employee-list", (req, res) => {
    modelEmployeeRegister.find()
        .then((employees) => res.json(employees))
        .catch((error) => {
            console.error("Error fetching employees:", error);
            res.status(500).send("Error fetching employees.");
        });
});

// Edit-employee send data
app.get("/employee-list/:ID", (req, res) => {
    const ID = req.params.ID;
    modelEmployeeRegister.findOne({ _id: ID })
        .then((employee) => res.send(employee))
        .catch(() => {
            console.error("Employee not found:", error);
            res.status(404).send("Employee not found.");
        });
});

// Edit-employee update values
app.put("/employee-list/:ID", upload.single('image'), (req, res) => {
    const ID = req.params.ID;
    let updateData = { ...req.body };
    if (req.file) {
        updateData.image = req.file.filename;
    }
    modelEmployeeRegister.updateOne({ _id: ID }, updateData)
        .then(() => res.send("Successfully updated data."))
        .catch((error) => {
            console.error("Error updating data:", error);
            res.status(500).send("Error updating data.");
        });
});

// Delete employee
app.delete("/employee-list/:ID", (req, res) => {
    const ID = req.params.ID;
    modelEmployeeRegister.deleteOne({ _id: ID })
        .then(() => res.send("User deleted."))
        .catch((error) => {
            console.error("Error deleting user:", error);
            res.status(500).send("Problem deleting user.");
        });
});

// Catch-all route for undefined routes
app.use((req, res) => {
    res.status(404).send("Resource not found.");
});

app.listen(4001, () => {
    console.log("Server listening at 4001....");
})