import React,{useState} from "react";
import "./LandPage.css";
import ImageSection from "../../components/imgeSection/ImageSection";
import SignIn from "../../components/signIn/SignIn";
import SignUp from "../../components/signUp/SignUp";
import Footer from "../../components/footer/Footer";
import About from "../../components/about/About";

const LandPage = () => {
  const [signInForm, setSignInForm] = useState(true);

    
  return (
    <div className="LandPage">
      <div className="home-imageSection">
   <ImageSection/>
   </div>
   {signInForm?
   <div className="LandPage-signIn">
   <SignIn setSignInForm={setSignInForm} />
   </div> 
           :
   <div className="LandPage-signUp">
   <SignUp setSignInForm={setSignInForm}/>
   </div>
}
<About/>
<Footer/>
   </div>

  );
};

export default LandPage;
