"use client"
import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { Formik } from 'formik'
import { supabase } from '@/utils/supabase/client'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'
import { useSession, status, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import FileUpload from '../_components/FileUpload'
// import { setErrorMap } from 'zod'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import PDFUpload from '../_components/PDFUpload'

function EditListing({ params }) {
  const [images, setImages] = useState([]);
  const [iimages, setIimages] = useState([]);
  // const params = usePathname();
  // const {user} = useUser();
  // const { data: session } = useSession();
  // const router = useRouter();
  // useEffect(()=>{
  //   // const user = session.user?.email;
  //   // console.log(user);
  // },[])
  // useEffect(() => {
  //   // console.log(params.split('/')[2])

  //   (session.user?.email)&&verifyUserRecord();
  // }, []);

  // const verifyUserRecord =async()=>{
  //   const {data,error}=await supabase
  //   .from('listing')
  //   .select('*')
  //   .eq('createdBy',session.user?.email)
  //   .eq('id',params.id)

  //   if(data?.length<=0){
  //     router.replace('/')
  //   }
  // }
  const onSubmitHandler = async (formValue) => {

    const { data, error } = await supabase
      .from('listing')
      .update(formValue)
      .eq('id', params.id)
      .select()

    if (data) {
      console.log("Data Added", data);
      toast("Listing Updated and Publish!!")
    }
    // if(error) {
    //   console.log(error);
    //   toast("Server side error!!")
    // }

    for (const image of images) {
      const file = image;
      const fileName = Date.now().toString();
      const fileExt = fileName.split('.').pop();
      const { data, error } = await supabase.storage.from('listingImages').upload(`${fileName}`, file, {
        contentType: `image/${fileExt}`,
        upsert: false
      });

      if (error) {
        console.log(error);
        toast("error uploading!!")
      }
      else {
        const imageUrl='https://vvusdphcwzgeyjuavneg.supabase.co/storage/v1/object/public/listingImages/'+fileName;
        const {data,error}= await supabase
          .from("listingImages")
          .insert([
          {url: imageUrl, listing_id:params?.id}
          ])
          .select();
      }
    }

    for (const iimage of iimages) {
      const file = iimage;
      const fileName = Date.now().toString();
      const fileExt = fileName.split('.').pop();
      const { data, error } = await supabase.storage.from('listingPDFs').upload(`${fileName}`, file, {
        contentType: `image/${fileExt}`,
        upsert: false
      });

      if (error) {
        console.log(error);
        toast("error uploading!!")
      }
      else {
        const iimageUrl='https://vvusdphcwzgeyjuavneg.supabase.co/storage/v1/object/public/listingPDFs/'+fileName;
        const {data,error}= await supabase
          .from("listingPDFs")
          .insert([
          {url: iimageUrl, listing_id:params?.id}
          ])
          .select();
      }
    }
  }

  const publishBtnHandler = async() => {

      const { data, error } = await supabase
      .from('listing')
      .update({ active: true })
      .eq('id', params?.id)
      .select()

      if(data){
        toast('Listing Published!!')
      }
  }
  return (
    <div className='px-10 md:px-36 my-10'>
      <h2 className='font-bold text-2xl'>Enter More Details About Your Listing </h2>
      <Formik
        initialValues={{
          type: '',
          propertyType: '',
        }}
        onSubmit={(values) => {
          console.log(values);
          onSubmitHandler(values);
        }}

      >
        {({
          values,
          handleChange,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <div className='p-8 rounded-lg shadow-md flex flex-col gap-5'>
              <div className='grid grid-cols-1 md:grid-cols-3'>
                <div className='flex flex-col gap-2'>
                  <h2 className='text-lg text-slate-500'>Rent or Sell?</h2>
                  <RadioGroup defaultValue="Sell"
                    onValueChange={(v) => values.type = v} name='type'
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Rent" id="Rent" />
                      <Label htmlFor="Rent">Rent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Sell" id="Sell" />
                      <Label htmlFor="Sell">Sell</Label>
                    </div>
                  </RadioGroup>

                </div>

                <div>
                  <h2 className='text-lg text-slate-500'>Property Type</h2>
                  <Select
                    onValueChange={(e) => values.propertyType = e} name='propertyType'
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single Family House">Single Family House</SelectItem>
                      <SelectItem value="Town House">Town House</SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/*  */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                <div className='flex gap-2 flex-col'>
                  <h2 className='text-gray-500'>Bedroom</h2>
                  <Input type='number' placeholder='Ex.2' name='bedroom' onChange={handleChange} />
                </div>
                <div className='flex gap-2 flex-col'>
                  <h2 className='text-gray-500'>Bathroom</h2>
                  <Input type='number' placeholder='Ex.2' name='bathroom' onChange={handleChange} />
                </div>
                <div className='flex gap-2 flex-col'>
                  <h2 className='text-gray-500'>Built In</h2>
                  <Input type='number' placeholder='Ex. 1900 sq.ft' name='builtIn' onChange={handleChange} />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                <div className='flex gap-2 flex-col'>
                  <h2 className='text-gray-500'>Parking</h2>
                  <Input type='number' placeholder='Ex.2' name='parking' onChange={handleChange} />
                </div>
                <div className='flex gap-2 flex-col'>
                  <h2 className='text-gray-500'>Lot Size (Sq.Ft)</h2>
                  <Input type='number' placeholder='' name='lotSize' onChange={handleChange} />
                </div>
                <div className='flex gap-2 flex-col'>
                  <h2 className='text-gray-500'>Area (Sq.Ft)</h2>
                  <Input type='number' placeholder='Ex. 1900' name='area' onChange={handleChange} />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                <div className='flex gap-2 flex-col'>
                  <h2 className='text-gray-500'>Selling Price (Rs.)</h2>
                  <Input type='number' placeholder='400000' name='price' onChange={handleChange} />
                </div>
                <div className='flex gap-2 flex-col'>
                  <h2 className='text-gray-500'>HOA (per month)</h2>
                  <Input type='number' placeholder='100' name='hoa' onChange={handleChange} />
                </div>
              </div>

              <div className='grid grid-cols-1 gap-10'>
                <div className='flex gap-2 flex-col'>
                  <h2 className='text-gray-500'>Description</h2>
                  <Textarea placeholder='' name='description' onChange={handleChange} />
                </div>
              </div>

              <div>
                <h2 className='font-lg text-gray-500 my-2'>Upload Property Images</h2>
                <FileUpload setImages={(value) => setImages(value)} />
              </div>

              <div>
                <h2 className='font-lg text-gray-500 my-2'>Upload Property PDF</h2>
                <PDFUpload setIimages={(valuepdf) => setIimages(valuepdf)} />
              </div>

              <div className='flex gap-7 justify-end'>

                <Button variant='outline' className='bg-white text-black border hover:bg-gray-200'>Save</Button>


                {/* <AlertDialog>
                  <AlertDialogTrigger asChild><Button type="button">Save & Publish</Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you ready to publish?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently Upload & Publish the Data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => publishBtnHandler()}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog> */}

              </div>
            </div>
          </form>)}
      </Formik>
    </div>
  )
}

export default EditListing
