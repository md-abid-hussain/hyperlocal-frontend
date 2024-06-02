import Layout from "./components/Layout";
import LoginPage from "./features/auth/Login";
import Public from "./components/Public";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import Welcome from "./components/Welcome";
import { Route, Routes } from "react-router-dom";
import DashLayout from "./components/DashLayout";
import Profile from "./features/users/Profile";
import Register from "./features/auth/Register";
import TaskList from "./features/tasks/TaskList";
import HelperList from "./features/helpers/HelperList";
import UserList from "./features/users/UserList";
import EditUser from "./features/users/EditUser";
import NotFound from "./components/NotFound";
import Task from "./features/tasks/Task";
import CreateTask from "./features/tasks/CreateTask";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<Register />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route element={<DashLayout />}>
              <Route path="home" element={<Welcome />} />
              <Route path="profile">
                <Route index element={<Profile />} />
                <Route path="edit" element={<EditUser />} />
              </Route>

              <Route path="task">
                <Route index element={<TaskList />} />
                <Route path=":taskId" element={<Task />} />
                <Route path="new" element={<CreateTask />} />
              </Route>
              <Route path="helper" element={<HelperList />} />
              <Route path="user" element={<UserList />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
