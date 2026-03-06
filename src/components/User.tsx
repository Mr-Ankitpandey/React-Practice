import { useState } from "react";
import type { userType } from "../Types/userType";
import { idChangeHelper } from "../utils/idChangeHelper";
import { newUser } from "../utils/newUserHelper";
import Form from "./ui/Form";
import Select from "./ui/Select";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Label from "./ui/Label";

type UserFormProps = {
  userData: userType[];
  onAdd: (user: userType) => void;
  onUpdate: (user: userType) => void;
  onDelete: (id: number) => void;
};

const User = ({ userData, onAdd, onUpdate, onDelete }: UserFormProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [userFormInputFieldValue, setUserFormInputFieldValue] = useState({ name: "", city: "", age: "" });

  const handleFormAction = (fd: FormData) => {
    const user = newUser(fd);
    onAdd(user);
    setUserFormInputFieldValue({ name: "", city: "", age: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormInputFieldValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    idChangeHelper({ e, setSelectedId, setUserFormInputFieldValue, userData });
  };

  const updateBtnHandler = () => {
    if (!selectedId) return;
    onUpdate({
      id: selectedId,
      name: userFormInputFieldValue.name?.trim(),
      city: userFormInputFieldValue.city?.trim(),
      age: Number(userFormInputFieldValue?.age),
    });
  };

  const deleteBtnHandler = () => {
    if (!selectedId) return;
    onDelete(selectedId);
    setUserFormInputFieldValue({ name: "", city: "", age: "" });
    setSelectedId(null);
  };

  const selectIdOptions = userData?.map((user) => ({
    value: user?.id,
  }));

  return (
    <>
      <h1>User Form</h1>
      <Form action={handleFormAction}>
        <Label htmlfor="name">Name : </Label>
        <Input
          name="name"
          value={userFormInputFieldValue?.name}
          onChange={handleInputChange}
          required
        />
        <br /> <br />
        <Label htmlfor="city">City : </Label>
        <Input
          name="city"
          value={userFormInputFieldValue?.city}
          onChange={handleInputChange}
          required
        />
        <br /> <br />
        <Label htmlfor="age">Age : </Label>
        <Input
          name="age"
          type="number"
          value={userFormInputFieldValue?.age}
          onChange={handleInputChange}
          required
        />
        <br /> <br />
        {!selectedId ? (
          <Button type="submit">
            Save
          </Button>
        ) : (
          <div>
            <Button type="button" onClick={updateBtnHandler}>
              Update
            </Button>
            <Button type="button" onClick={deleteBtnHandler}>
              Delete
            </Button>
          </div>
        )}
      </Form>
      <hr />
      <Label htmlfor="select-id">Select based on ID: </Label>
      <Select
        id="select-id"
        value={selectedId ?? ""}
        onChange={handleIdChange}
        options={selectIdOptions}
        placeholder="Select ID"
      />
    </>
  );
};

export default User;
