import { Formik, Form, Field } from "formik";
import AutocompleteField from "@/components/form/AutocompleteField";
import Footer from "@/components/user/Footer";
import NavBar from "@/components/user/NavBar";
import {
  AI_PROMPT,
  SelectedBudgetOptions,
  SelectTravelesList,
} from "./utils/Options";
import { createAiTripValidation } from "@/validation/createAiTrip.validation";
import { message } from "antd";
import { chatSession } from "@/service/AiModal";
import { createAiTrip } from "@/service/api/trip";
import handleError from "@/utils/errorHandler";
import JSON5 from "json5";
import { useState } from "react";
import AITripLoadingScreen from "./utils/AITripLoadingScreen ";
import { useNavigate } from "react-router-dom";

interface aiTrip {
  place: string;
  days: string;
  budget: string;
  travelers: string;
}

const AiTripCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: aiTrip) => {
    if (Number(values.days) > 7) {
      message.warning("You can plan only up to 7 days");
      return;
    }

    setIsLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace("{totalDays}", values.days)
      .replace("{location}", values.place)
      .replace("{traveler}", values.travelers)
      .replace("{budget}", values.budget);

    console.log("finalPrompt", FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripData = JSON5.parse(result.response.text());
      console.log("Parsed tripData:", tripData);

      const dataToSend = {
        userInput: {
          place: values.place,
          days: values.days,
          budget: values.budget,
          travelers: values.travelers,
        },
        aiGeneratedTrip: tripData,
      };
      const response = await createAiTrip(dataToSend);
      console.log("my backend response", response?.data);

      if (response?.status === 201) {
        message.success("Trip created successfully!");
        navigate(`/ai-trip-details/${response.data.tripId}`);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const initialValues = {
    place: "",
    days: "",
    budget: "",
    travelers: "",
  };

  return (
    <>
      <NavBar />
      {isLoading && <AITripLoadingScreen />}
      <div className=" min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto  rounded-md  overflow-hidden">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={createAiTripValidation}
          >
            {({ errors, touched, setFieldValue, values }) => (
              <Form className="p-8">
                <h2 className="font-bold text-3xl mb-6">
                  Tell us your Travel preference
                </h2>
                <p className="mb-10 text-gray-600 text-xl">
                  Just provide some basic information, and our Trippo planner
                  will generate a customized itinerary based on your
                  preferences.
                </p>

                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl mb-3 font-medium">
                      What is your destination of choice?
                    </h2>
                    <AutocompleteField
                      id="place"
                      placeholder="Search for a place"
                      value={values.place}
                      onChange={(selectedPlace) =>
                        setFieldValue("place", selectedPlace)
                      }
                      onBlur={() => setFieldValue("place", values.place)}
                    />
                    {errors.place && touched.place && (
                      <div className="text-red-500 mt-2">{errors.place}</div>
                    )}
                  </div>

                  <div>
                    <h2 className="text-xl mb-3 font-medium">
                      How many days are you planning your trip?
                    </h2>
                    <Field
                      name="days"
                      type="text"
                      placeholder="Ex. 3"
                      className="w-full p-2 border rounded-md"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFieldValue("days", Number(e.target.value))
                      }
                    />
                    {errors.days && touched.days && (
                      <div className="text-red-500 mt-2">{errors.days}</div>
                    )}
                  </div>

                  <div>
                    <h2 className="text-xl mb-3 font-medium">
                      What is Your Budget?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {SelectedBudgetOptions.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setFieldValue("budget", item.tittle)}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            values.budget === item.tittle
                              ? "bg-yellow-100 border-yellow-500"
                              : "hover:shadow-lg"
                          }`}
                        >
                          <div className="text-4xl mb-2">{item.icon}</div>
                          <h2 className="font-bold text-lg">{item.tittle}</h2>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    {errors.budget && touched.budget && (
                      <div className="text-red-500 mt-2">{errors.budget}</div>
                    )}
                  </div>

                  <div>
                    <h2 className="text-xl mb-3 font-medium">
                      Who do you plan on travelling with on your next adventure?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {SelectTravelesList.map((item) => (
                        <div
                          key={item.id}
                          onClick={() =>
                            setFieldValue("travelers", item.people)
                          }
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            values.travelers === item.people
                              ? "bg-yellow-100 border-yellow-500"
                              : "hover:shadow-lg"
                          }`}
                        >
                          <div className="text-4xl mb-2">{item.icon}</div>
                          <h2 className="font-bold text-lg">{item.tittle}</h2>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    {errors.travelers && touched.travelers && (
                      <div className="text-red-500 mt-2">
                        {errors.travelers}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition-colors"
                  >
                    Generate Trip
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AiTripCreate;
