import { UserProvider } from "../context/UserContext";
import ContextUser from "../components/ContextUser";
import ContextFilter from "../components/ContextFilter";

const ContextPage = () => {
  return (
    <UserProvider>
      <h1>Context Page</h1>
      <ContextUser />
      <ContextFilter />
    </UserProvider>
  );
};

export default ContextPage;
