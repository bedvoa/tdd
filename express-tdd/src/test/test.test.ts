const jin = {
  name: "J2W",
  age: 29,
  address: {
    city: "Incheon",
    state: "Songdo",
  },
};

describe("Object", () => {
  it("should match object", () => {
    expect(jin).toMatchObject({
      name: "J2W",
      address: {
        state: "Songdo",
      },
    });
  });

  it("expect.objectContaining", () => {
    expect(jin).toEqual(
      expect.objectContaining({
        name: "J2W",
        age: 29,
        address: {
          city: "Incheon",
          state: "Songdo",
        },
      })
    );
  });

  it("difference between toBe and toEqual", () => {
    expect(jin).toBe(jin);
    expect(jin).not.toBe({
      name: "J2W",
      age: 29,
      address: {
        city: "Incheon",
        state: "Songdo",
      },
    });
    expect(jin).toEqual(jin);
    expect(jin).toEqual({
      name: "J2W",
      age: 29,
      address: {
        city: "Incheon",
        state: "Songdo",
      },
    });
  });
});
