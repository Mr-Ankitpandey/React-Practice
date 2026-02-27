import type { userType } from "../Types/userType";
type UserProp = {
  passUserData: (user: userType) => void
};

const User = ({passUserData}:UserProp) => {

    const handleFormAction = (fd:FormData)=> {
        const user = Object.fromEntries(fd);
        passUserData(user)
    }
  return (
    <>
    <h1>User Form</h1>
    <form action={handleFormAction}>
      <label htmlFor="name">Name : </label>
      <input type="text" name="name" required/>
      <br /> <br />
      <label htmlFor="age">Age : </label>
      <input type="number" name="age" required/>
      <br /> <br />
      <label htmlFor="city">City : </label>
      <input type="text" name="city" required/>
      <br /> <br />
      <button type="submit">Save</button>
    </form>
    <hr />
    <label htmlFor="select">Select based on ID: </label>
    <select>
        <option value="select-id">Select ID</option>
    </select>
    </>

    
  );
};

export default User;
