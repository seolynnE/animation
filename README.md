## framer-motion

- 손쉽게 애니메이션을 만들 수 있다!
- 세팅
  ` npm install framer-motion`

` import { motion } from "framer-motion";`

- framer motion으로 애니메이션을 만들고 싶다면 `<motion.div></motion.div>` 이런식으로 만들고싶은 html태그 명을 motion. 뒤에 붙여줘야 한다.
- 하단의 방법으로도 사용이 가능하다.
  ``
  const Box = styled(motion.div)'
  border-radius: 10px;
  ';

  function App() {

  return (
  <Wrapper>
  <Box transition={{ duration: 3 }} initial={{scale:0}} animate={{ scale:1, rotateZ:360 }} />
  </Wrapper>
  );
  }
  ``

- variants는 함수를 담을 수 있다.
  ``
  const myVars = {
  start: {scale: 0},
  end: {scale: 1, rotateZ: 360, transition: {type: "spring", delay: 0.5}}
  }
  function App() {
  return (
  <Wrapper>
  <Box variants={myVars} initial="start" animate="end" />
  </Wrapper>
  );
  }

``

- 부모와 자식 모두 애니메이션 처리를 해 줄 수 있다.

```
const boxVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const circleVariants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  },
};
function App() {
  return (
    <Wrapper>
      <Box variants={boxVariants} initial="start" animate="end">
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box>
    </Wrapper>
  );
}
```

❕ `staggerChildren`으로 자식요소의 각기 다른 요소들을 순차적으로 실행할 수 있다.
❕ 부모에서 `initial`과 `animate`를 설정하고, 자식요소도 그에 맞춘다면 자식요소는 이 두가지를 설정할 필요 없이 `variants`만 불러와주면 된다.

- hover와 click애니메이션

```
const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: "100px;" },
};

function App() {
  return (
    <Wrapper>
      <Box variants={boxVariants} whileHover="hover" whileTap="click" />
    </Wrapper>
  );
}

```

- 제한 없는 drag

```
const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: "100px;" },
  drag: { backgroundColor: "rgb(253, 170, 87)", transition: { duration: 1 } },
};

function App() {
  return (
    <Wrapper>
      <Box
        drag
        variants={boxVariants}
        whileHover="hover"
        whileTap="click"
        whileDrag="drag"
      />
    </Wrapper>
  );
}
```

- 제한된 영역이 있는 drag

```
const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: "100px;" },
  drag: { backgroundColor: "rgb(253, 170, 87)", transition: { duration: 1 } },
};

function App() {
  const biggerBoxRex = useRef<HTMLDivElement>(null);
  return (
    <Wrapper>
      <BiggerBox ref={biggerBoxRex}>
        <Box
          drag
          dragConstraints={biggerBoxRex}
          dragSnapToOrigin
          dragElastic={0.5}
          variants={boxVariants}
          whileHover="hover"
          whileTap="click"
          whileDrag="drag"
        />
      </BiggerBox>
    </Wrapper>
  );
}
```

❕ `useRef`로 부모박스의 사이즈를 계산한다. 그 값을 `dragConstraints`에 넣어주면 해당 영역 안에서 드래그가 작동하고, 그 이상을 넘어갈 시 영역 안으로 되돌아온다.
❕ `dragSnapToOrigin`는 드래그 후 초기 위치로 이동된다.
❕ `dragElastic`는 초기 위치로 되돌아가려는 힘을 가지고 있다.

- useMotionValue & useTransform

```
function App() {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-800, 0, 800],
    [
      "linear-gradient(315deg, #8244ff 0%, #ef6da0 74%)",
      "linear-gradient(315deg, #ee8e6b 0%, #ef6da0 74%)",
      "linear-gradient(315deg, #6beecf 0%, #ef6da0 74%)",
    ]
  );

  return (
    <Wrapper style={{ backgroundImage: gradient }}>
      <Box
        style={{ x, rotateZ: rotate }}
        drag="x"
        dragSnapToOrigin
      />
    </Wrapper>
  );
}

```

❕ 위나 아래로만 드래그되며, 드래그 시 애니메이션 효과를 줄 수 있다.

- useScroll

```
function App() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

  return (
    <Wrapper>
      <Box
        style={{scale: scale }}
      />
    </Wrapper>
  );
}

```

❕ 스크롤 시 애니메이션 효과도 손쉽게 줄 수 있다.

- path(SVG animation)

