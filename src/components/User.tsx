import { useState } from "react";
import type { userType } from "../Types/userType";
import { idChangeHelper } from "../utils/idChangeHelper";
import { newUser } from "../utils/newUserHelper";
import Form from "./ui/Form";
import FormInput from "./ui/FormInput";
import FormButton from "./ui/FormButton";
import FormSelect from "./ui/FormSelect";

type UserFormProps = {
  userData: userType[];
  onAdd: (user: userType) => void;
  onUpdate: (user: userType) => void;
  onDelete: (id: number) => void;
};

const User = ({ userData, onAdd, onUpdate, onDelete }: UserFormProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", city: "", age: "" });

  const handleFormAction = (fd: FormData) => {
    const user = newUser(fd);
    onAdd(user);
    setFormData({ name: "", city: "", age: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    idChangeHelper({ e, setSelectedId, setFormData, userData });
  };

  const handleUpdate = () => {
    if (!selectedId) return;
    onUpdate({
      id: selectedId,
      name: formData.name?.trim(),
      city: formData.city?.trim(),
      age: Number(formData?.age),
    });
  };

  const handleDelete = () => {
    if (!selectedId) return;
    onDelete(selectedId);
    setFormData({ name: "", city: "", age: "" });
    setSelectedId(null);
  };

  const idOptions = userData.map((user) => ({
    label: user.id,
    value: user.id,
  }));

  return (
    <>
      <h1>User Form</h1>
      <Form action={handleFormAction}>
        <label htmlFor="name">Name : </label>
        <FormInput
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <br /> <br />
        <label htmlFor="city">City : </label>
        <FormInput
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          required
        />
        <br /> <br />
        <label htmlFor="age">Age : </label>
        <FormInput
          name="age"
          type="number"
          value={formData.age}
          onChange={handleInputChange}
          required
        />
        <br /> <br />
        {!selectedId ? (
          <FormButton type="submit">
            Save
          </FormButton>
        ) : (
          <div>
            <FormButton type="button" onClick={handleUpdate}>
              Update
            </FormButton>
            <FormButton type="button" onClick={handleDelete}>
              Delete
            </FormButton>
          </div>
        )}
      </Form>
      <hr />
      <label htmlFor="select-id">Select based on ID: </label>
      <FormSelect
        id="select-id"
        value={selectedId ?? ""}
        onChange={handleIdChange}
        options={idOptions}
        placeholder="Select ID"
      />
    </>
  );
};

export default User;
