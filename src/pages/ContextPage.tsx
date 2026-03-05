import { UserContextProvider } from "../context/UserContextprovider";
import ContextUser from "../components/ContextUser";
import ContextFilter from "../components/ContextFilter";

const ContextPage = () => {
  return (
    <UserContextProvider>
      <h1>Context Page</h1>
      <ContextUser />
      <ContextFilter />
    </UserContextProvider>
  );
};

export default ContextPage;
