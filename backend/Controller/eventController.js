const db=require("../app")


exports.createevent=(req, res) => {
    const eventData = req.body;
    const query = "INSERT INTO events SET ?";
    db.query(query, eventData, (err, result) => {
      if (err) {
        console.error(`Error creating event: ${err}`);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(201).json({ message: "Event created successfully", eventId: result.insertId });
      }
    });
  };

  exports.allevent=(req, res) => {
    const query = "SELECT * FROM events";
    db.query(query, (err, result) => {
      if (err) {
        console.error(`Error fetching events: ${err}`);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json(result);
      }
    });
  };