```
<Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <motion.path
          stroke="white"
          strokeWidth="4"
          initial={{ pathLength: 0, fill: "rgba(255,255,255,0)" }}
          animate={{ pathLength: 1, fill: "rgba(255,255,255,1)" }}
          transition={{ duration: 5 }}
          d="M224 373.1c-25.2-31.7-40.1-59.4-45-83.2-22.6-88 112.6-88 90.1 0-5.5 24.3-20.3 52-45 83.2zm138.2 73.2c-42.1 18.3-83.7-10.9-119.3-50.5 103.9-130.1 46.1-200-18.9-200-54.9 0-85.2 46.5-73.3 100.5 6.9 29.2 25.2 62.4 54.4 99.5-32.5 36.1-60.6 52.7-85.2 54.9-50 7.4-89.1-41.1-71.3-91.1 15.1-39.2 111.7-231.2 115.9-241.6 15.8-30.1 25.6-57.4 59.4-57.4 32.3 0 43.4 25.9 60.4 59.9 36 70.6 89.4 177.5 114.8 239.1 13.2 33.1-1.4 71.3-37 86.6zm47-136.1C280.3 35.9 273.1 32 224 32c-45.5 0-64.9 31.7-84.7 72.8C33.2 317.1 22.9 347.2 22 349.8-3.2 419.1 48.7 480 111.6 480c21.7 0 60.6-6.1 112.4-62.4 58.7 63.8 101.3 62.4 112.4 62.4 62.9 .1 114.9-60.9 89.6-130.2 0-3.9-16.8-38.9-16.8-39.6z"
        />
      </Svg>

```

❕ `pathLength`가 채워진 뒤 `fill`을 채워줄 수도 있다. 원하는 방식으로 원하는 시간을 조절할 수 있는 것이다. 쩐다!

```

transition={{
    default: { duration: 5 },
    fill: { duration: 2, delay: 3 },
}}

```

- AnimatePresence

```
const boxVariants = {
  start: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  end: {
    opacity: 0,
    y: 20,
  },
};

function App() {
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing((prev) => !prev);
  return (
    <Wrapper>
      <button onClick={toggleShowing}>click</button>
      <AnimatePresence>
        {showing ? (
          <Box
            variants={boxVariants}
            initial="start"
            animate="visible"
            exit="end"
          />
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}
```

❕ `<AnimatePresence>{조건문}</AnimatePresence>`을 꼭 넣어주자!
❕ `exit`는 애니메이션이 끝날 때 실행된다.

- AnimatePresence로 slide 만들기

```
const boxs = {
  entry: (back: boolean) => ({
    x: back ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (back: boolean) => ({
    x: back ? 500 : -500,
    opacity: 0,
    scale: 0,
  }),
};

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const next = () => {
    setBack(false);
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const prev = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };
  return (
    <Wrapper>
      <AnimatePresence mode="wait" custom={back}>
        <Box
          custom={back}
          variants={boxs}
          initial="entry"
          animate="center"
          exit="exit"
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={next}>next</button>
      <button onClick={prev}>prev</button>
    </Wrapper>
  );
}

```

❕ `custom`으로 `variants`와 `exit`값을 바꿀 수 있다.
이 때 값을 바꾸고 싶은 영역은 함수로 작성을 해줘야 한다.
❕ `<AnimatePresence />`에 `mode="wait"`을 추가하면 `<Box />`의 `exit`가 끝난 뒤 다음 애니메이션을 시작한다.

- Layout animation

```
function App() {
  const [click, setClick] = useState(false);
  const toggleClick = () => setClick((prev) => !prev);
  return (
    <Wrapper onClick={toggleClick}>
      <Box>{!click ? <Circle layoutId="circle" /> : null}</Box>
      <Box>{click ? <Circle layoutId="circle" /> : null}</Box>
    </Wrapper>
  );
}
```

❕ `layout`을 설정하면 자연스러운 모션을 추가해 줄 수 있고, `layoutId`를 똑같이 설정하면 같은 개체로 인식받게 해 자연스러운 애니메이션을 만들 수 있다. 와...혁신이다 개쩐다진짜

- map을 활용해 layout animation 만들기

```
function App() {
  const [id, setId] = useState<null | string>(null);
  return (
    <Wrap>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box onClick={() => setId(n)} key={n} layoutId={n} />
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => setId(null)}
            initial={{ backgroundColor: "rgba(0,0,0,0)", opacity: 0 }}
            animate={{ backgroundColor: "rgba(0,0,0,0.6)", opacity: 1 }}
            exit={{ backgroundColor: "rgba(0,0,0,0)", opacity: 0 }}
          >
            <Box
              layoutId={id}
              style={{
                width: 400,
                height: 200,
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <button>Click</button>
    </Wrap>
  );
}

```