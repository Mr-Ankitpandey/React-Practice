const Filter = () => {
  return (
    <>
    <h1>Filters</h1>
      <label htmlFor="">Select Field : </label>
      <select>
        <option value="select-field">Select Field</option>
      </select>
      <br /> <br />
      <label>Unique Values : </label>
      <select>
        <option value="unique-value">Select Field</option>
      </select>
      <br /> <br />
      <button>Filter</button>
      <button>Add</button>
      <hr />
    </>
  );
};

export default Filter;
