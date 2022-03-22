import { Affix, Button, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { FC } from "react";
import { RiArrowUpLine } from "react-icons/ri";

const ScrollToTop: FC = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              variant="light"
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              <RiArrowUpLine />
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
};

export default ScrollToTop;
