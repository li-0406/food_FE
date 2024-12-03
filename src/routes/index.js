import Home from "../pages/Home";
import Calculator from "../pages/Calculator";
import Connect from "../pages/Connect";
import Food from "../pages/Food";
import Hospital from "../pages/Hospital";
import Bird from "../pages/Bird";

const element = [
  { path: "/", element: <Home /> },
  { path: "/calculator", element: <Calculator /> },
  { path: "/connect", element: <Connect /> },
  { path: "/food", element: <Food /> },
  { path: "/hospital", element: <Hospital /> },
  { path: "/bird", element: <Bird /> },
];

export default element;
