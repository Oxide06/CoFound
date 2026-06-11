import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import PublicRoute from "@/components/common/PublicRoute";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import EditProfile from "@/pages/EditProfile";
import Explore from "@/pages/Explore";
import StartupIdea from "@/pages/StartupIdea";
import PostIdea from "@/pages/PostIdea";
import Connections from "@/pages/Connections";
import NotFound from "@/pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/ideas/:id" element={<StartupIdea />} />
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/ideas/post" element={<PostIdea />} />
        <Route path="/connections" element={<Connections />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
