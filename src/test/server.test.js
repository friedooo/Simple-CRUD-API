require("dotenv").config();
const request = require("supertest");

const server = require("../server");

describe("E2E testing ", () => {
  test("GET-запросом получаем все объекты (ожидается пустой массив) (scenario 1)", async () => {
    const getAllResponse = await request(server).get("/person");
    expect(getAllResponse.statusCode).toBe(200);
    expect(getAllResponse.body).toEqual([]);
  });

  test("POST-запросом создается новый объект (ожидается ответ, содержащий свежесозданный объект) (scenario 2)", async () => {
    const obj = {
      age: "40",
      name: "Alex",
      hobbies: ["sport", "games"],
    };
    const postResponse = await request(server).post("/person").send(obj);
    expect(postResponse.statusCode).toBe(201);
    expect(postResponse.body).toMatchObject(obj);
  });

  test("GET-запросом пытаемся получить созданный объект по его id (ожидается созданный объект) (scenario 3)", async () => {
    const obj = {
      age: "40",
      name: "Alex",
      hobbies: ["sport", "games"],
    };
    const postResponse = await request(server).post("/person").send(obj);
    const createdId = await postResponse.body.id;
    const postedObj = await postResponse.body;

    const getByIdResponse = await request(server).get(`/person/${createdId}`);
    expect(getByIdResponse.body).toEqual(postedObj);
  });

  test("PUT-запросом пытаемся обновить созданный объект (ожидается ответ, содержащий обновленный объект с тем же id) (scenario 4)", async () => {
    const obj = {
      age: "40",
      name: "Alex",
      hobbies: ["sport", "games"],
    };
    const putObj = {
      age: "41",
      name: "Hanna",
      hobbies: ["sport", "games"],
    };

    const postResponse = await request(server).post("/person").send(obj);
    const createdId = await postResponse.body.id;
    const postedObj = await postResponse.body;

    const putResponse = await request(server)
      .put(`/person/${createdId}`)
      .send(putObj);

    expect(putResponse.body.id).toBe(createdId);
    expect(putResponse.body).not.toEqual(postedObj);
  });

  test("DELETE-запросом удаляем созданный объект по id (ожидается подтверждение успешного удаления) (scenario 5)", async () => {
    const obj = {
      age: "40",
      name: "Alex",
      hobbies: ["sport", "games"],
    };

    const postResponse = await request(server).post("/person").send(obj);
    const id = await postResponse.body.id;
    const postedObj = await postResponse.body;

    const getAllResponse = await request(server).get("/person");
    const initialLength = await getAllResponse.body.length;

    const deleteResponse = await request(server).delete(`/person/${id}`);
    expect(deleteResponse.statusCode).toBe(204);

    const getAllResponse2 = await request(server).get("/person");
    expect(getAllResponse2.body.length).toBeLessThan(initialLength);
  });
});
