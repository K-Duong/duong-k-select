# React Select Library

This library allows you to customize your react select dropdown component.

## Installation

You can install the library by using npm or yarn:

```bash
npm install kduong-react-select
```

or with yarn:

```bash
yarn add kduong-react-select
```

## Prerequisites

- [Node JS version 20.13.1 or higher](https://nodejs.org/en/download/package-manager/current)

## Instruction

### 1. **Basic Usage**

Here’s how you can use the `SelectItem` component in your React project:

```javascript
import React, { useState } from "react";
import { SelectItem } from "kduong-react-select";

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

function App() {
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <SelectItem
      label="Choose an option"
      name="example-select"
      options={options}
      selectedOption={selectedOption}
      handleSelect={handleSelect}
    />
  );
}

export default App;
```

### 2. **Available Components**

**SelectItem**: A customizable select dropdown component.

- `label` (string): The label for the select element.
- `id` (string): The unique identifier for the select element.
- `name` (string): The name attribute for the select element.
- `className` (string, optional): The class name for the select element to customize your style in CSS
- `options` (array of objects): Array of options, each containing `label`, `value`, and an optional `disabled` property.
- `selectedOption` (string, optional): The currently selected option's value.
- `handleSelect` (function): Callback function to handle option changes.

### 3. **Customization**

The components in this library are designed to be customizable. You can pass custom classes via the `className` prop to style the components as per your needs.

Example:

```javascript
<SelectItem
  label="Choose an option"
  name="example-select"
  options={options}
  className="custom-select-class"
/>
```

### 4. **Tests**
This project uses Jest and React Testing Library for testing. To run the tests:

```bash
npm run test
```

