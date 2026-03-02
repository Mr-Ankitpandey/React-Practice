import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const ContextUser = () => {
    const { userData, addUser, updateUser, deleteUser } = useContext(UserContext)!;

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [formData, setFormData] = useState({ name: "", city: "", age: "" });

    const handleFormAction = (fd: FormData) => {
        const raw = Object.fromEntries(fd) as { name: string; city: string; age: string };
        addUser({ name: raw.name, city: raw.city, age: Number(raw.age) });
        setFormData({ name: "", city: "", age: "" });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === "select-id") {
            setSelectedId(null);
            setFormData({ name: "", city: "", age: "" });
            return;
        }
        const id = Number(value);
        setSelectedId(id);
        const selected = userData.find((u) => u.id === id);
        if (selected) {
            setFormData({ name: selected.name, city: selected.city, age: String(selected.age) });
        }
    };

    const handleUpdate = () => {
        if (!selectedId) return;
        updateUser({
            id: selectedId,
            name: formData.name.trim(),
            city: formData.city.trim(),
            age: Number(formData.age),
        });
    };

    const handleDelete = () => {
        if (!selectedId) return;
        deleteUser(selectedId);
        setFormData({ name: "", city: "", age: "" });
        setSelectedId(null);
    };

    return (
        <>
            <h1>User Form</h1>
            <form action={handleFormAction}>
                <label htmlFor="ctx-name">Name : </label>
                <input
                    id="ctx-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <br /> <br />
                <label htmlFor="ctx-city">City : </label>
                <input
                    id="ctx-city"
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                />
                <br /> <br />
                <label htmlFor="ctx-age">Age : </label>
                <input
                    id="ctx-age"
                    type="number"
                    name="age"
                    required
                    value={formData.age}
                    onChange={handleInputChange}
                />
                <br /> <br />
                {!selectedId ? (
                    <button type="submit">Save</button>
                ) : (
                    <div>
                        <button type="button" onClick={handleUpdate}>Update</button>
                        <button type="button" onClick={handleDelete}>Delete</button>
                    </div>
                )}
            </form>
            <hr />
            <label htmlFor="ctx-select-id">Select based on ID: </label>
            <select id="ctx-select-id" onChange={handleIdChange} value={selectedId ?? "select-id"}>
                <option value="select-id">Select ID</option>
                {userData.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.id}
                    </option>
                ))}
            </select>
        </>
    );
};

export default ContextUser;
