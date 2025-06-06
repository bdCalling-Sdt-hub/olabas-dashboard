import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home/Home";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy/PrivacyPolicy.jsx";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import TermsAndCondition from "../Pages/Dashboard/TermsAndCondition/TermsAndCondition";
import Transaction from "../Pages/Dashboard/Transaction/Transaction.jsx";
import Setting from "../Pages/Dashboard/Setting/Setting.jsx";
import Contact from "../Pages/Dashboard/Contact/Contact.jsx";
import Report from "../Pages/Dashboard/Report/Report.jsx";
import Category from "../Pages/Dashboard/Category/Category.jsx";
import Announcement from "../Pages/Dashboard/Announcement/Announcement.jsx";
import Logo from "../Pages/Dashboard/Logo/LogoList.jsx";
import Notifications from "../Pages/Dashboard/Notification/Notifications.jsx";
import Reservation from "../Pages/Dashboard/Reservation/Reservation.jsx";
import ClientMangement from "../Pages/Dashboard/Client management/ClientMangement.jsx";
import FleetManagement from "../Pages/Dashboard/FleetManagement/FleetManagement.jsx";
import DriverManagement from "../Pages/Dashboard/Driver Management/DriverManagement.jsx";
import Location from "../Pages/Dashboard/Location/Location.jsx";
import Extra from "../Pages/Dashboard/Extra/Extra.jsx";
import Team from "../Pages/Dashboard/Team/team.jsx";
import FaqCollapse from "../Pages/Dashboard/FAQ/FAQCollapese.jsx";
import PrivateRoute from "./ProtectedRoute.jsx";
import DriverSchedule from "../Pages/Dashboard/Driver Schedule/DriverSchedule.jsx";

const router = createBrowserRouter([
  {
    // path: "/",

    element: (
      <PrivateRoute>
        <Main />,
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/transaction",
        element: <Transaction />,
      },

      // {
      //   path: "/reported-issues",
      //   element: <Report />,
      // },

      {
        path: "/reservation",
        element: <Reservation />,
      },
      {
        path: "/client-management",
        element: <ClientMangement />,
      },
      {
        path: "/fleet-management",
        element: <FleetManagement />,
      },
      {
        path: "/driver-management",
        element: <DriverManagement />,
      },
      {
        path: "/driver-schedule",
        element: <DriverSchedule />,
      },
      // {
      //   path: "/announcement",
      //   element: <Announcement />,
      // },
      {
        path: "/location",
        element: <Location />,
      },
      {
        path: "/extra",
        element: <Extra />,
      },
      {
        path: "/team",
        element: <Team />,
      },
      {
        path: "/faq",
        element: <FaqCollapse />,
      },

      // {
      //   path: "/logo",
      //   element: <Logo />,
      // },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/category-list",
        element: <Category />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndCondition />,
      },

      {
        path: "/notification",
        element: <Notifications />,
      },

      {
        path: "/settings",
        element: <Setting />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
