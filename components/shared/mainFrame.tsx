import { FC, ReactNode } from "react";
import Footer from "./footer/footer";
import Navbar from "./navbar/navbar";
import NewsletterSection from "./newsletter";
import SignUpSection from "./signUpSection";

interface MainFrameProps {
  navbar?: boolean;
  signUp?: boolean;
  newsletter?: boolean;
  children: ReactNode;
  footer?: boolean;
}

const MainFrame: FC<MainFrameProps> = ({
  navbar = true,
  signUp = true,
  newsletter = true,
  children,
  footer = true,
}) => {
  return (
    <>
      {navbar && <Navbar />}
      {children}
      {signUp && <SignUpSection />}
      {newsletter && <NewsletterSection />}
      {footer && <Footer />}
    </>
  );
};

export default MainFrame;
