class EventController {
  async create(req, res) {
    let { user_id, date, title, time, description } = req.body;
    if (
      user_id == undefined ||
      date == undefined ||
      title == undefined ||
      date.day == undefined ||
      date.month == undefined ||
      date.year == undefined ||
      time.startingTime == undefined ||
      time.endingTime == undefined ||
      description == undefined
    ) {
      res.status(406);
      res.json({ error: "Preencha todos os campos !" });
      return;
    }
    try {
      if ((await Event.findTitle(title, req.body.user_id)).status) {
        res.status(406);
        res.json({ error: "Já existe um evento com este nome" });
        return;
      }
      await Event.create(req.body);
      res.status(200);
      res.json({ success: "Evento criado" });
      return;
    } catch (err) {
      res.status(406);
      res.json({ error: "Falha ao criar evento" });
      console.log(err);
      return;
    }
  }

  async update(req, res) {
    let { id, user_id, date, time, description } = req.body;
    if (
      id == undefined ||
      user_id == undefined ||
      date == undefined ||
      date.day == undefined ||
      date.month == undefined ||
      date.year == undefined ||
      time.startingTime == undefined ||
      time.endingTime == undefined ||
      description == undefined
    ) {
      res.status(406);
      res.json({ error: "Missing parameters" });
      return;
    }
    try {
      let event = await Event.findTitle(req.body.title, req.body.user_id);
      if (
        event.status &&
        event.data[0].title == req.body.title &&
        event.data[0].id == req.body.id
      ) {
        req.body.title = undefined;
      }
      if (
        event.status &&
        event.data[0].title == req.body.title &&
        event.data[0].id !== req.body.id
      ) {
        res.status(406);
        res.json({ error: "Já existe um evento com este nome" });
        return;
      }

      await Event.update(req.body);
      res.status(200);
      res.json({ success: "Evento atualizado" });
      return;
    } catch (err) {
      res.status(406);
      res.json({ error: "Failed creating event" });
      console.log(err);
      return;
    }
  }

  async delete(req, res) {
    let { user_id, id } = req.params;
    if (id !== undefined && user_id !== undefined) {
      try {
        if (await Event.delete(user_id, id)) {
          res.status(200);
          res.json({ success: "Event deleted" });
          return;
        }
        res.status(406);
        res.json({ error: "Error deleting event" });
      } catch (err) {
        console.log(err);
        res.status(406);
        res.json({ error: err });
        return;
      }
    }
    res.status(406);
    res.json({ error: "Missing parameters" });
    return;
  }

  async getById(req, res) {
    let { user_id, id } = req.params;
    if (id !== undefined && user_id !== undefined) {
      try {
        let event = await Event.getById(user_id, id);
        if (event.length > 0) {
          res.status(200);
          res.json({ data: event });
          return;
        }
        res.status(406);
        res.json({ error: "Unable to retreive data" });
        return;
      } catch (err) {
        console.log(err);
        res.status(406);
        res.json({ error: err });
        return;
      }
    }
    res.status(406);
    res.json({ error: "Missing parameters" });
  }

  async getAll(req, res) {
    let { user_id } = req.params;
    if (user_id !== undefined) {
      try {
        let event = await Event.getAll(user_id);
        if (event.length > 0) {
          res.status(200);
          res.json({ data: event });
          return;
        }
        res.status(200);
        res.json({ data: [], error: "Unable to retreive data" });
        return;
      } catch (err) {
        console.log(err);
        res.status(406);
        res.json({ error: err });
        return;
      }
    }
    res.status(406);
    res.json({ error: "Missing parameters" });
  }
}

module.exports = new EventController();
const Event = require("../models/Events");
