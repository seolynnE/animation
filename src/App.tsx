import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(315deg, #ee8e6b 0%, #ef6da0 74%);
`;

const Btn = styled(motion.button)`
  width: 100px;
  height: 40px;
  margin-top: 40px;
  background-color: inherit;
  border: 1px solid #fff;
  color: #fff;
  cursor: pointer;
  &.click {
    background-color: rgb(231, 40, 85) !important;
    border: 1px solid rgb(231, 40, 85) !important;
    color: #fff;
  }
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 50vw;
`;
const Box = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  width: calc(100% / 2 - 5px);
  height: 200px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

const Circle = styled(motion.div)`
  background-color: #fff;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  div {
    background-color: #fff;
  }
`;

const circleBtn = {
  hover: {
    scale: 1.2,
    backgroundColor: "rgb(25, 59, 88)",
    borderColor: "rgb(25, 59, 88)",
  },
  click: {
    scale: 1,
  },
};

const boxVariants = {
  hover: (topBox: boolean) => ({
    x: topBox ? -30 : 30,
    y: topBox ? -14 : 14,
    scale: 1.1,
  }),
};

function App() {
  const topBox = useState(true);
  const [click, setClick] = useState(false);
  const toggleClick = () => setClick((prev) => !prev);
  const [clickBox, setClickBox] = useState(false);
  const toggleClickBox = () => setClickBox((prev) => !prev);
  const [clickBox2, setClickBox2] = useState(false);
  const toggleClickBox2 = () => setClickBox2((prev) => !prev);
  return (
    <Wrap>
      <Grid>
        <AnimatePresence custom={topBox}>
          <Box
            onClick={toggleClickBox}
            layoutId="box"
            custom={topBox}
            variants={boxVariants}
            whileHover="hover"
          />
        </AnimatePresence>
        <Box>{!click ? <Circle layoutId="circle" /> : null}</Box>
        <Box>{click ? <Circle layoutId="circle" /> : null}</Box>
        <AnimatePresence custom={!topBox}>
          <Box
            onClick={toggleClickBox2}
            layoutId="box2"
            custom={!topBox}
            variants={boxVariants}
            whileHover="hover"
          />
        </AnimatePresence>
      </Grid>
      <AnimatePresence>
        {clickBox ? (
          <Overlay
            onClick={toggleClickBox}
            initial={{ backgroundColor: "rgba(0,0,0,0)", opacity: 0 }}
            animate={{ backgroundColor: "rgba(0,0,0,0.6)", opacity: 1 }}
            exit={{ backgroundColor: "rgba(0,0,0,0)", opacity: 0 }}
          >
            <Box
              layoutId="box"
              style={{
                width: 400,
                height: 200,
              }}
            />
          </Overlay>
        ) : null}
        {clickBox2 ? (
          <Overlay
            onClick={toggleClickBox2}
            initial={{ backgroundColor: "rgba(0,0,0,0)", opacity: 0 }}
            animate={{ backgroundColor: "rgba(0,0,0,0.6)", opacity: 1 }}
            exit={{ backgroundColor: "rgba(0,0,0,0)", opacity: 0 }}
          >
            <Box
              layoutId="box2"
              style={{
                width: 400,
                height: 200,
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <Btn
        variants={circleBtn}
        whileHover="hover"
        whileTap="click"
        onClick={toggleClick}
        className={click ? "click" : ""}
      >
        Click
      </Btn>
    </Wrap>
  );
}

export default App;
