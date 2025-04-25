import React from 'react'
import { Button } from './ui/button'
import { useCreateCheckoutSessionMutation } from '@/featureSlice/api/purchaseApi'
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const BuyCurseButton = ({ courseId }) => {
  const [createCheckoutSession, { data, isLoading, error, isError, isSuccess }] = useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    console.log("Initiating checkout for course ID:", courseId);
    try {
      const result = await createCheckoutSession(courseId);
      console.log("Checkout session result:", result);
    } catch (err) {
      console.error("Error creating checkout session:", err);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        // Show success message before redirecting
        toast.success(data.message || "Course purchased successfully!");

        // Short delay before redirecting to ensure toast is seen
        setTimeout(() => {
          window.location.assign(data.url);
        }, 1500);
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

