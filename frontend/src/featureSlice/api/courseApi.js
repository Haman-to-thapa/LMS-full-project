import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from '@/config/apiConfig';


export const courseApi = createApi({
  reducerPath:"courseApi",
  tagTypes:['Refetch_Creator_Course',"Refetch_Lecture"],
  baseQuery:fetchBaseQuery({
    baseUrl: API_ENDPOINTS.COURSE_API,
    credentials:"include"
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({courseTitle, category}) => ({
        url:"",
        method:"POST",
        body:{courseTitle, category},
      }),
      invalidatesTags:['Refetch_Creator_Course']
    }),
      getPublishedCourse: builder.query({
        query : () => ({
          url: "/published-courses",
          method:"GET",
        })
      }),
    getCeatorCourse: builder.query({
      query:() => ({
        url:"",
        method:"GET",
      }),
      providesTags:['Refetch_Creator_Course']
    }),
    editCourse : builder.mutation({
      query: ({formData, courseId}) => ({
        url:`/${courseId}`,
        method:"PUT",
        body:formData
      }),
      invalidatesTags: ['Refetch_Creator_Course'],
    }),
    getCourseById: builder.query({
      query:(courseId) => ({
        url:`/${courseId}`,
        method: "GET"
      })
    }),
    createLecture : builder.mutation({
      query: ({courseId, lectureTitle}) => ({
        url: `/${courseId}/lecture`,
        method:"POST",
        body:{lectureTitle}
      })
    }),
    getCourseLecture : builder.query({
      query: (courseId) => ({
        url: `/${courseId}/lecture`,
        method:"GET"
      }),
      providesTags:["Refetch_Lecture"]
    }),
    editLecture : builder.mutation({
      query: ({lectureTitle, videoInfo, isPreviewFree, courseId, lectureId}) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method:"PUT",
        body:{lectureTitle,videoInfo, isPreviewFree}
      })
    }),
    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method:"DELETE"
      }),
      invalidatesTags:["Refetch_Lecture"]
    }),
    getLectureById : builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",

      })
    }),
    publishCourse : builder.mutation({
      query:({courseId, query}) => ({
        url: `/${courseId}?publish=${query}`,
        method:"PATCH"
      })
    })
  }),
})


export const {useCreateCourseMutation, useGetCeatorCourseQuery, useEditCourseMutation, useGetCourseByIdQuery, useCreateLectureMutation, useGetCourseLectureQuery,useEditLectureMutation,useRemoveLectureMutation, useGetLectureByIdQuery, usePublishCourseMutation, useGetPublishedCourseQuery} = courseApi;