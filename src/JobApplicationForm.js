import React, { useState } from 'react';
import './App.css';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errors = {};
    if (!formData.fullName) errors.fullName = 'Full Name is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.phoneNumber) errors.phoneNumber = 'Phone Number is required';
    else if (!/^\d+$/.test(formData.phoneNumber)) errors.phoneNumber = 'Phone Number is invalid';
    if ((formData.position === 'Developer' || formData.position === 'Designer') && (!formData.relevantExperience || formData.relevantExperience <= 0))
      errors.relevantExperience = 'Relevant Experience is required and must be greater than 0';
    if (formData.position === 'Designer' && (!formData.portfolioURL || !/^https?:\/\/[^\s]+$/.test(formData.portfolioURL)))
      errors.portfolioURL = 'Valid Portfolio URL is required';
    if (formData.position === 'Manager' && !formData.managementExperience)
      errors.managementExperience = 'Management Experience is required';
    if (formData.additionalSkills.length === 0) errors.additionalSkills = 'At least one skill must be selected';
    if (!formData.preferredInterviewTime) errors.preferredInterviewTime = 'Preferred Interview Time is required';

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        additionalSkills: checked
          ? [...formData.additionalSkills, value]
          : formData.additionalSkills.filter((skill) => skill !== value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div>
      <h1>Job Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <span>{errors.fullName}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
        </div>
        <div>
          <label>Applying for Position:</label>
          <select name="position" value={formData.position} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        {(formData.position === 'Developer' || formData.position === 'Designer') && (
          <div>
            <label>Relevant Experience (years):</label>
            <input type="number" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} />
            {errors.relevantExperience && <span>{errors.relevantExperience}</span>}
          </div>
        )}
        {formData.position === 'Designer' && (
          <div>
            <label>Portfolio URL:</label>
            <input type="text" name="portfolioURL" value={formData.portfolioURL} onChange={handleChange} />
            {errors.portfolioURL && <span>{errors.portfolioURL}</span>}
          </div>
        )}
        {formData.position === 'Manager' && (
          <div>
            <label>Management Experience:</label>
            <input type="text" name="managementExperience" value={formData.managementExperience} onChange={handleChange} />
            {errors.managementExperience && <span>{errors.managementExperience}</span>}
          </div>
        )}
        <div>
          <label>Additional Skills:</label>
          <div>
            <input type="checkbox" name="additionalSkills" value="JavaScript" checked={formData.additionalSkills.includes('JavaScript')} onChange={handleChange} /> JavaScript
          </div>
          <div>
            <input type="checkbox" name="additionalSkills" value="CSS" checked={formData.additionalSkills.includes('CSS')} onChange={handleChange} /> CSS
          </div>
          <div>
            <input type="checkbox" name="additionalSkills" value="Python" checked={formData.additionalSkills.includes('Python')} onChange={handleChange} /> Python
          </div>
          {errors.additionalSkills && <span>{errors.additionalSkills}</span>}
        </div>
        <div>
          <label>Preferred Interview Time:</label>
          <input type="datetime-local" name="preferredInterviewTime" value={formData.preferredInterviewTime} onChange={handleChange} />
          {errors.preferredInterviewTime && <span>{errors.preferredInterviewTime}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div>
          <h2>Form Submitted Successfully!</h2>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
