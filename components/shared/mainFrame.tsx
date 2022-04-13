import { Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FC, ReactNode, useEffect, useState } from "react";
import { screenSizes } from "../../types";

import dynamic from "next/dynamic";

const Footer = dynamic(() => import("./footer/footer"));
const Navbar = dynamic(() => import("./navbar/navbar"));
const NewsletterSection = dynamic(() => import("./newsletter"));
const SignUpSection = dynamic(() => import("./signUpSection"));
const ScrollToTop = dynamic(() => import("./scrollToTop"));

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
  signUp = false,
  newsletter = false,
  children,
  footer = true,
  scrollToTop = true,
}) => {
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.sm})`);
  const [isDesktop, setIsDesktop] = useState<boolean>();

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
