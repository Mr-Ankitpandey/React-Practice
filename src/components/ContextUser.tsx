import { useContext, useState } from "react";
import { UserContext } from "../context/context";
import type { userType } from "../Types/userType";

const ContextUser = () => {
  const { userData, addUser, updateUser, deleteUser } = useContext(UserContext);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", city: "", age: "" });

  const handleFormAction = (fd: FormData) => {
      const user: userType = {
          id: Number(new Date()),
          name: (fd.get("name") as string),
          city: (fd.get("city") as string) ,
          age: (fd.get("age") as string),
        };
      addUser(user);
    setFormData({ name: "", city: "", age: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target?.value;
    if (value === "select-id") {
      setSelectedId(null);
      setFormData({ name: "", city: "", age: "" });
      return;
    }
    const id = Number(value);
    setSelectedId(id);
    const selectedUser = userData?.find((user) => user?.id === id);
    if (selectedUser) {
      setFormData({
        name: selectedUser?.name,
        city: selectedUser?.city,
        age: String(selectedUser?.age),
      });
    }
  };

  const handleUpdate = () => {
    updateUser({
      id: selectedId as number,
      name: formData.name?.trim(),
      city: formData.city?.trim(),
      age: Number(formData?.age),
    });
  };

  const handleDelete = () => {
    deleteUser(selectedId as number);
    setFormData({ name: "", city: "", age: "" });
    setSelectedId(null);
  };

  return (
    <>
      <h1>User Form</h1>
      <form action={handleFormAction}>
        <label htmlFor="name">Name : </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          value={formData?.name}
          onChange={handleInputChange}
        />
        <br /> <br />
        <label htmlFor="city">City : </label>
        <input
          id="city"
          type="text"
          name="city"
          required
          value={formData?.city}
          onChange={handleInputChange}
        />
        <br /> <br />
        <label htmlFor="age">Age : </label>
        <input
          id="age"
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
      <label htmlFor="select-id">Select based on ID: </label>
      <select
        id="select-id"
        onChange={handleIdChange}
        value={selectedId ?? "select-id"}
      >
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

export default ContextUser;
