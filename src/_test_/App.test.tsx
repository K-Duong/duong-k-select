import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { SelectItem } from "../lib";

const options = [
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Other",
    value: "other",
  },
];
function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

//TODO: faire d'abord 1 description
describe("renders Select item", () => {
  const handleSelect = jest.fn();
  it("should render with its label and its default value when Select item has the default value", () => {
    render(
      <SelectItem
        id="genre"
        className="select-genre"
        defaultValue="male"
        label="Genre"
        handleSelect={handleSelect}
        name="genre"
        options={options}
      />
    );

    expect(screen.getByLabelText("Genre")).toBeTruthy();
    expect(screen.getByRole("combobox", { name: "Genre" })).toBeTruthy();
    //verify if default value is correct
    expect(screen.getByRole("combobox")).toHaveValue("male");
    
    //verify if option of default value is selected
    const maleOption = screen.getByRole("option", {
      name: "Male",
    }) as HTMLOptionElement;
    expect(maleOption.selected).toBe(true);
  });
  it("should render with its first value in array options when Select item doesn't have the default value", () => {
    render(
      <SelectItem
        id="genre"
        className="select-genre"
        value=""
        label="Genre"
        handleSelect={handleSelect}
        name="genre"
        options={options}
      />
    );

    //verify if default value is correct
    expect(screen.getByRole("combobox")).toHaveValue(options[0].value);

    //verify if option of default value is selected
    // const maleOption = screen.getByRole("option", {
    //   name: "Male",
    // }) as HTMLOptionElement;
    // expect(maleOption.selected).toBe(true);
  });
});
