import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/Home";
import fetchMock from "fetch-mock-jest";
import faker from "faker";

describe("Home list", () => {
  const body = {
    name: faker.name.firstName(2),
    age: faker.datatype.number(100),
  };

  const url = "https://mocki.io/v1/d63b928b-5a5c-415c-b9b5-1bc47714fd4e";
  beforeAll(() => {
    fetchMock.get(url, body);
  });

  it("Should Home return user when load api with useEffect", async () => {
    render(<Home />);
    const age = await screen.findByText(body.age);
    const name = await screen.findByText(body.name);

    expect(name).toBeInTheDocument();
    expect(age).toBeInTheDocument();
  });

  it("Should use api in useEffect", async () => {
    render(<Home />);

    await waitFor(() => {
      const isLoadDataInApi = fetchMock.called(url);
      expect(isLoadDataInApi).toBe(true);
    });
  });
});
