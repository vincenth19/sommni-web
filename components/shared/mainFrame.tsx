import { Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FC, ReactNode } from "react";
import Footer from "./footer/footer";
import Navbar from "./navbar/navbar";
import NewsletterSection from "./newsletter";
import SignUpSection from "./signUpSection";
import { screenSizes } from "../../types";

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
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  return (
    <>
      <Container size="xl" fluid={biggerScreen ? false : true}>
        {navbar && <Navbar />}

        {children}
        {signUp && <SignUpSection />}
        {newsletter && <NewsletterSection />}

        {footer && <Footer />}
      </Container>
    </>
  );
};

export default MainFrame;
