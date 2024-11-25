// import logo from './logo.svg';
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
  Router,
} from "react-router-dom";
import Register from "./components/Register";
import MAINheader from "./components/MAINheader";
import Redirect from "./components/Redirect";
import Login from "./components/Login";

import TextEntry from "./components/PaymentScreen/ResumeWriting/TextResume/TextEntry";
import TextMiddle from "./components/PaymentScreen/ResumeWriting/TextResume/TextMiddle";
import TextSenior from "./components/PaymentScreen/ResumeWriting/TextResume/TextSenior";
import VisualEntry from "./components/PaymentScreen/ResumeWriting/VisualResume/VisualEntry";
import VisualMiddle from "./components/PaymentScreen/ResumeWriting/VisualResume/VisualMiddle";
import VisualSenior from "./components/PaymentScreen/ResumeWriting/VisualResume/VisualSenior";

import InternationalTextEntry from "./components/PaymentScreen/International/InternationalTextResume/InternationalTextEntry";
import InternationalTextMiddle from "./components/PaymentScreen/International/InternationalTextResume/InternationalTextMiddle";
import InternationalTextSenior from "./components/PaymentScreen/International/InternationalTextResume/InternationalTextSenior";
import InternationalVisualEntry from "./components/PaymentScreen/International/InternationalVisualResume/InternationalVisualEntry";
import InternationalVisualMiddle from "./components/PaymentScreen/International/InternationalVisualResume/InternationalVisualMiddle";
import InternationalVisualSenior from "./components/PaymentScreen/International/InternationalVisualResume/InternationalVisualSenior";
import ZapInternational from "./components/PaymentScreen/International/ZapInternational";

import ZapResume from "./components/PaymentScreen/CareerGrowth/ZapResume";
import HighlightResume from "./components/PaymentScreen/CareerGrowth/HighlightResume";
import JobSearchAssistant3 from "./components/PaymentScreen/CareerGrowth/JobSearchAssistant3";
import InterviewPreparation from "./components/PaymentScreen/CareerGrowth/InterviewPreparation";
import TopManagementProfile from "./components/PaymentScreen/CareerGrowth/TopManagementProfile";
import ProfileUpdate from "./components/PaymentScreen/CareerGrowth/ProfileUpdate";
import PersonalPortfolio from "./components/PaymentScreen/CareerGrowth/PersonalPortfolio";
import CoverLetter from "./components/PaymentScreen/CareerGrowth/CoverLetter";
import EmployeeVerification from "./components/PaymentScreen/ScreeningServices/EmployeeVerification";
import ComboResume from "./components/PaymentScreen/ScreeningServices/ComboResume";
import ComboJobBoost from "./components/PaymentScreen/ScreeningServices/ComboJobBoost";
import ComboInternationalPacks from "./components/PaymentScreen/ScreeningServices/ComboInternationalPacks";
import CustomCheckOut from "./components/PaymentScreen/ScreeningServices/CustomCheckOut";
import CheckOut from "./components/PaymentScreen/ScreeningServices/CheckOut";
import Footer2 from "./components/Footer2";
import SingleBlogPage from "./components/SingleBlogPage";

import ResumeQualityScore from "./components/PaymentScreen/ResumeWriting/ResumeQualityScore/ResumeQualityScore";
import ResumeQualityReport from "./components/PaymentScreen/ResumeWriting/ResumeQualityScore/ResumeQualityReport";
import ResumeCritique from "./components/PaymentScreen/ResumeWriting/ResumeCritique";

// import Contact from './components/Contact'
import SocialProfiler from "./components/PaymentScreen/International/SocialProfiler";

// import TextEntryResumeref from './components/PaymentScreen/ResumeWriting/TextResume/TextResumeref';

