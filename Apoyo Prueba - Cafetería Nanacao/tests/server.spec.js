const request = require("supertest");
const server = require("../index");


describe("Operaciones CRUD de cafes", () => {
it("obteniendo todos los cafes", async () => {
    const response = await request(server).get("/cafes").send();
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.statusCode).toBe(200);
});

it("Eliminar un café que no existe", async () => {
    const jwt = "mi_token_secreto";
    const id = 10;
    const response = await request(server).delete(`/cafes/${id}`)
    .set("Authorization", jwt).send();
    expect(response.statusCode).toBe(404);
});

it("Enviando un nuevo café", async () => {
    const id = Math.floor(Math.random() * 100);
    const café = {id, nombre: "Nuevo café"};
    const response = await request(server).post("/cafes").send(café);
    expect(response.statusCode).toBe(201);
    });

    it("Verificar respuesta de cafes que no existen", async () => {
        const café = {id: 10, nombre: "Latte"};
        const {statusCode, body} = await request(server)
        .put("/cafes/9")
        .send(café);
        expect(statusCode).toBe(400);
        expect (body.message).toBe("El id del parámetro no coincide con el id del café recibido");
        });


});
