import {
  FaChartPie,
  FaClipboardList,
  FaLayerGroup,
  FaUser,
} from "react-icons/fa";

const navigationLinks = [
  { id: "dashboard", label: "Dashboard", icon: <FaChartPie /> },
  { id: "tasks", label: "Tareas", icon: <FaClipboardList /> },
  { id: "teams", label: "Equipos", icon: <FaLayerGroup /> },
  { id: "profile", label: "Perfil", icon: <FaUser /> },
];

export default navigationLinks;
