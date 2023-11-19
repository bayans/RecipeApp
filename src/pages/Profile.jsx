import React, { useEffect, useState } from 'react';
import axios from 'axios';
import isPasswordValid from '../utils/isPasswordValid';
import Form from '../components/Form/Form';

function Profile() {
  const [loading, toggleLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [photo64, setPhoto64] = useState(null);
  const [error, toggleError] = useState(false);

  const userToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    toggleError(false);
    toggleLoading(true);
    axios.get(
      "https://frontend-educational-backend.herokuapp.com/api/user",
      {
        headers: { Authorization: `Bearer ${userToken}` }
      }
    )
      .then(resp => resp.data)
      .then(data => {
        setEmail(data.email);
        setPhoto64(data.profilePicture);
        toggleLoading(false);
      })
      .catch(error => {
        toggleError("Something wrong happened while fetching the profile's data, please try later!");
        toggleLoading(false);
      });
  }, [userToken]);

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleRepeatedPasswordChange = (value) => {
    setRepeatedPassword(value);
  };

  const handlePhotoChange = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto64(reader.result);
      console.log(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleError(false);
    toggleLoading(true);

    if (password !== repeatedPassword) {
      toggleError("Passwords doesn't match!");
      toggleLoading(false);
      return;
    }

    if (password && !isPasswordValid(password)) {
      toggleError("Password does not meet complexity criteria!");
      toggleLoading(false);
      return;
    }

    if (photo64) {
      axios.post(
        "https://frontend-educational-backend.herokuapp.com/api/user/image",
        {
          base64Image: photo64
        },
        {
          headers: { Authorization: `Bearer ${userToken}` }
        }
      )
        .then(resp => resp.data)
        .then(data => {
          // image successfully uploaded
        })
        .catch(error => {
          toggleError("Something wrong happened while uploading the profile's photo, please try later!");
        });
    }

    let data = { email };

    if (password) {
      data = { ...data, password, repeatedPassword };
    }

    axios.put(
      "https://frontend-educational-backend.herokuapp.com/api/user",
      data,
      {
        headers: { Authorization: `Bearer ${userToken}` }
      }
    )
      .then(resp => resp.data)
      .then(data => {
        alert('Changes successfuly made!');
        toggleLoading(false);
      })
      .catch(error => {
        toggleError("Something wrong happened while applying the changes, please try later!");
        toggleLoading(false);
      });

  };

  const profileFormFields = [
    { fieldType: 'label-input', name: 'email', label: 'Email', input: email, onChange: handleEmailChange },
    { fieldType: 'label-input', name: 'password', type: 'password', label: 'Password', input: password, onChange: handlePasswordChange },
    { fieldType: 'label-input', name: 'repeat-password', type: 'password', label: 'Repeat Password', input: repeatedPassword, onChange: handleRepeatedPasswordChange },
    { fieldType: 'label-input', name: 'image', type: 'file', label: 'Profile Photo', accept: "image/*", onChange: handlePhotoChange },
    { fieldType: 'photo-display', photo64: photo64, name: 'display-image', type: 'div', className: 'uploaded-photo-section' }
  ];

  return (
    <div className="container">
      <div className="form-component">
        <h2 className="form-heading">Edit Profile</h2>
        {error && <h4 className="error">{error}</h4>}
        {loading &&
          <div className="overlay-contaniner">
            <div className="overlay">
              <div className="loader"></div>
            </div>
          </div>
        }
        <Form formFields={profileFormFields} submitButton="Save" onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default Profile;
