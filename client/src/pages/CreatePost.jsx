import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className=' min-h-screen text-3xl max-w-3xl p-3 mx-auto'>
        <h1 className=' text-center font-semibold text-3xl my-7'>Create Post</h1>
        <form className='flex flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4 justify-between'>
                <TextInput type = 'text' id= 'title' placeholder='Title' className='flex-1' />
                <Select >
                    <option value = "Uncatagorized">Select category</option>
                    <option value = "JavaScript">JavaScript</option>
                    <option value = "React">React</option>
                    <option value = "NodeJs">NodeJS</option>
                </Select>             

            </div>
            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 '>
                <FileInput type = 'file' accept='image/*' />
                <Button type = 'button' gradientDuoTone='purpleToBlue' size='sm' outline >Upload Image</Button>
            </div>
            <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required         
        />
        <Button type='button' gradientDuoTone='purpleToBlue' >Submit</Button>
        </form>
    </div>
  )
}
