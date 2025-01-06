import { createContext, useContext, useEffect, useReducer } from "react";
import Label from "../features/start/Label";

const StepperContext = createContext(null);

const steps = [
  {
    component: <Label text={"Start adding a match's Events JSONL"} />,
    isFulfilled: false,
    helper: "Events JSONL",
    id: "jsonl",
  },
  {
    component: (
      <Label text={"Now, add the corresponding match End State Details JSON"} />
    ),
    isFulfilled: false,
    helper: "End State Details JSON",
    id: "json",
  },
];

const initialState = {
  currentStep: 0,
  numSteps: steps.length,
  steps,
  isComplete: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "step/next":
      return {
        ...state,
        currentStep: state.currentStep + 1,
        steps: state.steps.map((step, ind) => {
          if (ind !== state.currentStep) {
            return step;
          } else {
            return {
              ...step,
              isFulfilled: true,
            };
          }
        }),
      };

    case "step/prev":
      return {
        ...state,
        currentStep: state.currentStep - 1,
        steps: state.steps.map((step, ind) => {
          if (ind === state.currentStep - 1) {
            return {
              ...step,
              isFulfilled: false,
            };
          } else {
            return step;
          }
        }),
      };
    case "step/complete":
      return {
        ...state,
        isComplete: true,
      };
    case "step/not-complete":
      return {
        ...state,
        isComplete: false,
      };
  }
}

function StepperProvider({ children }) {
  const [stepper, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (stepper.currentStep === stepper.numSteps && !stepper.isComplete) {
      dispatch({ type: "step/complete" });
    }
  }, [stepper]);

  function stepsNotComplete() {
    dispatch({ type: "step/not-complete" });
  }

  function onNextStep() {
    dispatch({ type: "step/next" });
  }

  function onPrevStep() {
    dispatch({ type: "step/prev" });
  }

  return (
    <StepperContext.Provider
      value={{ stepper, onNextStep, onPrevStep, stepsNotComplete }}
    >
      {children}
    </StepperContext.Provider>
  );
}

function useStepper() {
  const data = useContext(StepperContext);

  if (!data)
    return console.error(
      "Wrong use o Provider. Please wrap the content with the Provider",
    );

  return data;
}
export { StepperProvider, useStepper };
