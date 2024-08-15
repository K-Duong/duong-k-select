import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { SelectItem } from "../lib";
import { ReactElement } from "react";
import { Option } from "../lib/SelectItem";

// Options for testing
const options1 = [
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
  {
    label: "Disabled option",
    value: "test",
    disabled: true,
  },
];
const options2: Option[] = []; //Empty options array

// Utility function to setup user event and render
function setup(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe("SelectItem Component", () => {
  const handleSelect = jest.fn();
  afterEach(cleanup);

  it("renders with label and sets the first option as the default value", () => {
    render(
      <SelectItem
        id="genre"
        className="select-genre"
        label="Genre"
        handleSelect={handleSelect}
        name="genre"
        options={options1}
      />
    );
    //check if the label is rendered correctly
    expect(screen.getByLabelText("Genre")).toBeTruthy();

    //check if the select element is rendered and the default value is the first option
    const select = screen.getByRole("combobox", { name: "Genre" });
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue(options1[0].value);

    //verify that the first option is selected by default
    const firstOption = screen.getByRole("option", {
      name: options1[0].label,
    }) as HTMLOptionElement;
    expect(firstOption.selected).toBe(true);

    // verify that the second option is not selected by default
    const secondOption = screen.getByRole("option", {
      name: options1[1].label,
    }) as HTMLOptionElement;
    expect(secondOption.selected).toBe(false);
  });
  it("renders with the selectedOption prop if provided", () => {
    render(
      <SelectItem
        id="genre"
        className="select-genre"
        label="Genre"
        selectedOption="test"
        handleSelect={handleSelect}
        name="genre"
        options={options1}
      />
    );

    // Check if the select element is rendered with the correct selected option
    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("test");

    // Verify that the disabled state of selectedOption is setted correctly
    const selectedOption = screen.getByRole("option", {
      name: "Disabled option",
    }) as HTMLOptionElement;
    expect(selectedOption.disabled).toBe(true);
  });

  it("should select correct value on change", async () => {
    const { user } = setup(
      <SelectItem
        id="genre"
        className="select-genre"
        label="Genre"
        handleSelect={handleSelect}
        name="genre"
        options={options1}
      />
    );
    //Simulate selecting an option
    await user.selectOptions(screen.getByRole("combobox"), "other");
    expect(screen.getByRole("combobox")).toHaveValue("other");

    //Verify that the selected option is updated
    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("other");

    //Verify that the selected option has selected attribute
    const otherOption = screen.getByRole("option", {
      name: "Other",
    }) as HTMLOptionElement;
    expect(otherOption.selected).toBe(true);

    //Ensure that the handleSelect has been called
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });
  it("renders a default option with a message when no options are available", () => {
    render(
      <SelectItem
        id="genre"
        className="select-genre"
        label="Genre"
        handleSelect={handleSelect}
        name="genre"
        options={options2}
      />
    );
    // Check if the default message is rendered in the select element
    const defaultOption = screen.getByRole("option", {
      name: "No options available",
    }) as HTMLOptionElement;
    expect(defaultOption.disabled).toBe(true);
    expect(defaultOption.selected).toBe(true);
  });
});
