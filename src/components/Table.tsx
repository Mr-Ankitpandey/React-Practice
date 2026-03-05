import { memo } from "react";
import type { userType } from "../Types/userType";
type TableProp = {
    userData: userType[];

}

const Table = memo(({userData }: TableProp) => {
    
  return (
    <>
    <table border={1}>
        <thead>
            <tr>
                <th>Name</th>
                <th>City</th>
                <th>Age</th>
            </tr>
        </thead>
        <tbody>
            {userData?.map((user) => (
                <tr key={user?.id}>
                    <td>{user?.name}</td>
                    <td>{user?.city}</td>
                    <td>{user?.age}</td>
                </tr>
            ))}
        </tbody>
    </table>
    </>
  )
});

export default Table