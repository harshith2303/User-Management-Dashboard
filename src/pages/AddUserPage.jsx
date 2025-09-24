import UserForm from "../components/UserForm";
import { addUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const AddUserPage = () => {
  const navigate = useNavigate();
  const handleSubmit = async (data) => {
    await addUser(data);
    alert("User added!");
    navigate("/");
  };

  return <UserForm onSubmit={handleSubmit} />;
};

export default AddUserPage;
