import React from "react";
import Course from "./Course";


const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
)

const MyLearning = () => {

  const isLoading = false;
  const mylearningCourses = [1];

  return (


    <div className="max-w-7xl mx-auto my-24 px-4 md:px-0">

      <h1 className="font-bold text-2xl">My Learning</h1>
      <div className="my-5">
        {
          isLoading ? (
            <MyLearningSkeleton />
          ) : (
            mylearningCourses.length === 0 ? (<p>you are not enerolled in any course</p>) : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {
                [1, 2].map((course, index) => <Course key={index} />)
              }
            </div>
          )
        }
      </div>

    </div>
  );
};

export default MyLearning;
