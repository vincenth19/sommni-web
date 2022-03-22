import { Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FC, ReactNode, useEffect, useState } from "react";
import Footer from "./footer/footer";
import Navbar from "./navbar/navbar";
import NewsletterSection from "./newsletter";
import SignUpSection from "./signUpSection";
import { screenSizes } from "../../types";
import ScrollToTop from "./scrollToTop";

interface MainFrameProps {
  navbar?: boolean;
  signUp?: boolean;
  newsletter?: boolean;
  children: ReactNode;
  footer?: boolean;
  scrollToTop?: boolean;
}

const MainFrame: FC<MainFrameProps> = ({
  navbar = true,
  signUp = true,
  newsletter = true,
  children,
  footer = true,
  scrollToTop = true,
}) => {
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isDesktop, setIsDesktop] = useState<Boolean>();

  useEffect(() => {
    setIsDesktop(biggerScreen);
  }, [biggerScreen]);

  return (
    <>
      {isDesktop ? (
        <Container size="xl">
          {navbar && <Navbar />}

          {children}
          {signUp && <SignUpSection />}
          {newsletter && <NewsletterSection />}
          {scrollToTop && <ScrollToTop />}
          {footer && <Footer />}
        </Container>
      ) : (
        <>
          <Container size="xl">
            {navbar && <Navbar />}

            {children}
            {signUp && <SignUpSection />}
            {newsletter && <NewsletterSection />}
            {scrollToTop && <ScrollToTop />}
          </Container>

          {footer && <Footer />}
        </>
      )}
    </>
  );
};

export default MainFrame;
