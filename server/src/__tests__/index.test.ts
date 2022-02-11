import app from "../index";

import request from "supertest";


describe("POST /reminders", () => {

  it("return status code 201 if reminder is saved", async () => {
    const res = await request(app)
      .post("/reminders")
      .send({
        email: "hola2@gmail.com",
        petName: "roger1",
        reminderName: "Vaccination",
        date: "1643559600"
      });

      expect(res.statusCode).toEqual(201);
  });
});