import { useContext, useEffect, useState } from "react";
import contextAuth from "./ContextAPI/ContextAuth";
import TextExecutive from "./components/PaymentScreen/ResumeWriting/TextResume/TextExecutive";
import VisualExecutive from "./components/PaymentScreen/ResumeWriting/VisualResume/VisualExecutive";
import GoogleNewPassword from "./components/GoogleNewPassword";
import Spinner from "./UI/Spinner/Spinner";
import DataLoading from "./UI/DataLoading/DataLoading";
import Modal from "./UI/Modal/Modal";
import axios from "axios";
import { responsiveFontSizes } from "@mui/material";
import InternationalTextExecutive from "./components/PaymentScreen/International/InternationalTextResume/InternationalTextExecutive";
import InternationalVisualExecutive from "./components/PaymentScreen/International/InternationalVisualResume/InternationalVisualExecuive";
import Dashboard from "./components/Dashboard";
import DocumentVerification from "./components/PaymentScreen/ScreeningServices/DocumentVerification";
import Contactus from "./components/Contactus";
import JobAlertOnMailAndSms from "./components/PaymentScreen/CareerGrowth/JobAlertOnMailAndSms";
import CombosHighlights from "./components/PaymentScreen/CareerGrowth/CombosHighlights";
import toast from "react-hot-toast";
import Cart from "./components/Cart";
import { googleLogout } from "@react-oauth/google";
import ScrollToTop from "./ScrollToTop";
import PaymentStatus from "./components/PaymentStatus";
import CustomPaymentStatus from "./components/CustomPaymentStatus.jsx";
import Terms_Conditions from "./components/Terms_Conditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import FraudAlert from "./components/FraudAlert";
import RefundAndCancellationPolicy from "./components/RefundAndCancellationPolicy";
import Disclaimer from "./components/Disclaimer";
import AboutUs from "./components/AboutUs";
import ContactUs_Footer from "./components/ContactUs_Footer";

