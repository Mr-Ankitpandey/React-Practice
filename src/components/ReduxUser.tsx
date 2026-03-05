import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, updateUser } from "../redux/userSlice";
import type { RootState } from "../redux/store";
import { idChangeHelper } from "../utils/idChangeHelper";

const ReduxUser = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", city: "", age: "" });

  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user?.userData);

  const handleFormAction = (fd: FormData) => {
    const user = Object.fromEntries(fd);
    dispatch(addUser(user));

    setFormData({ name: "", city: "", age: "" });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   const handleIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      idChangeHelper({e,setSelectedId, setFormData,  userData})
    };

  const handleUpdate = () => {
    dispatch(
      updateUser({
        id: selectedId as number,
        name: formData.name?.trim(),
        city: formData.city?.trim(),
        age: Number(formData?.age),
      }),
    );
  };

  const handleDelete = () => {
    dispatch(deleteUser(selectedId));
    setFormData({ name: "", city: "", age: "" });
    setSelectedId(null);
  };
  return (
    <>
      <h1>User Form</h1>
      <form action={handleFormAction}>
        <label htmlFor="name">Name : </label>
        <input
          type="text"
          name="name"
          required
          value={formData?.name}
          onChange={handleInputChange}
        />
        <br /> <br />
        <label htmlFor="city">City : </label>
        <input
          type="text"
          name="city"
          required
          value={formData?.city}
          onChange={handleInputChange}
        />
        <br /> <br />
        <label htmlFor="age">Age : </label>
        <input
          type="number"
          name="age"
          required
          value={formData?.age}
          onChange={handleInputChange}
        />
        <br /> <br />
        {!selectedId ? (
          <button type="submit">Save</button>
        ) : (
          <div>
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </form>
      <hr />
      <label htmlFor="select">Select based on ID: </label>
      <select onChange={handleIdChange} value={selectedId ?? "select-id"}>
        <option value="select-id">Select ID</option>
        {userData?.map((user) => (
          <option key={user?.id} value={user?.id}>
            {user?.id}
          </option>
        ))}
      </select>
    </>
  );
};

export default ReduxUser;
