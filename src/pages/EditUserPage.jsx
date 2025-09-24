import { useLocation, useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { updateUser } from "../services/api";

const EditUserPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await updateUser(state.id, data);
    alert("User updated!");
    navigate("/");
  };

  return <UserForm initialData={state} onSubmit={handleSubmit} />;
};

export default EditUserPage;
