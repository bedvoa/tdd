import httpMocks from "node-mocks-http";
import { isAuth } from "../auth";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import * as userRespository from "../../data/auth";

jest.mock("jsonwebtoken");
jest.mock("../../data/auth.js");

describe("Auth Middlewares", () => {
  it("returns 401 for the request without Authorization Header", async () => {
    // given
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/tweets",
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    // when
    await isAuth(request, response, next);

    // then
    expect(response.statusCode).toBe(401);
    expect(response._getJSONData().message).toBe("Authentication Error");
    expect(response._getJSONData()).toStrictEqual({
      message: "Authentication Error",
    });
    expect(next).not.toBeCalled();
  });

  it("returns 401 for the request with Authorization Header", async () => {
    // given
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/tweets",
      headers: {
        Authorization: "Bear",
      },
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    // when
    await isAuth(request, response, next);

    // then
    expect(response.statusCode).toBe(401);
    expect(response._getJSONData().message).toBe("Authentication Error");
    expect(response._getJSONData()).toStrictEqual({
      message: "Authentication Error",
    });
    expect(next).not.toBeCalled();
  });

  it("returns 401 for the request with invalid token", async () => {
    // given
    const token = faker.random.alphaNumeric(128);
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/tweets",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();
    jwt.verify = jest.fn((token, secret, callback) => {
      callback(new Error("bad token"), undefined);
    });

    // when
    await isAuth(request, response, next);

    // then
    expect(response.statusCode).toBe(401);
    expect(response._getJSONData().message).toBe("Authentication Error");
    expect(response._getJSONData()).toStrictEqual({
      message: "Authentication Error",
    });
    expect(next).not.toBeCalled();
  });

  it("returns 401 when cannot find a user by id from the JWT", async () => {
    // given
    const token = faker.random.alphaNumeric(128);
    const userId = faker.random.alphaNumeric(32);
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/tweets",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();
    jwt.verify = jest.fn((token, secret, callback) => {
      callback(undefined, { id: userId });
    });
    userRespository.findById = jest.fn((id) => Promise.resolve(undefined));

    // when
    await isAuth(request, response, next);

    // then
    expect(response.statusCode).toBe(401);
    expect(response._getJSONData().message).toBe("Authentication Error");
    expect(response._getJSONData()).toStrictEqual({
      message: "Authentication Error",
    });
    expect(next).not.toBeCalled();
  });

  it("passes a request with valid Authorization header with token", async () => {
    // given
    const token = faker.random.alphaNumeric(128);
    const userId = faker.random.alphaNumeric(32);
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/tweets",
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();
    jwt.verify = jest.fn((token, secret, callback) => {
      callback(undefined, { id: userId });
    });
    userRespository.findById = jest.fn((id) =>
      Promise.resolve({
        id: userId,
      })
    );

    // when
    await isAuth(request, response, next);

    // then
    expect(response.statusCode).toBe(200);
    expect(request).toMatchObject({ userId, token });
    expect(next).toBeCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });
});
