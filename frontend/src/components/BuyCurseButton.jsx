import React from 'react'
import { Button } from './ui/button'
import { usePublishCourseMutation } from '@/featureSlice/api/courseApi'
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const BuyCurseButton = ({ courseId }) => {
  const [createCheckoutSession, { data, isLoading, error, isError, isSuccess }] = usePublishCourseMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId)
  }

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.assign(data.url);

      } else {
        toast.error("Error: Invalid Response from Server");
      }
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to create checkout session");
    }
  }, [data, isSuccess, isError, error]);


  return (

    <Button className='w-full'
      onClick={purchaseCourseHandler}
      disabled={isLoading}
    >
      {
        isLoading ? (<>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
        </>) : "Purchase Course"
      }
    </Button>

  )
}

export default BuyCurseButton

