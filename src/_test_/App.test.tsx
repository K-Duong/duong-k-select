import { render, screen, cleanup  } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { SelectItem } from "../lib";
import { ReactElement } from "react";

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


function setup(jsx : ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx)
  }

}

describe("renders Select item", () => {
  const handleSelect = jest.fn();
  afterEach(cleanup);
  it("should render with its label and its default value when Select item has the default value", () => {
    render(
      <SelectItem
        id="genre"
        className="select-genre"
        defaultValue={{
          label: "Select an option",
          value: "none",
          disabled: true
        }}
        label="Genre"
        handleSelect={handleSelect}
        name="genre"
        options={options}
      />
    );

    expect(screen.getByLabelText("Genre")).toBeTruthy();
    expect(screen.getByRole("combobox", { name: "Genre" })).toBeTruthy();
    //verify if default value is correct
    expect(screen.getByRole("combobox")).toHaveValue("none");
    
    //verify if default value is selected
    const defaultOption = screen.getByRole("option", {
      name: "Select an option",
    }) as HTMLOptionElement;
    expect(defaultOption.selected).toBe(true);
    expect(defaultOption.disabled).toBe(true);
    expect(defaultOption.hidden).toBe(false);

  });
  it("should render with its first value in array options when Select item doesn't have the default value", () => {
    render(
      <SelectItem
        id="genre"
        className="select-genre"
        // value=""
        label="Genre"
        handleSelect={handleSelect}
        name="genre"
        options={options}
      />
    );

    expect(screen.getByRole("combobox")).toHaveValue(options[0].value);
    const firstOption = screen.getByRole("option", {
      name: options[0].label,
    }) as HTMLOptionElement;
    expect(firstOption.selected).toBe(true);

    const secondOption = screen.getByRole("option", {
      name: options[1].label,
    }) as HTMLOptionElement;
    expect(secondOption.selected).toBe(false);

  });

  it("should select correct value on change", async() => {
    const {user} = setup(<SelectItem
      id="genre"
      className="select-genre"
      label="Genre"
      handleSelect={handleSelect}
      name="genre"
      options={options}
    />);
    await user.selectOptions(screen.getByRole("combobox"), "other");
    expect(screen.getByRole("combobox")).toHaveValue("other");

    const otherOption = screen.getByRole("option", { name: "Other" }) as HTMLOptionElement;
    expect(otherOption.selected).toBe(true);
  })

});
