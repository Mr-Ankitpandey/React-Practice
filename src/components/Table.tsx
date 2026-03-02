import type { userType } from "../Types/userType";
type TableProp = {
    userData: userType[]
}

const Table = ({userData}: TableProp) => {
  return (
    <>
    <table border={1}>
        <thead>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>City</th>
            </tr>
        </thead>
        <tbody>
            {userData?.map((user) => (
                <tr key={user?.id}>
                    <td>{user?.name}</td>
                    <td>{user?.age}</td>
                    <td>{user?.city}</td>
                </tr>
            ))}
        </tbody>
    </table>
    </>
  )
}

export default Table