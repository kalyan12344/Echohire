    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    
    const ApplicationFormPage = ({ match }) => {
      const [applicationForm, setApplicationForm] = useState(null);
      const [resumeUrl, setResumeUrl] = useState(null);
      const applicationFormId="65f696b53e4f77429e7245ce"
    //   const applicationFormId = match.params.id; // Assuming you're using React Router for routing
    
      useEffect(() => {
        const fetchApplicationForm = async () => {
          try {
            const response = await axios.get("http://localhost:5001/application/65f696b53e4f77429e7245ce");
            setApplicationForm(response.data);
    console.log(response.data)
            // Extract resume data URL from the application form data
            const resumeData = response.data.resume.data.toString('base64');
            const resumeBlob = new Blob([resumeData], { type: response.data.resume.contentType });
            const resumeUrl = URL.createObjectURL(resumeBlob);
            setResumeUrl(resumeUrl);
          } catch (error) {
            console.error('Error fetching application form:', error);
          }
        };
    
        fetchApplicationForm();
      }, [applicationFormId]);
    
      const handleDownloadResume = async() => {
        try {
            const response = await axios.get("http://localhost:5001/application/resume/65f696b53e4f77429e7245ce", {
              responseType: 'blob', // Set response type to blob
            });
      
            // Create a URL for the blob object and trigger download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'resume.pdf');
            document.body.appendChild(link);
            link.click();
          } catch (error) {
            console.error('Error downloading resume:', error);
          }
      };
    
      return (
        <div>
          {applicationForm && (
            <div>
              <h2>Application Form Details</h2>
              <p><strong>Name:</strong> {applicationForm.firstname} {applicationForm.lastname}</p>
              <p><strong>Email:</strong> {applicationForm.email}</p>
              <p><strong>Phone:</strong> {applicationForm.phone}</p>
              <p><strong>Status:</strong> {applicationForm.status}</p>
              {/* Add more fields as needed */}
    
              {/* Download button for the resume */}
              <button onClick={handleDownloadResume}>Download Resume</button>
            </div>
          )}
        </div>
      );
    };
    
    export default ApplicationFormPage;
    