import { TweetController } from "../tweet";
import httpMocks from "node-mocks-http";
import { faker } from "@faker-js/faker";

describe("Tweet Controller", () => {
  let tweetController;
  let tweetsRepository;
  let socket;

  beforeEach(() => {
    socket = { emit: jest.fn() };
    tweetsRepository = {};
    tweetController = new TweetController(tweetsRepository, () => socket);
  });

  describe("getTweets", () => {
    it("returns tweets for the given user when username is provided", async () => {
      // given
      const userName = faker.internet.userName();
      const request = httpMocks.createRequest({
        query: { username: userName },
      });
      const response = httpMocks.createResponse();
      tweetsRepository.getAllByUsername = jest.fn(() => userName);

      // when
      await tweetController.getTweets(request, response);

      // then
      expect(response.statusCode).toBe(200);
      expect(response._getJSONData()).toEqual(userName);
      expect(tweetsRepository.getAllByUsername).toHaveBeenCalledWith(userName);
    });
  });
});