function App() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState(false);
  const [cart, setCart] = useState(0);

  const navigate = useNavigate();

  const [logged, setLogged] = useState(false); // for changing route after logout to '/login
  // useEffect(() => {
  //   navigate("/");
  // }, [logged]);

  const login = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.removeItem("cartId");
  };

  const logout = () => {
    loadingHandler(true);
    setUser({});
    setToken("");
    setCart(0);
    googleLogout();
    // localStorage.removeItem("userID");
    // localStorage.removeItem("email");
    // localStorage.removeItem("userName");
    // localStorage.removeItem("picture");
    localStorage.removeItem("token");
    // localStorage.removeItem("user");
    loadingHandler(false);
    toast.success("Logged Out");
    setLogged((prev) => !prev);
    location.reload();
  };

  const errorHandler = (error) => {
    setError(error);
  };

  const loadingHandler = (status) => {
    setLoading(status);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      getUserDetails(token);
    }
    getCartItems(token);
  }, []);

  const getCartItems = async (token) => {
    let id = null;
    if (localStorage.getItem("cartId") && !token) {
      id = JSON.parse(localStorage.getItem("cartId"));
    }
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_PRO_URL}/api/cart/${
          id ? `cart/${id}` : "my-cart"
        }`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(data?.items?.length);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  async function getUserDetails(token) {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_PRO_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response MYPROFILE......", response);
      if (response.data?.status !== "success") {
        throw new Error(response.data?.message);
      }

      setUser(response.data.user);
    } catch (error) {
      // console.log("ERROR IN MYPROFILE......", error);
    }
    setLoading(false);
  }

  return (
    <div className="App">
      <ScrollToTop />
      <contextAuth.Provider
        value={{
          user,
          setUser,
          token,
          setToken,
          error,
          setError,
          loading,
          setLoading,
          login,
          logout,
          errorHandler,
          loadingHandler,
          blogs,
          setBlogs,
          cart,
          setCart,
          getCartItems,
        }}
      >
        <Navbar />
        {error && <Modal error={error.message} type={error.type} />}
        {loading && <Spinner />}
        <Routes>
          <Route path="/Text-Resume-Entry-Level" element={<TextEntry />} />
          <Route path="/Text-Resume-Middle-Level" element={<TextMiddle />} />
          <Route path="/Text-Resume-Senior-Level" element={<TextSenior />} />
          <Route
            path="/Text-Resume-Executive-Level"
            element={<TextExecutive />}
          />
          <Route path="/Visual-Resume-Entry-Level" element={<VisualEntry />} />
          <Route
            path="/Visual-Resume-Middle-Level"
            element={<VisualMiddle />}
          />
          <Route
            path="/Visual-Resume-Senior-Level"
            element={<VisualSenior />}
          />
          <Route
            path="/Visual-Resume-Executive-Level"
            element={<VisualExecutive />}
          />
          <Route
            path="/resume-quality-score"
            element={<ResumeQualityScore />}
          />

          <Route
            path="/single-blog-page/:blogId"
            element={<SingleBlogPage />}
          />

          <Route
            path="/resume-quality-report"
            element={<ResumeQualityReport />}
          />
          <Route
            path="/International-Resume-Entry-Level"
            element={<InternationalTextEntry />}
          />
          <Route
            path="/International-Resume-Middle-Level"
            element={<InternationalTextMiddle />}
          />
          <Route
            path="/International-Resume-Senior-Level"
            element={<InternationalTextSenior />}
          />
          <Route
            path="/International-Resume-Executive-Level"
            element={<InternationalTextExecutive />}
          />
          <Route
            path="/Visual-Resume-International-Entry-Level"
            element={<InternationalVisualEntry />}
          />
          <Route
            path="/Visual-Resume-International-Middle-Level"
            element={<InternationalVisualMiddle />}
          />
          <Route
            path="/Visual-Resume-International-Senior-Level"
            element={<InternationalVisualSenior />}
          />
          <Route
            path="/Visual-Resume-International-Executive-Level"
            element={<InternationalVisualExecutive />}
          />

          <Route
            path="/Zap-Your-Resume-International"
            element={<ZapInternational />}
          />
          <Route path="Zap-Your-Resume" element={<ZapResume />} />
          <Route path="Highlight-Your-Resume" element={<HighlightResume />} />
          <Route
            path="/Job-Search-Assistant"
            element={<JobSearchAssistant3 />}
          />
          <Route
            path="/Interview-Preparation"
            element={<InterviewPreparation />}
          />
          <Route
            path="Job-Alert-On-Mail-And-SMS"
            element={<JobAlertOnMailAndSms />}
          />
          <Route
            path="/Top-Management-Profile"
            element={<TopManagementProfile />}
          />
          <Route path="/Profile-Update" element={<ProfileUpdate />} />
          <Route path="/Personal-Portfolio" element={<PersonalPortfolio />} />
          <Route path="/Cover-Letter" element={<CoverLetter />} />
          <Route
            path="/Employee-Background-Verification"
            element={<EmployeeVerification />}
          />
          <Route path="/Resume-Critique" element={<ResumeCritique />} />
          <Route path="/Combo-Resume-Pack" element={<ComboResume />} />
          <Route
            path="/Document-Verification"
            element={<DocumentVerification />}
          />
          <Route path="/Social-Profiler" element={<SocialProfiler />} />
          <Route path="/Combos-Highlights" element={<CombosHighlights />} />

          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/Combo-Job-Boost" element={<ComboJobBoost />} />

          <Route
            path="/Combo-International-Packs"
            element={<ComboInternationalPacks />}
          />

<Route
            path="/custom-check-out/:invoiceId"
            element={<CustomCheckOut />}
          />

          <Route
            path="/check-out"
            element={token ? <CheckOut /> : <Navigate to="/login" />}
          />
          <Route path="/terms-conditions" element={<Terms_Conditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/fraud-alert" element={<FraudAlert />} />
          <Route
            path="/refund-cancellation-policy"
            element={<RefundAndCancellationPolicy />}
          />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/contact-us" element={<ContactUs_Footer />} />
          <Route path="/about-us" element={<AboutUs />} />

          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />

          {!token && (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </>
          )}

          <Route path="/auth/loadLoginData" element={<DataLoading />} />
          <Route path="/auth/googlePassword" element={<GoogleNewPassword />} />
          <Route path="/" element={<MAINheader />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="payment-status/:status" element={<PaymentStatus />} />
          <Route path="custom-payment-status/:status" element={<CustomPaymentStatus />} />
        </Routes>
        {/* <Footer /> */}
        <Footer2 />
      </contextAuth.Provider>
    </div>
  );
}

export default App;
