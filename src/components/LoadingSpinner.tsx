import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Spinner = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  animation: ${rotate} 4s linear infinite;
`;

const Letter = styled.span`
  position: absolute;
  font-size: 24px;
  font-weight: bold;

  transform-origin: 75px 75px;
`;

const LoadingSpinner = () => {
  const letters = "TRIPPO".split("");

  return (
    <SpinnerContainer>
      <Spinner>
        {letters.map((letter, index) => (
          <Letter
            key={index}
            style={{
              transform: `rotate(${index * 60}deg) translateY(-60px)`,
            }}
          >
            {letter}
          </Letter>
        ))}
      </Spinner>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
