const knex = require("../database/connection");

class Events {
  // cria evento no banco
  async create({ ...data }) {
    try {
      await knex
        .insert({
          user_id: data.user_id,
          day: data.date.day,
          month: data.date.month,
          year: data.date.year,
          title: data.title,
          startingTime: data.time.startingTime,
          endingTime: data.time.endingTime,
          description: data.description,
          image: data.image,
        })
        .table("Events");
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  // altera evento no banco
  async update({ ...data }) {
    try {
      await knex
        .update({
          id: data.id,
          user_id: data.user_id,
          day: data.date.day,
          month: data.date.month,
          year: data.date.year,
          title: data.title,
          startingTime: data.time.startingTime,
          endingTime: data.time.endingTime,
          description: data.description,
          image: data.image,
        })
        .where({ id: data.id })
        .table("Events");
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  // encontra evento pelo título
  async findTitle(title, user_id) {
    try {
      let event = await knex
        .select("title", "id")
        .from("Events")
        .where({ title, user_id });
      if (event.length > 0) return { data: event, status: true };
      return { status: false };
    } catch (err) {
      console.log(err);
      return;
    }
  }

  // retorna todos os eventos
  async getAll(user_id) {
    try {
      let event = await knex.select("*").from("Events").where({ user_id });
      return event;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  // retorna o evento pelo id
  async getById(user_id, id) {
    try {
      let event = await knex.select("*").from("Events").where({ user_id, id });
      return event;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  // deleta o evento
  async delete(user_id, id) {
    try {
      let event = await knex.delete().where({ user_id, id }).table("Events");
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
module.exports = new Events();
