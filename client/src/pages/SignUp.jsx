import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
    console.log(formData)
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false) {
        setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        Navigate('sign-in');
      }
    } catch (e) {
      setErrorMessage(e.message);
    }
    
  };
  return (
    <div className=" min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 ">
        {/* left */}
        <div className=" flex-1">
          <Link to="/" className=" text-4xl font-bold dark:text-white">
            <span
              className=" px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500
         to-pink-500 rounded-lg text-white"
            >
              Gawhari's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <div>
                <Label value="your username" />
                <TextInput
                  id="username"
                  placeholder="username"
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="your email" />
                <TextInput
                  id="email"
                  placeholder="name@company.com"
                  type="email"
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label value="your password" />
                <TextInput
                  id="password"
                  placeholder="password"
                  type="password"
                  onChange={handleChange}
                />
              </div>

              <Button gradientDuoTone="purpleToPink" type="submit">
                {loading ? (
                  <>
                     <Spinner size='sm' />
                    <span className=" pl-3">Loading...</span>
                  </>
                ) : ('Sign up')
                }
                
              </Button>
              <OAuth/>
            </div>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
